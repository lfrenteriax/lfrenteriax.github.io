const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const resultado = document.getElementById("resultado");

let model;

// Iniciar cámara trasera
navigator.mediaDevices.getUserMedia({
  video: { facingMode: "environment" }
}).then(stream => {
  video.srcObject = stream;
});

// Cargar modelo COCO-SSD
cocoSsd.load().then(m => {
  model = m;
  detectar();
});

async function detectar() {
  if (!model || video.videoWidth === 0) {
    requestAnimationFrame(detectar);
    return;
  }

  const vw = video.videoWidth;
  const vh = video.videoHeight;

  const vertical = window.innerHeight > window.innerWidth;

  if (vertical) {
    canvas.width = vh;
    canvas.height = vw;
  } else {
    canvas.width = vw;
    canvas.height = vh;
  }

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (vertical) {
    // Rotar video 90° para Android
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(90 * Math.PI / 180);
    ctx.drawImage(video, -vw / 2, -vh / 2, vw, vh);
  } else {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  }

  ctx.restore();

  // Detectar semáforos sobre el canvas ya orientado
  const predictions = await model.detect(canvas);
  const semaforos = predictions.filter(p => p.class === "traffic light");

  if (semaforos.length === 0) {
    resultado.innerText = "No se detecta semáforo peatonal";
  }

  semaforos.forEach(s => {
    const [x, y, w, h] = s.bbox;

    ctx.strokeStyle = "cyan";
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, w, h);

    const estado = detectarColorPeatonal(x, y, w, h);
    resultado.innerText = `Peatón: ${estado}`;
  });

  requestAnimationFrame(detectar);
}

// Detectar color del semáforo peatonal (rojo / verde)
function detectarColorPeatonal(x, y, w, h) {
  const data = ctx.getImageData(x, y, w, h).data;
  let rojo = 0;
  let verde = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (r > 150 && g < 100 && b < 100) rojo++;
    if (g > 150 && r < 100 && b < 100) verde++;
  }

  return verde > rojo ? "🟢 PUEDE CRUZAR" : "🔴 NO CRUZAR";
}
