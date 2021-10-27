
function checkBrowser(elemento){
    let opcao1 = document.getElementById("41");
    let opcao2 = document.getElementById("42");
    let opcao3 = document.getElementById("43");

    if ((elemento.id.localeCompare("41")!==0) && (elemento.value===opcao1.value)){
        opcao1.value = "";
    }
    if ((elemento.id.localeCompare("42")!==0) && (elemento.value===opcao2.value)){
        opcao2.value = "";
    }
    if ((elemento.id.localeCompare("43")!==0) && (elemento.value===opcao3.value)){
        opcao3.value = "";
    }
}

function Write_Text() {
    let x = document.forms["formCara"]["quinta"].value;
    if (x === "Sim") {
        document.forms["formCara"]["sexta"].disabled = false;
        document.forms["formCara"]["sexta"].value="";
    }
    else {
        document.forms["formCara"]["sexta"].disabled = true;

    }
}

//back end
const data = new Date().getHours();
function validateFormOne() {


    let xmlRowString = "<questionario id='" + data.toString()+ "'" + ">";
    let rCar = [document.forms["formCara"]["primeira"].value,
                document.forms["formCara"]["segunda"].value,
                document.forms["formCara"]["terceira"].value,
                document.forms["formCara"]["quartaFirstBrowser"].value,
                document.forms["formCara"]["quartaSecondBrowser"].value,
                document.forms["formCara"]["quartaThirdBrowser"].value,
                document.forms["formCara"]["quinta"].value,
                document.forms["formCara"]["sexta"].value,
    ];

    let qCar = [
        "Idade: ",
        "Genero: ",
        "Frequencia com que usa Internet: ",
        "Browser de preferencia nr 1: ",
        "Browser de preferencia nr 2: ",
        "Browser de preferencia nr 3: ",
        "Conhece outros sites de imagens: ",
        "Outros sites de imagens: "
    ];


    for (let i = 0; i <8 ; i++) {
        let resposta = rCar[i];
        if (resposta === "" || undefined){
            rCar[i] = "Nao respondeu";
        }

        xmlRowString = xmlRowString + "<q id='q" + i + "'"  + ">" + qCar[i]  + "</q>" + "<r id='r" + i + "'"  + ">" + rCar[i]  + "</r>";

    }
    window.localStorage.setItem(data.toString() , xmlRowString);
}

function validateFormTwo() {
    let xmlRowString = localStorage.getItem(data.toString());
    let rTar = [document.forms["formTare"]["setima"].value,
                document.forms["formTare"]["oitava"].value,
                document.forms["formTare"]["nona"].value,
                document.forms["formTare"]["decima"].value,
                document.forms["formTare"]["decimaPrim"].value,
                document.forms["formTare"]["decimaSeg"].value,
                document.forms["formTare"]["decimaTer"].value,
                document.forms["formTare"]["decimaQua"].value,
                document.forms["formTare"]["decimaQui"].value
    ];
    let qTar = [
        "Indique se encontrou algum erro ou se sentiu alguma dificuldade em pereceber as funcionalidades principais do website: ",
        "Como classifica o resultado obtidos pela pesquisa por categoria: ",
        "Que dificuldades encontrou para realizar a pesquisa e visualizar os resultados: ",
        "Como classifica os resultados obtidos pela pesquisa de cor: ",
        "Que dificuldades encontrou para realizar a pesquisa e visualizar o resultados? ",
        "Como classifica os resulatdos obtidos pela pesquisa por imagem semelhante: ",
        "Como classifica a utilidade da pesquisa por imagems semelhantes: ",
        "Que dificuldade encontrou para realizar a pesquisa e visualizar os resultados? ",
        "Qual o tipo de pesquisa que acha mais adequado? "
    ];


    for (let i = 0; i <9 ; i++) {
        let resposta = rTar[i];
        if (resposta === "" || undefined){
            rTar[i] = "Nao respondeu";
        }

        xmlRowString = xmlRowString  + "<q id='q" + (i+8) + "'"  + ">" + qTar[i] +"</q>" +  "<r id='r" + (i+8) + "'"  + ">" + rTar[i] +"</r>"



    }
    window.localStorage.setItem(data.toString() , xmlRowString);
}

function validateFormThree() {
    let xmlRowString = localStorage.getItem(data.toString());
    let rAva = [
        document.forms["formAval"]["decimaSex"].value,
        document.forms["formAval"]["decimaSex2"].value,
        document.forms["formAval"]["decimaSex3"].value,
        document.forms["formAval"]["decimaSex4"].value,
        document.forms["formAval"]["decimaSet"].value,
        document.forms["formAval"]["decimaOit"].value,
        document.forms["formAval"]["decimaNon"].value,
        document.forms["formAval"]["vigesima"].value,
        document.forms["formAval"]["vigesimaPrim"].value,
        document.forms["formAval"]["vigesimaSeg"].value,
        document.forms["formAval"]["vigesimaTer"].value,
        document.forms["formAval"]["vigesimaQua"].value,
        document.forms["formAval"]["vigesimaQui"].value,
        document.forms["formAval"]["vigesimaSex"].value
    ];
    // let ppAva = [
    //     document.forms["formAval"]["decimaSex"].parentNode.parentElement.innerText,
    //     document.forms["formAval"]["decimaSex2"].parentNode.parentElement.innerText,
    //     document.forms["formAval"]["decimaSex3"].parentNode.parentElement.innerText,
    //     document.forms["formAval"]["decimaSex4"].parentNode.parentElement.innerText,
    //     document.forms["formAval"]["decimaSet"].parentNode.parentElement.innerText,
    //     document.forms["formAval"]["decimaOit"].parentNode.parentElement.innerText,
    //     document.forms["formAval"]["decimaNon"].parentNode.parentElement.innerText,
    //     document.forms["formAval"]["vigesima"].parentNode.parentElement.innerText,
    //     document.forms["formAval"]["vigesimaPrim"].parentNode.parentElement.innerText,
    //     document.forms["formAval"]["vigesimaSeg"].parentNode.parentElement.innerText,
    //     document.forms["formAval"]["vigesimaTer"].parentNode.parentElement.innerText,
    //     document.forms["formAval"]["vigesimaQua"].parentNode.parentElement.innerText,
    //     document.forms["formAval"]["vigesimaQui"].parentNode.parentElement.innerText,
    //     document.forms["formAval"]["vigesimaSex"].parentNode.parentElement.innerText
    // ];
    let qAva = [
        "Fantastico - Horrivel: ",
        "Estimulante - Aborrecida: ",
        "Gratificante - Frustrante: ",
        "Fácil - Dificil: ",
        "Eu penso utilizar este website com frequencia: ",
        "Eu acho que o website é nescessariamente complexo: ",
        "Eu acho que o website é facil de usar: ",
        "Eu acho que é necessário o apoio de um técnico para usar este website: ",
        "Eu acho que as várias funções do website estão bem integradas: ",
        "Eu acho que há muita inconsistência neste website: ",
        "Eu acho que a maioria das pessoas aprende a utilizar este website rapidamente: ",
        "Eu acho o website muito pouco natural de usar: ",
        "Eu senti-me muito confiante a utilizar o website: ",
        "Eu preciso aprender muitas coisas antes de poder usar este website: "

    ];
    for (let i = 0; i <14 ; i++) {
        let resposta = rAva[i];
        if (resposta === "" || undefined){
            rAva[i] = "Nao respondeu";
        }
        xmlRowString = xmlRowString + "<q id='q"  + (i+17)  + "'"  + ">" + qAva[i] +  "</q>" + "<r id='r"  + (i+17)  + "'"  + ">" + rAva[i] +  "</r>";
    }
    xmlRowString = xmlRowString + "</questionario>";
    window.localStorage.setItem(data.toString() , xmlRowString);
}


function writeData() {

    let bootScript = document.createElement("script");
    bootScript.setAttribute("rel", "stylesheet");
    bootScript.setAttribute("href", "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css");
    bootScript.setAttribute("integrity", "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh");
    bootScript.setAttribute("crossorigin", "anonymous");
    document.head.appendChild(bootScript);

    let index = window.localStorage.length;
    //document.write("<h1> Resultados do Questionario " + "</h1>");
    //document.body.setAttribute("style", "background-color: cornflowerblue");

    //big div
    let bigdiv = document.createElement("div");
    document.body.appendChild(bigdiv);

    //titulo
    let h1 = document.createElement("h1");
    h1.setAttribute("style", "color:white;margin-left: 27px;");
    h1.innerText = "Resultados do Questionario";
    bigdiv.appendChild(h1);

    for (let i = 0; i < index; i++) {
        let localStorageRow = window.localStorage.getItem(window.localStorage.key(i));
        if (window.DOMParser){
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(localStorageRow, "text/xml");
            let x = xmlDoc.getElementsByTagName("r");
            let y = xmlDoc.getElementsByTagName("q");

            //div
            let div = document.createElement("div");
            div.setAttribute("class", "container-fluid");
            bigdiv.appendChild(div);

            //utilizador
            let h2 = document.createElement("h2");
            h2.innerText = "Respostas do utilizador " + (i + 1);
            h2.setAttribute("style", "color:white;margin-left:13px");
            div.appendChild(h2);

            //card
            let card = document.createElement("div");
            card.setAttribute("class", "card");
            card.setAttribute("style", "background-color: white; margin: 15px;");
            div.appendChild(card);

            //card body
            let cardbody = document.createElement("div");
            cardbody.setAttribute("class", "card-body");
            card.appendChild(cardbody);


            for (let j = 0; j < x.length; j++) {

                if (j === 7 && x[j-1].textContent === "Sim"){
                    let p = document.createElement("p");
                    p.innerText = y[j].textContent + x[j].textContent;
                    cardbody.appendChild(p);
                    j++;
                }
                if (j === 7 && x[j-1].textContent === "Nao" || j === 7 && x[j-1].textContent === "Nao respondeu" ) j++;

                if (j === 17) {
                    let p = document.createElement("p");
                    p.innerText = "Para cada par de adjetivos, selecione a opção que melhor descreve a sua experiência de utilização deste website. ";
                    cardbody.appendChild(p);
                }

                let p = document.createElement("p");
                p.innerText = y[j].textContent + x[j].textContent;
                cardbody.appendChild(p);
            }
        }
    }
    let btn = document.createElement("a");
    btn.setAttribute("class", "btn btn-light");
    btn.setAttribute("href", "VisualSearch.html");
    btn.setAttribute("role", "button");
    btn.setAttribute("href", "VisualSearch.html");
    btn.setAttribute("style", "margin-left:27px;margin-bottom:15px;");
    btn.innerText = "Voltar";
    bigdiv.appendChild(btn);
}


