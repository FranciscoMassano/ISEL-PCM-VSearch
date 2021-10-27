//Declaring a global variable which will be created in main function 
let app = null;

function main() {
    let canvas = document.querySelector("canvas");

    //Creating the instance of the application
    app = new ISearchEngine("XML/Image_database.xml");

    // Initializing the app
    app.init(canvas);

    //audio
    audioPlayer();

}
function searchByKeyword() {
    console.log("Search Engine Manager Start");
    let canvas = document.querySelector("canvas");
    let category = document.getElementById("search").value;
    console.log(category);

    //Comparar com as categorias
    for(let i = 0; i < app.categories.length; i++){
        if (category === app.categories[i]){
            app.searchKeywords(category);//Vai buscar as imagens da categoria e coloca num array
            app.gridView(canvas);//Mostrar as imagens
        }
    }
    //this.createXMLColorDatabaseLS();
    console.log("Search Engine Manager End");
}

//pesquisa no browser por cor no browser
function searchByColor(button) {
    let hexColor = button.id;
    console.log(hexColor);
    let canvas = document.querySelector("canvas");
    let category = document.getElementById("search").value;
    app.searchColor(category, hexColor);
    app.gridView(canvas);
}


//Function that generates an artificial image and draw it in canvas
//Useful to test the image processing algorithms
function Generate_Image(canvas) {
    var ctx = canvas.getContext("2d");
    var imgData = ctx.createImageData(100, 100);

    for (var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i + 0] = 204;
        imgData.data[i + 1] = 0;
        imgData.data[i + 2] = 0;
        imgData.data[i + 3] = 255;
        if ((i >= 8000 && i < 8400) || (i >= 16000 && i < 16400) || (i >= 24000 && i < 24400) || (i >= 32000 && i < 32400))
            imgData.data[i + 1] = 200;
    }
    ctx.putImageData(imgData, 150, 0);
    return imgData;
}

function audioPlayer() {
    let playlist, idx, audio, button;
    playlist = ["song_1", "song_2", "song_3", "song_4"];
    idx = 1;
    audio = new Audio();
    audio.src = "musics/"+playlist[idx] + ".mp3";
    audio.loop = false;
    button = document.getElementById("btn_music");
    let button1 = document.getElementById("btn_previous");
    let button2  = document.getElementById("btn_next");
    button.addEventListener("click", function(){ playPause(); });
    audio.addEventListener("ended", function(){ nextSong(); });
    button1.addEventListener("click", function(){ previousSong() ; });
    button2.addEventListener("click", function(){ nextSong(); });

    function playPause(){//Play or pause a musica
        if(audio.paused){
            audio.play();
            playing = true;
            button.style.animationPlayState = "running";
            button.src = "web/pause.png";

        }
        else {
            audio.pause();
            playing = false;
            button.style.animationPlayState = "paused";
            button.src = "web/play.png";
        }
    }
    function nextSong() {//musica seguinte
        if(idx === (playlist.length - 1)){
            idx = 0;
        } else {
            idx++;
        }
        audio.src = "musics/"+playlist[idx] + ".mp3";
        if(playing){
            audio.play();
        }
    }
    function previousSong() {//musica anterior
        if(idx === 0){
            idx = playlist.length - 1;
        } else {
            idx--;
        }
        audio.src = "musics/"+playlist[idx] + ".mp3";
        if(playing){
            audio.play();
        }
    }

}

