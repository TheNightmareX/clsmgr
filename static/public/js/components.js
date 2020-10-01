export class MduiIFrame extends HTMLElement {
    static get observedAttributes() {
        return ['src']
    }
    constructor() {
        super()

        const $iframe = document.createElement('iframe')
        $iframe.onload = () => this._hideOverlay()
        this.$iframe = $iframe

        const $overlay = document.createElement('div')
        $overlay.ontransitionend = () => $overlay.hidden = true
        $overlay.hidden = true
        $overlay.innerHTML = '<div class="mdui-progress"><div class="mdui-progress-indeterminate"></div></div>'
        this.$overlay = $overlay
    }
    connectedCallback() {
        this.append(this.$iframe, this.$overlay)
    }
    attributeChangedCallback(name, oldV, newV) {
        if (oldV == null) return
        this.$iframe.setAttribute('src', newV)
        this._showOverlay()
    }
    set src(src) {
        this.setAttribute('src', src)
    }
    get src() {
        return this.getAttribute('src')
    }
    _showOverlay() {
        this.$overlay.className = ''
        this.$overlay.hidden = false
    }
    _hideOverlay() {
        this.$overlay.className = 'hidden'
    }
}
customElements.define('mdui-iframe', MduiIFrame)

export class MduiNavUList extends HTMLUListElement {
    constructor() {
        super()
        const $iframe = document.querySelector(this.getAttribute('iframe'))
        const originalUrl = $iframe.src
        for (const $li of this.children) {
            $li.classList.add('mdui-list-item', 'mdui-ripple')
            $li.addEventListener('click', () => {
                let url = $li.getAttribute('url')
                const ACTIVE_CALSSNAME = 'mdui-list-item-active'
                const $curActive = this.querySelector('.mdui-list-item-active')
                if ($curActive) $curActive.classList.remove(ACTIVE_CALSSNAME)
                if ($curActive != $li) $li.classList.add(ACTIVE_CALSSNAME)
                else url = originalUrl
                $iframe.src = url
            })
        }
    }
}
customElements.define('mdui-nav-ulist', MduiNavUList, { extends: 'ul' })