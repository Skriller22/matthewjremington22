console.log('CodeGenerator.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const urlInput = document.getElementById('urlInput');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const qrCodeContainer = document.getElementById('qrcode');

    function isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }

    function getCurrentDateFormatted() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}-${day}-${year}`;
    }

    // Add click event listener to the "Generate" button
    generateBtn.addEventListener('click', () => {
        console.log('Generate button clicked');
        const url = urlInput.value.trim(); // Get the URL from the input field

        // Clear any existing QR code
        qrCodeContainer.innerHTML = '';
        downloadBtn.style.display = 'none';

        if (url && isValidURL(url)) {
            // Create a canvas element
            const canvas = document.createElement('canvas');
            qrCodeContainer.appendChild(canvas);

            // Generate QR code using the qrcode.js library
            QRCode.toCanvas(canvas, url, {
                width: 300, // Set the size of the QR code
                margin: 2,  // Add some margin around the QR code
            }, (error) => {
                if (error) {
                    console.error('Error generating QR code:', error);
                } else {
                    console.log('QR code generated successfully!');
                    downloadBtn.style.display = 'block';
                }
            });
        } else {
            alert('Please enter a valid URL!');
        }
    });

    // Add click event listener to the "Download" button
    downloadBtn.addEventListener('click', () => {
        const canvas = qrCodeContainer.querySelector('canvas');
        if (canvas) {
            const confirmDownload = confirm('Would you like to download the QR code image?');
            if (confirmDownload) {
                const dataURL = canvas.toDataURL('image/jpeg');
                const link = document.createElement('a');
                link.href = dataURL;
                const currentDate = getCurrentDateFormatted();
                link.download = `qrcode_${currentDate}.jpg`;
                link.click();
            }
        }
    });
});
