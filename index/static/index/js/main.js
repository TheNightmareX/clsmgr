/**
 * 
 * @typedef {{stulist: Object<number, string>}} databaseData
 */


import * as components from "../../../../static/public/js/components.js"
import { mdui } from "../../../../static/public/js/libdeclare.js";


class Database {
    static localStorageProxy = new Proxy(localStorage, {
        get: (target, p) => p in target ? JSON.parse(target[p]) : undefined,
        set: (target, p, v) => target[p] = JSON.stringify(v)
    })
    static inUse = new Set()
    /**
     * 
     * @param {string} id - Default `cur`.
     */
    constructor(id="cur") {
        if (Database.inUse.has(id)) throw new Error()
        else Database.inUse.add(id)

        this.id = id
        /**@type {databaseData} */
        this.data = Database.localStorageProxy[id] || {
            stulist: {},
        }

        window.addEventListener('unload', () => {
            if (window.DONOTSAVE) return
            if (window.RESET) this.data = null
            Database.localStorageProxy[id] = this.data
        })
    }
}


const database = new Database()
const $iframe = document.querySelector('iframe')

window.addEventListener('message', ev => {
    const data = ev.data
    if (data == null) {
        $iframe.contentWindow.postMessage(database.data)
    } else {
        database.data = data
        mdui.snackbar({ message: '数据变动已保存', position: 'right-top', timeout: 200 })
    }
})