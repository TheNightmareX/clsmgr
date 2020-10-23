/**
 * Pick out a specified number of random items at unique index from the array.
 * @template T
 * @param {T[]} items 
 * @param {number} count 
 */
function pickOutRandomItems(items, count) {
    function pickOutUniqueIdx() {
        const idx = Math.floor(Math.random() * length)
        if (chosenIdxSet.has(idx)) {
            return pickOutUniqueIdx()
        } else {
            chosenIdxSet.add(idx)
            return idx
        }
    }
    const chosenIdxSet = new Set()
    const chosen = []
    const length = items.length
    if (count > length) count = length
    for (let i = 0; i < count; i++) {
        const idx = pickOutUniqueIdx()
        chosen.push(items[idx])
    }
    return chosen
}


class ActivatorElement extends HTMLDivElement {
    constructor() {
        super();
        this.activeClassName = this.getAttribute('active-class-name');
        this.itemsSelector = this.getAttribute('items-selector');
        this.activeItemsSelector = this.itemsSelector + '.' + this.activeClassName;
        this.activateOnClick = this.hasAttribute('activate-on-click');
        this.singleActive = this.hasAttribute('single-active');

        if (this.activateOnClick) {
            for (const $item of this.$items) {
                $item.addEventListener('click', () => {
                    const active = $item.classList.contains(this.activeClassName);
                    if (active) {
                        $item.classList.remove(this.activeClassName);
                    } else {
                        if (this.singleActive)
                            this.deactivateAll();
                        $item.classList.add(this.activeClassName);
                    }
                });
            }
        }
    }
    /**@returns {NodeListOf<HTMLElement>} */
    get $items() {
        return this.querySelectorAll(this.itemsSelector);
    }
    /**@returns {NodeListOf<HTMLElement>} */
    get $activeItems() {
        return this.querySelectorAll(this.activeItemsSelector);
    }
    activateAll() {
        for (const $item of this.$items) {
            $item.classList.add(this.activeClassName);
        }
    }
    deactivateAll() {
        for (const $item of this.$activeItems) {
            $item.classList.remove(this.activeClassName);
        }
    }
    /**
     *
     * @param {number} count
     */
    randomActive(count) {
        this.deactivateAll();
        const $randomItems = pickOutRandomItems([...this.$items], count);
        for (const $item of $randomItems) {
            $item.classList.add(this.activeClassName);
        }
    }
}
customElements.define('my-activator', ActivatorElement, { extends: 'div' })


export default ActivatorElement