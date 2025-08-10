
function escreveTela(localInfo,textoInfo)
{
    let Titulo = document.querySelector(localInfo);
    Titulo.innerHTML = textoInfo;
    //responsiveVoice.speak(textoInfo, 'Brazilian Portuguese Female' , {rate:1.2} );
}

function funcaoNovoJogo()
{
    // Testa se o número sorteado já saiu antes. Se já tiver saído, gera novo número (usando recursividade!) até que ele seja inédito :
    if ( listaNumeros.length == valorMaximo )
    {
        escreveTela('p',`Todos os números possíveis foram sorteados (lista = ${listaNumeros} ). Atualize a página p/ jogar novamente.`);
        // Desabilita todos os botões, pois não é possível mais jogar:
        document.getElementById("VerChute").setAttribute('disabled',true);
        document.getElementById("NovoJogo").setAttribute('disabled',true);
    }
    else
    {
        // Reinicializa as variáveis principais para um novo jogo:
        numeroSecreto = geraNumeroAleatorio(valorMaximo);
        tentativas = 1;

        // Limpa campo de entrada em caso de chute errado:
        document.querySelector('input').value = '';

        // Pede que o usuário chute um número:
        escreveTela('p',`Escolha um número de 1 a ${valorMaximo} e aperte [Testar Número]`);

        // Desabilita o botão Novo Jogo até que o número secreto seja encontrado:
        document.getElementById("NovoJogo").setAttribute('disabled',true);
    }
}

function geraNumeroAleatorio(Limite)
{
    console.log(listaNumeros, listaNumeros.length);
    numGerado = parseInt(Math.random()*valorMaximo+1);
    if ( listaNumeros.includes(numGerado) )
    {
        return geraNumeroAleatorio(valorMaximo);
    }
    else
    {
        // Inclui o novo número sorteado na lista de números já sorteados, para que não sejam repetidos:
        listaNumeros.push(numGerado);
        // Retorna novo número sorteado:
        return numGerado;
    }
}

function VerificarChute()
{
    let chute = document.querySelector('input').value;
    console.log('O valor chutado foi '+chute);

    // Faz os testes de comparação:
    if (chute == numeroSecreto) 
    {
        // Operador ternário para determinar o que será exibido ao final na tela (singular ou plural):
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        // Escreve mensagem final na tela:
        escreveTela('p',`Isso! O número secreto era ${numeroSecreto} e você descobriu com ${tentativas} ${palavraTentativa}.`);
        // Reabilita o botão Novo Jogo, para que ao final, um novo jogo possa ser jogado:
        document.getElementById("NovoJogo").removeAttribute('disabled');

    } 
    else 
    {
        if (chute > numeroSecreto) 
        {
            escreveTela('p',`O número secreto é MENOR que ${chute}. Tente de novo!`);
        } 
        else 
        {
            escreveTela('p',`O número secreto é MAIOR que ${chute}. Tente de novo!`);
        }
        // tentativas = tentativas + 1;
        tentativas++;

        // Limpa campo de entrada em caso de chute errado:
        document.querySelector('input').value = '';
    }
}

// Escreve o título do jogo:
escreveTela('h1',"Bem vindo ao meu Jogo do Número Secreto!");

// Declara as variáveis globais principais:
let valorMaximo = 10;
let numeroSecreto = 0;
let tentativas;
let numGerado = 0;
let listaNumeros = [];

