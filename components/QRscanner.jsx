// components/QRScanner.js
import React, { useState } from "react";
import QrScanner from "react-qr-scanner";

const QRScanner = () => {
  const [data, setData] = useState(null);
  const [scanning, setScanning] = useState(true);

  const handleError = (error) => {
    console.error("QR Code Scanner Error:", error);
  };

  const handleScan = (result) => {
    if (result) {
      setData(result.text);
      setScanning(false);
    }
  };
  const videoConstraints = {
    facingMode: "environment", // Use the back camera
  };

  return (
    <div className="rounded-md p-7 bg-nft-dark-3 dark:border-indigo-100 shadow-lg">
      {scanning && (
        <QrScanner
          videoConstraints={videoConstraints}
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
