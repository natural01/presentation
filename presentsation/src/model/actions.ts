import {editor} from './type'
import {mode} from './type'
import {history} from './type'
import {undo} from './type'
import {redo} from './type'
import {presentation} from './type'
import {slides} from './type'
import {slide} from './type'
import {background} from './type'
import {position} from './type'
import {blockSize} from './type'
import {elements} from './type'
import { element } from './type'
import {text} from './type'
import {picture} from './type'
import {primitive} from './type'
import {primitiveType} from './type'

function makeId(): string {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( var i = 0; i < 8; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function addTitle(title: string): string {
    let result;
    result = result + title;
    return result;
}

function addPresentation(editor: editor, title: string): editor {
    const presentationMode: mode = {
        edit: true,
        view: false,
    }

    const slide: slide = {
        slideId: makeId(),
        background: {
            src: '',
            color: '#fff',
        },
    }

    const slides: slides[] = [
        ...editor.presentation.slides,
    ]

    const presentation: presentation = {
        slides: slides,
    }

    return {
        mode: presentationMode,
        presentation: presentation,
    }
}

function addSlide(editor: editor): editor {
    const background: background = {
       src: '',
       color: '#fff', 
    }

    const slide: slide = {
        slideId: makeId(),
        background,
    }

    const slideArr: slides = {
        slide: slide,
    }

    const slides: slides[] = [
        ...editor.presentation.slides.slice(0),
        slideArr
    ]

    const presentationMode: mode = {
        edit: true,
        view: false,
    }

    const presentation: presentation = {
        slides: slides,
    }

    return {
        mode: presentationMode,
        presentation: presentation,
    }
}

function delSlide(editor: editor, sliddeId: string): editor {
    const presentationMode: mode = {
        edit: true,
        view: false,
    }

    const slide: slide = {
        slideId: sliddeId,
        background: {
            src: '',
            color: '#fff',
        },
    }

    const slides: slides[] = [
        ...editor.presentation.slides.splice(-1, 1),
    ]

    const presentation: presentation = {
        slides: slides,
    }

    return {
        mode: presentationMode,
        presentation: presentation,
    }
}

export function addImg(editor: editor, src: string, elementId: string): editor {
    const slideId: number = editor.selectedSlidesId.slice(-1)[0]
    const slide: slide = editor.presentation.slides[slideId]
    const picture: picture = {
        src: ''
    }
    const element: element = {
        elementId: makeId(),
        blockSize: {
            width: 10,
            height: 10,
        },
        position: {
            x: 1,
            y: 1,
        }
    }

    const newslide: slide = {
        ...slide,
        elements: [
            ...slide.elements,
            element,
        ]
    }

    const newslides: slide[] = editor.presentation.slides.map((slide, id) => {
        if (id === slideId) {
            return newslide
        }
        return slide
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newslides,
        }
    }
}

export function addPrimitive(editor: editor, primitiveType: string, elementId: string): editor {
    const slideId: number = editor.selectedSlidesIndexes.slice(-1)[0]
    const slide: slide = editor.presentation.slides[slideId]
    const primitive: primitive = {
        primitiveType,
        colourback: '#111',
        colourline: '#000'
    }
    const element: element = {
        elementId: makeId(),
        blockSize: {
            width: 10,
            height: 10,
        },
        position: {
            x: 1,
            y: 1,
        }
    }

    const newslide: slide = {
        ...slide,
        elements: [
            ...slide.elements,
            element,
        ]
    }

    const newslides: slide[] = editor.presentation.slides.map((slide, id) => {
        if (id === slideId) {
            return newslide
        }
        return slide
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newslides,
        }
    }
}

export function addText(editor: editor, elementId: string, text: string): editor {
    const slideIndex: number = editor.selectedSlidesIndexes.slice(-1)[0]
    const slide: slide = editor.presentation.slidesList[slideIndex]
    const Text: text = {
        size: 12,
        text: 'hello',
        font: 'bold'
    }
    const element: element = {
        elementId: makeId(),
        blockSize: {
            width: 10,
            height: 10,
        },
        position: {
            x: 1,
            y: 1,
        }
    }

    const newSlide: slide = {
        ...slide,
        elementsList: [
            ...slide.elementsList,
            element,
        ]
    }

    const newslides: slide[] = editor.presentation.slides.map((slide, index) => {
        if (index === slideIndex) {
            return newSlide
        }
        return slide
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList: newslides,
        }
    }
}
