import {AppType} from '../model/type'
import {addPresentation, addPrimitive, addRedo, addSlide, addTitle, addUndo, changeBackgroundColorSlide} from '../model/actions'
import {changeBackgroundImgSlide, changeBlock, changeMode, delElements, delSlide, editPrimitiveColorback} from '../model/actions'
import {editPrimitiveColorline, makeId, moveSlide, selectElements, selectSlide} from '../model/actions'
let app: AppType = {
    mode: 'editor',
    presentation: {
        selectSlides: ['1234'],
        selectElements: [],
        title: '',
        slides: [
            //{
                // slideId: '1234',
                // background: {
                //     src: '',
                //     color: '#000'
                // },
                // blocks: [
                //     {
                //         position: {
                //             x: 12,
                //             y: 12
                //         },
                //         blockSize: {
                //             width: 12,
                //             height: 12
                //         },
                //         element: {
                //             elementId: '1234',
                //             src: '',
                //             text: {
                //                 size: 12,
                //                 content: 'hello',
                //                 fontFamily: 'calibry',
                //                 colorText: '#000',
                //                 bold: false,
                //                 italic: false,
                //                 underline: false
                //             },
                //             primitive: {
                //                 primitiveType: '',
                //                 colourBack: '',
                //                 colourLine: '',
                //             }
                //         }
                //     }
               //  ]
            // }
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