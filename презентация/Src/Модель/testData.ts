export type Editor = {
    mode: {
        editor: true,
        view: false,
    },
    presentation: {
        selectslides: 1234,
        selectElements: 1234,
        title: 'new title',
        slides: [
            {
                slide: {
                    randomId: 1234,
                    background: {
                        img: 'directory',
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
                                type: {
                                    type: 'circle',
                                    colourback: '#111',
                                    colourline: '#000'
                                }
                            }
                        }
                    }
                },

            },
            {
                slide: {
                    randomId: 34,
                    background: {
                        img: 'directory',
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
                            elementId: 14,
                            img: 'directory',
                            text: {
                                size: 12,
                                text: 'hello',
                                font: 'bold'
                            },
                            primitive: {
                                type: {
                                    type: 'circle',
                                    colourback: '#111',
                                    colourline: '#000'
                                }
                            }
                        }
                    }
                },

            },

        ]
    },
    commandsHistory: {
        undo: [
            presentation: {
                selectslides: 1234,
                selectElements: 1234,
                title: 'new title',
                slides: [
                    {
                        slide: {
                            randomId: 1234,
                            background: {
                                img: 'directory',
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
                                        type: {
                                            type: 'circle',
                                            colourback: '#111',
                                            colourline: '#000'
                                        }
                                    }
                                }
                            }
                        },

                    }

                ]
            },
            presentation: {
                selectslides: 1234,
                selectElements: 1234,
                title: 'new title',
                slides: [
                    {
                        slide: {
                            randomId: 1234,
                            background: {
                                img: 'directory',
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
                                        type: {
                                            type: 'circle',
                                            colourback: '#111',
                                            colourline: '#000'
                                        }
                                    }
                                }
                            }
                        },

                    },
                    {
                        slide: {
                            randomId: 34,
                            background: {
                                img: 'directory',
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
                                    elementId: 14,
                                    img: 'directory',
                                    text: {
                                        size: 12,
                                        text: 'hello',
                                        font: 'bold'
                                    },
                                    primitive: {
                                        type: {
                                            type: 'circle',
                                            colourback: '#111',
                                            colourline: '#000'
                                        }
                                    }
                                }
                            }
                        },

                    },

                ]
            },
        ],
        redo: [
            // список презентаций после изменений
        ]
    }
}

export type PresentationMode = "editor" | "show"

export type history = {
        undo: [
            presentation: {
                selectslides: 1234,
                selectElements: 1234,
                title: 'new title',
                slides: [
                    {
                        slide: {
                            randomId: 1234,
                            background: {
                                img: 'directory',
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
                                        type: {
                                            type: 'circle',
                                            colourback: '#111',
                                            colourline: '#000'
                                        }
                                    }
                                }
                            }
                        },

                    }

                ]
            },
            presentation: {
                selectslides: 1234,
                selectElements: 1234,
                title: 'new title',
                slides: [
                    {
                        slide: {
                            randomId: 1234,
                            background: {
                                img: 'directory',
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
                                        type: {
                                            type: 'circle',
                                            colourback: '#111',
                                            colourline: '#000'
                                        }
                                    }
                                }
                            }
                        },

                    },
                    {
                        slide: {
                            randomId: 34,
                            background: {
                                img: 'directory',
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
                                    elementId: 14,
                                    img: 'directory',
                                    text: {
                                        size: 12,
                                        text: 'hello',
                                        font: 'bold'
                                    },
                                    primitive: {
                                        type: {
                                            type: 'circle',
                                            colourback: '#111',
                                            colourline: '#000'
                                        }
                                    }
                                }
                            }
                        },

                    },

                ]
            },
        ],
        redo: [
            // список презентаций после изменений
        ]
}

export type presentation = {
        selectslides: 1234,
        selectElements: 1234,
        title: 'new title',
        slides: [
            {
                slide: {
                    randomId: 1234,
                    background: {
                        img: 'directory',
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
                                type: {
                                    type: 'circle',
                                    colourback: '#111',
                                    colourline: '#000'
                                }
                            }
                        }
                    }
                },

            },
            {
                slide: {
                    randomId: 34,
                    background: {
                        img: 'directory',
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
                            elementId: 14,
                            img: 'directory',
                            text: {
                                size: 12,
                                text: 'hello',
                                font: 'bold'
                            },
                            primitive: {
                                type: {
                                    type: 'circle',
                                    colourback: '#111',
                                    colourline: '#000'
                                }
                            }
                        }
                    }
                },

            },

        ]
}

export type slide = {
        randomId: 1234,
        background: {
            src: 'directory',
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
                    type: {
                        type: 'circle',
                        colourback: '#111',
                        colourline: '#000'
                    }
                }
            }
        }
}

export type background = {
    src: 'directory',
    colour: '#000'
}

export type block = {
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
            type: {
                type: 'circle',
                colourback: '#111',
                colourline: '#000'
            }
        }
    }
}

export type position = {  
        x: 12,
        y: 12  
}

export type blockSize = {
    widht: 12,
    height: 12
}

export type elements = {
    elemets: {
        elementId: 1234,
        img: 'directory',
        text: {
            size: 12,
            text: 'hello',
            font: 'bold'
        },
        primitive: {
            type: {
                type: 'circle',
                colourback: '#111',
                colourline: '#000'
            }
        }
    }
}

export type text = {
    size: 12,
    text: 'hello',
    font: 'bold'
}

export type primitive = {
    type: 'circle',
    colourback: '#111',
    colourline: '#000'
}
