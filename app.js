const modelParams = {
  flipHorizontal: false, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 1, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.89, // confidence threshold for predictions.
};

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;
// handTrack.load(modelParams).then((model) => {});

//Select everything from html

const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
let model;

handTrack.startVideo(video).then((status) => {
  if (status) {
    navigator.getUserMedia(
      { video: {} },
      (stream) => {
        video.srcObject = stream;

        setInterval(runDetection, 300);
      },
      (err) => console.log(err)
    );
  }
});

function runDetection() {
  model.detect(video).then((predictions) => {
    if (predictions.length != 0) {
      let hand1 = predictions[0].bbox;
      let x = hand1[0];
      let y = hand1[1];

      if (y > 200) {
        if (x < 150) {
          audio.src = 'A.mp3';
          console.log('a');
        }
        //   else if (x > 400) {
        //     audio.src = 'Ds.mp3';
        //     console.log('ds');
        //   }
        else if (x > 350) {
          audio.src = 'E.mp3';
          console.log('E');
        } else if (x > 250) {
          audio.src = 'C.mp3';
          console.log('c');
        } else if (x > 150) {
          audio.src = 'B.mp3';
          console.log('b');
        }
        console.log(y);
        console.log(x);
        audio.play();
      }
    }
  });
}

handTrack.load(modelParams).then((lmodel) => {
  model = lmodel;
});
