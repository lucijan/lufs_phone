# lufs_phone
Max patch to stream an LUFS meter to a phone

Should work with iOS and Android or any modern webbrowser.

## What?
A Max/MSP patch that runs a webserver and pushes LUFS meter updates to the phone using websockets.
Features an adjustable target mark.

## How to run?
After opening the patch for the first time click the "script npm install" button.
Set the desired input channels in the "adc~" object and save the patch.
You should now be able to access the meter on http://localhost:8000

![IMG_54BEB9DA1065-1](https://github.com/lucijan/lufs_phone/assets/101366/2604b7cd-3c8f-4b2a-9b8c-0552617b470b)

