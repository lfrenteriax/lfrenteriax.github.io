


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
var listaCnt=document.getElementsByClassName("modal-body")[0];
function listaDeCanales(){
	
listaCnt.innerHTML="";
	//listaCnt.innerHTML="<ol id='thelist'></ol>"
	//var completelist= document.getElementById("thelist");
		for (i=1;i<myplaylist.length;i++){
			try {
			 //completelist.innerHTML += "<li>" + myplaylist[i-1].title.split(",")[1] + "</li>";
				//completelist.innerHTML += "<li><a href='#' onclick='GetIndex(this)'>"+myplaylist[i-1].title.split(",")[1] +"</a></li>"
				 listaCnt.innerHTML += "<a href='#' onclick='GetIndex(this)'>"+i+". "+myplaylist[i-1].title.split(",")[1] +"</a>"
			} catch (error) {
			 // console.error(error);
			  // Expected output: ReferenceError: nonExistentFunction is not defined
			  // (Note: the exact output may be browser-dependent)
			}
		}
		localStorage.setItem("lista",listaCnt.innerHTML);

}

var nav = document.getElementById("modal-body");
var left = document.getElementById("menuTitle");
var right = document.getElementById("MyClockDisplay");
var idx;

left.addEventListener("mouseenter", function(){
  idx = setInterval(scllM , 10);
});

function scllM(){
	nav.scrollTop =nav.scrollTop- 1;
}
left.addEventListener("mouseleave", function(){
  clearInterval(idx);
});

right.addEventListener("mouseenter", function(){
  idx = setInterval(scllP, 10);
});
function scllP(){
	nav.scrollTop =nav.scrollTop+1;
}

right.addEventListener("mouseleave", function(){
  clearInterval(idx);
});
function GetIndex(sender)
{
    var aElements = sender.parentNode.parentNode.getElementsByTagName("a");
    var aElementsLength = aElements.length;
    btn();
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
   localStorage.setItem("myplaylist",JSON.stringify(myplaylist));
   listaDeCanales();
	
  // loadChannel(myplaylist[0].file);
  };

function cargarCanales(){
	if(localStorage.getItem("lista")==null){
		getCanales(document.location.origin+"/lista.m3u");
		alert("Presione ok para cargar los canales por primera vez...");
		
	 }else{
	  	
	  listaCnt.innerHTML=localStorage.getItem("lista");
	  myplaylist=JSON.parse(localStorage.getItem("myplaylist"));
  	}
	
}
function inicio(){
	cargarCanales();
	if(localStorage.getItem("ultimoCanal")!=null)
		play(parseInt(localStorage.getItem("ultimoCanal")));
}
	

var frame=top.document.getElementById("frame");
var cnt=document.getElementById("cnt");
function play(ch) {
	if(!isNaN(ch)){
		localStorage.setItem("ultimoCanal",ch);
		ultimoCanal=ch;
		lastEvt="";
		url=myplaylist[ch].file;
		console.log(url)
		
		cnt.innerHTML="";
		//frame=document.createElement("frame");
		//frame.id="frame";
		//cnt.appendChild(frame);
		
		try {
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
		} catch (error) {
			  console.error(error);

			  alert(error);
			  // Expected output: ReferenceError: nonExistentFunction is not defined
			  // (Note: the exact output may be browser-dependent)
		}
		
	}
}
function getParameter (key)  {
  
  try {
  address = window.location.search
  
    // Returns a URLSearchParams object instance
    parameterList = new URLSearchParams(address)
  
    // Returning the respected value associated
    // with the provided key
	  return parameterList.get(key)
}
catch(err) {
  
}
	// Address of the current window
    
    return null
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
//http.onload = () => loadEvents(http.responseText,event);
http.onload =  loadEvents;	
http.event=event;
http.send()


}

var html;
var parser = new DOMParser();
var parsed;
function loadEvents() { 
 // event.cargar(this.response);
	this.event.cargar(this.response);
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
		 //   auxlblBox.value="";
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
	
	if(lblBox.innerHTML=="0"){
		if(lastEvt=="")
			play(ultimoCanal);
		else
			document.getElementById(lastEvt).click();
		
	}else if(lblBox.innerHTML=="0000"){
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
//	listaCnt.innerHTML="<ol id='thelist'></ol>"
//	var completelist= document.getElementById("thelist");
	span=document.createElement("span");
	listaCnt.appendChild(span);
	for (ii=1;ii<arr.length;ii++){
			try {
				//atob(arr[i-1]['url'].split("?r=")[1]).split("?get=")[1]
			 
			// li=document.createElement("li");
			a=document.createElement("a");
			a.href="#";
			a.id="ev"+ii;
			if (arr[ii-1]['status'] != "FINALIZADO" ){
				span.classList="";
				if(arr[ii-1]['status'] == "EN VIVO"){
					urlToP=atob(arr[ii-1]['url'].split("?r=")[1]);
					if(urlToP.search("get=")>0)
						urlToP=urlToP.split("?get=")[1]
					eventList["ev"+ii]=urlToP;
					a.onclick = function() { playEvent(this); };
					a.innerHTML=ii+". "+arr[ii-1].league+" | "+arr[ii-1].title+" |";
					liveImg=document.createElement("img");
					liveImg.src="LIVE.gif";
					a.appendChild(liveImg);	
					
					//span.innerHTML="LIVE";
				   // 	span.classList.add("live");
				}else{
				    
				    span.innerHTML=arr[ii-1]['status'];
				    span.classList.add("t");
				    guardaHorario();
				   a.innerHTML=ii+". "+arr[ii-1].league+" | "+arr[ii-1].title+" | "+span.innerHTML;
					
				}	
				//li.appendChild(a);
				//li.appendChild(span);
				listaCnt.appendChild(a);
			}
				
			
				
			} catch (error) {
			  console.error(error);
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
var lastEvt="";
function playEvent(evt){
	lastEvt=evt.id;
	console.log(evt.id);
	cnt.innerHTML="";
	nurl="/jwplayer.html?get="+eventList[evt.id];
	cnt.innerHTML='<iframe src="'+nurl+'"' + 'title="description"> </iframe> ';
}

//https://www.tvspacehd.com/feeds/posts/summary/-/Canales+Latinos?alt=json-in-script&callback=tv&max-results=50

var opciones="<li><a href='#' onclick='recargarCanales()'>Recargar Canales</a></li>"
function recargarCanales(){
	lblBox.innerHTML="0000"
}
function cargarOpciones(){
	listaCnt.innerHTML=opciones;
	openFullscreen() 
}

var elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}
