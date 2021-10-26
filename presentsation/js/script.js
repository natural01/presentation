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
 */
function del(editor, Slide) {}

/**
 * @param {number} id
 * @param {string} colour
 * @return {Slide}
 */
function changeBackgroundSline(id, colour) {}

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

