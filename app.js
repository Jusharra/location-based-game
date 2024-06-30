// Geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("location").innerText = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.getElementById("location").innerText = `Latitude: ${lat}, Longitude: ${lon}`;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("location").innerText = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location").innerText = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("location").innerText = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location").innerText = "An unknown error occurred.";
            break;
    }
}

// QR Code Scanner
function onScanSuccess(decodedText, decodedResult) {
    // Handle the decoded text
    document.getElementById("qr-result").innerText = `QR Code detected: ${decodedText}`;
}

function onScanFailure(error) {
    // Handle scan failure, usually better to ignore and keep scanning
    console.warn(`QR error = ${error}`);
}

// Create the QR code scanner
const html5QrCode = new Html5Qrcode("reader");

// Start scanning for QR codes
html5QrCode.start(
    { facingMode: "environment" }, // Use rear camera
    {
        fps: 10,    // Scans per second
        qrbox: { width: 250, height: 250 }  // QR code scanning box dimensions
    },
    onScanSuccess,
    onScanFailure
).catch(err => {
    console.error(`Unable to start scanning, error: ${err}`);
});
