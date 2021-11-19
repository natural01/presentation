import {App, Element} from './type'
import {Mode} from './type'
import {CommandsHistory} from './type'
import {Presentation} from './type'
import {Slide} from './type'
import {Block} from './type'
import {Position} from './type'
import {BlockSize} from './type'
import {Text} from './type'
import {Primitive} from './type'
import {resolveSrv} from "dns";
import {presentation} from "./testData";

function makeId(): string {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < 8; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function addTitle(title: string, app: App): void {
    app.presentation.title = title;
}

function addPresentation(app: App, title: string): void {
    const slide: Slide = {
        slideId: makeId(),
        background: {
            src: '',
            color: '#fff'
        },
        blocks: []
    }

    app.presentation = {
        selectElements: [],
        selectSlides: [],
        title: title,
        slides: [slide]
    }
}

function addSlide(app: App): void {
    const slide: Slide = {
        slideId: makeId(),
        background: {
            src: '',
            color: '#fff'
        },
        blocks: []
    }

    app.presentation = {
        selectSlides: [],
        selectElements: [],
        title: app.presentation.title,
        slides: [
            ...app.presentation.slides.slice(0),
            slide
        ]
    }
}

function selectSlide(app: App, slideId: string): void {
    addUndo(app, app.presentation)
    const selectSlides: presentation = {
        selectSlides: [
            ...app.presentation.selectSlides,
            slideId
        ],
        slides: app.presentation.slides,
    }
    app.presentation.selectSlides = [
        ...app.presentation.selectSlides,
        slideId
    ]
}

function selectElements(app: app, elementId: string): void {
    addUndo(app, app.presentation)
    app.presentation.selectElements = [
        ...app.presentation.selectElements,
        elementId
    ]
}

function delSlide(app: app): void {
    addUndo(app, app.presentation)
    // app.presentation.selectSlides
    let index1 = 0
    let index2 = 0
    let id = ''
    for (index1; index1 != app.presentation.selectSlides.length; index1++) {
        id = app.presentation.selectSlides[index1]
        for (index2; index2 != app.presentation.slides.length; index2) {
            let count = 1
            // eslint-disable-next-line eqeqeq
            if (id == app.presentation.slides[index2].slideId) {
                app.presentation.slides = [
                    ...app.presentation.slides.slice(0, count),
                    ...app.presentation.slides.slice(count + 1)
                ]
            }
            count += 1
        }
    }
}

function moveSlide(app: app, slidePosition: number): void {
    addUndo(app, app.presentation)
    let id = ''
    let moveSlide = {} as slide
    if (app.presentation.selectSlides.length == 1) {
        id = app.presentation.selectSlides[0]
        let index = 0
        for (index; index != app.presentation.slides.length; index++) {
            if (id == app.presentation.slides[index].slideId) {
                moveSlide = app.presentation.slides[index]
                app.presentation.slides = [
                    ...app.presentation.slides.slice(0, index),
                    ...app.presentation.slides.slice(index + 1)
                ]
            }
            break
            index =+ 1
        }
        app.presentation.slides = [
            ...app.presentation.slides.slice(0, slidePosition),
            moveSlide,
            ...app.presentation.slides.slice(slidePosition + 2)
        ]
    }
}

function changeBackgroundColorSlide(app: app, color: string): void {
    addUndo(app, app.presentation)
    let countSelectSlide = 0
    for (countSelectSlide; countSelectSlide != app.presentation.selectSlides.length; countSelectSlide++) {
        let idSelectSlide = app.presentation.selectSlides[countSelectSlide]
        let index = 0
        for (index; index != app.presentation.slides.length; index++) {
            if (idSelectSlide == app.presentation.slides[index].slideId) {
                app.presentation.slides[index].background.color = color
            }
        }
    }
}

function changeBackgroundImgSlide(app: app, img: string): void {
    addUndo(app, app.presentation)
    let countSelectSlide = 0
    for (countSelectSlide; countSelectSlide != app.presentation.selectSlides.length; countSelectSlide++) {
        let idSelectSlide = app.presentation.selectSlides[countSelectSlide]
        let index = 0
        for (index; index != app.presentation.slides.length; index++) {
            if (idSelectSlide == app.presentation.slides[index].slideId) {
                app.presentation.slides[index].background.src = img
            }
        }
    }
}

function addPrimitive(app: app, primitiveType: string): void {
    addUndo(app, app.presentation)
    if (primitiveType == 'circle') {
        const defaultBlock: block = {
            position: {
                x: 100,
                y: 100
            },
            blockSize: {
                width: 100,
                height: 100
            },
            element: {
                elementId: makeId(),
                src: '',
                text: {
                    size: 0,
                    content: '',
                    fontFamily: '',
                    colorText: '',
                    bold: false,
                    italic: false,
                    underline: false
                },
                primitive: {
                    primitiveType: primitiveType,
                    colourBack: '#fff',
                    colourLine: '#000'
                }
            }
        }
        if (app.presentation.selectSlides.length == 1) {
            let idSelectSlide = app.presentation.selectSlides[0]
            let index = 0
            for (index; index != app.presentation.slides.length; index++) {
                if (idSelectSlide == app.presentation.slides[index].slideId) {
                    app.presentation.slides[index].blocks = [
                        ...app.presentation.slides[index].blocks,
                        defaultBlock
                    ]
                }
            }
        }
    } else if (primitiveType == 'triangle') {
        const defaultBlock: block = {
            position: {
                x: 100,
                y: 100
            },
            blockSize: {
                width: 100,
                height: 100
            },
            element: {
                elementId: makeId(),
                src: '',
                text: {
                    size: 0,
                    content: '',
                    fontFamily: '',
                    colorText: '',
                    bold: false,
                    italic: false,
                    underline: false
                },
                primitive: {
                    primitiveType: primitiveType,
                    colourBack: '#fff',
                    colourLine: '#000'
                }
            }
        }
        if (app.presentation.selectSlides.length == 1) {
            let idSelectSlide = app.presentation.selectSlides[0]
            let index = 0
            for (index; index != app.presentation.slides.length; index++) {
                if (idSelectSlide == app.presentation.slides[index].slideId) {
                    app.presentation.slides[index].blocks = [
                        ...app.presentation.slides[index].blocks,
                        defaultBlock
                    ]
                }
            }
        }
    } else if (primitiveType == 'rectangle') {
        const defaultBlock: block = {
            position: {
                x: 100,
                y: 100
            },
            blockSize: {
                width: 100,
                height: 100
            },
            element: {
                elementId: makeId(),
                src: '',
                text: {
                    size: 0,
                    content: '',
                    fontFamily: '',
                    colorText: '',
                    bold: false,
                    italic: false,
                    underline: false
                },
                primitive: {
                    primitiveType: primitiveType,
                    colourBack: '#fff',
                    colourLine: '#000'
                }
            }
        }
        if (app.presentation.selectSlides.length == 1) {
            let idSelectSlide = app.presentation.selectSlides[0]
            let index = 0
            for (index; index != app.presentation.slides.length; index++) {
                if (idSelectSlide == app.presentation.slides[index].slideId) {
                    app.presentation.slides[index].blocks = [
                        ...app.presentation.slides[index].blocks,
                        defaultBlock
                    ]
                }
            }
        }
    }
}

function editPrimitiveColorline(app: app, colorLine: string, elementId: string): void {
    addUndo(app, app.presentation)
    if (app.presentation.selectSlides.length == 1) {
        let idSelectSlide = app.presentation.selectSlides[0]
        let indexSelectSlide = 0
        for (indexSelectSlide; indexSelectSlide != app.presentation.slides.length; indexSelectSlide++) {
            if (idSelectSlide == app.presentation.slides[indexSelectSlide].slideId) {
                break
            }
        }
        let indexBlocks = 0
        for (indexBlocks; indexBlocks != app.presentation.slides[indexSelectSlide].blocks.length; indexBlocks++) {
            if (elementId == app.presentation.slides[indexSelectSlide].blocks[indexBlocks].element.elementId) {
                break
            }
        }
        const defaultPrimitive: primitive = {
            primitiveType: app.presentation.slides[indexSelectSlide].blocks[indexBlocks].element.primitive.primitiveType,
            colourBack: app.presentation.slides[indexSelectSlide].blocks[indexBlocks].element.primitive.colourBack,
            colourLine: colorLine
        }
        app.presentation.slides[indexSelectSlide].blocks[indexBlocks].element.primitive = defaultPrimitive
    }
}

function editPrimitiveColorback(app: app, colorBack: string, elementId: string): void {
    addUndo(app, app.presentation)
    if (app.presentation.selectSlides.length == 1) {
        let idSelectSlide = app.presentation.selectSlides[0]
        let indexSelectSlide = 0
        for (indexSelectSlide; indexSelectSlide != app.presentation.slides.length; indexSelectSlide++) {
            if (idSelectSlide == app.presentation.slides[indexSelectSlide].slideId) {
                break
            }
        }
        let indexBlocks = 0
        for (indexBlocks; indexBlocks != app.presentation.slides[indexSelectSlide].blocks.length; indexBlocks++) {
            if (elementId == app.presentation.slides[indexSelectSlide].blocks[indexBlocks].element.elementId) {
                break
            }
        }
        const defaultPrimitive: primitive = {
            primitiveType: app.presentation.slides[indexSelectSlide].blocks[indexBlocks].element.primitive.primitiveType,
            colourBack: colorBack,
            colourLine: app.presentation.slides[indexSelectSlide].blocks[indexBlocks].element.primitive.colourLine
        }
        app.presentation.slides[indexSelectSlide].blocks[indexBlocks].element.primitive = defaultPrimitive
    }
}

function delElements(app: app): void {
    addUndo(app, app.presentation)
    if (app.presentation.selectSlides.length == 1) {
        let idSelectSlide = app.presentation.selectSlides[0]
        let indexSelectSlide = 0
        for (indexSelectSlide; indexSelectSlide != app.presentation.slides.length; indexSelectSlide++) {
            if (idSelectSlide == app.presentation.slides[indexSelectSlide].slideId) {
                break
            }
        }
        let idSelectElement = ''
        let indexSelectElement = 0
        let indexBlocks = 0
        for (indexSelectElement; indexSelectElement != app.presentation.selectElements.length; indexSelectElement++) {
            idSelectElement = app.presentation.selectElements[indexSelectElement]
            for (indexBlocks; indexBlocks != app.presentation.slides[indexSelectSlide].blocks.length; indexBlocks++) {
                if (idSelectElement == app.presentation.slides[indexSelectSlide].blocks[indexBlocks].element.elementId) {
                    app.presentation.slides[indexSelectSlide].blocks = [
                        ...app.presentation.slides[indexSelectSlide].blocks.slice(0, indexBlocks),
                        ...app.presentation.slides[indexSelectSlide].blocks.slice(indexBlocks + 1)
                    ]
                }
            }
        }
    }
}

function changeBlock(app: App, blockId: string, x: number, y: number, wight: number, height: number) {
    addUndo(app, app.presentation)
    if (app.presentation.selectSlides.length == 1) {
        let idSelectSlide = app.presentation.selectSlides[0]
        let indexSelectSlide = 0
        for (indexSelectSlide; indexSelectSlide != app.presentation.slides.length; indexSelectSlide++) {
            if (idSelectSlide == app.presentation.slides[indexSelectSlide].slideId) {
                break
            }
        }
        let indexBlock = 0
        for (indexBlock; indexBlock != app.presentation.slides[indexSelectSlide].blocks.length; indexBlock++) {
            if (blockId == app.presentation.slides[indexSelectSlide].blocks[indexBlock].element.elementId) {
                break
            }
        }
        app.presentation = {
            selectSlides: app.presentation.selectSlides,
            selectElements: app.presentation.selectElements,
            title: app.presentation.title,
            slides: [
                ...app.presentation.slides.slice(0, indexSelectSlide),

            ]
        }
        app.presentation.slides[indexSelectSlide].blocks[indexBlock] = {
            element: app.presentation.slides[indexSelectSlide].blocks[indexBlock].element,
            blockSize: {
                width: wight,
                height: height,
            },
            position: {
                x: x,
                y: y,
            }
        }
    }
}

function changeMode (app: App, mode: Mode): Mode {
    return app.mode = mode
}

function selectElement (app: App, elementId: string): void {
    app.presentation = {
        ...app.presentation,
        selectElements: [
            ...app.presentation.selectElements.slice(0),
            elementId
        ],
    }
}

function addUndo (app: App, presentation: Presentation): void {
    app.commandsHistory = {
        undo: [
            ...app.commandsHistory.undo.slice(0),
            presentation
        ],
        redo: [
            ...app.commandsHistory.redo.slice(0)
        ]
    }
}

function addRedo (app: App, presentation: Presentation): void {
    app.commandsHistory = {
        undo: [
            ...app.commandsHistory.undo.slice(0)
        ],
        redo: [
            ...app.commandsHistory.redo.slice(0),
            presentation
        ]
    }
}