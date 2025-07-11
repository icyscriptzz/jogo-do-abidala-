let dinheiro = 20;
const dinheiroSpan = document.getElementById('dinheiro');
const resultadoPainel = document.getElementById('resultadoPainel');
const grid = document.getElementById('grid');
const emojis = ['💵', '🐶', '✅️', '💰', '🎁', '🍀'];

grid.innerHTML = '';
const gridItems = [];

for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 3; col++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'grid-item';
    const emojiDiv = document.createElement('div');
    emojiDiv.className = 'emoji';
    emojiDiv.textContent = '❔'; // valor inicial
    wrapper.appendChild(emojiDiv);
    grid.appendChild(wrapper);
    gridItems.push(emojiDiv);
  }
}

function girarPainel() {
  if (dinheiro <= 0) {
    resultadoPainel.textContent = "Você ficou sem dinheiro!";
    return;
  }

  const valores = [];

  // Sorteia emojis e atualiza a grid
  gridItems.forEach((cell, index) => {
    const sorteado = emojis[Math.floor(Math.random() * emojis.length)];
    cell.textContent = sorteado;
    valores[index] = sorteado;
  });

  verificarTrinca(valores);
}

function verificarTrinca(valores) {
  const linhas = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  let ganhou = false;
  for (const linha of linhas) {
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
