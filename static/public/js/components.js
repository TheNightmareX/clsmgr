/**
 * 
 * @typedef {{ header: { title: string, summaries?: string[] }, body: { items: string | MduiPanelElementItemPattern[], actions: { text: string, firesCloseEvent?: boolean, onclick?: (ev) => void }[] } }} MduiPanelElementItemPattern
 */


/**There ought to be a `div.mdui-iframe-wrap` outside the element */
export class MduiIFrameElement extends HTMLIFrameElement {
    static get observedAttributes() {
        return ['src']
    }
    constructor() {
        super()

        this.addEventListener('load', () => this._hideOverlay())

        this.$overlay = document.createElement('div')
        this.$overlay.ontransitionend = () => this.$overlay.hidden = true
        this.$overlay.classList.add('mdui-iframe-overlay')
        this.$overlay.hidden = true
        this.$overlay.innerHTML = '<div class="mdui-progress"><div class="mdui-progress-indeterminate"></div></div>'
        this.$overlay = this.$overlay
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
        const $panel = document.createElement('div')
        $panel.classList.add('mdui-panel')
        $panel.setAttribute('mdui-panel', '')

        for (const pattern of itemPatterns) {
            const $item = document.createElement('div')
            $item.classList.add('mdui-panel-item')

            const $header = document.createElement('div')
            $header.classList.add('mdui-panel-item-header')

            const $body = document.createElement('div')
            $body.classList.add('mdui-panel-item-body')

            const $title = document.createElement('div')
            $title.classList.add('mdui-panel-item-title')
            $title.innerText = pattern.header.title

            const $summaries = []
            for (const summary of pattern.header.summaries || []) {
                const $summary = document.createElement('div')
                $summary.classList.add('mdui-panel-item-summary')
                $summary.innerText = summary
                $summaries.push($summary)
            }

            const $bodyItems = []
            for (const item of pattern.body.items) {
                const $item = document.createElement('p')
                $item.innerText = item
                $bodyItems.push($item)
            }

            const $actionsDiv = document.createElement('div')
            $actionsDiv.classList.add('mdui-panel-item-actions')

            const $buttons = []
            for (const action of pattern.body.actions || []) {
                const $button = document.createElement('button')
                $button.classList.add('mdui-btn', 'mdui-ripple')
                if (action.firesCloseEvent) $button.setAttribute('mdui-panel-item-close', '')
                $button.innerText = action.text
                $button.onclick = action.onclick
                $buttons.push($button)
            }

            $actionsDiv.append(...$buttons)
            $header.append($title, ...$summaries)
            $body.append(...$bodyItems, $actionsDiv)
            $item.append($header, $body)
            $panel.append($item)
        }
        this.append($panel)
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