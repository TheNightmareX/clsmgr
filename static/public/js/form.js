export class ObjPropertyPointer {
    /**
     * 
     * @param {any} obj 
     * @param {...string} path 
     */
    constructor(obj, ...path) {
        this.obj = obj
        this.path = path
    }
    get value() {
        /**
         * 
         * @param {any} obj 
         * @param {...string} path 
         */
        function getValue(obj, ...path) {
            if (path.length > 1) return getValue(obj[path[0]], ...path.slice(1, path.length))
            else return obj[path[0]]
        }
        return getValue(this.obj, this.path)
    }
}


/**
 * 
 * @param {ObjPropertyPointer | any} pointerOrValue 
 */
function parseValue(pointerOrValue) {
    return pointerOrValue instanceof ObjPropertyPointer ? pointerOrValue.value : pointerOrValue
}

/**
 * 
 * @param {HTMLInputElement} $input 
 * @param {{ int: boolean | ObjPropertyPointer, min: number | ObjPropertyPointer, max: number | ObjPropertyPointer, default: number }} rules
 */
export function setupNumberInput($input, rules) {
    if (parseValue(rules.default) != undefined) $input.value = parseValue(rules.default)
    if (parseValue(rules.int)) $input.addEventListener('change', () => {
        if ($input.value.includes('.')) $input.value = parseInt(value)
    })
    if (parseValue(rules.max) != undefined) $input.addEventListener('change', () => {
        if ($input.value != '' && Number($input.value) > parseValue(rules.max)) $input.value = parseValue(rules.max)
    })
    if (parseValue(rules.min) != undefined) $input.addEventListener('change', () => {
        if ($input.value != '' && Number($input.value) < parseValue(rules.min)) $input.value = parseValue(rules.min)
    })
}