/**
 * 
 * @typedef {{ header: { title: string, summaries?: string[] }, body: { items?: string[], actions?: { text: string, firesCloseEvent?: boolean, onclick?: (ev) => void }[] } }} MduiPanelElementItemPattern
 * @typedef {import('./createEle.js').EleDescription} EleDescription
 */

import { createEle } from "./createEle.js"


/**There ought to be a `div.mdui-iframe-wrap` outside the element */
export class MduiIFrameElement extends HTMLIFrameElement {
    static get observedAttributes() {
        return ['src']
    }
    constructor() {
        super()

        this.addEventListener('load', () => this._hideOverlay())

        this.$overlay = createEle({
            tag: 'div',
            attrs: {
                'class': 'mdui-iframe-overlay',
                'hidden': ''
            },
            addition: $ele => $ele.ontransitionend = () => this.$overlay.hidden = true,
            childEles: [
                {
                    tag: 'div',
                    attrs: {
                        'class': 'mdui-progress'
                    },
                    childEles: [
                        {
                            tag: 'div',
                            attrs: {
                                'class': 'mdui-progress-indeterminate'
                            },
                        }
                    ]
                }
            ]
        })
    }
    connectedCallback() {
        this.after(this.$overlay)
    }
    attributeChangedCallback(name, oldV, newV) {
        if (oldV == null) return
        this._showOverlay()
    }
    _showOverlay() {
        this.$overlay.classList.remove('hidden')
        this.$overlay.hidden = false
    }
    _hideOverlay() {
        this.$overlay.classList.add('hidden')
    }
}
customElements.define('mdui-iframe', MduiIFrameElement, {
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
customElements.define('activator-div', ActivatorElement, {
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
customElements.define('navigator-ele', NavigatorElement)


export class IntInputElement extends HTMLInputElement {
    constructor() {
        super()
        this.onkeypress = ev => ev.key != '.'
    }
}
customElements.define('int-input', IntInputElement, {
    extends: 'input'
})


export class MduiPanelElement extends HTMLElement {
    /**
     * 
     * @param {...MduiPanelElementItemPattern} itemPatterns
     */
    setItems(...itemPatterns) {
        this.innerHTML = ''
        

        this.append(createEle({
            tag: 'div',
            attrs: {
                'class': 'mdui-panel',
                'mdui-panel': ''
            },
            childEles: itemPatterns.map(pattern => {
                pattern.header.summaries = pattern.header.summaries || []
                pattern.body.items = pattern.body.items || []
                pattern.body.actions = pattern.body.actions || []
                return createEle({
                    // item root
                    tag: 'div',
                    attrs: {
                        'class': 'mdui-panel-item'
                    },
                    childEles: [
                        {
                            // header
                            tag: 'div',
                            attrs: {
                                'class': 'mdui-panel-item-header'
                            },
                            childEles: [
                                {
                                    // header title
                                    tag: 'div',
                                    text: pattern.header.title,
                                    attrs: {
                                        'class': 'mdui-panel-item-title',
                                    }
                                },
                                ...pattern.header.summaries.map(text => createEle({
                                    // header summaries
                                    tag: 'div',
                                    text,
                                    attrs: {
                                        'class': 'mdui-panel-item-summary'
                                    }
                                }))
                            ]
                        },
                        {
                            // body
                            tag: 'div',
                            attrs: {
                                'class': 'mdui-panel-item-body'
                            },
                            childEles: [
                                ...pattern.body.items.map(text => createEle({
                                    // body items
                                    tag: 'p',
                                    text
                                })),
                                {
                                    // actions div
                                    tag: 'div',
                                    attrs: {
                                        'class': 'mdui-panel-item-actions'
                                    },
                                    childEles: pattern.body.actions.forEach(({ text, firesCloseEvent, onclick }) => {
                                        const attrs = {
                                            'class': 'mdui-btn mdui-ripple',
                                        }
                                        if (firesCloseEvent) attrs['mdui-panel-item-close'] = ''
        
                                        createEle({
                                            // action button
                                            tag: 'button',
                                            attrs,
                                            addition: $ele => $ele.onclick = onclick
                                        })
                                    })
                                }
                            ]
                        }
                    ]
                })
            })
        }))
        mdui.mutation()
    }
}
customElements.define('mdui-panel', MduiPanelElement)


/**
 * Pick out a specified number of random items at unique index from the array.
 * @template T
 * @param {T[]} items 
 * @param {number} count 
 */
function pickOutRandomItems(items, count) {
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
