/**
 * 
 * @typedef {{ header: { title: string, summaries?: string[] }, body: { items?: string[], actions?: { text: string, firesCloseEvent?: boolean, onclick?: (ev) => void }[] } }} MduiPanelElementItemPattern
 */


import { createEle } from "./domutils.js"


class MduiPanelElement extends HTMLElement {
    /**
     * 
     * @param {...MduiPanelElementItemPattern} itemPatterns
     */
    setItems(...itemPatterns) {
        this.innerHTML = ''
        
        this.append(createEle(
            // panel
            'div', undefined, ['mdui-panel'], { 'mdui-panel': '' }, undefined, itemPatterns.map(pattern => {
                pattern.header.summaries = pattern.header.summaries || []
                pattern.body.items = pattern.body.items || []
                pattern.body.actions = pattern.body.actions || []
                return createEle(
                    // item root
                    'div', undefined, ['mdui-panel-item'], undefined, undefined, [
                        createEle(
                            // item header
                            'div', undefined, ['mdui-panel-item-header'], undefined, undefined, [
                                createEle(
                                    // header title
                                    'div', pattern.header.title, ['mdui-panel-item-title']
                                ),
                                ...pattern.header.summaries.map(text => createEle(
                                    // header summaries
                                    'div', text, ['mdui-panel-item-summary']
                                ))
                            ]
                        ),
                        createEle(
                            // item body
                            'div', undefined, ['mdui-panel-item-body'], undefined, undefined, [
                                ...pattern.body.items.map(text => createEle(
                                    // body items
                                    'p', text
                                )),
                                createEle(
                                    // actions div
                                    'div', undefined, ['mdui-panel-item-actions'], undefined, undefined, [
                                        ...pattern.body.actions.map(({ text, firesCloseEvent, onclick }) => createEle(
                                            // action buttons
                                            'button', text, ['mdui-btn', 'mdui-ripple'], firesCloseEvent ? { 'mdui-panel-item-close': '' } : undefined, $ele => $ele.onclick = onclick
                                        ))
                                    ]
                                )
                            ]
                        )
                    ]
                )
            })
        ))
        mdui.mutation()
    }
}
customElements.define('my-mdui-panel', MduiPanelElement)


export default MduiPanelElement