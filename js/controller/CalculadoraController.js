/**
 * @Description : Projeto de desenvolvimento de uma clculadora simples em JavaScript.
 * @author Jefferson Alvarez Ruiz
 * @e-mail: jefferson.ruiz@outlook.com
 * @License: Free, porém é necessário manter os créditos.
 */


class CalculadoraController {


    //Metodo construtor
    constructor(){
        //Atributos Globais
        this._locale = 'pt-BR';

        //Atributos da calculadora.
        this._calculadoraLigada = false;
        this._audioBotoesLigado = false;
        this._operacao = [];
        this._mp3Button = new Audio("sound/clickButton.mp3"); //Classe Audio da API -> Audio Web API
        this._mp3ButtonOnOff = new Audio("sound/on_off.mp3"); //Classe Audio da API -> Audio Web API
        this._ultimoOperador = ""; //Armazena o ultimo operador digitado pelo usuario
        this._ultimoNumero = ""; //armazena o ultimo numero digitado pelo usuario.
        this._expressaoCalculada = false; //quando o usuario clicar em igual atribuiremos este controle para permitir digitar um novo numero no array.


        //Atributos dos elementos HTML - querySelector pela classe de cada elemento.

        this._displayONHTML = document.querySelector(".display");
        this._displayOFFHTML = document.querySelector(".displayOFF");
        this._dataHTML = document.querySelector(".date");
        this._horaHTML = document.querySelector(".time");
        this._historicoHTML = document.querySelector(".contentEsquerda");
        this._displayNumerosHTML = document.querySelector(".numbers");
        this._displayAudioOnOffHTML = document.querySelector("#stateSound");

        //chamando o metodo initialize e histórico para exibir instriuçoes.
        this.inicializacao();
        this.inicializaBotoes();

    }

    //Método de inicialização da Calculadora.
    inicializacao() {

        this.atualizaHistoricoOperacoes();
        this.inicializaKeyboard();
    }

// ########################### INICIO  METODOS DA CLASSE ###########################

    //Método para executar as acoes quando cada botao for clicado.
    executaBotao(valor){

        //Executando o som ao clicar nos botões.
        this.executaSomBotao();

        //Se o status da calculadora estiver como Off (false) somente o botão ON irá funcionar.
        if (this.getStatusCalculadora() == false ) {
            switch (valor) {
                case 'power':
                    this.ligarDesligar();
                    break;
            }
        }  else {
            switch (valor) {
                case 'power':
                    this.ligarDesligar();
                    break;
                case 'sound':
                    this.ligarDesligarSomBotao();
                    break;
                case 'copy':
                    this.copyToClipboard();
                    break;
                case 'paste':
                    this.pasteDataClipboard();
                    break;
                case 'ac':
                    this.clearAll();
                    break;
                case 'ce':
                    this.clearEntry();
                    break;
                case 'porcento':
                    this.addOperacao("%");
                    break;
                case 'raiz':
                    this.raizQuadrada();
                    break;
                case 'divisao':
                    this.addOperacao("/");
                    break;
                case 'multiplicacao':
                    this.addOperacao("*");
                    break;
                case 'subtracao':
                    this.addOperacao("-");
                    break;
                case 'ponto':
                    this.adicionaPonto();
                    break;
                case 'igual':
                    this.calcularExpressao();
                    this.setBotaoIgualCalcularFuncao(true);
                    console.log("clique em Igual, Status : ", this.getBotaoIgualCalcularFuncao());
                    break;
                case 'adicao':
                    this.addOperacao("+");
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperacao(parseInt(valor));
                    break;
                default:
                    this.setError();
                    break;
            }
        }
    }

    //Metodo para inicializar a escuta dos eventos de clique e drag nos botoes
    inicializaBotoes(){

        //Selecionando todos os botoes da Calculadora com o método querySelectorAll();
        let buttons = document.querySelectorAll("div.button");

            //Loop para adicionar eventos em cada um dos botoes encontrados.
            buttons.forEach((btn) => {

                //Chamamdo o metodo addEventListenerAll() para inserir todos os eventos do mouse informado.
                this.addEventListenerAll(btn, 'click drag', fn => {

                    //obtendo o id do botão para remover a string btn- permitindo identificar o botao que foi clicado.
                    let labelBotao = btn.id.replace("btn-", "");

                    //Instanciando o metodo executaBotao
                    this.executaBotao(labelBotao);

                })

            });
    }

    //Metodo para incializar os botões do teclado para digitação na calculadora.
    inicializaKeyboard(){


        //criando o listener para "escutar" os eventos de teclado.
        //vamos utilizar apenas o evento de keyUp, quando o usuario pressiona a tecla no teclado.
        document.addEventListener('keyup', teclaPressionada => {

            //chamando o metodo para tocar o audio ao clicar nos botões.
            this.executaSomBotao();

            //Para pegar o valor (key) da tecla pressionada utilize teclaPressionada.key.
            //console.log(teclaPressionada);

            switch (teclaPressionada.key) {

                case 'Escape': //Se pressionar o ESC limpa a calculadora.
                case 'Delete': //Se pressionar o DELETE limpa a calculadora.
                    this.clearAll()
                    break;
                case 'Backspace':
                    this.clearEntry() //Se pressionar o Backspace limpa a ultima entrada
                    break;
                case '+':
                case '-':
                case '/':
                case '*':
                case '%':
                    this.addOperacao(teclaPressionada.key);
                    break;
                case '=':
                case 'Enter':
                    this.calcularExpressao(); //efetuando o calculo da conta digitada pelo usuario.
                    break;
                case '.':
                case ',':
                    this.adicionaPonto();
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperacao(parseInt(teclaPressionada.key));
                    break;
                case 'c':
                    //Verificando se o control tambem foi pressionado
                    //No MacOS deve-se usar a tecla Control e nao command
                    if ((teclaPressionada.ctrlKey)) this.copyToClipboard();
                    break;
                case 'v':
                    //Verificando se o control tambem foi pressionado
                    //No MacOS deve-se usar a tecla Control e nao command
                    if ((teclaPressionada.ctrlKey)) this.pasteDataClipboard();
                    break;
            }
        })

    }

    //Metodo para adicionar mais de um evento em um elemento.
    //O metodo nativo do JS so permite adicionar um evento para cada objeto.
    //Recebe 3 parametros 1: O Elemento | 2: Os eventos(click,mouseover,etc...) | 3: funcao que será executada)
    addEventListenerAll(elemento, eventos, fn){

        //Fazendo split por 'espaço' em cada eventos recebido e executando o loop em cada um para adicionar ao elemento.
        eventos.split(' ').forEach(evento => {

            //adicionando o Metodo nativo do JS addEventListener no elemento informado considerando cada um dos eventos (click, Drag,etc)..
            elemento.addEventListener(evento, fn, false);

        });
    }

    //Metodo para ligar e deligar a calculador.
    ligarDesligar(){
        this.executaSomOnOff(); //Tocando som ao ligar e desligar a calculadora.

        //Chamamdno o método para inicializar a escuta de ações (clique e Drag) nos botoes da calculadora
        //Verifica se o status é false (OFF), se for muda para ON(true) e exibe o display da calculadora ligada.
        if (this.getStatusCalculadora() == true) {
            this.setStatusCalculadora();
            this.displayOnOff(this.getStatusCalculadora());
            this.ExibeDisplayDataHora(); // exibindo Data e Hora no visor.

            //Removendo qualquer formatação de erro (texto em vermelho) do Display
            this._displayNumerosHTML.className = "numbers col-sm-12"; //forçando o display para nao exibir texto em vermelho em caso de erro na ultima execução (setError();

        } else {
            this.setStatusCalculadora();
            this.displayOnOff(this.getStatusCalculadora());
            this.trocarTextoBotaoOnOff();

            //desativando o som dos botoes ao desligar a calculadora, caso tenha sido ativado.
            if( this.getStatusAudioBotoes() == true ){
                this.ligarDesligarSomBotao(true);
            }

            //Limpando as variaveis _ultimoOPerador e _UltimoNumero e _operação
            this._ultimoNumero = "";
            this._ultimoNumero = "";
            this._operacao = [];
        }
    }

    //Método para exibir o status do SOM no display.
    displayOnOff(){
        //Se status = true, oculta displayOff e exibe displayOn ja mostrando data e hora atual
        if (this.getStatusCalculadora() == true) {
            this.ExibeDisplayDataHora(); //exibindo a data e hora atual
            this.atualizaDataHora(); // atualizando a data/hora a cada segundo
            this.inicalizaDisplay(); //iniciando o display da calculadora zom zero.
            this.atualizaHistoricoOperacoes(""); // atualizando o historico com a mensagem de boas vindas.
            this.visibilityDisplayOn = 'block';
            this.visibilityDisplayOff = 'none';
        } else {
            this.visibilityDisplayOn = 'none';
            this.visibilityDisplayOff = 'block';
            this.atualizaHistoricoOperacoes("");
        }
    }

    //Método para alterar o conteúdo do historico de operações.
    atualizaHistoricoOperacoes(msg = ""){
        //Se a mensagem vier em branco refere-se a ligar e delisgar a calculadora.
        //Qualquer outra mensagem será exibida no histórico conforme mensagem enviada no parametro msg.
        if (msg == "") {
            if (this.getStatusCalculadora() == false) {
                this.displayHistorico = "Clique no Botão <span class=\"col-sm-2 ml-0 mt-1 p-0 btn-danger\">ON</span> para ligar a calculadora.";
            } else {
                this.displayHistorico = this.dataAtual.toLocaleDateString() + " - Seja Bem Vindo.";
            }
        }else {
            //variavel para obter o atual historico existente na calculador para concatenar com ativaçao/desativacao do som
            let historicoAtual = this.displayHistorico;

            //concatenando o historico atual com a mensagem enviada via parametro msg.
            this.displayHistorico = historicoAtual + "<br/>" + this.dataAtual.toLocaleDateString() + " - " + msg;
        }
    }

    //Metodo para inicializar o display da caulcadora com o numero zero
    inicalizaDisplay(){

        this.displayNumeros = 0;
    }

    //Metodo Para Adicionar Operações na calculadora.
    addOperacao(valor){


        //Verificando se o ultimo item existente no array de operações NÃO é um numero.
        if (isNaN(this.getUltimaOperacao())){ 

                //Verificando se o ultimo item do array é um operador (+, -, *, /, %), ou se ja podemos calcular a primeira expressao.
                if (this.isOperador(valor)){

                    //console.log("O ultimo valor digitado é um operador.");
                    //Se cairmos nessa opção, temos que trocar o operador no Array. O usuario trocou o operador na expressao.
                    this.setUltimaOperacao(valor);

                } else {

                    //O ultimo valor digitado NÃO É UM OPERADOR.
                    //console.log("O ultimo valor digitado NÃO É UM OPERADOR e sim um Numero.");
                    // Se cairmos nessa opção, temos que fazer o push da operação e exibir no display da calculadora o numero digitado.
                    this.pushOperacao(valor);

                    this.displayNumeros = valor;
                }

        }  else {

            //console.log("O ultimo item o Arrya é um numero");

            //Verificando se o valor atual digitado pelo usuario é um operador
            if (this.isOperador(valor)){

                //console.log("O Valor digitado é um Operador");
                //Se cair nessa situação quer dizer que o usuario esta digitadno um Operador e temos que inserir o operador no Array.
                this.pushOperacao(valor);

            }  else {

                //Verificando se o usuario clicou em igual na ultima expressao, se nao clicou temos  adicionar um novo item no array.
                if (this.getBotaoIgualCalcularFuncao() == true) {

                    //Limpando o array de expressoes para permitir um novo calculo
                    this._operacao = [];
                    this._ultimoNumero = "";
                    this._ultimoOperador = "";
                    this.setBotaoIgualCalcularFuncao(false);
                    //Inserindo o novo valor no array de operações
                    this.addOperacao(valor);
                    //exibindo o valor no display da calculadora.
                    this.setUltimoNumeroNoDisplay();

                } else {

                    this.setBotaoIgualCalcularFuncao(false);

                    //Se cairmos nessa condição quer dizer que o usuario está digitando um numero maior que 9 e temos que atualizar o display a cada numero digitado.

                    //Concatenando o valor anterior do Array com o novo valor digitado pelo usuario.
                    let novoValor = this.getUltimaOperacao().toString() + valor.toString();

                    //Adicionando o novo valor ao Array
                    this.setUltimaOperacao(novoValor);
                    //Atualizando o display com o numero atual através do metodo setUltimoNumeroNoDisplay().
                    this.setUltimoNumeroNoDisplay();
                }
            }
        }
        this.setBotaoIgualCalcularFuncao(false);

    }

    //Metodo para calcular a Raiz Quadrada
    raizQuadrada(){

        let ultimaOperacao = this.getUltimaOperacao();

        this.displayNumeros = Math.sqrt(ultimaOperacao);




    }
    //Metodo para tratar o "ponto" na calculadora.

    adicionaPonto(){
        //Verificando qual a ultima operação
        let ultimaOperacao = this.getUltimaOperacao();

        //Verificando se a operação ja existe e se é um string e se dentro dessa string tem um ponto
        // Se tiver ponto faz return e para execucao, caso contrario continua.
        if (typeof ultimaOperacao === 'string' && ultimaOperacao.split('').indexOf('.') > -1 ) return;

        //existem 3 possibilidades
        //1 - Se o usuario digitar . logo como primeiro botao o nosso Array de operação será undefined
        //2 - Se o usuario digitou um numero e depois o ponto, a ultima operação será o numero digitado antes do ponto
        //3 - Se o usuario digitou um operador (ex.: +) a ultima operação será +
        //Temos que tratar essas tres situações.
        //Se for undefined ou operador, temos que adicionar 0, e mais o que a pessoa ainda vai digitar.

        if (this.isOperador(ultimaOperacao) || !ultimaOperacao) {
            this.pushOperacao('0.'); //adicionando 0 ponto ao display/array

        } else {
            //sobrescreve a ultima operacao sem perder o ultimo numero
            this.setUltimaOperacao(ultimaOperacao.toString() + '.');

        }

        this.setUltimoNumeroNoDisplay();
    }

    //Metodo que exibir o resultado ou ultimo calculo no display da calculadora.
    setUltimoNumeroNoDisplay(){

        let ultimoNumero = this.getUltimoItem(false);

       //console.log("Ultimo Numero Digitado", ultimoNumero);

        //Verificando se a variavel ultimoNumero esta vazia, caso sim, exibe erro na tela do usuario
        if (!ultimoNumero) ultimoNumero = 0;

        this.displayNumeros = ultimoNumero;


    }

    //Metodo que verifica que=al foi o ultimo item digitado pelo usuario na calculadora.
     getUltimoItem( isOperador = true ){
        //variavel para armazenar o ultimo numero do array de operações
        let ultimoItem;

        //percorrendo o arrau de traz para frente para achar o ultimo numero
        for (let i = this._operacao.length-1; i>= 0; i--){

            //Procurando pelo operador ou pelo numero (conforme parametro informado na chamada do metodo. Por defaul buscamos um operador isOperador = true).
            if (this.isOperador(this._operacao[i]) == isOperador){
                //Ao acharmos o primeiro numero no array, ou seja, o ultimo numero digitado pelo usuario paramos o loop e armazenamos o valor na variavel.
                ultimoItem = this._operacao[i];
                break;
            }

        }

        //Caso nao tenha encontrado um ultimo item, manteremos o que foi digitado por ultimo
         if (!ultimoItem){
             //validando se é um operador ou não
             if (isOperador == true){
                 ultimoItem = this._ultimoOperador;
             } else {
                 ultimoItem = this._ultimoNumero
             }
         }

         return ultimoItem;
    }

    //Metodo para validar se o botao pressionado é um operador ou um numero
    //Retorna true se for operador ou false se for
    isOperador(valor){

            //Array de operadores possiveis na calculadora
            let arrayOperadores = ['+','-','*','/','%', '.'];

            //verificando se o operador selecionado existe no array de operadores (arrayOperadores).
            //se encontrar mostra o indice do array, caso nao encontre o retorno será "-1";
            if (arrayOperadores.indexOf(valor) > -1){
                return true;
            } else {
                return false;
            }
    }

    //Metodo para fazer Push (incremento) no Array de Operações.
    pushOperacao(valor){


        this._operacao.push(valor);

        //Verificando se ja é possivel calcular alguma operação.
        //Quando tivermos um trio de elementos no Array (ex.: 1343 + 2343) composto por um numero + um operador + outro numero, podemos calcular.
        if (this._operacao.length > 3) {

            //Efetuando o calculo através do metodo calcular
            this.calcularExpressao();

        }
    }

    //Metodo para executar a conta/calculo de uma expressão
    calcularExpressao(){

        //Variavel para armazenar o ultimo operador digitado pelo usuario.
        let ultimoOperadorDigitado = "";

        //atualizando a variavel _ultimoOPerador o ultimo operador digitado pelo usuario que é retornado pelo getUltimoItem passando como parametro True pois estamos buscando um operador.
        this._ultimoOperador = this.getUltimoItem(true);

        //console.log("AQUIIIIII ", this._ultimoOperador);

        //Validando se o usuario apertou o botao igual antes de termos ao menos um expressao minima para calculo.
        if (this._operacao.length < 3){
            //console.log("Usuario apertou o igual antes de uma expressao minima.");
            //Impossivel calcular pois nao temos no minimo 3 elementos no Array
            let primeiroItem = this._operacao[0];
            this._operacao = [primeiroItem, this._ultimoOperador, this._ultimoNumero];
        }

        //caso a operação tenha mais de 3 itens no array, precisamos retirar o ultimo operador e calcular a primeira expressao.
        //Após o calculo retiornaremos o valor calculador com o operador para o usuario digitar o proximo numero.
        if (this._operacao.length > 3){
            //Removendo o ultimo operador (4 Item do Array) do Array de operações para calcular a expressão pois ja temos 3 itens no array.
            //O ultimo operador sera armazenado na variavel ultimoOperadorDigitado
            ultimoOperadorDigitado = this._operacao.pop();

            //Chamando o metodo getResultado para obter a expressao digitada.
            //Se clicarmos varias vezes no botoa Igual temos que rpetir a expressao.
            //Vamos salavr o ultimo numero digitado pelo usuario na variavel _ultimoNumero
            this._ultimoNumero = this.getResultado();

            //Atualizando o historico de operações realizadas.
            if (ultimoOperadorDigitado == "%") {
                this.atualizaHistoricoOperacoes(this._operacao.join(" ") + "% = " + parseFloat(this.getResultado()/100).toFixed(5));
            }
             else {
                this.atualizaHistoricoOperacoes(this._operacao.join(" ") + " = " + this.getResultado());
            }

        } else if (this._operacao.length == 3 ) {

            //console.log("clicou em igual");
           // console.log(this._operacao);

            //Se clicarmos varias vezes no botoa Igual temos que rpetir a expressao.
            //Vamos salavr o ultimo numero digitado pelo usuario na variavel _ultimoNumero
            this._ultimoNumero = this.getUltimoItem(false);

            //Atualizando o historico da calculadora com a expressao calculada.

            this.atualizaHistoricoOperacoes(this._operacao.join(" ") + " = " + this.getResultado());
            // console.log(this._operacao);
            // console.log(this.getResultado());

        }

        //chamando getResultado() para calcular a expressao
        let resultado = this.getResultado();

        //Verificando se o operador digitado é o Porcento
        if (ultimoOperadorDigitado == "%"){
            //calculando o valor porcentual
            resultado = resultado / 100; // esta expressao tambem poderia ser escrita --> resultado /= 100

            //atualizando o array de operações com o resultado.
            this._operacao = [ resultado];

        } else {

            //calculo efetuado, precisamos concatenar com o array  baseado no ultimo operador digitado.
            this._operacao = [resultado];

            if (ultimoOperadorDigitado) this._operacao.push(ultimoOperadorDigitado);

        }

        this.setUltimoNumeroNoDisplay();
    }

    //Metodo que irá efetuar o calculo das expressões matematica eval();
    //vamos utilizar a função join do JS para unificar o Array em uma unica string
    getResultado(){

        try {
            //efetuando o calculo ja utilizando o Join para remover as virgulas do Array
            //Antes do join() = [123, +, 456], após o Join() = 123+456 / Após o join conseguimos calcular mesmo que seja string.
            return eval(this._operacao.join(""));

        } catch (e) {

            //Exibindo erro no display da Calculador e Lançando mensagem de erro na console
            this.setError();
            console.log("Ocorreu um erro: ", e.message);
            console.log("Descrição do erro: ", e);
        }
    }

    //Metodo para ober o ultimo item do array de operacoes.
    getUltimaOperacao(){

        return this._operacao[this._operacao.length-1];
    }

    //Metodo que substitui o ultimo item do Array por um novo valor.
    //Exemplo. Quando o usuario muda de operador (expressao inicia 1 + ... ), expressão nova (1 * ...)
    setUltimaOperacao(valor){

        this._operacao[this._operacao.length-1] = valor;

    }

    //Metodo para limpar o conteudo do display CA = ClearAll
    clearAll(){

        //Limpando as variaveis _ultimoOPerador e _UltimoNumero e _operação
        this._ultimoNumero = "";
        this._ultimoNumero = "";
        this._operacao = [];

        //Removendo qualquer formatação de erro (texto em vermelho) do Display
        this._displayNumerosHTML.className = "numbers col-sm-12";
        this.inicalizaDisplay();
    }

    //Metodo para tratar qualquer erro ocorrido no calculo executado.
    setError(){
        let classeDisplayNumeros = this._displayNumerosHTML.className;
        this._displayNumerosHTML.className = classeDisplayNumeros.toString() + ' errorMessage';
        this._displayNumerosHTML.innerHTML = this.displayContent = "Error";
        this.atualizaHistoricoOperacoes("Desculpe, ocorreu um erro.");
    }

    //Metodo para limpar a ultima operação realizada pelo usuario na calculadora
    clearEntry(){
        this._operacao.pop();

        //atualizando o display
        this.setUltimoNumeroNoDisplay();
    }

    //Metodo para tocar som quando clicar no botâo On/Off
    executaSomOnOff(){

        this._mp3ButtonOnOff.currentTime = 0; // volta para o inicio sempre que o botao for clicado.
        //executando o som/Play
        this._mp3ButtonOnOff.play();

    }

    //Metodo para habilitar/Desabilitar os sons do botao
    ligarDesligarSomBotao(primeiroAcesso = false){

        //variavel para obter o atual historico existente na calculador para concatenar com ativaçao/desativacao do som
        let historicoAtual = this.displayHistorico;


        //Verificando se a calculadora esta ligada, caso contrario o som nao deve ser executado.
        if (this.getStatusCalculadora() == true){

            //Verificando se o audio da calculadora esta desligado, se sim ativa o audio.
            if (this.getStatusAudioBotoes() == false) {

                this.setStatusAudioBotoes(); //setando status do audio como true/ligado
                this.displayHistorico = historicoAtual + "<br/>" + this.dataAtual.toLocaleDateString() + " - Som Ativado.";
                this.executaSomBotao();
                this.alteraStatusSomBotoesDisplay();

            } else {

                this.setStatusAudioBotoes(); //setando status do audio como false/desligado
                //validando se a calculadora esta sendo ligada agora (primeiroAcesso) se sim não va exibir a mensagem de som destaivado.
                if (!primeiroAcesso) {
                    this.displayHistorico = historicoAtual + "<br/>" +  this.dataAtual.toLocaleDateString() + " - Som Desativado.";
                }
                this.alteraStatusSomBotoesDisplay();

            }
        }
    }

    //Metodo Para atualizar o indicador do som de botoes (on/Off) no display
    alteraStatusSomBotoesDisplay(){

        if (this.getStatusAudioBotoes() == true) {
            this.displayAudioStatus = "ON";
            this._displayAudioOnOffHTML.className = 'stateSoundOn';
        }  else {
            this.displayAudioStatus = "OFF";
            this._displayAudioOnOffHTML.className = 'stateSoundOff';
        }
    }

    //Metodo para executar o som do botão.
    executaSomBotao(){

        //validando se a calculadora esta ligada, e se o som esta ativado.
        if (this.getStatusCalculadora() == true && this.getStatusAudioBotoes() == true ){

            this._mp3Button.currentTime = 0; // volta para o inicio sempre que o botao for clicado.
            //executando o som/Play
            this._mp3Button.play();
        }
    }

    //Metodo para trocar o texto do botao de ON para OFF quando a calculadora for ligada
    trocarTextoBotaoOnOff(){

        if ( this.getStatusCalculadora() == true){
            document.querySelector("#btn-power").innerHTML = "OFF";
        } else {
            document.querySelector("#btn-power").innerHTML = "ON";
        }
    }

    //Metodo para atualizar a data e hora a cada segundo
    atualizaDataHora(){
        setInterval(() => {
            //Chamado o metodo que atualiza o display com a Data/Hora.
            this.ExibeDisplayDataHora();
        },1000)
    }

    //Método para copiar os valores do Display da calculador.
    copyToClipboard(){

        let inputText = document.createElement("input");
        inputText.type = "text";
        inputText.value = this.displayNumeros;
        document.body.appendChild(inputText);
        inputText.select();
        let conteudoCopiado = document.execCommand("copy");
        inputText.remove();

        //atualizando display com o conteudo copiado.
        if(conteudoCopiado){
            this.atualizaHistoricoOperacoes("Numero " + this.displayNumeros + " copiado.");
        }else {
            console.log('Erro ao copiar conteudo.');
        }
        return false;
    }

    //Método para colar o conteudo da área de transferência na calculadora.
    pasteDataClipboard(){

        console.log("O comando Colar pode necessitar de acesso e permissoes especificas em seu navegador Google Chrome, Safari ou Firefox.");

            navigator.clipboard.readText().then(text => {
                    this.displayNumeros = text;
                    this.atualizaHistoricoOperacoes("Numero " + text + " colado.");
                })
                .catch(() => {
                    console.log('Failed to read from clipboard.');
                });
    }

    //Metodo para exibir a data e hora no display da calculadora.
    ExibeDisplayDataHora(){
        this.displayData = this.dataAtual.toLocaleDateString(this._locale);
        this.displayHora = this.dataAtual.toLocaleTimeString(this._locale);
    }

    setStatusCalculadora(){
        this._calculadoraLigada = !this._calculadoraLigada;
        this.trocarTextoBotaoOnOff()
    }

    getStatusCalculadora(){
        return this._calculadoraLigada;
    }

    getStatusAudioBotoes(){
        return this._audioBotoesLigado;
    }

    setStatusAudioBotoes(){
        this._audioBotoesLigado = !this._audioBotoesLigado;
    }

    getBotaoIgualCalcularFuncao(){
        return this._expressaoCalculada;
    }

    setBotaoIgualCalcularFuncao(valor){
        this._expressaoCalculada = valor;
    }
// ########################### FIM METODOS DA CLASSE ###########################

// ########################### INICIO GETTERS E SETTERS ###########################

    get visibilityDisplayOn(){
        return this._displayONHTML.style.display
    }

    set visibilityDisplayOn(status){
        this._displayONHTML.style.display = status;
    }

    get visibilityDisplayOff(){
        return this._displayOFFHTML.style.display;
    }

    set visibilityDisplayOff(status){
        this._displayOFFHTML.style.display = status;
    }

    get displayData(){
        return this._dataHTML.innerHTML;
    }

    set displayData(data){
        this._dataHTML.innerHTML = data;
    }

    get displayHora(){
        return this._horaHTML.innerHTML;
    }

    set displayHora(hora){
        this._horaHTML.innerHTML = hora;
    }

    get dataAtual(){
        return new Date();
    }

    get displayContent(){
        return this._displayONHTML.innerHTML;
    }

    set displayContent(valor){

        //Verificando a quantidade de caracteres no display da calculadora.
        // Se for maior que 19 (Limite), exibe mensagem de erro.
        if (valor.toString().length > 19) {
            this.setError();
            return false;
        } else {
            this.displayNumeros = valor;
        }
    }

    get displayNumeros(){
        return this._displayNumerosHTML.innerHTML;
    }

    set displayNumeros(valor){

        //Validando para que o display nao ultrapasse 19 caracteres. Se ocorrer lança erro no display
        if (valor.toString().length > 19) {
            this.setError();
            return false;
        }  else {
            this._displayNumerosHTML.innerHTML = valor;
        }
    }

    get displayHistorico(){
        return this._historicoHTML.innerHTML;
    }

    set displayHistorico(mensagem){
        this._historicoHTML.innerHTML = mensagem;
    }

    get displayAudioStatus(){
        return this._displayAudioOnOffHTML.innerHTML
    }

    set displayAudioStatus(status){
        this._displayAudioOnOffHTML.innerHTML = status;
    }

// ########################### FIM - GETTERS E SETTERS ###########################

}