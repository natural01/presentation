import {AppType} from '../model/type'
import {addPresentation, addPrimitive, addRedo, addSlide, addTitle, addUndo, changeBackgroundColorSlide} from '../model/actions'
import {changeBackgroundImgSlide, changeBlock, changeMode, delElements, delSlide, editPrimitiveColorback} from '../model/actions'
import {editPrimitiveColorline, makeId, moveSlide, selectElements, selectSlide} from '../model/actions'
let app: AppType = {
    mode: 'editor',
    presentation: {
        selectSlides: [],
        selectElements: [],
        title: '',
        slides: [
        ]
    },
    commandsHistory: {
        undo: [
            // список презентаций до изменений
        ],
        redo: [
            // список презентаций после изменений
        ]
    }
}

let editorChangeHandler: any = null

function getEditor() {
    return app
}

function setEditor(newEditor: AppType) {
    app = newEditor
}

export function addChangeHandler(handler: any) {
    editorChangeHandler = handler
}

/**
 * @param {Function} modifyFn
 * @param {Object} payload
 */
export function dispatch(modifyFn: Function, payload: Object) {
    const newEditor = modifyFn(app, payload)
    setEditor(newEditor)

    if (editorChangeHandler)
    {
        editorChangeHandler()
    }
}

export {
    getEditor
}