class NavigatorElement extends HTMLElement {
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


export default NavigatorElement