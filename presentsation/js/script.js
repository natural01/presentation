const presentation = {
    title: 'My Presentation',
    slides: [

        {
            Title
        },
        {
            Slide: [
                {
                    background = {
                        colour:  red,
                        directory: 'C://...'
                    }
                },
                {
                    Img: 'http://...'
                }, 
                {
                    Text = {
                        font: calibri,
                        size: 14,
                        str: 'hello world',
                    }
                }, 
                {
                    Primitive = {
                        colourline: white,
                        colourback: black,
                        str: 'circle 11 5'
                    }
                }
            ]
        },
        {
            CommandsHistory
        }

    ]
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

