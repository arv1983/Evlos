let saldo = 122.5;
let notas = {
  1: 10,
  2: 12,
  5: 3,
  10: 1,
  20: 4,
  50: 3,
  100: 1,
};

function formata_valor(saldo) {
  return saldo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function soma_objeto(obj) {
  let soma_tudo = 0;
  Object.keys(obj).map((v, i) => {
    soma_tudo += obj[v] * v;
  });
  return soma_tudo;
}

function saque(saldo, retirar, notas) {
  let notas_a_tirar = {};

  let total = 0;

  Object.keys(notas)
    .sort((a, b) => (a[0] = -b[0]))
    .map((v, i) => {
      if (retirar / v >= 1 && notas[v] > 0) {
        total = Math.floor(retirar / v); // qtd de notas a retirar
        if (total > notas[v]) {
          total = notas[v];
        }
        notas_a_tirar[v] = total;
        notas[v] -= total; //retira a quantidade de notas do caixa
        retirar -= total * v;
      }
    });

  saldo -= soma_objeto(notas_a_tirar);

  return notas_a_tirar;
}

// INICIO GERADOR DE BOTOES
let valor_teclado;
function gera_botao(valor) {
  var botao = document.createElement("button");
  botao.setAttribute("id", valor);
  botao.setAttribute("order", valor);
  botao.setAttribute("class", "botao");
  botao.innerHTML = valor;

  document.getElementById("caixa").appendChild(botao).onclick = function () {
    if (typeof valor_teclado === "undefined") {
      valor_teclado = `${valor}`;
    } else {
      valor_teclado = `${valor_teclado}${valor}`;
    }
    sacar();

    document.getElementById("tela").innerText += formata_valor(
      parseInt(valor_teclado)
    );
  };
}

for (let i = 1; i <= 9; i++) {
  gera_botao(i);
}
gera_botao(0);
gera_botao("ok");
// FIM GERADOR DE BOTOES

function sacar() {
  document.getElementById("tela").innerText = " Quanto quer sacar? ";
  document.getElementById("tela").innerHTML += "<br/>";
}

document.getElementById("saque").onclick = function () {
  let visivel = document.getElementById("saque");
  visivel.disabled = "disabled";

  habilita_desabilita_teclado(true);
  if (typeof valor_teclado === "undefined") {
    sacar();
  }
};

function visualiza_nota(nota, quantidade) {
  let div_boca_caixa = document.getElementById("boca_caixa");
  let div_nota = document.createElement("DIV");
  let bolinha = document.createElement("DIV");

  bolinha.classList.add("div_valor_nota");
  bolinha.innerText = quantidade;
  div_nota.appendChild(bolinha);

  let oImg = document.createElement("img");
  oImg.setAttribute("src", "./img/" + nota + ".jpg");
  oImg.classList.add("imagem_nota");

  div_nota.appendChild(oImg);
  div_boca_caixa.appendChild(div_nota);
}

document.getElementById("ok").onclick = function () {
  if (typeof valor_teclado === "string") {
    habilita_desabilita_teclado();
    // entra a funcao para sacar...

    // funcionando ok
    if (parseInt(valor_teclado) > saldo) {
      document.getElementById("tela").innerText = " Saldo insuficiente";
      return;
    }

    if (soma_objeto(notas) < parseInt(valor_teclado)) {
      document.getElementById("tela").innerText =
        " Infelizmente temos apenas " + formata_valor(soma_objeto(notas));
      return;
    }

    valor_teclado = parseInt(valor_teclado);

    document.getElementById("tela").innerText = " Retire seu dinheiro ";
    let retirada = saque(saldo, valor_teclado, notas);
    saldo -= valor_teclado;
    valor_teclado = undefined;

    var visivel = document.getElementById("saque");
    visivel.disabled = "";
    let div_boca_caixa = document.getElementById("boca_caixa");
    div_boca_caixa.innerHTML = "";
    //mostra notas
    Object.keys(retirada).map((nota, i) => {
      visualiza_nota(nota, retirada[nota]);
    });
  }
};

document.getElementById("saldo").onclick = function () {
  var visivel = document.getElementById("saque");
  visivel.disabled = "";
  habilita_desabilita_teclado();
  mostra_saldo();
};

function mostra_saldo() {
  valor_teclado = undefined;
  document.getElementById("tela").innerText =
    " Seu saldo: " + formata_valor(saldo);
}

habilita_desabilita_teclado();
function habilita_desabilita_teclado(bool) {
  var visivel = document.querySelectorAll(
    "#ok, [id='0'], [id='1'], [id='2'],[id='3'],[id='4'],[id='5'],[id='6'],[id='7'],[id='8'],[id='9']"
  );

  if (bool) {
    for (var i = 0; i < visivel.length; i++) {
      visivel[i].disabled = "";
    }
  } else {
    for (var i = 0; i < visivel.length; i++) {
      visivel[i].disabled = "disabled";
    }
  }
}
