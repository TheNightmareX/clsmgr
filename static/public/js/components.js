/**There ought to be a `div.mdui-iframe-wrap` outside the element */
export class MduiIFrame extends HTMLIFrameElement {
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
customElements.define('mdui-iframe', MduiIFrame, { extends: 'iframe' })

export class MduiNavUList extends HTMLUListElement {
    constructor() {
        super()
        /**@type {HTMLIFrameElement} */
        this.$iframe = document.querySelector(this.getAttribute('iframe'))
        const originalUrl = this.$iframe.getAttribute('src')
        for (const $li of this.querySelectorAll('li[url]')) {
            $li.addEventListener('click', () => {
                let url = $li.getAttribute('url')
                const ACTIVE_CALSSNAME = 'mdui-list-item-active'
                const $curActive = this.querySelector('.mdui-list-item-active')
                if ($curActive) $curActive.classList.remove(ACTIVE_CALSSNAME)
                if ($curActive != $li) $li.classList.add(ACTIVE_CALSSNAME)
                else url = originalUrl
                this.$iframe.src = url
            })
        }
    }
}
customElements.define('mdui-nav-ulist', MduiNavUList, { extends: 'ul' })