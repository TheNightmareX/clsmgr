import { createEle } from "./domutils.js"
import OverlayElement from "./my-overlay.js"


class MduiIFrameElement extends HTMLIFrameElement {
    static observedAttributes = ['src'];
    constructor() {
        super();
        /**@type {OverlayElement} */
        this.$overlay = createEle(
            'my-overlay', undefined, undefined, undefined, undefined, [
            createEle('div', undefined, ['mdui-progress'], undefined, undefined, [
                createEle('div', undefined, ['mdui-progress-indeterminate'])
            ])
        ]
        );
        this.$overlay.$target = this;

        this.addEventListener('load', () => {
            this.$overlay.hide();
        });
    }
    attributeChangedCallback(name, oldV, newV) {
        if (oldV == null)
            return;
        this.$overlay.show();
    }
}
customElements.define('my-mdui-iframe', MduiIFrameElement, { extends: 'iframe' })


export default MduiIFrameElement