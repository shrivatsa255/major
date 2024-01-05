// components/QRScanner.js
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

const QRScanner = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const onScanSuccess = (decodedText, decodedResult) => {
      // handle the scanned code as you like, for example:
      setData(decodedText);
      console.log(`Code matched = ${decodedText}`, decodedResult);
      html5QrcodeScanner.clear();
    };

    let config = {
      fps: 10,
      qrbox: { width: 200, height: 200 },
      rememberLastUsedCamera: false,
      // Only support camera scan type.
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    };

    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      config,
      /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess);
  }, []);

  return (
    <div id="reader">
      {`Contract Address : ${data}`}
    </div>
  );
};

export default QRScanner;
