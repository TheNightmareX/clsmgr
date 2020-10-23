class IntInputElement extends HTMLInputElement {
    constructor() {
        super()
        this.onkeypress = ev => ev.key != '.'
    }
}
customElements.define('my-int-input', IntInputElement, { extends: 'input' })


export default IntInputElement