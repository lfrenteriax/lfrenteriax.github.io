

var canalesJson="";


  const manifestUri =
    'http://64.71.148.2:1935/latin/encoder44/playlist.m3u8';

function initApp() {
  // Install built-in polyfills to patch browser incompatibilities.
  murl="https://0054-jbc.dtvott.com/dash_live_0054/manifest.mpd?ck=bd1af42db82f5a17a0d75246f25f5201&2d104170d5617556b16484d2c44b0036";

  shaka.polyfill.installAll();

  // Check to see if the browser supports the basic APIs Shaka needs.
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    initPlayer();

 

  } else {
    // This browser does not have the minimum set of APIs we need.
    console.error('Browser not supported!');
  }
}

async function initPlayer() {
  // Create a Player instance.
  const video = document.getElementById('video');
  player = new shaka.Player(video);

  // Attach player to the window to make it easy to access in the JS console.
  window.player = player;

  // Listen for error events.
  player.addEventListener('error', onErrorEvent);

  // Try to load a manifest.
  // This is an asynchronous process.
  try {
    await player.load(manifestUri);
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
  } catch (e) {
    // onError is executed if the asynchronous load fails.
    onError(e);
  }
}

function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}

function onError(error) {
  // Log the error.
  console.error('Error code', error.code, 'object', error);
}

document.addEventListener('DOMContentLoaded', inicio);

var player="";
function playM3u8(url, license, clearkeys) {
    player.configure("drm.clearKeys",clearkeys);
    player.configure("drm.license",license);
   //player.load(url);
    player.load(url).then(function () {
          // This runs if the asynchronous load is successful.
          console.log('The video has now been loaded!');
          console.log('The video has now been loaded!');
    video.currentTime=0.1;
        })
        .catch(this.onError); 
    // This runs if the asynchronous load is successful.
  
    
}

function loadChannel(urlStream){
     var url = urlStream.split("?")[0];

  var ck={};
  var license="";

    try {
       cks = urlStream.split("?ck=")[1].split("&");
       keyId=cks[0];
       key=cks[1];
       ck[cks[0]]=cks[1];
    } catch{
      
    }
    
      license = urlStream.split("?ls=")[1];    
      if (license==undefined)
        license="";
      if (ck==undefined)
        var ck={};
    playM3u8(url, license, ck);
}

 //plutoUrl='https://raw.githubusercontent.com/iptv-org/iptv/master/streams/us_pluto.m3u';
  // Fetch the playlist file, using xhr for example
plutoUrl='lista.m3u'
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
  initApp();
getCanales(document.location.href+"lista.m3u");

}