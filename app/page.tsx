"use client"

import React, {useEffect, useRef, useState} from 'react';
import {VideoAscii, ArtTypeEnum} from 'video-stream-ascii';
import Webcam from 'react-webcam';
import ClipLoader from 'react-spinners/ClipLoader';

const CameraAsciiPanel = () => {
    const [charsPerLine, setCharsPerLine] = useState(100);
    const [charsPerColumn, setCharsPerColumn] = useState(0);
    const [useColor, setUseColor] = useState(false);
    const preTagRef = useRef<HTMLPreElement>(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const videoRef = useRef<Webcam>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    const calculateDimensions = () => {
        if (parentRef.current) {
            const { clientWidth, clientHeight } = parentRef.current;
            const aspectRatio = clientWidth / clientHeight;
            const newCharsPerLine = Math.floor(clientWidth / 8); // Assuming 8px per character
            setCharsPerLine(newCharsPerLine);
            setCharsPerColumn(Math.floor(newCharsPerLine / aspectRatio));
        }
    };

    const handleUserMedia = (stream: MediaStream) => {
        const video = videoRef.current!.video!;
        video.srcObject = stream;
        video.onloadedmetadata = async () => {
            await video.play();
            calculateDimensions();
            setIsCameraReady(true);
        };
    };

    useEffect(() => {
        calculateDimensions();
        window.addEventListener('resize', calculateDimensions);
        return () => window.removeEventListener('resize', calculateDimensions);
    }, []);

    const toggleColorMode = () => {
        setUseColor(!useColor);
    };

    return (
        <main className='h-full w-full overflow-hidden bg-black'>
            <div ref={parentRef} className='h-screen w-screen'>
                <Webcam ref={videoRef}
                    style={{width: 0, height: 0, position: 'absolute', top: 0, left: 0}}
                    onUserMedia={handleUserMedia}
                />
                {isCameraReady ? (
                    <VideoAscii
                        videoStreaming={videoRef.current!.video!}
                        parentRef={parentRef}
                        charsPerLine={charsPerLine}
                        charsPerColumn={charsPerColumn}
                        fontColor={'white'}
                        backgroundColor={'black'}
                        preTagRef={preTagRef}
                        artType={useColor ? ArtTypeEnum.ASCII_COLOR_BG_IMAGE : ArtTypeEnum.ASCII}
                        flipY={true}
                    />
                ) : (
                  <div className="flex min-h-screen flex-col items-center justify-center p-24">
                  <ClipLoader
                    color={"#ffffff"}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
                )}
            </div>
        </main>
    );
};

export default CameraAsciiPanel;