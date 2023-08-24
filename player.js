

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

  // loadChannel(myplaylist[0].file);
  };

   


function inicio(){
  
getCanales(document.location.href+"lista.m3u");

}
