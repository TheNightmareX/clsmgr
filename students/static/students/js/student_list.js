/**
 * 
 * @typedef {{ id: number, target_id: number, target_value: string, remark: string, creation_time: string, last_modified: string, status: 'O' | 'C' | 'A', message: string }} EditRequestListItem
 * @typedef {import('../../../../static/js/components.js').MduiPanelElementItemPattern} MduiPanelElementItemPattern
 */

import {
    ActivatorElement,
    MduiPanelElement
} from "../../../../static/js/components.js"


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


{
    /**@type {HTMLDivElement} */
    const $submitEditRequestDialog = document.querySelector('#submit-edit-request-dialog')

    /**@type {MduiPanelElement} */
    const $panel = $submitEditRequestDialog.querySelector('my-mdui-panel')

    const $form = $submitEditRequestDialog.querySelector('form')

    $submitEditRequestDialog.addEventListener('open.mdui.dialog', async () => {
        /**@type {EditRequestListItem[]} */
        const requestList = await new Promise(resolve => {
            const request = new XMLHttpRequest()
            request.open('get', '/students/edit-requests/list')
            request.send()
            request.onload = () => resolve(JSON.parse(request.responseText))
        })

        /**@type {MduiPanelElementItemPattern[]} */
        const patterns = []

        for (const request of requestList) {
            /**@type {MduiPanelElementItemPattern} */
            const pattern = {
                header: {
                    title: `${request.id}#`,
                    summaries: [
                        `状态: ${{O: '待通过', C: '未通过', A: '已通过'}[request.status]}`,
                        `更新: ${request.last_modified}`,
                    ]
                },
                body: {
                    items: [
                        `创建: ${request.creation_time}`,
                        `目标ID: ${request.target_id}`,
                        `目标值: ${request.target_value}`,
                        `备注: ${request.remark}`,
                        `管理员留言: ${request.message || ''}`,
                    ]
                }
            }
            patterns.push(pattern)
        }
        $panel.setItems(...patterns)
    })

    $submitEditRequestDialog.addEventListener('confirm.mdui.dialog', async () => {
        const response = await new Promise((resolve, reject) => {
            const formData = new FormData($form)
            const request = new XMLHttpRequest()
            request.open('post', '/students/edit-requests/create')
            request.onload = () => {
                if (request.status == 404) reject()
                else resolve(request.responseText)
            }
            request.send(formData)
        })
    })
}