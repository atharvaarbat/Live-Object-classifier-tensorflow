'use client'
import Image from "next/image";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import React, { useRef, useState, useEffect } from "react";
import { drawRect } from "./utilities";

export default function Home() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [objects, setObjects] = useState([]);
    const [net, setNet] = useState(null);
    const [detectionInterval, setDetectionInterval] = useState(null);
    const [detectionFrequency, setDetectionFrequency] = useState(1000);

    // Load the model
    useEffect(() => {
        const loadModel = async () => {
            const net = await cocossd.load();
            setNet(net);
        };
        loadModel();
    }, []);

    // Start detection
    const startDetection = () => {
        if (net) {
            const intervalId = setInterval(() => {
                detect(net);
            }, detectionFrequency);
            setDetectionInterval(intervalId);
        }
    };

    // Stop detection
    const stopDetection = () => {
        if (detectionInterval) {
            clearInterval(detectionInterval);
            setDetectionInterval(null);
        }
    };

    // Detect objects
    const detect = async (net) => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const obj = await net.detect(video);
            setObjects(obj);

            const ctx = canvasRef.current.getContext("2d");
            drawRect(obj, ctx);
        }
    };

    return (
        <div className="App h-screen w-screen flex items-center justify-center bg-gray-100 text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 h-[80%] w-full gap-6 lg:max-w-6xl p-4">
                <div className="flex flex-col bg-white p-10 rounded-3xl ">
                    <h1 className="text-3xl font-bold mb-4">Object Classifier</h1>
                    <p>Made with ❤️ by Atharva Arbat</p>
                    <p className="text-lg mb-4">Detect objects in your image</p>
                    <div className="flex mb-4">
                        <button
                            onClick={startDetection}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600"
                            disabled={!!detectionInterval}
                        >
                            Start Detection
                        </button>
                        <button
                            onClick={stopDetection}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            disabled={!detectionInterval}
                        >
                            Stop Detection
                        </button>
                        <select
                            className="ml-2 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                            value={detectionFrequency}
                            onChange={(e) => setDetectionFrequency(Number(e.target.value))}
                        >
                            <option value={1000}>1 second</option>
                            <option value={500}>500 milliseconds</option>
                            <option value={250}>250 milliseconds</option>
                            <option value={100}>100 milliseconds</option>
                        </select>
                    </div>
                    <div className="overflow-y-auto max-h-[60vh]">
                        {objects.map((obj, index) => (
                            <div className="p-4 mb-4 border rounded-lg shadow-sm" key={index}>
                                <strong className="mr-1">Class:</strong>
                                <span className="font-bold">{obj.class}</span>
                                <br />
                                <strong className="mr-1">Confidence:</strong>
                                <span className="font-bold">{Math.round(obj.score * 100)}%</span>
                                <br />
                                <strong className="mr-1">Position:</strong>
                                <br />
                                X-start: {obj.bbox[0]} <br />Y-start: {obj.bbox[1]}
                                <br />
                                X-end: {obj.bbox[2]} <br />Y-end: {obj.bbox[3]}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col h-full justify-center items-center">
                    <div className="relative h-[340px] md:h-full w-full">
                        <Webcam
                            ref={webcamRef}
                            muted={true}
                            className="absolute left-0 right-0 z-10 w-full h-full object-cover rounded-3xl"
                        />
                        <canvas
                            ref={canvasRef}
                            className="absolute left-0 right-0 z-20 w-full h-full object-cover rounded-3xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

