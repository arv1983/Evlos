let saldo = 1000.5;
let notas = {
  1: 10,
  2: 12,
  5: 3,
  10: 1,
  20: 4,
  50: 3,
  100: 1,
};

function soma_objeto(obj) {
  let soma_tudo = 0;
  Object.keys(obj).map((v, i) => {
    soma_tudo += obj[v] * v;
  });
  return soma_tudo;
}

function saque(saldo, retirar, notas) {
  let notas_a_tirar = {};
  let dinheiro_em_caixa = soma_objeto(notas);
  let total = 0;

  if (dinheiro_em_caixa < retirar) {
    console.log("é menor");
  }

  if (saldo < retirar) {
    document.getElementById("tela").innerText = " Saldo insuficiente. ";
    return;
  }

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

//gera botoes

let arr;
function gera_botao(valor) {
  var botao = document.createElement("div");
  botao.setAttribute("id", valor);
  botao.setAttribute("order", valor);
  botao.setAttribute("class", "botao");
  botao.innerHTML = valor;

  document.getElementById("caixa").appendChild(botao).onclick = function () {
    if (typeof arr === "undefined") {
      arr = `${valor}`;
    } else {
      arr = `${arr}${valor}`;
    }
    sacar();
    document.getElementById("tela").innerText += "R$ " + arr;
  };
}

// inicio gerador de botoes
for (let i = 1; i <= 9; i++) {
  gera_botao(i);
}
gera_botao(0);
gera_botao("ok");
// fim gerador de botoes

mostra_saldo();

function sacar() {
  document.getElementById("tela").innerText = " Quanto quer sacar? ";
  document.getElementById("tela").innerHTML += "<br/>";
}

document.getElementById("saque").onclick = function () {
  var visivel = document.getElementById("saque");
  visivel.disabled = "disabled";

  if (typeof arr === "undefined") {
    sacar();
  }
};

function visualiza_nota(nota, quantidade) {
  var node = document.createElement("DIV");
  var textnode = document.createTextNode(quantidade);
  node.classList.add("div_notas");
  node.appendChild(textnode);
  document.getElementById("boca_caixa").appendChild(node);

  var oImg = document.createElement("img");
  oImg.setAttribute("src", "/img/" + nota + ".jpg");
  oImg.classList.add("imagem_nota");

  document.getElementById("boca_caixa").appendChild(oImg);
}

document.getElementById("ok").onclick = function () {
  // document.getElementById("tela").innerText = " ok ";

  if (typeof arr === "string") {
    // entra a funcao para sacar...
    if (soma_objeto(notas) < parseInt(arr)) {
      document.getElementById("tela").innerText =
        " Infelizmente temos apenas R$ " + soma_objeto(notas);
      return;
    }
    arr = parseInt(arr);

    document.getElementById("tela").innerText = " Retire seu dinheiro ";
    let retirada = saque(saldo, arr, notas);
    saldo -= arr;
    arr = undefined;

    console.log(soma_objeto(notas));
    console.log(retirada);
    console.log(soma_objeto(retirada));

    var visivel = document.getElementById("saque");
    visivel.disabled = "";

    //mostra notas
    Object.keys(retirada).map((nota, i) => {
      visualiza_nota(nota, retirada[nota]);
    });
  }
};

document.getElementById("saldo").onclick = function () {
  var visivel = document.getElementById("saque");
  visivel.disabled = "";

  mostra_saldo();
};

function mostra_saldo() {
  arr = undefined;
  console.log("saldo");
  document.getElementById("tela").innerText = " Seu saldo: R$ " + saldo;
  // document.getElementById("nota1").style.removeClass(".nota1");

  // element.classList.remove("nota1");

  // document.querySelector(".nota1").style.animation = "";
  // document.querySelector(".nota1").style.animation = "animacao";
}
