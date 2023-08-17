document.body.innerHTML=`
<video autoplay loop id="myVideo">
  <source src="https://www.w3schools.com/howto/rain.mp4" type="video/mp4">
  Your browser does not support HTML5 video.
</video>

<div class="content">
  <h1>Heading</h1>
  <p>Lorem ipsum dolor sit amet, an his etiam torquatos. Tollit soleat phaedrum te duo, eum cu recteque expetendis neglegentur. Cu mentitum maiestatis persequeris pro, pri ponderum tractatos ei. Id qui nemore latine molestiae, ad mutat oblique delicatissimi pro.</p>
  <button id="myBtn" onclick="myFunction()">Pause</button>
</div>

<script>
var video = document.getElementById("myVideo");
var btn = document.getElementById("myBtn");

function myFunction() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "Pause";
  } else {
    video.pause();
    btn.innerHTML = "Play";
  }
}
</script>


`;
