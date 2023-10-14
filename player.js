

var canalesJson="";


 
document.addEventListener('DOMContentLoaded', inicio);

function getCanales(url){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.overrideMimeType("audio/x-mpegurl"); // Needed, see below.
  xhr.onload = parse;
  xhr.send();
}


function listaDeCanales(){
	listaCnt=document.getElementsByClassName("modal-body")[0];
	listaCnt.innerHTML="";
	listaCnt.innerHTML="<ol id='thelist'></ol>"
	var completelist= document.getElementById("thelist");
	for (i=1;i<myplaylist.length;i++){
		try {
		 //completelist.innerHTML += "<li>" + myplaylist[i-1].title.split(",")[1] + "</li>";
		completelist.innerHTML += "<li><a href='#' onclick='GetIndex(this)'>"+myplaylist[i-1].title.split(",")[1] +"</a></li>"	
		} catch (error) {
		 // console.error(error);
		  // Expected output: ReferenceError: nonExistentFunction is not defined
		  // (Note: the exact output may be browser-dependent)
		}
	}
}


function GetIndex(sender)
{
    var aElements = sender.parentNode.parentNode.getElementsByTagName("a");
    var aElementsLength = aElements.length;

    var index;
    for (var i = 0; i < aElementsLength; i++)
    {
        if (aElements[i] == sender) //this condition is never true
        {
            index = i;
           // alert("found match at "+i );
            play(index);
		return index;
		
        }
    }
}




// Parse it
var myplaylist="";
function parse () {
   
   myplaylist = M3U.parse(this.response);
   
    cch=getParameter("ch");
	if(cch!=null)
		play(cch-1);
   listaDeCanales();
  // loadChannel(myplaylist[0].file);
  };

   
function inicio(){
  
getCanales(document.location.origin+"/lista.m3u");

}

var frame=top.document.getElementById("frame");
function play(ch) {
mdBodyFcn();
	
url=myplaylist[ch].file;
console.log(url)
cnt=document.getElementById("cnt");
cnt.innerHTML="";
//frame=document.createElement("frame");
//frame.id="frame";
//cnt.appendChild(frame);

if(url.search("https")==0){
      nurl="/player.html#"+url;
      cnt.innerHTML='<iframe src="'+nurl+'"' + 'title="description"> </iframe> ';

}else{
	window.open("http://yielding-meeting.surge.sh/?url="+url);
}

}
getParameter = (key) => {
  
    // Address of the current window
    address = window.location.search
  
    // Returns a URLSearchParams object instance
    parameterList = new URLSearchParams(address)
  
    // Returning the respected value associated
    // with the provided key
    return parameterList.get(key)
}
  
function mouseEv(evt) {
             
            // Only ASCII character in that range allowed
            var ASCIICode = (evt.which) ? evt.which : evt.keyCode
            if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
                alert(false,evt.key);
           else 
           	alert(true)
          
        
}

function getEvents(url){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.overrideMimeType("audio/x-mpegurl"); // Needed, see below.
  xhr.onload = loadEvents();
  xhr.send();
}

var html;
var parser = new DOMParser();
var parsed;
function loadEvents() { 
  
  html = this.response;
 parser = new DOMParser();
parsed = parser.parseFromString(html, "text/html");
 menu=parsed.getElementsByClassName("menu")[0];
// lista=menu.getElementsByTagName("li");

//  document.getElementById("demo").innerHTML = menu.firstChild.innerText;
  
}

function keyInput(evt) {


             
            // Only ASCII character in that range allowed
            var ASCIICode = (evt.which) ? evt.which : evt.keyCode
            if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
                alert(false,evt.key);
           else 
           	alert(true)
          
        
}
getEvents("https://corsproxy.io/?https%3A%2F%2Fsinfutboltv.com%2Fagendadeportiva.php");
