import {AppType} from '../model/type'
let editor = {
    mode: 'editor',
    presentation: {
        selectSlides: [],
        selectElements: [],
        title: 'new title',
        slides: [
            {
                slideId: '1234',
                background: {
                    src: '',
                    color: '#000'
                },
                blocks: [
                    {
                        position: {
                            x: 12,
                            y: 12
                        },
                        blockSize: {
                            width: 12,
                            height: 12
                        },
                        element: {
                            elementId: '1234',
                            src: '',
                            text: {
                                size: 12,
                                content: 'hello',
                                fontFamily: 'calibry',
                                colorText: '#000',
                                bold: false,
                                italic: false,
                                underline: false
                            },
                            primitive: {
                                primitiveType: '',
                                colourBack: '',
                                colourLine: '',
                            }
                        }
                    }
                ]
            }
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
} as AppType

function getEditor() {
    return editor
}

function setEditor(newEditor: AppType) {
    editor = newEditor
}

// /**
//  * @param {Fumction} modifyFn
//  * @param {Object} payload
//  */
// function dispatch(modifyFn, payload) {
//     const newEditor = modifyFn(editor, payload)
//     setEditor(newEditor)
// }

export {
    getEditor
}