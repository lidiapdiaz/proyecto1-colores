"use strict";
window.addEventListener("load", iniciarJuego);

const cajas_colores = [
  { rojo: "rgb(255, 0, 0)" },
  { verde: "rgb(0, 255, 0)" },
  { azul: "rgb(0, 0, 255)" },
];

let codigoCorrecto;
let aciertos = 0;
let fallos = 0;

function iniciarJuego() {
  generarCodigo();
  generarColores();
  asignarEventos();
}

function generarCodigo() {
  const codigoElemento = document.getElementById("codigo");
  const codigo = generarCodigoRGB();
  codigoElemento.textContent = codigo;
  codigoCorrecto = codigo;
}

function generarCodigoRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `(${r}, ${g}, ${b})`;
}

function generarColores() {
  const caja1 = document.getElementById("caja1");
  const caja2 = document.getElementById("caja2");
  const caja3 = document.getElementById("caja3");

  const colores = obtenerColoresAleatorios();
  caja1.style.backgroundColor = colores[0];
  caja2.style.backgroundColor = colores[1];
  caja3.style.backgroundColor = colores[2];
}

function obtenerColoresAleatorios() {
  const coloresAleatorios = [];
  const coloresDisponibles = [...cajas_colores];
  const indiceCorrecto = Math.floor(Math.random() * 3);
  coloresAleatorios[indiceCorrecto] = codigoCorrecto;

  for (let i = 0; i < 3; i++) {
    if (i !== indiceCorrecto) {
      const indice = Math.floor(Math.random() * coloresDisponibles.length);
      coloresAleatorios[i] = Object.values(coloresDisponibles[indice])[0];
      coloresDisponibles.splice(indice, 1);
    }
  }

  return coloresAleatorios;
}

function asignarEventos() {
  const caja1 = document.getElementById("caja1");
  const caja2 = document.getElementById("caja2");
  const caja3 = document.getElementById("caja3");

  caja1.addEventListener("click", function () {
    verificarRespuesta(caja1.style.backgroundColor);
  });

  caja2.addEventListener("click", function () {
    verificarRespuesta(caja2.style.backgroundColor);
  });

  caja3.addEventListener("click", function () {
    verificarRespuesta(caja3.style.backgroundColor);
  });
}

function verificarRespuesta(color) {
  if (color === codigoCorrecto) {
    aciertos++;
    document.getElementById("aciertos").textContent = aciertos;
    if (aciertos === 3) {
      alert("¡Has ganado!");
      reiniciarJuego();
    } else {
      generarCodigo();
      generarColores();
    }
  } else {
    fallos++;
    document.getElementById("fallos").textContent = fallos;
    if (fallos === 3) {
      alert("¡Has perdido!");
      reiniciarJuego();
    }
  }
}

function reiniciarJuego() {
  aciertos = 0;
  fallos = 0;
  document.getElementById("aciertos").textContent = aciertos;
  document.getElementById("fallos").textContent = fallos;
  generarCodigo();
  generarColores();
}
