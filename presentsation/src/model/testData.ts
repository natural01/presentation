import {editor, primitiveType} from './type';

type editor = {
    mode: "editor",
    presentation: {
        title: "Nikita",
        selectSlides: 1234,
        selectElements: 1234,
        slides: [
            {
                slide: {
                    slideId: 1234,
                    background: {
                        img: '',
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
                                primitiveType: ,
                                colourback: '#111',
                                colourline: '#000'
                            }
                        }
                    }
                }
            }
        ]
    }
}