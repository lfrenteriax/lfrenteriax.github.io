

var canalesJson="";


 
document.addEventListener('DOMContentLoaded', inicio);

function getCanales(url){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.overrideMimeType("audio/x-mpegurl"); // Needed, see below.
  xhr.onload = parse;
  xhr.send();
}

// Parse it
var myplaylist="";
function parse () {
   
   myplaylist = M3U.parse(this.response);
   listaDeCanales();
    cch=getParameter("ch");
	if(cch!=null)
		play(cch);
   
  // loadChannel(myplaylist[0].file);
  };

   
function listaDecanales(){
listaCnt=document.getElementsByClassName("modal-body")[0];
listaCnt.innerHTML="";
listaCnt.innerHTML="<ol id='thelist'></ol>"
var completelist= document.getElementById("thelist");
for (i=1;i<myplaylist.length;i++){try {
 //completelist.innerHTML += "<li>" + myplaylist[i-1].title.split(",")[1] + "</li>";
completelist.innerHTML += "<li><a href='#' onclick='GetIndex(this)'>"+myplaylist[i-1].title.split(",")[1] +"</a></li>"	
} catch (error) {
  console.error(error);
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
function inicio(){
  
getCanales(document.location.origin+"/lista.m3u");

}

var frame=top.document.getElementById("frame");
function play(ch) {
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
  

