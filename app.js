let numeroMaximoASortear = 90;
let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); //Nessa parte do código do JS que faz o site ter voz.
}

exibirTextoInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        //Faz esses comandos quando ACERTAR o número secreto;
        let palavraTentativa = tentativas > 1? 'Tentativas':'tentativa'
        exibirTextoNaTela('h1', 'Você acertou!');
        exibirTextoNaTela('p', `PARABÉNS! Você descobriu o número secreto ${chute}, depois de ${tentativas} ${palavraTentativa}.`);
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        //Comandos executados quando ERRAR o chute ao número secreto;
        tentativas++
        if(chute < numeroSecreto){
            exibirTextoNaTela('p', `O número secreto é MAIOR que ${chute}.`);
        } else {
            exibirTextoNaTela('p', `O número secreto é MENOR que ${chute}.`);
        }
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * numeroMaximoASortear + 1);
    if(listaDeNumerosSorteados.includes(numeroSorteado)){
        gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroSorteado);
        console.log(listaDeNumerosSorteados);
        return numeroSorteado;
    }
}

function limparCampo() {
    chute = document.querySelector('input')
    chute.value = '';
    chute.focus()
}

function novoJogo() {
    if(listaDeNumerosSorteados.length == numeroMaximoASortear){
        listaDeNumerosSorteados=[];
    } else {
        numeroSecreto = gerarNumeroAleatorio();
        if(numeroSecreto == undefined){
            numeroSecreto = listaDeNumerosSorteados[listaDeNumerosSorteados.length-1]
        }
        limparCampo();
        tentativas=1;
        exibirTextoInicial()
        document.getElementById('reiniciar').setAttribute('disabled', true)
    }
}

function exibirTextoInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximoASortear}`);
}
