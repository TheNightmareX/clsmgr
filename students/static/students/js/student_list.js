import { ActivatorElement } from "../../../../static/public/js/components.js"


/**@type {ActivatorElement} */
const $tableActivator = document.querySelector('#table-activator')

{
    /**@type {HTMLDivElement} */
    const $startSelectionDialog = document.querySelector('#start-selection-dialog')
    
    /**@type {HTMLInputElement} */
    const $countInput = $startSelectionDialog.querySelector('input')
    
    $startSelectionDialog.addEventListener('confirm.mdui.dialog', () => {
        const count = Number($countInput.value)
        $tableActivator.randomActive(count)
    })
}