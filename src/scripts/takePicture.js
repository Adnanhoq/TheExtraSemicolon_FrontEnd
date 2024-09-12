import Webcam from './webcam-easy.js';
const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const dialog = document.getElementById("dialog");
const snapSoundElement = document.getElementById('snapSound');
const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);
const cancelButton = document.getElementById('cancel');
const profile = document.getElementById('profilePicture');

webcam.start()
   .then(result =>{
      console.log("webcam started");
   })
   .catch(err => {
       console.log(err);
   });

document.getElementById('takePicture').addEventListener('click', takePicture);

async function takePicture() {
    var image = webcam.snap();

    var scaledImg = await resizedataURL(image, 32, 32);
    var thumbnail = document.getElementById('thumbnail');
    let child = thumbnail.lastElementChild;
    while (child) {
        thumbnail.removeChild(child);
        child = thumbnail.lastElementChild;
    }

    ImageTracer.imageToSVG(
        image,
        function(svgstr) {
            ImageTracer.appendSVGString(svgstr, 'thumbnail');
        },
        'Original'
    );

    ImageTracer.imageToSVG(
        scaledImg,
        function(svgstr) {
            profile.value = svgstr;
        },
        'Original'
    )
    dialog.showModal();
}

document.getElementById('cancel').addEventListener('click',
() => dialog.close());
document.getElementById('accept').addEventListener('click',
() => dialog.close());

webcam.stop();