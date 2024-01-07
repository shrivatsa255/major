// components/QRScanner.js
import React, { useState, useEffect } from "react";
import QrScanner from "react-qr-scanner";

const QRScanner = () => {
  const [data, setData] = useState(null);
  const [scanning, setScanning] = useState(true);
  const [availableCameras, setAvailableCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("environment"); // Default to back camera

  const handleError = (error) => {
    console.error("QR Code Scanner Error:", error);
  };

  const handleScan = (result) => {
    if (result) {
      setData(result.text);
      setScanning(false);
    }
  };

  const getAvailableCameras = () => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cameras = devices.filter((device) => device.kind === "videoinput");
      setAvailableCameras(cameras);
    });
  };

  useEffect(() => {
    getAvailableCameras();
  }, []);

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
    setScanning(true);
  };

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
            <option value="user">Front Camera</option>
            <option value="environment">Back Camera</option>
          </select>
        </div>
      )}

      {scanning && (
        <QrScanner
          facingMode={selectedCamera}
          onScan={handleScan}
          onError={handleError}
          style={{ width: "100%" }}
        />
      )}
      {data && !scanning && <p>{`Contract Address: ${data}`}</p>}
    </div>
  );
};

export default QRScanner;
