// components/QRScanner.js
import React, { useState, useEffect, useRef } from "react";
import QrScanner from "react-qr-scanner";

const QRScanner = () => {
  const [data, setData] = useState(null);
  const [scanning, setScanning] = useState(true);
  const [availableCameras, setAvailableCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);

  const videoRef = useRef();

  const handleError = (error) => {
    console.error("QR Code Scanner Error:", error);
  };

  const handleScan = (result) => {
    if (result) {
      setData(result.text);
      setScanning(false);
    }
  };

  const getAvailableCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");
      setAvailableCameras(cameras);
      if (cameras.length > 0) {
        setSelectedCamera(cameras[0].deviceId);
      }
    } catch (error) {
      console.error("Error getting available cameras:", error);
    }
  };

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
    setScanning(true);
  };

  useEffect(() => {
    getAvailableCameras();
  }, []);

  useEffect(() => {
    if (selectedCamera && videoRef.current) {
      // Stop the existing stream if any
      videoRef.current.srcObject?.getTracks().forEach((track) => track.stop());

      // Start a new stream with the selected camera
      navigator.mediaDevices
        .getUserMedia({
          video: { deviceId: selectedCamera },
        })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
        });
    }
  }, [selectedCamera]);

  return (
    <div className="rounded-md p-7 bg-nft-dark-3 dark:border-indigo-100 shadow-lg">
      {availableCameras.length > 1 && (
        <div className="mb-4">
          <label htmlFor="cameraSelect" className="text-white">
            Choose Camera:
          </label>
          <select
            id="cameraSelect"
            className="ml-2 p-2 border rounded-md"
            value={selectedCamera}
            onChange={handleCameraChange}
          >
            {availableCameras.map((camera) => (
              <option key={camera.deviceId} value={camera.deviceId}>
                {camera.label || `Camera ${camera.deviceId.slice(-1)}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {scanning && (
        <QrScanner
          videoConstraints={{ facingMode: "environment" }} // Use the front camera by default
          onScan={handleScan}
          onError={handleError}
          style={{ width: "100%" }}
          ref={videoRef}
        />
      )}
      {data && !scanning && <p>{`Contract Address: ${data}`}</p>}
    </div>
  );
};

export default QRScanner;
