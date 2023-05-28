// Js for cntroling window
let videoPrincipal = document.getElementById("myVideo");
videoPrincipal.autoplay = true;
//console.log(videoPrincipal.autoplay);
videoPrincipal.load();

let videoPath = "../modelo/video/animaciones_con_audio/Facial/FacialAudio_";
let videoExt = ".mov.mp4";
let currentAns = videoPrincipal.dataset.code

// api url
const api_url =
    "http://192.168.8.68:5000/api";

// Defining async function
async function getapi(url) {
	
	// Storing response
	const response = await fetch(url);
	
	// Storing data in form of JSON
	var data = await response.json();
	console.log(data);
	if (response) {
        if (data.repeat) {
            console.log("REPEATING VIDEO");
            videoPrincipal.play();
        }
        else if (data.code != currentAns) {
            currentAns = data.code;
            console.log("CHANGING VIDEO");
            changeVideo(currentAns);
        }
        else {
            console.log("no change");
        }
	}
    else {
        console.log("no response");
    }
}
// Calling that async function
setInterval(getapi, 1000, api_url)

// if there is an answer, change the video. If not, it sends the message to change the answer
function changeVideo(api_code){
    if(api_code != null) {
        videoPrincipal.dataset.code = api_code;
        videoPrincipal.setAttribute("src",videoPath + api_code + videoExt);
        videoPrincipal.load();
        videoPrincipal.play();
    }
    else {
        console.log('there is no answer option, try another')
    }
}