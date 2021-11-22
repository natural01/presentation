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
    app.presentation = {
        ...app.presentation,
        title: title,
    }

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
    app.presentation = {
        ...app.presentation,
        selectSlides: [
            ...app.presentation.selectSlides.slice(0),
            slideId
        ]
    }
}

function selectElements(app: App, elementId: string): void {
    addUndo(app, app.presentation)
    app.presentation = {
        ...app.presentation,
        selectElements: [
            ...app.presentation.selectElements.slice(0),
            elementId
        ]
    }
}

function delSlide(app: App): void {
    addUndo(app, app.presentation)
    // app.presentation.selectSlides
    let index1 = 0
    let index2 = 0
    let id = ''
    for (index1; index1 != app.presentation.selectSlides.length; index1++) {
        id = app.presentation.selectSlides[index1]
        let count = 1
        for (index2; index2 != app.presentation.slides.length; index2) {
            // eslint-disable-next-line eqeqeq
            if (id == app.presentation.slides[index2].slideId) {
                app.presentation = {
                    ...app.presentation,
                    slides: [
                        ...app.presentation.slides.slice(0, count),
                        ...app.presentation.slides.slice(count + 1)
                    ]
                }
            }
            count += 1
        }
    }
}

function moveSlide(app: App, slidePosition: number): void {
    addUndo(app, app.presentation)
    let id = ''
    let moveSlide: Slide
    if (app.presentation.selectSlides.length == 1) {
        id = app.presentation.selectSlides[0]
        let index = 0
        for (index; index != app.presentation.slides.length; index++) {
            if (id == app.presentation.slides[index].slideId) {
                moveSlide = app.presentation.slides[index]
                app.presentation = {
                    ...app.presentation,
                    slides: [
                        ...app.presentation.slides.slice(0, index),
                        ...app.presentation.slides.slice(index + 1)
                    ]
                }
                app.presentation = {
                    ...app.presentation,
                    slides: [
                        ...app.presentation.slides.slice(0, slidePosition),
                        moveSlide,
                        ...app.presentation.slides.slice(slidePosition + 2)
                    ]
                }
            }
            break
            index =+ 1
        }
    }
}

function changeBackgroundColorSlide(app: App, color: string): void {
    addUndo(app, app.presentation)
    let countSelectSlide = 0
    for (countSelectSlide; countSelectSlide != app.presentation.selectSlides.length; countSelectSlide++) {
        let idSelectSlide = app.presentation.selectSlides[countSelectSlide]
        let index = 0
        for (index; index != app.presentation.slides.length; index++) {
            if (idSelectSlide == app.presentation.slides[index].slideId) {
                const slide: Slide = {
                    slideId: idSelectSlide,
                    background: {
                        color: color,
                        src: ''
                    },
                    blocks: app.presentation.slides[index].blocks
                }
                app.presentation = {
                    ...app.presentation,
                    slides: [
                        ...app.presentation.slides.slice(0, index),
                        slide,
                        ...app.presentation.slides.slice(index + 1)
                    ]
                }
            }
        }
    }
}

function changeBackgroundImgSlide(app: App, img: string): void {
    addUndo(app, app.presentation)
    let countSelectSlide = 0
    for (countSelectSlide; countSelectSlide != app.presentation.selectSlides.length; countSelectSlide++) {
        let idSelectSlide = app.presentation.selectSlides[countSelectSlide]
        let index = 0
        for (index; index != app.presentation.slides.length; index++) {
            if (idSelectSlide == app.presentation.slides[index].slideId) {
                const slide: Slide = {
                    slideId: idSelectSlide,
                    background: {
                        color: '',
                        src: img
                    },
                    blocks: app.presentation.slides[index].blocks
                }
                app.presentation = {
                    ...app.presentation,
                    slides: [
                        ...app.presentation.slides.slice(0, index),
                        slide,
                        ...app.presentation.slides.slice(index + 1)
                    ]
                }
            }
        }
    }
}

function addPrimitive(app: App, primitiveType: string): void {
    addUndo(app, app.presentation)
    if (primitiveType == 'circle') {
        const defaultBlock: Block = {
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
                    const slide: Slide = {
                        slideId: idSelectSlide,
                        background: app.presentation.slides[index].background,
                        blocks: [
                            ...app.presentation.slides[index].blocks.slice(0),
                            defaultBlock
                        ]
                    }
                    app.presentation = {
                        ...app.presentation,
                        slides: [
                            ...app.presentation.slides.slice(0, index),
                            slide,
                            ...app.presentation.slides.slice(index + 1)
                        ]
                    }
                }
            }
        }
    } else if (primitiveType == 'triangle') {
        const defaultBlock: Block = {
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
                    const slide: Slide = {
                        slideId: idSelectSlide,
                        background: app.presentation.slides[index].background,
                        blocks: [
                            ...app.presentation.slides[index].blocks.slice(0),
                            defaultBlock
                        ]
                    }
                    app.presentation = {
                        ...app.presentation,
                        slides: [
                            ...app.presentation.slides.slice(0, index),
                            slide,
                            ...app.presentation.slides.slice(index + 1)
                        ]
                    }
                }
            }
        }
    } else if (primitiveType == 'rectangle') {
        const defaultBlock: Block = {
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
                    const slide: Slide = {
                        slideId: idSelectSlide,
                        background: app.presentation.slides[index].background,
                        blocks: [
                            ...app.presentation.slides[index].blocks.slice(0),
                            defaultBlock
                        ]
                    }
                    app.presentation = {
                        ...app.presentation,
                        slides: [
                            ...app.presentation.slides.slice(0, index),
                            slide,
                            ...app.presentation.slides.slice(index + 1)
                        ]
                    }
                }
            }
        }
    }
}

function editPrimitiveColorline(app: App, colorLine: string, elementId: string): void {
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
        const defaultPrimitive: Primitive = {
            primitiveType: app.presentation.slides[indexSelectSlide].blocks[indexBlocks].element.primitive.primitiveType,
            colourBack: app.presentation.slides[indexSelectSlide].blocks[indexBlocks].element.primitive.colourBack,
            colourLine: colorLine
        }
        const element: Element = {
            ...app.presentation.slides[indexSelectSlide].blocks[indexBlocks].element,
            primitive: defaultPrimitive
        }
        const block: Block = {
            ...app.presentation.slides[indexSelectSlide].blocks[indexBlocks],
            element: element
        }
        const slide: Slide = {
            ...app.presentation.slides[indexSelectSlide],
            blocks: [
                ...app.presentation.slides[indexSelectSlide].blocks.slice(0, indexBlocks),
                block,
                ...app.presentation.slides[indexSelectSlide].blocks.slice(indexBlocks + 1)
            ]
        }
        app.presentation = {
            ...app.presentation,
            slides: [
                ...app.presentation.slides.slice(0, indexSelectSlide),
                slide,
                ...app.presentation.slides.slice(indexSelectSlide + 1)
            ]

        }
    }
}

function editPrimitiveColorback(app: App, colorBack: string, elementId: string): void {
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
        const defaultPrimitive: Primitive = {
            primitiveType: app.presentation.slides[indexSelectSlide].blocks[indexBlocks].element.primitive.primitiveType,
            colourBack: colorBack,
            colourLine: app.presentation.slides[indexSelectSlide].blocks[indexBlocks].element.primitive.colourLine
        }
        const element: Element = {
            ...app.presentation.slides[indexSelectSlide].blocks[indexBlocks].element,
            primitive: defaultPrimitive
        }
        const block: Block = {
            ...app.presentation.slides[indexSelectSlide].blocks[indexBlocks],
            element: element
        }
        const slide: Slide = {
            ...app.presentation.slides[indexSelectSlide],
            blocks: [
                ...app.presentation.slides[indexSelectSlide].blocks.slice(0, indexBlocks),
                block,
                ...app.presentation.slides[indexSelectSlide].blocks.slice(indexBlocks + 1)
            ]
        }
        app.presentation = {
            ...app.presentation,
            slides: [
                ...app.presentation.slides.slice(0, indexSelectSlide),
                slide,
                ...app.presentation.slides.slice(indexSelectSlide + 1)
            ]
        }
    }
}

function delElements(app: App): void {
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
                    const blocks = [
                        ...app.presentation.slides[indexSelectSlide].blocks.slice(0, indexBlocks),
                        ...app.presentation.slides[indexSelectSlide].blocks.slice(indexBlocks + 1)
                    ]
                    const slide: Slide = {
                        ...app.presentation.slides[indexSelectSlide],
                        blocks: blocks
                    }
                    const presentation: Presentation = {
                        ...app.presentation,
                        slides : [
                            ...app.presentation.slides.slice(0, indexSelectSlide),
                            slide,
                            ...app.presentation.slides.slice(indexSelectSlide + 1)
                        ]
                    }
                }
            }
        }
    }
}

function changeBlock(app: App, elementId: string, x: number, y: number, wight: number, height: number) {
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
            if (elementId == app.presentation.slides[indexSelectSlide].blocks[indexBlock].element.elementId) {
                break
            }
        }
        const block: Block = {
            element: app.presentation.slides[indexSelectSlide].blocks[indexBlock].element,
            blockSize: {
                width: wight,
                height: height
            },
            position: {
                x: x,
                y: y
            }
        }
        const blocks = [
            ...app.presentation.slides[indexSelectSlide].blocks.slice(0, indexBlock),
            block,
            ...app.presentation.slides[indexSelectSlide].blocks.slice(indexBlock + 1)
        ]
        const slide: Slide = {
            ...app.presentation.slides[indexSelectSlide],
            blocks: blocks
        }
        app.presentation = {
            ...app.presentation,
            slides: [
                ...app.presentation.slides.slice(0, indexSelectSlide),
                slide,
                ...app.presentation.slides.slice(indexSelectSlide + 1)
            ]
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