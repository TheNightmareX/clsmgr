/**
 * 
 * @typedef {{ header: { title: string, summaries?: string[] }, body: { items?: string[], actions?: { text: string, firesCloseEvent?: boolean, onclick?: (ev) => void }[] } }} MduiPanelElementItemPattern
 */

import { createEle, addEventListenerOnce } from "./domutils.js"


/**A dynamic element which can always cover the target element. */
export class OverlayElement extends HTMLElement {
    static observedAttributes = ['target']
    /**@type {HTMLElement} */
    $target
    shown = false
    constructor() {
        super()
        this.addEventListener('transitionend', () => {
            this.remove()
        })
    }
    attributeChangedCallback(name, oldV, newV) {
        this.$target = document.querySelector(newV)
    }
    checkTarget() {
        if (!this.$target) {
            throw new Error('Target not set.')
        }
    }
    updateShape() {
        this.checkTarget()
        const style = this.style
        const $target = this.$target
        style.left = $target.offsetLeft + 'px'
        style.top = $target.offsetTop + 'px'
        style.width = $target.offsetWidth + 'px'
        style.height = $target.offsetHeight + 'px'
    }
    show() {
        if (this.shown) return
        this.shown = true
        this.updateShape()
        this.classList.add('shown')
        this.$target.after(this)
    }
    hide() {
        if (!this.shown) return
        this.shown = false
        this.classList.remove('shown')
    }
}
customElements.define('my-overlay', OverlayElement)


export class MduiIFrameElement extends HTMLIFrameElement {
    static observedAttributes = ['src']
    constructor() {
        super()
        /**@type {OverlayElement} */
        this.$overlay = createEle(
            'my-overlay', undefined, undefined, undefined, undefined, [
                createEle('div', undefined, ['mdui-progress'], undefined, undefined, [
                    createEle('div', undefined, ['mdui-progress-indeterminate'])
                ])
            ]
        )
        this.$overlay.$target = this

        this.addEventListener('load', () => {
            this.$overlay.hide()
        })
    }
    attributeChangedCallback(name, oldV, newV) {
        if (oldV == null) return
        this.$overlay.show()
    }
}
customElements.define('my-mdui-iframe', MduiIFrameElement, {
    extends: 'iframe'
})


export class ActivatorElement extends HTMLDivElement {
    constructor() {
        super()
        this.activeClassName = this.getAttribute('active-class-name')
        this.itemsSelector = this.getAttribute('items-selector')
        this.activeItemsSelector = this.itemsSelector + '.' + this.activeClassName
        this.activateOnClick = this.hasAttribute('activate-on-click')
        this.singleActive = this.hasAttribute('single-active')

        if (this.activateOnClick) {
            for (const $item of this.$items) {
                $item.addEventListener('click', () => {
                    const active = $item.classList.contains(this.activeClassName)
                    if (active) {
                        $item.classList.remove(this.activeClassName)
                    } else {
                        if (this.singleActive) this.deactivateAll()
                        $item.classList.add(this.activeClassName)
                    }
                })
            }
        }
    }
    /**@returns {NodeListOf<HTMLElement>} */
    get $items() {
        return this.querySelectorAll(this.itemsSelector)
    }
    /**@returns {NodeListOf<HTMLElement>} */
    get $activeItems() {
        return this.querySelectorAll(this.activeItemsSelector)
    }
    activateAll() {
        for (const $item of this.$items) {
            $item.classList.add(this.activeClassName)
        }
    }
    deactivateAll() {
        for (const $item of this.$activeItems) {
            $item.classList.remove(this.activeClassName)
        }
    }
    /**
     * 
     * @param {number} count 
     */
    randomActive(count) {
        this.deactivateAll()
        const $randomItems = pickOutRandomItems([...this.$items], count)
        for (const $item of $randomItems) {
            $item.classList.add(this.activeClassName)
        }
    }
}
customElements.define('my-activator', ActivatorElement, {
    extends: 'div'
})


export class NavigatorElement extends HTMLElement {
    constructor() {
        super()
        /**@type {HTMLIFrameElement} */
        const $iframe = document.querySelector(this.getAttribute('iframe'))
        const itemsSelector = this.getAttribute('items-selector')
        const originalUrl = $iframe.getAttribute('src')
        const activeClassName = this.getAttribute('active-class-name')
        for (const $item of this.querySelectorAll(itemsSelector)) {
            $item.addEventListener('click', () => {
                const $curActiveItem = this.querySelector(`.${activeClassName}`)
                if ($curActiveItem) $curActiveItem.classList.remove(activeClassName)
                if ($curActiveItem == $item) {
                    $iframe.src = originalUrl
                } else {
                    const url = $item.getAttribute('url')
                    $item.classList.add(activeClassName)
                    $iframe.src = url
                }
            })
        }

    }
}
customElements.define('my-navigator', NavigatorElement)


export class IntInputElement extends HTMLInputElement {
    constructor() {
        super()
        this.onkeypress = ev => ev.key != '.'
    }
}
customElements.define('my-int-input', IntInputElement, {
    extends: 'input'
})


export class MduiPanelElement extends HTMLElement {
    /**
     * 
     * @param {...MduiPanelElementItemPattern} itemPatterns
     */
    setItems(...itemPatterns) {
        this.innerHTML = ''
        
        this.append(createEle(
            // panel
            'div', undefined, ['mdui-panel'], { 'mdui-panel': '' }, undefined, itemPatterns.map(pattern => {
                pattern.header.summaries = pattern.header.summaries || []
                pattern.body.items = pattern.body.items || []
                pattern.body.actions = pattern.body.actions || []
                return createEle(
                    // item root
                    'div', undefined, ['mdui-panel-item'], undefined, undefined, [
                        createEle(
                            // item header
                            'div', undefined, ['mdui-panel-item-header'], undefined, undefined, [
                                createEle(
                                    // header title
                                    'div', pattern.header.title, ['mdui-panel-item-title']
                                ),
                                ...pattern.header.summaries.map(text => createEle(
                                    // header summaries
                                    'div', text, ['mdui-panel-item-summary']
                                ))
                            ]
                        ),
                        createEle(
                            // item body
                            'div', undefined, ['mdui-panel-item-body'], undefined, undefined, [
                                ...pattern.body.items.map(text => createEle(
                                    // body items
                                    'p', text
                                )),
                                createEle(
                                    // actions div
                                    'div', undefined, ['mdui-panel-item-actions'], undefined, undefined, [
                                        ...pattern.body.actions.map(({ text, firesCloseEvent, onclick }) => createEle(
                                            // action buttons
                                            'button', text, ['mdui-btn', 'mdui-ripple'], firesCloseEvent ? { 'mdui-panel-item-close': '' } : undefined, $ele => $ele.onclick = onclick
                                        ))
                                    ]
                                )
                            ]
                        )
                    ]
                )
            })
        ))
        mdui.mutation()
    }
}
customElements.define('my-mdui-panel', MduiPanelElement)


/**
 * Pick out a specified number of random items at unique index from the array.
 * @template T
 * @param {T[]} items 
 * @param {number} count 
 */
export function pickOutRandomItems(items, count) {
    function pickOutUniqueIdx() {
        const idx = Math.floor(Math.random() * length)
        if (chosenIdxSet.has(idx)) {
            return pickOutUniqueIdx()
        } else {
            chosenIdxSet.add(idx)
            return idx
        }
    }
    const chosenIdxSet = new Set()
    const chosen = []
    const length = items.length
    if (count > length) count = length
    for (let i = 0; i < count; i++) {
        const idx = pickOutUniqueIdx()
        chosen.push(items[idx])
    }
    return chosen
}
