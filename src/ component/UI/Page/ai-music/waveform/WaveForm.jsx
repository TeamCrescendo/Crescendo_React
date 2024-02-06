import {useRef, useEffect, useState} from "react";

// Function to animate the bars
function animateBars(analyser, canvas, canvasCtx, dataArray, bufferLength) {
    // Analyze the audio data using the Web Audio API's `getByteFrequencyData` method.
    analyser.getByteFrequencyData(dataArray);

    // Set the canvas fill style to black.
    canvasCtx.fillStyle = '#000';

    // Calculate the height of the canvas.
    const HEIGHT = canvas.height;

    // Calculate the width of each bar in the waveform based on the canvas width and the buffer length.
    var barWidth = Math.ceil(canvas.width / (bufferLength / 10)) * 2.6;

    // Initialize variables for the bar height and x-position.
    let barHeight;
    let x = 0;

    // Loop through each element in the `dataArray`.
    for (var i = 0; i < bufferLength; i++) {
        // Calculate the height of the current bar based on the audio data and the canvas height.
        barHeight = (dataArray[i] / 255) * HEIGHT;

// Generate random RGB values for each bar in the blue color range.
        const maximum = 50; // 최대값을 50으로 설정
        const minimum = 0; // 최소값을 0으로 설정
        var r = 0 + Math.floor(Math.random() * (maximum - minimum + 1)) + minimum; // Red component
        var g = 100 + Math.floor(Math.random() * (maximum - minimum + 1)) + minimum; // Green component
        var b = 200 + Math.floor(Math.random() * (maximum - minimum + 1)) + minimum; // Blue component

        // Set the canvas fill style to the random RGB values.
        canvasCtx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';

        // Draw the bar on the canvas at the current x-position and with the calculated height and width.
        canvasCtx.fillRect(x, HEIGHT, barWidth, -barHeight);

        // Update the x-position for the next bar.
        x += barWidth + 1;
    }
}

// Component to render the waveform
const WaveForm = ({ analyzerData }) => {
    const canvasRef = useRef(null);
    const { dataArray, analyzer, bufferLength } = analyzerData;
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const updateCanvasSize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener("resize", updateCanvasSize);
        return () => {
            window.removeEventListener("resize", updateCanvasSize);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext("2d");

        const animate = () => {
            requestAnimationFrame(animate);
            canvas.width = width;
            canvas.height = height;
            animateBars(analyzer, canvas, canvasCtx, dataArray, bufferLength);
        };

        animate();
    }, [dataArray, analyzer, bufferLength, width, height]);

    return (
        <canvas
            style={{
                // background: "gray",
                // position: "absolute",
                // bottom: "-10%",
                // left: "0",
                // transform: "translateX(60%)",
                zIndex: "0",
                width: `100%`,
                height: `100%`,
                // marginBottom: "14px"
            }}
            ref={canvasRef}
        />
    );
};


export default WaveForm;