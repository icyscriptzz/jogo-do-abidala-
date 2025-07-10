let dinheiro = 20;
const dinheiroSpan = document.getElementById('dinheiro');
const resultadoPainel = document.getElementById('resultadoPainel');
const grid = document.getElementById('grid');
const emojis = ['🍊', '🐶', '🔔', '💰', '🎁', '🍀'];

// Inicializa a grade
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.className = 'grid-item';
  cell.textContent = '❓';
  grid.appendChild(cell);
}

function girarPainel() {
  if (dinheiro <= 0) {
    resultadoPainel.textContent = "Você ficou sem dinheiro!";
    return;
  }

  const cells = Array.from(grid.children);
  const valores = Array(9).fill('');

  // Animação estilo slot machine
  const colunas = [[0,3,6], [1,4,7], [2,5,8]];

  colunas.forEach((indices, colIndex) => {
    let count = 0;
    const interval = setInterval(() => {
      indices.forEach(i => {
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        cells[i].textContent = emoji;
        valores[i] = emoji;
      });
      count++;

      if (count > 10 + colIndex * 3) {
        clearInterval(interval);
        if (colIndex === 2) {
          verificarTrinca(valores);
        }
      }
    }, 50 + colIndex * 50);
  });
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
