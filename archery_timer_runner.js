var buzzer = new Audio('buzzer.wav');
var audiotime = 1008;
var runnermode = localStorage.getItem("runnermode") === null ? "free" : localStorage.getItem("runnermode");
var currentphase = "phase-Stop";
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('').map((c) => c.toUpperCase());
var archers_per_lane = localStorage.getItem("archers_per_lane") === null ? 1 : localStorage.getItem("archers_per_lane");
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
  //await sleep(audiotime);
}

function on_load_Body() {
  //hide_all_phases();
  console.log("Runnermode = " + runnermode);
  currentphase = "phase-Stop";
  add_onclick_all_phases();
  if (runnermode == "free"){
    set_div_colors_free();
    disable_archers_per_lane();
  } else {
    set_div_colors_timed();
    enable_archers_per_lane();
  }
}
function add_onclick_all_phases(){
  var phases = document.getElementsByName("phases");
  for (var i = 0; i < phases.length; i++) {
    add_next_phase_function(phases[i]);
  }
}
function add_next_phase_function(htmlObject){
  htmlObject.onclick = (function(){activate_next_phase();});
}
function hide_all_phases(){
  var phases = document.getElementsByName("phases");
  for (var i = 0; i < phases.length; i++) {
    if ( !phases[i].classList.contains("hidden") ){
        phases[i].classList.add("hidden");
    }
  }
}
function set_div_colors_timed(){
  var phases = document.getElementsByName("phases");
  for (var i = 0; i < phases.length; i++) {
    switch (phases[i].id) {
      case "phase-GetReady":
        phases[i].style.backgroundColor = localStorage.getItem("getReadyColor") === null ? "#E53935" : localStorage.getItem("getReadyColor");
        break;
      case "phase-Shooting":
        phases[i].style.backgroundColor = localStorage.getItem("ShootingColor") === null ? "#43A047" : localStorage.getItem("ShootingColor");
        break;
      case "phase-Warning":
        phases[i].style.backgroundColor = localStorage.getItem("WarningColor") === null ? "#FB8C00" : localStorage.getItem("WarningColor");
        break;
      case "phase-Stop":
        stopcolor = localStorage.getItem("StopColor") === null ? "#E53935" : localStorage.getItem("StopColor");
        phases[i].style.backgroundColor = stopcolor;
        htmlObject = document.getElementById("h1-phase-Stop")
        htmlObject.classList.add("inverted");
        htmlObject.style.color = stopcolor;
        break;
      default:
    }
  }
}
function set_div_colors_free(){
  var phases = document.getElementsByName("phases");
  for (var i = 0; i < phases.length; i++) {
    switch (phases[i].id) {
      case "phase-Shooting":
        phases[i].style.backgroundColor = localStorage.getItem("freeShootingColor") === null ? "#43A047" : localStorage.getItem("freeShootingColor");
        break;
      case "phase-Stop":
        phases[i].style.backgroundColor = localStorage.getItem("freeStopColor") === null ? "#E53935" : localStorage.getItem("freeStopColor");
        break;
      default:
    }
  }
}
function activate_next_phase(){
  hide_all_phases();
  console.log("activate_next_phase");
  if (runnermode == "timed"){
    activate_next_phase_timed();
  } else {
    activate_next_phase_free();
  }
}
function activate_next_phase_timed(){
  var nextphase;
  switch (currentphase) {
    case "phase-GetReady":
      nextphase = "phase-Shooting";
      document.getElementById(nextphase).classList.remove("hidden");
      var ShootingTime = localStorage.getItem("ShootingTime") === null ? 120 : localStorage.getItem("ShootingTime");
      var WarningTime = localStorage.getItem("WarningTime") === null ? 120 : localStorage.getItem("WarningTime");
      starttimer("h1-"+nextphase,ShootingTime,WarningTime);
      break;
    case "phase-Shooting":
      nextphase = "phase-Warning";
      document.getElementById(nextphase).classList.remove("hidden");
      break;
    case "phase-Warning":
      nextphase = "phase-Stop";
      document.getElementById(nextphase).classList.remove("hidden");
      break;
    case "phase-Stop":
      nextphase = "phase-GetReady";
      document.getElementById(nextphase).classList.remove("hidden");
      break;
    default: //go to stop as a default
      nextphase = "phase-Stop";
      document.getElementById(nextphase).classList.remove("hidden");
  }
  currentphase = nextphase;
}
function activate_next_phase_free(){
  var nextphase;
  var buzzTimes;
  switch (currentphase) {
    case "phase-GetReady":
      nextphase = "phase-Shooting";
      document.getElementById(nextphase).classList.remove("hidden");
      break;
    case "phase-Shooting":
      nextphase = "phase-Stop";
      document.getElementById(nextphase).classList.remove("hidden");
      buzzTimes = localStorage.getItem("freeStopBuzz") === null ? 3 : localStorage.getItem("freeStopBuzz");
      play_buzzer(buzzTimes);
      break;
    case "phase-Warning":
      nextphase = "phase-Stop";
      document.getElementById(nextphase).classList.remove("hidden");
      break;
    case "phase-Stop":
      nextphase = "phase-Shooting";
      document.getElementById(nextphase).classList.remove("hidden");
      buzzTimes = localStorage.getItem("freeShootingBuzz") === null ? 1 : localStorage.getItem("freeShootingBuzz");
      play_buzzer(buzzTimes);
      break;
    default: //go to stop as a default
      nextphase = "phase-Stop";
      document.getElementById(nextphase).classList.remove("hidden");
  }
  currentphase = nextphase;
}
async function play_buzzer(x) { // jshint ignore:line
  if (x == 0)
    return;
  console.log("play_buzzer-"+x);
	buzzer.play();
	await sleep(audiotime); // jshint ignore:line
  for (var i = 1; i < x; i++) {
  	buzzer.currentTime = 0;
    console.log("play_buzzer again");
	  await sleep(audiotime); // jshint ignore:line
  }
}
function enable_archers_per_lane(){
  var archers_per_lane_placeholder = document.getElementById('archers_per_lane');

  disable_archers_per_lane();
  for (var i = 0; i < archers_per_lane; i++) {
    var ArcherSpan = document.createElement('span');
    ArcherSpan.innerHTML = alphabet[i];
    ArcherSpan.id = "archer"+i;
    archers_per_lane_placeholder.appendChild( ArcherSpan );
    console.log("Add" + alphabet[i]);
  }
}
function disable_archers_per_lane(){
  var archers_per_lane_placeholder = document.getElementById('archers_per_lane');

  while( archers_per_lane_placeholder.firstChild ) {
      archers_per_lane_placeholder.removeChild( archers_per_lane_placeholder.firstChild );
  }
}
function oposite_color(htmlObject, base_color){
  htmlObject.classList.add("inverted");
  htmlObject.style.color = base_color;
}
function starttimer(htmlId,starttime,endtime = 0){
  
}
