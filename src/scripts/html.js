import { getJsCode } from "./jscode";

export const getHtml = (url, width, height) => {
    return `
    <!doctype html>
    <html lang="en">
    
    <head>
        <meta charset="utf-8">
        <title>ABG</title>
        
    
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
    
        <style>
            *,
            *::before,
            *::after {
                box-sizing: border-box;
            }
    
            body {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                height: 100vh;
                width: 100%;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                margin: 0;
                padding: 32px 16px;
                font-family: Helvetica, Sans-Serif;
            }
    
            .signature-pad {
                position: relative;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-direction: column;
                flex-direction: column;
                font-size: 10px;
                width: 100%;
                height: 100%;
                max-width: ${width}px;
                max-height: ${height}px;
                border: 1px solid #e8e8e8;
                background-color: #fff;
                box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
                border-radius: 4px;
                padding: 16px;
            }
    
            .signature-pad::before,
            .signature-pad::after {
                position: absolute;
                z-index: -1;
                content: "";
                width: 40%;
                height: 10px;
                bottom: 10px;
                background: transparent;
                box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4);
            }
    
            .signature-pad::before {
                left: 20px;
                -webkit-transform: skew(-3deg) rotate(-3deg);
                transform: skew(-3deg) rotate(-3deg);
            }
    
            .signature-pad::after {
                right: 20px;
                -webkit-transform: skew(3deg) rotate(3deg);
                transform: skew(3deg) rotate(3deg);
            }
    
            .signature-pad--body {
                position: relative;
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
                border: 1px solid #f4f4f4;
            }
    
            canvas {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 4px;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.02) inset;
            }
    
            .signature-pad--footer {
                color: #C3C3C3;
                text-align: center;
                font-size: 1.2em;
                margin-top: 8px;
            }
    
            .signature-pad--actions {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                justify-content: space-between;
                margin-top: 8px;
            }
    
            #github img {
                border: 0;
            }
    
            #fileupload {
                display: none;
            }
    
            form {
                display: table-row;
                margin-right: 5px;
            }
    
            span[role=button] {
                display: table-cell;
                font-size: 1.2em;
            }
    
            span[role=button],
            button {
                cursor: pointer;
                background-color: #e1e1e1;
                color: #000000;
                border: none;
                padding: 8px;
                margin-bottom: 8px;
            }
        </style>
    </head>
    
    <body>
    
            <div id="signature-pad" class="signature-pad">
            <div class="signature-pad--body">
                <canvas>
                    Update your browser to support the canvas element!
                </canvas>
            </div>
            <div class="signature-pad--footer">
    
    
                <div class="signature-pad--actions">
                    <!-- <form action="#" enctype="multipart/form-data">
                        <label for="fileupload" id="buttonlabel">
                            <span role="button" aria-controls="filename" tabindex="0">
                                Choose a background image
                            </span>
                        </label>
                        <input type="file" id="fileupload" accept="image/*">
                    </form> -->
                    <div style="display:none;">
                        <button type="button" class="button clear" data-action="clear">Clear</button>
                        <button type="button" class="button" data-action="change-color">Change color</button>
                        <button type="button" class="button" data-action="undo">Undo</button>
    
                    </div>
                    <div >
                        <button type="button" class="button save" data-action="save-png">Save</button>
    
                    </div>
                </div>
            </div>
        </div>
        <script>
            ${getJsCode()}
        </script>
       
        <script>
            const wrapper = document.getElementById("signature-pad")
            const clearButton = wrapper.querySelector("[data-action=clear]")
            const changeColorButton = wrapper.querySelector("[data-action=change-color]")
            const undoButton = wrapper.querySelector("[data-action=undo]")
            const savePNGButton = wrapper.querySelector("[data-action=save-png]")
    
            const canvas = wrapper.querySelector("canvas")
            const fileSelector = document.getElementById('fileupload')
            const image_url = "${url}";
    
            
    
            const getMimeType = (signature) => {
                switch (signature) {
                    case '89504E47':
                        return 'image/png'
                    case '47494638':
                        return 'image/gif'
                    case 'FFD8FFDB':
                    case 'FFD8FFE0':
                    case 'FFD8FFE1':
                        return 'image/jpeg'
                    default:
                        return 'Not allowed filetype'
                }
            }
    
            // fileSelector.addEventListener('change', verifyAndSetPictureAsBackground, false)
    
            const signaturePad = new SignaturePad(canvas, {
                // It's Necessary to use an opaque color when saving image as JPEG
                // this option can be omitted if only saving as PNG or SVG
                backgroundColor: 'rgb(255, 255, 255)'
            })
    
            // Adjust canvas coordinate space taking into account pixel ratio,
            // to make it look crisp on mobile devices.
            // This also causes canvas to be cleared.
            const resizeCanvas = () => {
                // When zoomed out to less than 100%, for some very strange reason,
                // some browsers report devicePixelRatio as less than 1
                // and only part of the canvas is cleared then.
                const ratio = Math.max(window.devicePixelRatio || 1, 1)
    
                // This part causes the canvas to be cleared
                canvas.width = canvas.offsetWidth * ratio
                canvas.height = canvas.offsetHeight * ratio
                canvas.getContext("2d").scale(ratio, ratio)
    
                // This library does not listen for canvas changes, so after the canvas is automatically
                // cleared by the browser, SignaturePad#isEmpty might still return false, even though the
                // canvas looks empty, because the internal data of this library wasn't cleared. To make sure
                // that the state of this library is consistent with visual state of the canvas, you
                // have to clear it manually.
                signaturePad.clear()
    
            }
    
            // On mobile devices it might make more sense to listen to orientation change,
            // rather than window resize events.
            window.onresize = resizeCanvas
            resizeCanvas()
    
            const download = (dataURL, filename) => {
                const blob = dataURLToBlob(dataURL)
                const url = window.URL.createObjectURL(blob)
    
                const a = document.createElement("a")
                a.style = "display: none"
                a.href = url
                a.download = filename
    
                document.body.appendChild(a)
                a.click()
    
                window.URL.revokeObjectURL(url)
            }
    
            // One could simply use Canvas#toBlob method instead, but it's just to show
            // that it can be done using result of SignaturePad#toDataURL.
            function dataURLToBlob(dataURL) {
                // Code taken from https://github.com/ebidel/filer.js
                const parts = dataURL.split('base64,')
                const contentType = parts[0].split(":")[1]
                const raw = window.atob(parts[1])
                const rawLength = raw.length
                const uInt8Array = new Uint8Array(rawLength)
    
                for (let i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i)
                }
    
                return new Blob([uInt8Array], {
                    type: contentType
                })
            }
    
            clearButton.addEventListener("click", () => signaturePad.clear())
    
            undoButton.addEventListener("click", () => {
                const data = signaturePad.toData()
    
                if (data) {
                    data.pop() // remove the last dot or line
                    signaturePad.fromData(data)
                }
            })
    
            changeColorButton.addEventListener("click", () => {
                const r = Math.round(Math.random() * 255)
                const g = Math.round(Math.random() * 255)
                const b = Math.round(Math.random() * 255)
                const color = "rgb(" + r + "," + g + "," + b + ")"
    
                signaturePad.penColor = color
            })
    
            savePNGButton.addEventListener("click", () => {
                if (signaturePad.isEmpty()) {
                    alert("Please provide a signature first.")
                } else {
                    const dataURL = signaturePad.toDataURL()
                    
                    window.ReactNativeWebView.postMessage(dataURL)
                   
                }
            })
    
          
    
            var queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            let height = window.innerHeight;
            let width = window.innerWidth;
    
            const getBase64Image = (url) => {
                const img = new Image();
                img.setAttribute('crossOrigin', 'anonymous');
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    const dataURL = canvas.toDataURL("image/png");
                    console.log(dataURL)
                    signaturePad.fromDataURL(dataURL)
                }
                img.src = url
            }
    
    
    
           

            (function () {
                getBase64Image(image_url);
                window.addEventListener("message", message => {
                    // alert(message.data) 
                  });
              })();
        </script>
    </body>
    
    </html>
    `;
}