import { ActivatorElement } from "../../../../static/public/js/components.js"
import { setupNumberInput } from "../../../../static/public/js/form.js"

/**@type {HTMLInputElement} */
const $countInput = document.querySelector('#count-input')
/**@type {ActivatorElement} */
const $tableActivator = document.querySelector('#table-activator')
setupNumberInput($countInput, { int: true, min: 0 })
document.querySelector('#start-btn').addEventListener('click', () => {
    const count = Number($countInput.value)
    $tableActivator.randomActive(count)
})