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