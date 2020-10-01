import * as components from "../../../../static/public/js/components.js";


/**
 * 
 * @param {components.MduiIFrame} $iframe 
 */
function bindIFrameApps($iframe) {
    const APPS = ['stulist']
    for (const $item of document.querySelectorAll('[app]')) {
        const app = $item.getAttribute('app')
        if (!APPS.includes(app)) continue
        const url = `/${app}/`
        $item.addEventListener('click', () => $iframe.src = url)
    }
}


const $iframe = document.querySelector('mdui-iframe')

bindIFrameApps($iframe)