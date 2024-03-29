const scanButton = document.getElementById('scanButton');
const resultDiv = document.getElementById('result');

scanButton.addEventListener('click', async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
  const video = document.createElement('video');
  document.body.appendChild(video);
  video.srcObject = stream;
  await video.play();

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  requestAnimationFrame(scan);

  function scan() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    });
    if (code) {
      resultDiv.innerText = `QR Code Detected: ${code.data}`;
    }
    requestAnimationFrame(scan);
  }
});
