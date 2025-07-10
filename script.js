let dinheiro = 20;
const mensagem = document.getElementById('mensagem');
const dinheiroSpan = document.getElementById('dinheiro');
const resultadoPainel = document.getElementById('resultadoPainel');
const grid = document.getElementById('grid');
const emojis = ['🍊', '🐶', '🔔', '💰', '🎁', '🍀'];

// Inicializa o grid 3x3
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.className = 'grid-item';
  cell.textContent = '❓';
  grid.appendChild(cell);
}

// Função de apostar (modo tigrinho simples)
function apostar() {
  if (dinheiro <= 0) {
    mensagem.textContent = "Você ficou sem dinheiro!";
    return;
  }

  const resultado = Math.random();
  if (resultado < 0.3) {
    const ganho = 5;
    mensagem.textContent = `Você ganhou R$ ${ganho}!`;
    dinheiro += ganho;
  } else {
    const perda = 2;
    mensagem.textContent = `Você perdeu R$ ${perda}.`;
    dinheiro -= perda;
  }

  dinheiroSpan.textContent = dinheiro;
}

// Função do painel 3x3 de emojis
function girarPainel() {
  if (dinheiro <= 0) {
    resultadoPainel.textContent = "Sem dinheiro para girar o painel!";
    return;
  }

  const cells = Array.from(grid.children);
  const valores = [];

  // Preenche a grid com emojis aleatórios
  cells.forEach(cell => {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    cell.textContent = emoji;
    valores.push(emoji);
    cell.style.transform = 'rotateY(180deg)';
    setTimeout(() => cell.style.transform = '', 300);
  });

  // Verifica trinca
  const linhas = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontais
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // verticais
    [0, 4, 8], [2, 4, 6]             // diagonais
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
    const premio = Math.floor(Math.random() * 16) + 5; // R$5 a R$20
    dinheiro += premio;
    resultadoPainel.textContent = `🎉 Você ganhou R$ ${premio} com a trinca!`;
  } else {
    resultadoPainel.textContent = "Nada formado. Tente novamente!";
    dinheiro -= 1; // custo de girar o painel
  }

  dinheiroSpan.textContent = dinheiro;
}
