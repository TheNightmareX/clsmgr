/**There ought to be a `div.mdui-iframe-wrap` outside the element */
export class MduiIFrame extends HTMLIFrameElement {
    static get observedAttributes() {
        return ['src']
    }
    constructor() {
        super()

        this.addEventListener('load', () => this._hideOverlay())

        this.$overlay = document.createElement('div')
        this.$overlay.ontransitionend = () => this.$overlay.hidden = true
        this.$overlay.classList.add('mdui-iframe-overlay')
        this.$overlay.hidden = true
        this.$overlay.innerHTML = '<div class="mdui-progress"><div class="mdui-progress-indeterminate"></div></div>'
        this.$overlay = this.$overlay
    }
    connectedCallback() {
        this.after(this.$overlay)
    }
    attributeChangedCallback(name, oldV, newV) {
        if (oldV == null) return
        this._showOverlay()
    }
    _showOverlay() {
        this.$overlay.classList.remove('hidden')
        this.$overlay.hidden = false
    }
    _hideOverlay() {
        this.$overlay.classList.add('hidden')
    }
}
customElements.define('mdui-iframe', MduiIFrame, { extends: 'iframe' })

export class MduiNavUList extends HTMLUListElement {
    constructor() {
        super()
        /**@type {HTMLIFrameElement} */
        this.$iframe = document.querySelector(this.getAttribute('iframe'))
        const originalUrl = this.$iframe.getAttribute('src')
        for (const $li of this.querySelectorAll('li[url]')) {
            $li.addEventListener('click', () => {
                let url = $li.getAttribute('url')
                const ACTIVE_CALSSNAME = 'mdui-list-item-active'
                const $curActive = this.querySelector('.mdui-list-item-active')
                if ($curActive) $curActive.classList.remove(ACTIVE_CALSSNAME)
                if ($curActive != $li) $li.classList.add(ACTIVE_CALSSNAME)
                else url = originalUrl
                this.$iframe.src = url
            })
        }
    }
}
customElements.define('mdui-nav-ulist', MduiNavUList, { extends: 'ul' })

export class DataTable extends HTMLTableElement {
    constructor() {
        super()
        this.$thead = this.firstElementChild
        this.$tbody = this.lastElementChild
    }
    clear() {
        this.$thead.innerHTML = ''
        this.$tbody.innerHTML = ''
    }
    /**@param {Object<string, any>[]} dataset */
    setData(dataset) {
        this.clear()
        if (!dataset.length) return
        const fileds = Object.keys(dataset[0])
        /**@type {HTMLTableRowElement} */
        const $headerRow = document.createElement('tr')
        for (const filed of fileds) {
            const $th = document.createElement('th')
            $th.innerText = filed
            $headerRow.append($th)
        }
        this.$thead.append($headerRow)
        for (const record of dataset) {
            const $tr = document.createElement('tr')
            for (const filed of fileds) {
                const $td = document.createElement('td')
                $td.innerText = record[filed]
                $tr.append($td)
            }
            this.$tbody.append($tr)
        }
    }
}
customElements.define('data-table', DataTable, { extends: 'table' })

/**The element should have a classname `mdui-list` */
export class MduiCheckboxList extends HTMLDivElement {
    clear() {
        this.innerHTML = ''
    }
    get items() {
        /**@type {Object<string, boolean>} */
        const items = {}
        for (const $item of this.children) {
            /**@type {HTMLLabelElement} */
            const $label = $item
            const checked = $label.querySelector('input').checked
            const text = $label.lastElementChild.innerText
            items[text] = checked
        }
        return items
    }
    set items(items) {
        this.clear()
        for (const text in items) {
            const checked = items[text]

            const $item = document.createElement('label')
            $item.classList.add('mdui-list-item', 'mdui-ripple')

            const $checkboxDiv = document.createElement('div')
            $checkboxDiv.classList.add('mdui-checkbox')

            const $checkbox = document.createElement('input')
            $checkbox.type = 'checkbox'
            $checkbox.checked = checked

            const $checkboxIcon = document.createElement('i')
            $checkboxIcon.classList.add('mdui-checkbox-icon')

            const $content = document.createElement('div')
            $content.innerText = text

            $checkboxDiv.append($checkbox, $checkboxIcon)
            $item.append($checkboxDiv, $content)
            this.append($item)
        }
    }
    get length() {
        return this.children.length
    }
}
customElements.define('mdui-checkbox-list', MduiCheckboxList, { extends: 'div' })

/**There should be only muiltiple `<div is="mdui-checkbox-ulist">` inside the element without other elements. */
export class MduiCheckboxListGroup extends HTMLDivElement {
    constructor() {
        super()
        /**@type {HTMLCollectionOf<MduiCheckboxList>} */
        this.$lists = this.children
    }
    /**
     * 
     * @param {($list: MduiCheckboxList) => void} callback 
     */
    _forEach(callback) {
        for (const $list of this.$lists) {
            callback($list)
        }
    }
    clear() {
        this._forEach($list => $list.clear())
    }
    get items() {
        /**@type {Object<string, boolean>} */
        const items = {}
        this._forEach($list => Object.assign(items, $list.items))
        return items
    }
    set items(items) {
        this.clear()
        let managed = 0
        const keys = Object.keys(items)
        const quota = Math.ceil(keys.length / this.$lists.length)
        this._forEach($list => {
            const subItems = {}
            for (const key of keys.slice(managed, managed + quota)) {
                subItems[key] = items[key]
            }
            managed += quota
            $list.items = subItems
        })
    }
    get length() {
        return this.querySelectorAll('input').length
    }
}
customElements.define('mdui-checkbox-list-group', MduiCheckboxListGroup, { extends: 'div' })