/**
 * 
 * @typedef {Object<number, string>} stuMap
 */
/**
 * 
 * @typedef {import('../../../../index/static/index/js/main.js').databaseData} databaseData
 */


import * as components from "../../../../static/public/js/components.js";


/**
 * 
 * @param {components.DataTable} $table 
 * @param {stuMap} stuMap 
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
 * @param {stuMap} stuMap
 */
function setupAddStuEles($idInput, $nameInput, $button, $table, stuMap) {
    setupNumberInputEle($idInput)
    $button.addEventListener('click', () => {
        if ($idInput.value == '' || $nameInput.value == '') return
        const id = Number($idInput.value)
        const name = $nameInput.value
        stuMap[id] = name
        setTableData($table, stuMap)
    })
}

/**
 * 
 * @param {HTMLInputElement} $idInput 
 * @param {HTMLButtonElement} $button 
 * @param {components.DataTable} $table 
 * @param {stuMap} stuMap
 */
function setupDelStuEles($idInput, $button, $table, stuMap) {
    setupNumberInputEle($idInput)
    $button.addEventListener('click', () => {
        if ($idInput.value == '') return
        const id = Number($idInput.value)
        delete stuMap[id]
        setTableData($table, stuMap)
    })
}


window.parent.postMessage(null)
window.addEventListener('message', ev => {
    /**@type {databaseData} */
    const data = ev.data
    /**@type {stuMap} */
    const stuMap = data.stulist
    /**@type {components.DataTable} */
    const $table = document.querySelector('table')
    setTableData($table, stuMap)
    setupAddStuEles(
        document.querySelector('input.add[type="number"]'), 
        document.querySelector('input.add[type="text"]'), 
        document.querySelector('button.add'),
        $table,
        stuMap
    )
    setupDelStuEles(
        document.querySelector('input.del[type="number"]'), 
        document.querySelector('button.del'),
        $table,
        stuMap
    )
    window.addEventListener('unload', () => {
        window.parent.postMessage(data)
    })
})