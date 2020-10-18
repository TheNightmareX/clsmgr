/**
 * 
 * @param {string} tagName 
 * @param {string} [text]
 * @param {string[]} [classList]
 * @param {Object<string, string>} [attributes]
 * @param {($ele) => void} [addition]
 * @param {HTMLElement[]} [children]
 */
function createEle(tagName, text='', classList=[], attributes={}, addition=() => {}, children=[]) {
    const $root = document.createElement(tagName)
    $root.innerText = text
    $root.classList.add(...classList)
    for (const attr in attributes) {
        $root.setAttribute(attr, attributes[attr]);
    }
    $root.append(...children)
    addition($root)
    return $root
}

export default createEle