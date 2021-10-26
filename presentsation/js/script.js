const app = {
    CommandsHistory,
    mode,
    presentation = {
        selectSlides,
        selectElements, 
        title,
        slides: [
            {
                randomId,
                background: {
                    img: 'directory',
                    colour: black,
                },
                block: {
                    position,
                    blockSize,
                    elemets: {
                        elementId,
                        img: 'directory',
                        text: {
                            size,
                            text,
                            font
                        },
                        Primitive: {
                            type: {
                                type,
                                colourback,
                                colourline
                            }
                        }
                    }
                }
            }
        ]
    }
}

/**
 * @param {Editor} Editor
 * @param {Slide} Slide
 * @return {Editor}
 */
function addSlide(Editor, Slide) {}

/**
 * @param {Editor} Editor
 * @param {Slide} Slide
 * @param {number} randomId
 * @return {Editor}
 */
function del(editor, Slide, randomId) {}

/**
 * @param {number} id
 * @param {string} colour
 * @param {string} directory
 * @return {Slide}
 */
function changeBackgroundSline(id, colour, directory) {}

/**
 * @param {Editor} Editor
 * @param {string} Text
 * @return {Editor}
 */
function addText(Editor, Text) {}

/**
 * @param {number} id
 * @param {number} size
 * @param {string} font
 * @return {Editor}
 */
function changeText(id, size, font) {}

/**
 * @param {Editor} Editor
 * @param {string} URL
 * @return {Editor}
 */
function addImg(Editor, URL) {}

/**
 * @param {Editor} Editor
 * @param {string} type
 * @return {Editor}
 */
function addPrimitive(Editor, type) {}

/**
 * @param {Editor} Editor
 * @param {string} colourback
 * @param {string} colourline
 * @return {Editor}
 */
function editPrimitive(Editor, colourback, colourline) {}

/**
 * @param {show} show 
 * @param {presentation} presentation
 * @return {show}
 */
function showmode(show, presentation) {}


/**
 * @param {Editor} Editor
 * @param {string} position 
 * @param {number} elementId
 * @return {Editor}
 */
function selectElements(Editor, position, elementId) {}
