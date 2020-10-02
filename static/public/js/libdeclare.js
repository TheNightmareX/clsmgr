/**https://www.mdui.org/docs/ */
export const mdui = {
    /**
     * Snackbar 会在窗口下方出现一个小的弹出框，它们可以在超时或用户触摸屏幕其他地方后自动消失。
     * 屏幕上最多只能同时显示一个 Snackbar，如果在 Snackbar 还未关闭时就打开下一个 Snackbar，则下一个 Snackbar 会被加入队列，等当前 Snackbar 关闭后再打开。
     * @type {((message: string, params: mdui_snackbar_params) => mdui_snackbar_instance) | ((params: mdui_snackbar_params) => mdui_snackbar_instance)}
     */
    snackbar: window.mdui.snackbar,
    /**
     * Tooltip 一般用来为图标添加说明，它的内容一般是纯文本，不含图片和格式化的文本。
     * open.mdui.tooltip: 打开动画开始时，事件被触发。
     * opened.mdui.tooltip: 打开动画结束时，事件被触发。
     * close.mdui.tooltip: 关闭动画开始时，事件被触发。
     * closed.mdui.tooltip: 关闭动画结束时，事件被触发。
     * event._detail.inst: 实例。
     */
    Tooltip: class extends window.mdui.Tooltip {
        /**
         * 
         * @param {HTMLElement | string} selector 
         * @param {mdui_Tooltip_options} options 
         */
        constructor(selector, options) { super(selector, options) }
        /**
         * 打开 Tooltip。允许传入配置参数，以便每次打开时能修改内容。配置参数见上方的参数列表。
         * @param {mdui_Tooltip_options} options
         * @example
         * open({ content: 'new content' })
         */
        open(options=undefined) { return super.open(options) }
        /**
         * 关闭 Tooltip。
         */
        close()	{ return super.close() }
        /**
         * 切换 Tooltip 的状态。
         */
        toggle() { return super.toggle() }
        /**
         * 返回 Tooltip 的状态。
         * @returns {'opening' | 'opened' | 'closing' | 'closed'}
         */
        getState() { return super.getState() }
    }
}
/**
 * 
 * @typedef mdui_snackbar_params
 * @property {string} [message] - `Snackbar` 的文本。通过 mdui.snackbar(params) 调用时，该参数不能为空。
 * @property {int} [timeout=4000] - 在用户没有操作时多长时间自动隐藏，单位（毫秒）。为 0 时表示不自动关闭。
 * @property {'bottom' | 'top' | 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom'} [position="bottom"] - `Snackbar` 的位置。
 * @property {string} [buttonText] - 按钮的文本。
 * @property {string} [buttonColor='#90CAF9'] - 按钮的文本颜色，可以是颜色名或颜色值，如 red、#ffffff、rgba(255, 255, 255, 0.3) 等。
 * @property {boolean} [closeOnButtonClick=true] - 点击按钮时是否关闭 `Snackbar`。
 * @property {boolean} [closeOnOutsideClick=true] - 点击或触摸 `Snackbar` 以外的区域时是否关闭 `Snackbar`。
 * @property {function} [onClick] - 在 `Snackbar` 上点击的回调函数。
 * @property {function} [onButtonClick] - 点击 `Snackbar` 上的按钮时的回调函数。
 * @property {function} [onOpen] - `Snackbar` 开始打开时的回调函数。
 * @property {function} [onOpened] - `Snackbar` 打开后的回调函数。
 * @property {function} [onClose] - `Snackbar` 开始关闭时的回调函数。
 * @property {function} [onClosed] - `Snackbar` 关闭后的回调函数。
 */

/**
 * 
 * @typedef mdui_snackbar_instance
 * @property {() => void} close - 关闭 `Snackbar`，关闭后 `Snackbar` 会被销毁。
 */

/**
 * 
 * @typedef mdui_Tooltip_options
 * @property {'auto' | 'bottom' | 'top' | 'left' | 'right'} [position='auto'] - `Tooltip` 的位置。为 `auto` 时，会自动判断位置。默认在下方。优先级为 `bottom` > `top` > `left` > `right`。
 * @property {int} [delay=0] - 延时触发，单位毫秒。
 * @property {string} [content] - `Tooltip` 的内容。
 */