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
customElements.define('mdui-iframe', MduiIFrameElement, { extends: 'iframe' })

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