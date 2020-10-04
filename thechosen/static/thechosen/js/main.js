/**
 * 
 * @typedef {import('../../../../index/static/index/js/main.js').databaseData} databaseData
 */
/**
 * 
 * @typedef {import('../../../../index/static/index/js/main.js').databaseData_students} students
 */


import * as components from "../../../../static/public/js/components.js"
import { ObjPropertyPointer, setupNumberInput } from "../../../../static/public/js/form.js"


/**
 * 
 * @param {components.MduiCheckboxListGroup} $listGroup 
 * @param {students} students - All the students.
 * @param {Set<string>} checked - A set of students' id which will be set to checked. Don't specify to set all to checked.
 */
function setListGroupData($listGroup, students, checked=null) {
    const items = {}
    for (const id in students) {
        items[`${id}# ${students[id]}`] = checked ? checked.has(id) : true
    }
    $listGroup.items = items
}

/**
 * 
 * @param {components.MduiCheckboxListGroup} $listGroup 
 */
function getCheckedStudents($listGroup) {
    /**@type {Set<string>} */
    const idSet = new Set()
    const items = $listGroup.items
    for (const text in items) {
        const checked = items[text]
        if (!checked) continue
        const id = /^\d+(?=#)/.exec(text)[0]
        idSet.add(id)
    }
    return idSet
}

/**
 * 
 * @param {Set<string>} idSet - A set of id of students which are waiting for choosing.
 * @param {number} count 
 */
function chooseStudents(idSet, count) {
    /**
     * 
     * @returns {string}
     */
    function choose() {
        const idx = Math.floor(Math.random() * availableCount)
        const id = [...idSet.values()][idx]
        if (chosenIdSet.has(id)) return choose()
        else return id
    }
    const availableCount = idSet.size
    if (count > availableCount) count = availableCount
    /**@type {Set<string>} */
    const chosenIdSet = new Set()
    for (let i=0; i++, i<=count;) {
        const id = choose()
        chosenIdSet.add(id)
    }
    return chosenIdSet
}


/**@type {databaseData} */
const data = window.parent.data
/**@type {components.MduiCheckboxListGroup} */
const $listGroup = document.querySelector('#list-group')
/**@type {HTMLInputElement} */
const $countInput = document.querySelector('#count-input')

setListGroupData($listGroup, data.students)
setupNumberInput($countInput, { int: true, min: 1, max: $listGroup.length })
document.querySelector('#choose-btn').addEventListener('click', () => {
    const count = Number($countInput.value)
    if (!count) return
    const availableStudentsSet = getCheckedStudents($listGroup)
    const chosenIdSet = chooseStudents(availableStudentsSet, count)
    setListGroupData($listGroup, data.students, chosenIdSet)
})
document.querySelector('#reset-btn').addEventListener('click', () => {
    setListGroupData($listGroup, data.students)
})