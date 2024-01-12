	

var canalesJson="";


 
document.addEventListener('DOMContentLoaded', inicio);

function getCanales(url){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.overrideMimeType("audio/x-mpegurl"); // Needed, see below.
  xhr.onload = parse;
  xhr.send();
}

var ultimoCanal;
function listaDeCanales(){
	listaCnt=document.getElementsByClassName("modal-body")[0];
	listaCnt.innerHTML="";
	listaCnt.innerHTML="<ol id='thelist'></ol>"
	var completelist= document.getElementById("thelist");
	if(localStorage.getItem("lista")==null){
		alert("Presione ok para cargar los canales por primera vez...");
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
		localStorage.setItem("lista",listaCnt.innerHTML);
	 }else{
	  	
	  listaCnt.innerHTML=localStorage.getItem("lista");
  	}
	if(localStorage.getItem("ultimoCanal")!=null)
		play(parseInt(localStorage.getItem("ultimoCanal")));
}


function GetIndex(sender)
{
    var aElements = sender.parentNode.parentNode.getElementsByTagName("a");
    var aElementsLength = aElements.length;
    mdBodyFcn();
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
var listaCnt;
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
	if(!isNaN(ch)){
		localStorage.setItem("ultimoCanal",ch);
		ultimoCanal=ch;
			
		url=myplaylist[ch].file;
		console.log(url)
		cnt=document.getElementById("cnt");
		cnt.innerHTML="";
		//frame=document.createElement("frame");
		//frame.id="frame";
		//cnt.appendChild(frame);
		
		if(url.search("https")==0){
		      nurl="/jwplayer.html?get="+url;
		      cnt.innerHTML='<iframe src="'+nurl+'"' + 'title="description"> </iframe> ';
		
		}else{
			window.open(url);
		}
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
            if (ASCIICode==13){
		 labelAction();
	   }else if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
                 if (ASCIICode==38){
		  	lblBox.innerHTML=ultimoCanal+1;
			labelAction(); 
		 }
		if (ASCIICode==40){
		  	lblBox.innerHTML=ultimoCanal-1;
			labelAction(); 
		 }
		 
		    //alert(false,evt.key);
           else{
		   lblBox.innerHTML=lblBox.innerHTML+evt.key;   
		    auxlblBox.value="";
		   lblTimer=0;
	   }
           	
          
        
}

function getEvents(event){
 const http = new XMLHttpRequest()

http.open("GET", event.url)
http.send()

http.onload = () => loadEvents(http.responseText,event);
}

var html;
var parser = new DOMParser();
var parsed;
function loadEvents(response,type) { 
  
  html = response;
 parser = new DOMParser();
parsed = parser.parseFromString(html, "text/html");
 menu=parsed.getElementsByClassName("menu")[0];
// lista=menu.getElementsByTagName("li");

//  document.getElementById("demo").innerHTML = menu.firstChild.innerText;
  
}

function kpAction(ASCIICode){
	 if (ASCIICode==13){
		 labelAction();
	   }else if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)){
                console.log(ASCIICode);
		    } else{
		   lblBox.innerHTML=lblBox.innerHTML+String.fromCharCode(ASCIICode);   
		    auxlblBox.value="";
		   lblTimer=0;
	   }
}
function kdAction(keynum){
	 if(keynum==38 || keynum==33){
	  lblBox.innerHTML=ultimoCanal+1;
	
	  setTimeout(function(){
	     
	  
	  labelAction()
	}, 1000);
	 
  }
if(keynum==40||keynum==34){
	  lblBox.innerHTML=ultimoCanal-1;
	 
	setTimeout(function(){
	    
	  
	  labelAction()
	}, 1000);
  }
}

function myKeyPress(evt) {


             
            // Only ASCII character in that range allowed
            var ASCIICode = (evt.which) ? evt.which : evt.keyCode
	    console.log(ASCIICode);
           
            kpAction(ASCIICode);
          
        
}

function myKeyDown(e){
  var keynum;

  if(window.event) { // IE                  
    keynum = e.keyCode;
  } else if(e.which){ // Netscape/Firefox/Opera                 
    keynum = e.which;
  }
	
 kdAction(keynum);
  
}
function labelAction(){
	lblTimer=0;
	if(lblBox.innerHTML=="0000"){
		localStorage.clear();
		location.reload();
		
	}else{
		play(parseInt(lblBox.innerHTML));
	}
	lblBox.innerHTML="";
	console.log("labelAction");
}

 window.addEventListener('message', function(event) {
    console.log("Message received from the child: " + event.data); // Message received from child
    if(event.data[0]=="kd")
	    kdAction(event.data[1]);
    else
	   kpAction(event.data[1])  ;
	    
  });
function cargarStar(data){
	console.log(data);
}
eventosStar=Object();	
eventosStar.url="https://librefutboltv.net/star-plus/eventos.json","start";
eventosStar.cargar=cargarStar;
getEvents(eventosStar);

