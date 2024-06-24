## Object Classifier Documentation

### Introduction
The Object Classifier project uses a combination of TensorFlow.js, COCO-SSD model, React, and Tailwind CSS to detect and classify objects in real-time using a webcam. This documentation will guide you through the setup, code structure, and key functionalities of the project.



### Project Setup

#### Prerequisites
- Node.js installed on your machine.
- A package manager like npm or yarn.

#### Installation
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/atharvaarbat/Live-Object-classifier-tensorflow.git
   cd Live-Object-classifier-tensorflow
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```

3. **Start the Development Server:**
   ```sh
   npm run dev
   ```


### Main Components
The project consists of the following key components:

1. **Webcam and Canvas:**
   - Used to capture real-time video and display detection results.

2. **Buttons and Dropdown:**
   - Start and stop detection buttons.
   - A dropdown to select detection frequency.

3. **Object List:**
   - Displays the detected objects with their class, confidence, and position.

### Detection Logic

#### Loading the Model
The COCO-SSD model is loaded using TensorFlow.js in the `useEffect` hook:
```jsx
useEffect(() => {
    const loadModel = async () => {
        const net = await cocossd.load();
        setNet(net);
    };
    loadModel();
}, []);
```

#### Starting and Stopping Detection
Detection is controlled using `setInterval` and `clearInterval` functions:
```jsx
const startDetection = () => {
    if (net) {
        const intervalId = setInterval(() => {
            detect(net);
        }, detectionFrequency);
        setDetectionInterval(intervalId);
    }
};

const stopDetection = () => {
    if (detectionInterval) {
        clearInterval(detectionInterval);
        setDetectionInterval(null);
    }
};
```

#### Object Detection
The `detect` function performs object detection and updates the canvas with bounding boxes:
```jsx
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
```

