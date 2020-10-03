/**
 * 
 * @typedef {{students: databaseData_students}} databaseData
 */
/**
 * 
 * @typedef {Object<number, string>} databaseData_students
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
        this.data = Database.localStorageProxy[this.id] || {
            students: {},
        }

        window.addEventListener('unload', () => {
            if (window.DONOTSAVE) return
            if (window.RESET) this.data = null
            Database.localStorageProxy[this.id] = this.data
        })
    }
}


const database = new Database()
window.data = database.data