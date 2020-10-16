import { ActivatorElement } from "../../../../static/public/js/components.js"
import { setupNumberInput } from "../../../../static/public/js/form.js"


/**@type {HTMLDivElement} */
const $thechosenDialog = document.querySelector('#start-selection-dialog')
/**@type {HTMLInputElement} */
const $countInput = $thechosenDialog.querySelector('input')
/**@type {ActivatorElement} */
const $tableActivator = document.querySelector('#table-activator')

setupNumberInput($countInput, { int: true, min: 0 })

$thechosenDialog.addEventListener('confirm.mdui.dialog', () => {
    const count = Number($countInput.value)
    $tableActivator.randomActive(count)
})