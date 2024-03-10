


var canalesJson="";


 
document.addEventListener('DOMContentLoaded', inicio);

function getCanales(url){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.overrideMimeType("audio/x-mpegurl"); // Needed, see below.
  xhr.onload = parse;
  xhr.send();
}
var opciones="<li><a href='#' onclick='GetIndex(this)'>Recargar</a></li>"
var ultimoCanal;
var listaCnt=document.getElementsByClassName("modal-body")[0];
function listaDeCanales(){
	
	listaCnt.innerHTML="";
	//listaCnt.innerHTML="<ol id='thelist'></ol>"
	var completelist= document.getElementById("thelist");
	if(localStorage.getItem("lista")==null){
		alert("Presione ok para cargar los canales por primera vez...");
		for (i=1;i<myplaylist.length;i++){
			try {
			 //completelist.innerHTML += "<li>" + myplaylist[i-1].title.split(",")[1] + "</li>";
				//completelist.innerHTML += "<li><a href='#' onclick='GetIndex(this)'>"+myplaylist[i-1].title.split(",")[1] +"</a></li>"
				 listaCnt.innerHTM += "<a href='#' onclick='GetIndex(this)'>"+myplaylist[i-1].title.split(",")[1] +"</a>"
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
var cnt=document.getElementById("cnt");
function play(ch) {
	if(!isNaN(ch)){
		localStorage.setItem("ultimoCanal",ch);
		ultimoCanal=ch;
			
		url=myplaylist[ch].file;
		console.log(url)
		
		cnt.innerHTML="";
		//frame=document.createElement("frame");
		//frame.id="frame";
		//cnt.appendChild(frame);
		
		if(url.search("https")==0){
		      if(url.search("twitch")>0){
				nurl="/twplayer.html?get="+url.split("twitch.tv/")[1];
		      		cnt.innerHTML='<iframe src="'+nurl+'"' + 'title="description"> </iframe> ';
			}else{
		      		nurl="/jwplayer.html?get="+url;
		      		cnt.innerHTML='<iframe src="'+nurl+'"' + 'title="description"> </iframe> ';
		      }
		     
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
function loadEvents(response,event) { 
  event.cargar(response);
 /* html = response;
 parser = new DOMParser();
parsed = parser.parseFromString(html, "text/html");
 menu=parsed.getElementsByClassName("menu")[0];*/
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
var arr;
var eventList={};
function cargarStar(data){
	arr=JSON.parse(data);

    listaCnt.innerHTML="";
	listaCnt.innerHTML="<ol id='thelist'></ol>"
	var completelist= document.getElementById("thelist");
	for (i=1;i<arr.length;i++){
			try {
				//atob(arr[i-1]['url'].split("?r=")[1]).split("?get=")[1]
			 
			 li=document.createElement("li");
			a=document.createElement("a");
			span=document.createElement("span");
			a.href="#";
			a.innerHTML=arr[i-1].league+" | "+arr[i-1].title+" | ";
			a.id="ev"+i;
			if (arr[i-1]['status'] != "FINALIZADO" ){
				if(arr[i-1]['status'] == "EN VIVO"){
					urlToP=atob(arr[i-1]['url'].split("?r=")[1]);
					if(urlToP.search("get=")>0)
						urlToP=urlToP.split("?get=")[1]
					eventList["ev"+i]=urlToP;
					a.onclick = function() { playEvent(this); };
					span.innerHTML="LIVE";
				    	span.classList.add("live");
				}else{
				    span.innerHTML=arr[i-1]['status'];
				    span.classList.add("t");
					
				}	
				li.appendChild(a);
				li.appendChild(span);
				completelist.appendChild(li);
			}
				
			
				
			} catch (error) {
			 // console.error(error);
			  // Expected output: ReferenceError: nonExistentFunction is not defined
			  // (Note: the exact output may be browser-dependent)
			}
	}
	/*
    var content = '';
			
			for (var i = 0; i < arr.length; i++)
			{
							
				var obj = arr[i];
				if (obj['status'] == "FINALIZADO" ){}
				
				else if ( obj['status'] == "EN VIVO")
					status = obj['status'];
				else
					status = 'HOY | <span class="t">' + obj['status'] + '</span> hs';
			
				if (status == "EN VIVO")
					color = "danger";
				else
					color = "dark";
					
				content += '<div class="w3-quarter"><a href="' + obj['url'] + '"><img src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/star/' + obj['img'] + '/scale?width=500&aspectRatio=1.78&format=jpeg" alt="Star+" style="width:100%" class="w3-hover-opacity"></a><a class="btn btn-block btn-' + color + '" href="' + obj['url'] + '">' + status + '</a> <div class="w3-card-4"><p><b>' + obj['league'] + '</b></p><p>' + obj['title'] + '</p></div></div>';
				
				if (i == arr.length-1)
					content += '</div>';
			}
	console.log("fin");
*/
	guardaHorario();
}
eventosStar=Object();	
eventosStar.url="https://corsproxy.io/?url=https://deportestvhd2.com/star.json?vhavvw","start";
eventosStar.cargar=cargarStar;

plutoTv=Object();	
plutoTv.url="https://pluto.tv/es/live-tv/5e793a7cfbdf780007f7eb75";
plutoTv.cargar=cargarPluto;
function cargarPluto (){
	console.log("pluto");
	cnt.innerHTML="";
	
	cnt.innerHTML='<iframe src="'+plutoTv.url+'"' + 'title="description"> </iframe> ';	
}
function cargarMenu(){
	listaCnt.innerHTML="";
	listaCnt.innerHTML="<ol id='thelist'></ol>"
	var completelist= document.getElementById("thelist");
}
//getEvents(eventosStar);
function playEvent(evt){
	console.log(evt.id);
	cnt.innerHTML="";
	nurl="/jwplayer.html?get="+eventList[evt.id];
	cnt.innerHTML='<iframe src="'+nurl+'"' + 'title="description"> </iframe> ';
}

//https://www.tvspacehd.com/feeds/posts/summary/-/Canales+Latinos?alt=json-in-script&callback=tv&max-results=50
