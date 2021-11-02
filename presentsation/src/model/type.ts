export type editor = {
    mode: presentationMode,
    presentation: presentation,
    commandsHistory: history,
}

export type presentationMode = "editor" | "view"

export type history = {
    undo: undo[],
    redo: redo[],
}

export type undo = presentation
export type redo = presentation

export type presentation = {
    selectSlides: number,
    selectElements: number,
    title: string,
    slides: slides[],
}

export type slides = {
    slide: slide,
}

export type slide = {
    slideId: number
    background: background,
    block: block,
}

export type background = {
    src: string,
    color: string,
}

export type block = {
    position: position,
    blockSize: blockSize,
    elements: elements,
}

export type position = {
    x: number,
    y: number,
}

export type blockSize = {
    width: number,
    height: number,
}

export type elements = {
    elementId: number,
    img: string,
    text: text,
    primitive: primitive,
}

export type text = {
    size: number,
    text: string,
    font: string,
}

export type primitive = {
    type: primitiveType,
    colourback: string,
    colourline: string,
}

export enum primitiveType {
    Circle,
    Triangle,
    Rectangle,
}