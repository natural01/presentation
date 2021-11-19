export type editor = {
    mode: {
        editor: true,
        view: false,
    },
    presentation: {
        selectSlides: '0',
        selectElements: '0',
        title: 'new title',
        slides: [
            slide: {
                slideId: '12a2',
                background: {
                    img: '',
                    colour: '#000'
                },
                blocks: [
                    block: {
                        position: {
                            x: 12,
                            y: 12
                        },
                        blockSize: {
                            width: 12,
                            height: 12
                        },
                        elements: {
                            elementId: 'b12',
                            text: {
                                size: 12,
                                text: 'hello',
                                font: 'bold'
                            }
                        }
                    },
                    block: {
                        position: {
                            x: 12,
                            y: 12
                        },
                        blockSize: {
                            width: 12,
                            height: 12
                        },
                        elements: {
                            elementId: 'b21',
                            primitive: {
                                primitiveType: {
                                    Circle: false,
                                    Triangle: true,
                                    Rectangle: false,
                                },
                                colourBack: '#111',
                                colourLine: '#000'
                            }
                        }
                    }
                ]
            },
            slide: {
                slideId: '123n4',
                background: {
                    img: '',
                    colour: '#000'
                },
                blocks: [
                    block: {
                        position: {
                            x: 12,
                            y: 12
                        },
                        blockSize: {
                            width: 12,
                            height: 12
                        },
                        elements: {
                            elementId: '234',
                            text: {
                                size: 12,
                                text: 'hello',
                                font: 'bold'
                            }
                        }
                    },
                    block: {
                        position: {
                            x: 12,
                            y: 12
                        },
                        blockSize: {
                            width: 12,
                            height: 12
                        },
                        elements: {
                            elementId: '123',
                            primitive: {
                                primitiveType: {
                                    Circle: false,
                                    Triangle: true,
                                    Rectangle: false,
                                },
                                colourBack: '#111',
                                colourLine: '#000'
                            }
                        }
                    }
                ]
            }
        ]
    },
    commandsHistory: {
        undo: [
            presentation: {
                selectSlides: '0',
                selectElements: '0',
                title: 'new title',
                slides: [
                    slide: {
                        slideId: '12a2',
                        background: {
                            img: '',
                            colour: '#000'
                        },
                        blocks: [
                            block: {
                                position: {
                                    x: 12,
                                    y: 12
                                },
                                blockSize: {
                                    width: 12,
                                    height: 12
                                },
                                elements: {
                                    elementId: 'b12',
                                    text: {
                                        size: 12,
                                        text: 'hello',
                                        font: 'bold'
                                    }
                                }
                            },
                            block: {
                                position: {
                                    x: 12,
                                    y: 12
                                },
                                blockSize: {
                                    width: 12,
                                    height: 12
                                },
                                elements: {
                                    elementId: 'b21',
                                    primitive: {
                                        primitiveType: {
                                            Circle: false,
                                            Triangle: true,
                                            Rectangle: false,
                                        },
                                        colourBack: '#111',
                                        colourLine: '#000'
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            presentation: {
                selectSlides: '0',
                selectElements: '0',
                title: 'new title',
                slides: [
                    slide: {
                        slideId: '12a2',
                        background: {
                            img: '',
                            colour: '#000'
                        },
                        blocks: [
                            block: {
                                position: {
                                    x: 12,
                                    y: 12
                                },
                                blockSize: {
                                    width: 12,
                                    height: 12
                                },
                                elements: {
                                    elementId: 'b12',
                                    text: {
                                        size: 12,
                                        text: 'hello',
                                        font: 'bold'
                                    }
                                }
                            },
                            block: {
                                position: {
                                    x: 12,
                                    y: 12
                                },
                                blockSize: {
                                    width: 12,
                                    height: 12
                                },
                                elements: {
                                    elementId: 'b21',
                                    primitive: {
                                        primitiveType: {
                                            Circle: false,
                                            Triangle: true,
                                            Rectangle: false,
                                        },
                                        colourBack: '#111',
                                        colourLine: '#000'
                                    }
                                }
                            }
                        ]
                    },
                    slide: {
                        slideId: '123n4',
                        background: {
                            img: '',
                            colour: '#000'
                        },
                        blocks: [
                            block: {
                                position: {
                                    x: 12,
                                    y: 12
                                },
                                blockSize: {
                                    width: 12,
                                    height: 12
                                },
                                elements: {
                                    elementId: '234',
                                    text: {
                                        size: 12,
                                        text: 'hello',
                                        font: 'bold'
                                    }
                                }
                            },
                            block: {
                                position: {
                                    x: 12,
                                    y: 12
                                },
                                blockSize: {
                                    width: 12,
                                    height: 12
                                },
                                elements: {
                                    elementId: '123',
                                    primitive: {
                                        primitiveType: {
                                            Circle: false,
                                            Triangle: true,
                                            Rectangle: false,
                                        },
                                        colourBack: '#111',
                                        colourLine: '#000'
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        redo: [
            // список презентаций после изменений
        ]
    }
}

export type mode = {
    editor: boolean,
    view: boolean,
}

export type history = {
    undo: [
        presentation: {
            selectSlides: '0',
            selectElements: '0',
            title: 'new title',
            slides: [
                slide: {
                    slideId: '12a2',
                    background: {
                        img: '',
                        colour: '#000'
                    },
                    blocks: [
                        block: {
                            position: {
                                x: 12,
                                y: 12
                            },
                            blockSize: {
                                width: 12,
                                height: 12
                            },
                            elements: {
                                elementId: 'b12',
                                text: {
                                    size: 12,
                                    text: 'hello',
                                    font: 'bold'
                                }
                            }
                        },
                        block: {
                            position: {
                                x: 12,
                                y: 12
                            },
                            blockSize: {
                                width: 12,
                                height: 12
                            },
                            elements: {
                                elementId: 'b21',
                                primitive: {
                                    primitiveType: {
                                        Circle: false,
                                        Triangle: true,
                                        Rectangle: false,
                                    },
                                    colourBack: '#111',
                                    colourLine: '#000'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        presentation: {
            selectSlides: '0',
            selectElements: '0',
            title: 'new title',
            slides: [
                slide: {
                    slideId: '12a2',
                    background: {
                        img: '',
                        colour: '#000'
                    },
                    blocks: [
                        block: {
                            position: {
                                x: 12,
                                y: 12
                            },
                            blockSize: {
                                width: 12,
                                height: 12
                            },
                            elements: {
                                elementId: 'b12',
                                text: {
                                    size: 12,
                                    text: 'hello',
                                    font: 'bold'
                                }
                            }
                        },
                        block: {
                            position: {
                                x: 12,
                                y: 12
                            },
                            blockSize: {
                                width: 12,
                                height: 12
                            },
                            elements: {
                                elementId: 'b21',
                                primitive: {
                                    primitiveType: {
                                        Circle: false,
                                        Triangle: true,
                                        Rectangle: false,
                                    },
                                    colourBack: '#111',
                                    colourLine: '#000'
                                }
                            }
                        }
                    ]
                },
                slide: {
                    slideId: '123n4',
                    background: {
                        img: '',
                        colour: '#000'
                    },
                    blocks: [
                        block: {
                            position: {
                                x: 12,
                                y: 12
                            },
                            blockSize: {
                                width: 12,
                                height: 12
                            },
                            elements: {
                                elementId: '234',
                                text: {
                                    size: 12,
                                    text: 'hello',
                                    font: 'bold'
                                }
                            }
                        },
                        block: {
                            position: {
                                x: 12,
                                y: 12
                            },
                            blockSize: {
                                width: 12,
                                height: 12
                            },
                            elements: {
                                elementId: '123',
                                primitive: {
                                    primitiveType: {
                                        Circle: false,
                                        Triangle: true,
                                        Rectangle: false,
                                    },
                                    colourBack: '#111',
                                    colourLine: '#000'
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ],
    redo: [
        // список презентаций после изменений
    ]
}

export type presentation = {
    selectSlides: '0',
    selectElements: '0',
    title: 'new title',
    slides: [
        slide: {
            slideId: '12a2',
            background: {
                img: '',
                colour: '#000'
            },
            blocks: [
                block: {
                    position: {
                        x: 12,
                        y: 12
                    },
                    blockSize: {
                        width: 12,
                        height: 12
                    },
                    elements: {
                        elementId: 'b12',
                        text: {
                            size: 12,
                            text: 'hello',
                            font: 'bold'
                        }
                    }
                },
                block: {
                    position: {
                        x: 12,
                        y: 12
                    },
                    blockSize: {
                        width: 12,
                        height: 12
                    },
                    elements: {
                        elementId: 'b21',
                        primitive: {
                            primitiveType: {
                                Circle: false,
                                Triangle: true,
                                Rectangle: false,
                            },
                            colourBack: '#111',
                            colourLine: '#000'
                        }
                    }
                }
            ]
        },
        slide: {
            slideId: '123n4',
            background: {
                img: '',
                colour: '#000'
            },
            blocks: [
                block: {
                    position: {
                        x: 12,
                        y: 12
                    },
                    blockSize: {
                        width: 12,
                        height: 12
                    },
                    elements: {
                        elementId: '234',
                        text: {
                            size: 12,
                            text: 'hello',
                            font: 'bold'
                        }
                    }
                },
                block: {
                    position: {
                        x: 12,
                        y: 12
                    },
                    blockSize: {
                        width: 12,
                        height: 12
                    },
                    elements: {
                        elementId: '123',
                        primitive: {
                            primitiveType: {
                                Circle: false,
                                Triangle: true,
                                Rectangle: false,
                            },
                            colourBack: '#111',
                            colourLine: '#000'
                        }
                    }
                }
            ]
        }
    ]
}

export type slide = {
    slideId: '123n4',
    background: {
        img: '',
        colour: '#000'
    },
    blocks: [
        block: {
            position: {
                x: 12,
                y: 12
            },
            blockSize: {
                width: 12,
                height: 12
            },
            elements: {
                elementId: '234',
                text: {
                    size: 12,
                    text: 'hello',
                    font: 'bold'
                }
            }
        },
        block: {
            position: {
                x: 12,
                y: 12
            },
            blockSize: {
                width: 12,
                height: 12
            },
            elements: {
                elementId: '123',
                primitive: {
                    primitiveType: {
                        Circle: false,
                        Triangle: true,
                        Rectangle: false,
                    },
                    colourBack: '#111',
                    colourLine: '#000'
                }
            }
        }
    ]
}

export type background = {
    src: '',
    colour: '#000'
}

export type block = {
    position: {
        x: 12,
        y: 12
    },
    blockSize: {
        width: 12,
        height: 12
    },
    elements: {
        elementId: '123',
        primitive: {
            primitiveType: {
                Circle: false,
                Triangle: true,
                Rectangle: false,
            },
            colourBack: '#111',
            colourLine: '#000'
        }
    }
}

export type position = {
    x: 12,
    y: 12
}

export type blockSize = {
    width: 12,
    height: 12,
}

export type elements = {
    elements: {
        elementId: 1234,
        img: 'directory',
        text: {
            size: 12,
            text: 'hello',
            font: 'bold'
        },
        primitive: {
            primitiveType: {
                Circle: false,
                Triangle: true,
                Rectangle: false,
            },
            colourBack: '#111',
            colourLine: '#000'
        }
    }
}

export type text = {
    size: 12,
    text: 'hello',
    font: 'bold'
}

export type primitive = {
    primitiveType: {
        Circle: false,
        Triangle: true,
        Rectangle: false,
    },
    colourBack: '#111',
    colourLine: '#000'
}

export type primitiveType = {
    Circle: false,
    Triangle: true,
    Rectangle: false,
}