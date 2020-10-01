class Base extends HTMLElement {
    constructor() {
        super()
        this.setAttribute('notready', '')
    }
    init () {
        this.removeAttribute('notready')
    }
}

export class MduiIFrame extends Base {
    constructor() {
        super()

        const $iframe = document.createElement('iframe')
        $iframe.onload = () => this._hideOverlay()
        $iframe.src = this.getAttribute('src')
        this.$iframe = $iframe
        const $overlay = document.createElement('div')
        $overlay.ontransitionend = () => $overlay.hidden = true
        $overlay.hidden = true
        $overlay.innerHTML = '<div class="mdui-progress"><div class="mdui-progress-indeterminate"></div></div>'
        this.$overlay = $overlay
    }
    init() {
        this.append(this.$iframe, this.$overlay)
        super.init()
    }
    set src(src) {
        this.setAttribute('src', src)
        this.$iframe.setAttribute('src', src)
        this._showOverlay()
    }
    get src() {
        return this.$iframe.src
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


export function initAll() {
    for (const $ele of document.querySelectorAll('[notready]')) {
        $ele.init()
    }
}
initAll()