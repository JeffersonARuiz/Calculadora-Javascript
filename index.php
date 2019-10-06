<!DOCTYPE html>
<html>
<head>
    <title>Calculadora Simples - Jefferson Ruiz</title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/bootstrap/bootstrap.css">
    <link rel="stylesheet" href="css/custom/custom.css">
</head>
<body>
<div class="container">
    <div class="row">
        <div class="baseCalculadora col-sm-8 offset-sm-2">
            <div class="row">
                <div class="col-sm-12 m-0 p-0">
                    <div class="displayOFF">
                        <div class="row p-0 m-0">
                            <div class="col-12  pr-0 mr-0 mt-0">Calculadora Desligada</div>
                        </div>
                    </div>
                    <div class="display">
                        <div class="row p-0 m-0">
                            <div class="date col-2 offset-1  pr-0 mr-0 mt-0"></div>
                            <div class="time col-4  pl-0 ml-0 mt-0"></div>
                            <div class="sound col-5 d-sm-none d-md-block pr-5 mt-1">SOUND: <span id="stateSound" class="stateSoundOff">OFF</span></div>
                        </div>
                        <div class="row m-0 p-0" >
                            <div class="numbers col-sm-12"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="titleHistory col-sm-5">HISTORICO DE OPERAÇOES</div>
            </div>
            <div class="row p-0 mr-1">
                <div class="history col-sm-5" >
                    <div class="contentEsquerda style-scrollbar">

                    </div>
                </div>
                <div class="keyboard col-sm-7">
                    <div class="row pl-3 mt-1">
                        <div class="button col-sm-2 ml-4 mt-1 p-0 btn-danger" id="btn-power">ON</div>
                        <div class="button col-sm-2 ml-4 mt-1 btn-success" id="btn-sound"><i class="fa fa-music"></i></div>
                        <div class="button col-sm-2 ml-4 mt-1 p-0 btn-primary" id="btn-copy">Copiar</div>
                        <div class="button col-sm-2 ml-4 mt-1 p-0 btn-primary" id="btn-paste">Colar</div>
                    </div>
                    <hr class="p-0 mt-2 mb-1"/>
                    <div class="row pl-3 mt-2">
                        <div class="button col-sm-2 ml-4 mt-1 btn-warning" id="btn-ac">AC</div>
                        <div class="button col-sm-2 ml-4 mt-1 btn-warning" id="btn-ce">CE</div>
                        <div class="button col-sm-2 ml-4 mt-1 btn-secondary" id="btn-porcento">%</div>
                        <div class="button col-sm-2 ml-4 mt-1 btn-secondary" id="btn-raiz">√</div>
                    </div>
                    <div class="row pl-3 mt-1">
                        <div class="button col-sm-2 ml-4 mt-1 btn-info" id="btn-7">7</div>
                        <div class="button col-sm-2 ml-4 mt-1 btn-info" id="btn-8">8</div>
                        <div class="button col-sm-2 ml-4 mt-1 btn-info" id="btn-9">9</div>
                        <div class="button col-sm-2 ml-4 mt-1 btn-secondary" id="btn-divisao">/</div>
                    </div>
                    <div class="row pl-3 mt-1">
                        <div class="button col-sm-2 ml-4 mt-1 btn-info" id="btn-4">4</div>
                        <div class="button col-sm-2 ml-4 mt-1 btn-info" id="btn-5">5</div>
                        <div class="button col-sm-2 ml-4 mt-1 btn-info" id="btn-6">6</div>
                        <div class="button col-sm-2 ml-4 mt-1 btn-secondary" id="btn-multiplicacao">*</div>
                    </div>
                    <div class="row pl-3 mt-1">
                        <div class="button col-sm-2 ml-4 mt-1 btn-info" id="btn-1">1</div>
                        <div class="button col-sm-2 ml-4 mt-1 btn-info" id="btn-2">2</div>
                        <div class="button col-sm-2 ml-4 mt-1 btn-info" id="btn-3">3</div>
                        <div class="button col-sm-2 ml-4 mt-1 btn-secondary" id="btn-subtracao">-</div>
                    </div>
                    <div class="row pl-3 mt-1">
                        <div class="button col-sm-2 ml-4 mt-1 btn-secondary" id="btn-ponto">.</div>
                        <div class="button col-sm-2 ml-4 mt-1 btn-info" id="btn-0">0</div>
                        <div class="button col-sm-2 ml-4 mt-1 btn-secondary" id="btn-igual">=</div>
                        <div class="button col-sm-2 ml-4 mt-1 btn-secondary" id="btn-adicao">+</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row" style="text-align: center;">
        <div class="col-12">Desenvolvido Por: <b>Jefferson A. Ruiz</b></div>
    </div>
</div>

<!-- Include JS -->

<script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="js/bootstrap/bootstrap.js"></script>
<script src="js/controller/CalculadoraController.js"></script>
<script src="js/calculadora.js"></script>

<!-- FIM - Include JS -->



</body>
</html>