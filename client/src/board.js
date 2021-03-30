import { useEffect, useState, useRef } from "react";
import { Stage, Layer, Image, Transformer } from "react-konva";
import Konva from "konva";

import Selection from "./category";
import { SwatchesPicker } from "react-color";
import FormButtons from "./formbuttons";

export default function Canvas() {
    const imageRef = useRef(null);
    const scaleRef = useRef(null);
    const stageRef = useRef(null);
    const containerRef = useRef(null);
    const trRef = useRef(null);
    const [colour, setColour] = useState("#fff");
    const [patternBg, setPatternBg] = useState(null);
    const [stageHeight, setStageHeight] = useState(600);
    const [stageWidth, setStageWidth] = useState(1000);
    const [containerWidth, setContainerWidth] = useState(null);
    const [, setContainerHeight] = useState(null);

    //______________________________________________________

    function handleLoad() {
        setImageArray((selectedImage) => [
            ...selectedImage,
            {
                image: imageRef.current,
                x: 0,
                y: 0,
                width: this.width,
                height: this.height,
                PicVisible: false,
                fill: "white",
                fillPatternImage: null,
            },
        ]);
    }

    const [imageArray, setImageArray] = useState([]);

    let updateImage;
    let newImageState;
    let stateCopy = [...imageArray];

    function updatePosition(i, e) {
        let pos = e.target.attrs;
        let currX = pos.x;
        let currY = pos.y;
        updateImage = imageArray[i];
        updateImage.x = currX;
        updateImage.y = currY;

        newImageState = imageArray.map((img, idx) => {
            if (idx == i) {
                return updateImage;
            } else {
                return img;
            }
        });

        setImageArray(newImageState);
    }

    useEffect(() => {
        setContainerHeight(containerRef.current.clientHeight);
        setContainerWidth(containerRef.current.clientWidth);
    }, [containerWidth]);
    useEffect(() => {
        responsiveStage();
    }, [stageWidth]);

    function loadImage(src, name, id) {
        const img = new window.Image();
        img.src = src;
        img.name = name;
        img.id = id;
        img.crossOrigin = "Anonymous";
        imageRef.current = img;
        imageRef.current.addEventListener("load", handleLoad);
        console.log("img: ", img);
    }

    function getImage(e) {
        loadImage(e.target.src, e.target.name, e.target.id);
    }

    function updateSize(i, e) {
        const node = e.target.attrs;
        updateImage = imageArray[i];
        node.image.height = node.image.height * node.scaleY;
        node.image.width = node.image.width * node.scaleX;

        newImageState = imageArray.map((img, idx) => {
            if (idx == i) {
                return updateImage;
            } else {
                return img;
            }
        });

        setImageArray(newImageState);
    }
    //_____________________________________________________________________

    const [PicVisible, setPicVisible] = useState();
    const [PicSelected, setPicSelected] = useState();
    function editImg(i, e) {
        e.cancelBubble = true;
        setPicSelected(i);
        if (i >= 0) {
            setPicVisible(true);
        }

        updateImage = imageArray[i];
        newImageState = imageArray.map((img, idx) => {
            if (idx == i) {
                return { ...updateImage, PicVisible: false };
            } else {
                return { ...img, PicVisible: true };
            }
        });
        setImageArray(newImageState);
        trRef.current.nodes([e.currentTarget]);
        trRef.current.getLayer().batchDraw();
    }
    function randomColour() {
        setColour(Konva.Util.getRandomColor());
        imageArray[PicSelected];
        newImageState = imageArray.map((img, idx) => {
            if (idx == PicSelected) {
                return {
                    ...img,
                    fill: colour,
                };
            } else {
                return img;
            }
        });
        setImageArray(newImageState);
    }

    function pickColour(colour) {
        imageArray[PicSelected];

        newImageState = imageArray.map((img, idx) => {
            if (idx == PicSelected) {
                setPatternBg(null);
                return {
                    ...img,
                    fill: colour.hex,
                };
            } else {
                return img;
            }
        });
        setImageArray(newImageState);
    }

    function removeItem() {
        stateCopy.splice(PicSelected, 1);
        setImageArray(stateCopy);
    }

    function responsiveStage() {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const scaleX = containerWidth / stageWidth;
        const scaleY = containerHeight / stageHeight;
        setStageWidth(stageWidth * scaleX);
        setStageHeight(stageHeight * scaleY);
    }

    return (
        <div className="container">
            <Selection getImage={getImage} />
            <div className="canvas_container" ref={containerRef}>
                <Stage
                    ref={stageRef}
                    width={stageWidth}
                    height={stageHeight}
                    onClick={() => {
                        {
                            setPicSelected(null), setPicVisible(false);
                        }
                    }}
                >
                    {imageArray &&
                        imageArray.map((img, i) => {
                            return (
                                <Layer key={i}>
                                    <Image
                                        onClick={(e) => {
                                            editImg(i, e);
                                        }}
                                        x={img.x}
                                        y={img.y}
                                        image={img.image}
                                        name={img.name}
                                        id={img.id}
                                        fill={img.fill}
                                        draggable
                                        onDragEnd={(e) => {
                                            updatePosition(i, e);
                                        }}
                                        ref={scaleRef}
                                        onTransform={(e) => {
                                            updateSize(i, e);
                                        }}
                                        setPicSelected={i === PicSelected}
                                        onSelect={() => {
                                            setPicSelected(i);
                                        }}
                                        fillPatternImage={img.fillPatternImage}
                                    />
                                    {i == PicSelected && (
                                        <Transformer ref={trRef} key={i} />
                                    )}
                                </Layer>
                            );
                        })}
                </Stage>
            </div>
            <div className="fill_menu">
                <h3 className="menu_header">select a tattoo color:</h3>

                <button onClick={randomColour}>Random Colour</button>
                <br></br>
            </div>
            <SwatchesPicker className="box" onChange={pickColour} />
            {PicVisible && (
                <div className="toolkit">
                    <button id="remove" onClick={removeItem}>
                        Remove Item
                    </button>
                </div>
            )}
            <FormButtons stageRef={stageRef} patternBg={patternBg} />
        </div>
    );
}
