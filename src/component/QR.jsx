import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import Trc20svg from '../asset/BEP20.svg'

const QR = ({address}) => {
    // Create a ref to store the container where the QR code will be appended
    const qrCodeRef = useRef(null);

    useEffect(() => {
        // Create the QRCodeStyling instance with enhanced design
        const qrCode = new QRCodeStyling({
            width: 200,
            height: 200,
            data: address, // The data for the QR code (e.g., URL, text)
            image: Trc20svg, // Optional logo to include in the center of the QR code
            dotsOptions: {
                type: "extra-rounded", // Dot type: extra-rounded for smoother dots
                gradient: {
                    type: "linear", // Gradient type (linear)
                    rotation: 0, // Direction of the gradient (0 is top to bottom)
                    colorStops: [
                        { offset: 0, color: "#d49600" }, // Yellow at the start
                        { offset: 0, color: "#d49600" }, // Yellow at the start
                        { offset: 1, color: "#000000" }, // Black at the end
                    ],
                },
            },
            backgroundOptions: {
                color: "#ffffff", // Make the background transparent to allow the gradient to show

            },
            cornersSquareOptions: {
                type: "extra-rounded",
                gradient: {
                    type: "linear", // Gradient type (linear)
                    rotation: 0, // Direction of the gradient (0 is top to bottom)
                    colorStops: [
                        { offset: 0, color: "#d49600" }, // Yellow at the start
                        { offset: 1, color: "#000000" },
                    ],
                },
            },
            cornersDotsOptions: {
                gradient: {
                    type: "linear", // Gradient type (linear)
                    rotation: 0, // Direction of the gradient (0 is top to bottom)
                    colorStops: [
                        { offset: 0, color: "#d49600" }, // Red at the start
                        { offset: 1, color: "#000000" },
                    ],
                },
            },
            imageOptions: {
                hideBackgroundDots: true, // Option to hide background dots behind the logo
                imageSize: 0.5, // Size of the logo as a percentage of the QR code
            },
        });

        // Append the QR code to the element referenced by qrCodeRef
        if (qrCodeRef.current) {
            qrCode.append(qrCodeRef.current);
        }

        // Cleanup function to remove the QR code when the component unmounts
        return () => {
            if (qrCodeRef.current) {
                // Instead of clearing the innerHTML, we can remove the child elements (QR code SVG)
                while (qrCodeRef.current.firstChild) {
                    qrCodeRef.current.removeChild(qrCodeRef.current.firstChild);
                }
            }
        };
    }, []);

    return (
        <div style={{ margin: '0 auto' }} ref={qrCodeRef}></div>
    );
};

export default QR;

