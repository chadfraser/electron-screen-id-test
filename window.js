// Run this function after the page has loaded
$(() => {
  const electron = require('electron')

  electron.desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
    if (error) {
      throw error;
    }
    for (let i = 0; i < sources.length; ++i) {
      if (sources[i].name.includes('Screen')) {
        console.log(`Screen name: ${sources[i].name}\nScreen ID: ${sources[i].id}`);
      }
    }
    for (let i = 0; i < sources.length; ++i) {
      if (sources[i].name.includes('Screen')) {
        console.log(`Using screen ${sources[i].id}`);
        navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: sources[i].id
            }
          }
        })
        .then((stream) => handleStream(stream))
        .catch((e) => handleError(e));
        return;
      }
    }
  })

  function handleStream (stream) {
    const video = document.querySelector('video');
    video.srcObject = stream;
    video.onloadedmetadata = (e) => video.play();
  }

  function handleError (e) {
    console.log(e);
  }
})