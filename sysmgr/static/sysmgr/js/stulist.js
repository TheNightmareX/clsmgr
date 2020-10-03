/**
 * 
 * @typedef {import('../../../../index/static/index/js/main.js').databaseData_students} students
 */
/**
 * 
 * @typedef {import('../../../../index/static/index/js/main.js').databaseData} databaseData
 */


import * as components from "../../../../static/public/js/components.js";


/**
 * 
 * @param {components.DataTable} $table 
 * @param {students} stuMap 
 */
function setTableData($table, stuMap) {
    const tableData = []
    for (const id in stuMap) {
        const record = { 学号: id, 姓名: stuMap[id] }
        tableData.push(record)
    }
    $table.setData(tableData)
}

/**
 * 
 * @param {HTMLInputElement} $input 
 */
function setupNumberInputEle($input) {
    $input.addEventListener('change', () => {
        const value = $input.value
        const numV = Number(value)

        if (numV < 1) $input.value = 1
        else if (value.includes('.')) $input.value = parseInt(value)
    })
}

/**
 * 
 * @param {HTMLInputElement} $idInput 
 * @param {HTMLInputElement} $nameInput 
 * @param {HTMLButtonElement} $button 
 * @param {components.DataTable} $table 
 * @param {students} students
 */
function setupAddStuEles($idInput, $nameInput, $button, $table, students) {
    setupNumberInputEle($idInput)
    $button.addEventListener('click', () => {
        if ($idInput.value == '' || $nameInput.value == '') return
        const id = Number($idInput.value)
        const name = $nameInput.value
        students[id] = name
        setTableData($table, students)
    })
}

/**
 * 
 * @param {HTMLInputElement} $idInput 
 * @param {HTMLButtonElement} $button 
 * @param {components.DataTable} $table 
 * @param {students} students
 */
function setupDelStuEles($idInput, $button, $table, students) {
    setupNumberInputEle($idInput)
    $button.addEventListener('click', () => {
        if ($idInput.value == '') return
        const id = Number($idInput.value)
        delete students[id]
        setTableData($table, students)
    })
}


/**@type {databaseData} */
const data = window.parent.data
/**@type {students} */
const students = data.students
/**@type {components.DataTable} */
const $table = document.querySelector('table')
setTableData($table, students)
setupAddStuEles(
    document.querySelector('input.add[type="number"]'), 
    document.querySelector('input.add[type="text"]'), 
    document.querySelector('button.add'),
    $table,
    students
)
setupDelStuEles(
    document.querySelector('input.del[type="number"]'), 
    document.querySelector('button.del'),
    $table,
    students
)