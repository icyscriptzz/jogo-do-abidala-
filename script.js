
let dinheiro = 20;
const dinheiroSpan = document.getElementById('dinheiro');
const resultadoPainel = document.getElementById('resultadoPainel');
const grid = document.getElementById('grid');
const emojis = ['🍊', '🐶', '🔔', '💰', '🎁', '🍀'];

grid.innerHTML = '';
for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 3; col++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'grid-item';
    const inner = document.createElement('div');
    inner.className = 'roller';
    inner.innerHTML = emojis.map(e => `<div>${e}</div>`).join('');
    wrapper.appendChild(inner);
    grid.appendChild(wrapper);
  }
}

function girarPainel() {
  if (dinheiro <= 0) {
    resultadoPainel.textContent = "Você ficou sem dinheiro!";
    return;
  }

  const rollers = Array.from(document.querySelectorAll('.roller'));
  const valores = [];

  const delays = [0, 200, 400];
  [0, 1, 2].forEach((coluna, cIndex) => {
    setTimeout(() => {
      for (let linha = 0; linha < 3; linha++) {
        const index = linha * 3 + coluna;
        const roller = rollers[index];
        const sorteado = emojis[Math.floor(Math.random() * emojis.length)];
        roller.innerHTML = emojis.map(e => `<div>${e}</div>`).join('') + `<div>${sorteado}</div>`;
        roller.style.transition = 'transform 0.8s ease-out';
        roller.style.transform = `translateY(-${emojis.length * 40}px)`;
        valores[index] = sorteado;
      }
    }, delays[cIndex]);
  });

  setTimeout(() => {
    verificarTrinca(valores);
  }, 1200);
}

function verificarTrinca(valores) {
  const linhas = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  let ganhou = false;
  for (let linha of linhas) {
    const [a, b, c] = linha;
    if (valores[a] === valores[b] && valores[b] === valores[c]) {
      ganhou = true;
      break;
    }
  }

  if (ganhou) {
    const premio = Math.floor(Math.random() * 16) + 5;
    dinheiro += premio;
    resultadoPainel.textContent = `🎉 Você ganhou R$ ${premio} com a trinca!`;
  } else {
    resultadoPainel.textContent = "Nada formado. Tente novamente!";
    dinheiro -= 1;
  }

  dinheiroSpan.textContent = dinheiro;
}
