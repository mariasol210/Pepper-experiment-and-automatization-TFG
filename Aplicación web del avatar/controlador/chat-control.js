//JS for controlling cards
//Function no create and add the cards with the dialogue info to the html
function ChangeCards(ans){
    let currentCard = document.getElementById("currentCard");
    currentCard.getElementsByTagName('h5')[0].innerText = "Audio " + ans
    currentCard.getElementsByTagName('p')[0].innerText = graph.getText(ans);

    let vetex = graph.getAllVetex(ans)
    let card1 = ""
    let card2 = ""
    let OptionCards = document.getElementById("OptionCards");
    OptionCards.innerHTML = ""

    if (!vetex){
        card1 = '<div class="card bg-warning text-white" style="width: 18rem;"> <div class="card-body">' +
        '<h5 class="card-title">FIN DIÁLOGO </h5>' +
        '<p class="card-text"> Hora de la despedida</p></div> </div> '
    }
    else {
        for (const edge of vetex){
            if (edge.weight == 'neutro') {
                card1 = '<div class="card bg-info text-white" style="width: 18rem;"> <div id=noCard" class="card-body">' +
                '<h5 class="card-title">Audio ' + edge.connectedVetex +'</h5>' +
                '<p class="card-text">'+ graph.getText(edge.connectedVetex) +'</p></div> </div> '
            }
            if (edge.weight == 'si') {
                card1 = '<div class="card bg-success text-white" style="width: 18rem;"> <div class="card-body">' +
                '<h5 class="card-title">Audio ' + edge.connectedVetex +'</h5>' +
                '<p class="card-text">'+ graph.getText(edge.connectedVetex) +'</p></div> </div> '
            }
            if (edge.weight == 'no'){
                card2 = '<div class="card bg-danger text-white" style="width: 18rem;"> <div id=noCard" class="card-body">' +
                '<h5 class="card-title">Audio ' + edge.connectedVetex +'</h5>' +
                '<p class="card-text">'+ graph.getText(edge.connectedVetex) +'</p></div> </div> '
            }
        }
    }

    OptionCards.innerHTML += card1
    OptionCards.innerHTML += card2
}

// Js for cntroling video
let videoPrincipal = document.getElementById("myVideo");
//videoPrincipal.autoplay = true;
//console.log(videoPrincipal.autoplay);
videoPrincipal.load();

let videoPath = "../modelo/video/animaciones_con_audio/Facial/FacialAudio_";
let videoExt = ".mov.mp4";
let currentAns = videoPrincipal.dataset.code

// api url
const api_url =
	"http://192.168.8.68:5000/api";
const api_repeat =
	"http://192.168.8.68:5000/api_repeat";

// Variable to store the graph after loading from json
let graph;

//To change the dialog cards to the current video and the answers it has
logJSONData().then(g => {
    graph = g;
    ChangeCards(currentAns);
    postData(api_url, '0000');
  });

//POST 
// datos mandados con la solicutud POST
function postData(url, ans){
    let nextAns = graph.findNextVetexByEdge(currentAns, ans);
    if (nextAns != null) {
        videoPrincipal.dataset.code = nextAns;
        currentAns = videoPrincipal.dataset.code
    }
    let _datos = {
        q: currentAns
    }
      
    fetch(url, {
        method: "POST",
        body: JSON.stringify(_datos),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
    .then(response => response.json()) 
    .then(json => console.log(json))
    .catch(error => console.error('Error:', error)); 
    
}

function postRepeat(url){  
    fetch(url, {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
    .then(response => response.json()) 
    .then(json => console.log(json))
    .catch(error => console.error('Error:', error)); 
    
}

// if there is an answer, change the video. If not, it sends the message to change the answer
function changeVideo(ans){
    if(ans != null) {
        videoPrincipal.dataset.code = ans;
        videoPrincipal.setAttribute("src",videoPath + ans + videoExt);
        videoPrincipal.load();
        videoPrincipal.play();
    }
    else {
        console.log('there is no answer option, try another')
    }
}

// Change video and Dialog cards on click for any button
document.getElementById("respondeSi").onclick = function() {
    //POST 
    postData(api_url, 'si');
    changeVideo(currentAns);
    ChangeCards(currentAns);
}

document.getElementById("respondeNo").onclick = function() {
    postData(api_url, 'no');
    changeVideo(currentAns);
    ChangeCards(currentAns);
}

document.getElementById("respondeNeutro").onclick = function() {
    postData(api_url, 'neutro');
    changeVideo(currentAns);
    ChangeCards(currentAns);
}

document.getElementById("repeat").onclick = function() {
    postRepeat(api_repeat);
    changeVideo(currentAns);
}

// React to keys
document.onkeydown = function(e){
    if(e.key == 'a') {
        postData(api_url, 'si');
        changeVideo(currentAns);
        ChangeCards(currentAns);
    } else if(e.key == 'd') {
        postData(api_url, 'no');
        changeVideo(currentAns);
        ChangeCards(currentAns);
    } else if (e.key == 's') {
        postData(api_url, 'neutro')
        changeVideo(currentAns);
        ChangeCards(currentAns);
    } else if (e.key == ' ') {
        videoPrincipal.play();
    } else if (e.key == 'r') {
        changeVideo(currentAns);
    }
}

