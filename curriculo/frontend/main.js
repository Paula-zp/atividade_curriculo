var toggle = false
$(document).ready(() => {
    $("#trocarAvatar").click(() => {
        if (!toggle) {
            $("#avatar").attr("src", "assets/avatar2.jpg")
            toggle = !toggle
        }
        else {
            $("#avatar").attr("src", "assets/avatar.jpeg")
            toggle = !toggle
        }
    });

    $("#addHab").click(() => {
        var habilidade = $("#entradaHab").val();
        if (habilidade !== "") {
            $(".habilidades ul").append($("<li></li>").text(habilidade));
            // $("#entradaHab").val("p");
        }
    })
});


//Usando AJAX para "puxar" as habilidades do banco de dados
//Função que será executada quando a página carregar
window.onload = function () {
    /*
    -> Cria a variável chamada "xhr" e armazena nela o objeto XMLHttpRequest pra fazer as solicitações AJAX 
    -> Cria uma variável chamada url, que irá armazenar o endpoint que eu criei no app.js correspondente ao get
    da tabela de habilidades*/
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:3000/habilidades";

    /*Aqui vamos fazer uma mudança no objeto "xhr".
    -> O método ".open()" configura a solicitação AJAX antes dela ser enviada pro servidor.
    -> Então definimos os detalhes dessa solicitação com 3 parâmetros: tipo, url e se será assíncrona (true) ou não 
    -> Nessa configuração, estou definindo que use o método GET, na url fornecida na variável e que seja assíncrona*/
    xhr.open("GET", url, true);

    /* Aqui vamos conferir se ----
    -> O objeto XMLHttpRequest possui a propriedade "readyState" que representa o estado da solicitação AJAX
    -> "onreadystatechange" é um evento que indica que teve mudança no estado da solicitação AJAX (quando "readyState" muda)
    -> Defino uma função para o evento "onreadystatechange" */
    xhr.onreadystatechange = function () {

        /* 
        -> Usamos a propriedade "readyState" que verifica se a solicitação foi concluída = DONE (valor = 4) 
        -> Adicionamos uma condição para ver se ela recebeu o status 200 (OK) */
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {

                /* Assim que a solicitação é concluída, recebemos uma resposta do servidor. Essa resposta é retornada como um JSON armazenado em uma string, 
                então não conseguimos manipular os valores.Para poder manipular, temos que transformar o texto da resposta em um objeto JavaScript, 
                retirando ele da string.

                -> Usamos a função "JSON.parse()" para fazer essa conversão de string para objeto e armazenamos na variável "dados" 
                -> Criamos uma variável chamada "lista" e referencio o elemento com o id "listaHab" nela */
                var dados = JSON.parse(xhr.responseText);
                var lista = document.getElementById("listaHab");

                /* 
                -> Criamos um looping que irá iterar sobre toda a resposta da solicitação
                -> Criamos uma variável chamada "itemLista" que armazenará a criação de um elemento de item de lista (li)
                -> Definimos que o conteúdo do elemento "li" será o valor da propriedade "habilidade" na posição [i] contida no objeto "dados"
                -> Colocamos os elementos criados dentro do elemento de lista "ul", que está armazenado na variável "lista" */
                for (var i = 0; i < dados.length; i++) {
                    var itemLista = document.createElement("li");
                    itemLista.textContent = dados[i].habilidade;
                    lista.appendChild(itemLista);
                }
            }
        }
    }
    // Envia a solicitação AJAX para o servidor. Usando as configurações aplicadas com o método ".open()" antes
    xhr.send();
}

/*Agora utilizarei o AJAX com o JQuery para que os dados sejam enviados para o banco de dados pelo AJAX 
-> Executa a função que está sendo criada qunado o documento HTML é carregado 
-> Definimos que a função que está no argumento vai ser executada quando o elemento do formulário com o id "habilidadesForm" for submentido
-> Usamos o "event.preventDefault()" para que a página não recarregueao enviar o formulário*/
$(document).ready(function() {
    $('#habilidadesForm').submit(function(event) {
        event.preventDefault();

        /* 
        -> Armazenamos na variável "form" o elemento que estamos manipulando no momento, nesse caso o formulário com o id "habilidadesForm" 
        -> Criamos uma variável chamada "habilidade" para armazenar o valor do campo de entrada "habilidade"
        -> Para saber qual é esse campo, utilizamos o "form.find()" */
        var form = $(this);
        var habilidadeNome = form.find('input[name="habilidade"]').val();

        // Aqui fazemos uma solicitação AJAX ao servidor usando o método do jQuery "$.ajax()"
        $.ajax({
            /* 
            -> Definimos o método HTTP que vamos usar, nesse caso o post
            -> Definimos a url pra onde a solicitação vai ser enviada
            -> Definimos quais dados serão enviados pro servidor*/
            type: "POST",
            url: "http://127.0.0.1:3000/habilidades/add",
            data: {habilidade: habilidadeNome},
        });
    });
});