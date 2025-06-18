window.addEventListener("DOMContentLoaded", () => {
  let cartasViradas = [];
  let bloqueado = false;

  const cartas = document.querySelectorAll('.carta');
  embaralharCartas();

  cartas.forEach(carta => {
    carta.addEventListener('click', function () {
      if (bloqueado || carta.classList.contains('virada')) return;

      carta.classList.add('virada');
      cartasViradas.push(carta);

      if (cartasViradas.length === 2) {
        verificarPar();
      }
    });
  });

  function verificarPar() {
    const [c1, c2] = cartasViradas;
    const img1 = c1.dataset.img;
    const img2 = c2.dataset.img;

    if (img1 === img2) {
      cartasViradas = [];
      verificarFimDoJogo();
    } else {
      bloqueado = true;
      setTimeout(() => {
        c1.classList.remove('virada');
        c2.classList.remove('virada');
        cartasViradas = [];
        bloqueado = false;
      }, 1000);
    }
  }

  function verificarFimDoJogo() {
    const viradas = document.querySelectorAll('.carta.virada');
    if (viradas.length === cartas.length) {
      document.getElementById("mensagem").textContent = "Parabéns! Reiniciando...";
      setTimeout(() => {
        resetarJogo();
        document.getElementById("mensagem").textContent = "";
      }, 2000);
    }
  }

  function embaralharCartas() {
    const tabuleiro = document.getElementById('tabuleiro');
    const cartasArray = Array.from(cartas);
    const embaralhadas = cartasArray.sort(() => 0.5 - Math.random());
    embaralhadas.forEach(carta => tabuleiro.appendChild(carta));
  }

  function resetarJogo() {
    cartas.forEach(carta => carta.classList.remove('virada'));
    cartasViradas = [];
    bloqueado = false;
    setTimeout(embaralharCartas, 500);
  }
});
