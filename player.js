

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
    cch=getParameter("ch");
	if(cch!=null)
		play(cch);
  // loadChannel(myplaylist[0].file);
  };

   


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
  

