/**
 * 
 * @param {string} tagName 
 * @param {string} [text]
 * @param {string[]} [classList]
 * @param {Object<string, string>} [attributes]
 * @param {($ele) => void} [addition]
 * @param {HTMLElement[]} [children]
 */
export function createEle(tagName, text='', classList=[], attributes={}, addition=() => {}, children=[]) {
    const customEleTagName = /(.*) (.*)/.exec(tagName)
    const $root = customEleTagName ? document.createElement(customEleTagName[1], { is: customEleTagName[2] }) : document.createElement(tagName)
    $root.innerText = text
    $root.classList.add(...classList)
    if (customEleTagName) attributes['is'] = customEleTagName[2]
    for (const attr in attributes) {
        $root.setAttribute(attr, attributes[attr]);
    }
    $root.append(...children)
    addition($root)
    return $root
}


/**
 *
 * @param {HTMLElement} $ele
 * @param {keyof HTMLElementEventMap} type
 * @param {(this: HTMLElement, ev: EventListenerOrEventListenerObject) => any} listener
 */
export function addEventListenerOnce($ele, type, listener) {
    const finalListener = () => {
        listener();
        $ele.removeEventListener(type, finalListener);
    };
    $ele.addEventListener(type, finalListener);
}
