type editor = {
    mode: presentationMode,
    presentation: presentation,
    commandsHistory: history,
}

type presentationMode = {
    editor: true,
    view: false,
}

type history = {
    undo: undo[],
    redo: redo[],
}

type undo = presentation
type redo = presentation

type presentation = {
    selectSlides: number,
    selectElements: number,
    title: string,
    slides: slides[],
}

type slides = {
    slide: slide,
}

type slide = {
    slideId: number
    background: background,
    block: block,
}

type background = {
    src: string,
    color: string,
}

type block = {
    position: position,
    blockSize: blockSize,
    elements: elements,
}

type position = {
    x: number,
    y: number,
}

type blockSize = {
    width: number,
    height: number,
}

type elements = {
    elementId: number,
    img: string,
    text: text,
    primitive: primitive,
}

type text = {
    size: number,
    text: string,
    font: string,
}

type primitive = {
    type: primitiveType,
    colourback: string,
    colourline: string,
}

enum primitiveType {
    Circle,
    Triangle,
    Rectangle,
}

export {
    editor, text, slide, block,
    primitiveType, primitive, blockSize,
    history, elements, position, presentationMode,
    presentation, redo, slides, undo, background
}