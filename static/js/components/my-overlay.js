/**A dynamic element which can always cover the target element. */
class OverlayElement extends HTMLElement {
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


export default OverlayElement