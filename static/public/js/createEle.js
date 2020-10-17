/**
 * 
 * @typedef {Object} EleDescription
 * @property {string} tag
 * @property {string} [text=""]
 * @property {Object<string, string>} [attrs={}]
 * @property {($ele: HTMLElement) => void} [addition=$ele => {}]
 * @property {(EleDescription | HTMLElement)[]} [childEles=[]]
 */


/**
 *
 * @param {EleDescription} param0
 */
export function createEle({
    tag,
    text = "",
    attrs = {},
    addition: callback = $ele => { },
    childEles = []
}) {
    const $root = document.createElement(tag);
    $root.innerText = text;
    for (const attr in attrs) {
        $root.setAttribute(attr, attrs[attr]);
    }
    callback($root);

    for (const descOrEle of childEles) {
        const $child = descOrEle instanceof Element ? descOrEle : createEle(descOrEle);
        $root.append($child);
    }

    return $root;
}
