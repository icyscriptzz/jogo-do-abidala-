let dinheiro = 20;
const mensagem = document.getElementById('mensagem');
const dinheiroSpan = document.getElementById('dinheiro');

function apostar() {
  if (dinheiro <= 0) {
    mensagem.textContent = "Você ficou sem dinheiro!";
    return;
  }

  const resultado = Math.random();
  if (resultado < 0.3) {
    mensagem.textContent = "Você ganhou R$ 5!";
    dinheiro += 5;
  } else {
    mensagem.textContent = "Perdeu R$ 2 😢";
    dinheiro -= 2;
  }

  dinheiroSpan.textContent = dinheiro;
}
