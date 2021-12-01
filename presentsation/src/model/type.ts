export type AppType = {
    mode: Mode,
    presentation: Presentation,
    commandsHistory: CommandsHistory,
}

export type Mode = 'editor' | 'view'

export type Presentation = Readonly<{
    selectSlides: string[],
    selectElements: string[],
    title: string,
    slides: Slide[],
}>

export type Slide = Readonly<{
    slideId: string,
    background: Background,
    blocks: Block[],
}>

export type Background = Readonly<{
    src: string,
    color: string,
}>

export type Block = Readonly<{
    position: Position,
    blockSize: BlockSize,
    element: Element,
}>

export type Position = Readonly<{
    x: number,
    y: number,
}>

export type BlockSize = Readonly<{
    width: number,
    height: number,
}>

export type Element = Readonly<{
    elementId: string,
    src: string,
    text: Text,
    primitive: Primitive,
}>

export type Text = Readonly<{
    size: number,
    content: string,
    fontFamily: string,
    colorText: string,
    bold: boolean,
    italic: boolean,
    underline: boolean,
}>

export type Primitive = Readonly<{
    primitiveType: string,
    colourBack: string,
    colourLine: string,
}>

export type CommandsHistory = Readonly<{
    undo: Presentation[],
    redo: Presentation[],
}>