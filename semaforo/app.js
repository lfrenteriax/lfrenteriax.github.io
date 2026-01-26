const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const resultado = document.getElementById("resultado");

let model;
let ultimoEstado = "";

const sonidoRojo = new Audio("alerta.mp3");
sonidoRojo.preload = "auto";

// Cámara
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
  .then(stream => {
    video.srcObject = stream;
    video.onloadedmetadata = async () => {
      // Ajustar canvas al tamaño real del video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      model = await cocoSsd.load();
      resultado.innerText = "Detectando...";
      detectar();
    };
  });

async function detectar() {
  if (!model || video.videoWidth === 0) {
    requestAnimationFrame(detectar);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar video en canvas como fondo
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const predictions = await model.detect(canvas);
  const semaforos = predictions.filter(p => p.class === "traffic light");

  if (semaforos.length === 0) {
    resultado.innerText = "No se detecta semáforo";
    ultimoEstado = "";
  }

  semaforos.forEach(s => {
    const [x, y, w, h] = s.bbox;

    ctx.strokeStyle = "cyan";
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, w, h);

    const estado = detectarColorPeatonal(x, y, w, h);
    resultado.innerText = `Peatón: ${estado}`;

    if (estado.includes("NO CRUZAR") && ultimoEstado !== "ROJO") {
      sonidoRojo.play();
      ultimoEstado = "ROJO";
    }

    if (estado.includes("PUEDE CRUZAR")) {
      ultimoEstado = "VERDE";
    }
  });

  requestAnimationFrame(detectar);
}

function detectarColorPeatonal(x, y, w, h) {
  const data = ctx.getImageData(x, y, w, h).data;
  let rojo = 0, verde = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (r > 150 && g < 100 && b < 100) rojo++;
    if (g > 150 && r < 100 && b < 100) verde++;
  }

  return verde > rojo ? "🟢 PUEDE CRUZAR" : "🔴 NO CRUZAR";
}
