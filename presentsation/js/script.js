const app = {
    mode: {
        editor: true,
        view: false,
    },
    presentation: {
        selectslides: 1234,
        selectElements: 1234, 
        title: 'new title',
        slides: [
            {
                slide: {
                    randomId: 1234,
                    background: {
                        img: 'directory',
                        colour: '#000'
                    },
                    block: {
                        position: {
                            x: 12,
                            y: 12
                        },
                        blockSize: {
                            widht: 12,
                            height: 12
                        },
                        elemets: {
                            elementId: 1234,
                            img: 'directory',
                            text: {
                                size: 12,
                                text: 'hello',
                                font: 'bold'
                            },
                            primitive: {
                                type: {
                                    type: 'circle',
                                    colourback: '#111',
                                    colourline: '#000'
                                }
                            }
                        }
                    }
                }
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
}

/**
 * @param {editor} editor
 * @param {slide} slide
 * @return {editor}
 */
function addSlide(editor, slide) {}

/**
 * @param {editor} editor
 * @param {string} slideId
 * @return {editor}
 */
function delSlide(editor, slideId) {}

/**
 * @param {editor} editor
 * @param {string} slideId
 * @param {string} colour
 * @return {editor}
 */
function changeBackgroundColorSlide(slideId, colour, editor) {}

/**
 * @param {editor} editor
 * @param {string} slideId
 * @param {string} src
 * @return {editor}
 */
function changeBackgroundImgSlide(slideId, src, editor) {}

/**
 * @param {editor} editor
 * @param {string} Text
 * @param {string} slideId
 * @return {editor}
 */
function addText(slideId, editor, Text) {}

/**
 * @param {string} slideId
 * @param {number} idElement
 * @param {number} size
 * @param {string} font
 * @return {editor}
 */
function changeText(slideId, idElement, size, font) {}

/**
 * @param {editor} editor
 * @param {string} src
 * @param {string} slideId
 * @return {editor}
 */
function addImg(editor, src, slideId) {}

/**
 * @param {editor} editor
 * @param {string} type
 * @param {string} slideId
 * @return {editor}
 */
function addPrimitive(editor, type, slideId) {}

/**
 * @param {editor} editor
 * @param {string} colorline
 * @param {string} slideId
 * @return {editor}
 */
function editPrimitiveColorline(editor, colorline, slideId) {}

/**
 * @param {editor} editor
 * @param {string} colorback
 * @param {string} slideId
 * @return {editor}
 */
function editPrimitiveColorback(editor, colorback, slideId) {}

/**
 * @param {editor} editor
 * @param {string} blockId
 * @return {editor}
 */
function delElement(editor, blockId) {}

/**
 * @param {editor} editor
 * @param {string} blockId
 * @param {number} x
 * @param {number} y
 * @param {number} wight
 * @param {number} height
 * @return {editor}
 */
function changeBlock(editor, blockId, x, y, wight, height) {}

/**
 * @param {view} view 
 * @param {presentation} presentation
 * @return {view}
 */
function changeMode(view, presentation) {}

/**
 * @param {editor} editor
 * @param {string} position 
 * @param {number} elementId
 * @return {editor}
 */
function selectElements(editor, position, elementId) {}

/**
 * @param {presentation} presentation
 * @param {array} undo
 * @return {array}
 */
function addUndo(presentation, undo) {}

/**
 * @param {presentation} presentation
 * @param {array} redo
 * @return {array}
 */
function addRedo(presentation, redo) {}
