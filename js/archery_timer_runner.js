var buzzer = new Audio('resources/buzzer.wav');
var audiotime = 1018;
var currentphase = "phase-Stop";
var current_line_of_archers = 0;
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('').map((c) => c.toUpperCase());
var archers_per_lane = localStorage.getItem("archers_per_lane") === null ? 1 : localStorage.getItem("archers_per_lane");
var count_down;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
  //await sleep(audiotime);
}

function on_load_Body() {
  //hide_all_phases();
  currentphase = "phase-Stop";
  create_all_phases();
  add_onclick_all_phases();
  set_div_colors_timed();
  enable_archers_per_lane();
}
function create_all_phases() {
  var phases_placeholder = document.getElementById("phases");
  for (var i = 0; i < 4; i++) {
    var phasediv = document.createElement('div');
    var phaseh1 = document.createElement('h1');
    phaseh1.id = "h1-phase"+i;
    phaseh1.classList.add("large");

    phasediv.appendChild(phaseh1);
    phasediv.id = "phase"+i;
    phasediv.classList.add("max-viewport");

    phases_placeholder.appendChild( phasediv );
    console.log("Add phase " + phasediv.id);
  }

}
function add_onclick_all_phases(){
  var phases = document.getElementById("phases").childNodes;
  for (var i = 0; i < phases.length; i++) {
    add_next_phase_function(phases[i]);
  }
}
function add_next_phase_function(htmlObject){
  htmlObject.onclick = (function(){activate_next_phase();});
}
function hide_all_phases(){
  var phases = document.getElementById("phases").childNodes;
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
        htmlObject = document.getElementById("h1-phase-Stop");
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
  var buzzTimes;
  var ShootingTime = localStorage.getItem("ShootingTime") === null ? 120 : localStorage.getItem("ShootingTime");
  var WarningTime = localStorage.getItem("WarningTime") === null ? 30 : localStorage.getItem("WarningTime");
  var getReadyTime = localStorage.getItem("getReadyTime") === null ? 30 : localStorage.getItem("getReadyTime");
  var StopTime = localStorage.getItem("StopTime") === null ? 30 : localStorage.getItem("StopTime");
  switch (currentphase) {
    case "phase-GetReady":
      nextphase = "phase-Shooting";
      document.getElementById(nextphase).classList.remove("hidden");
      buzzTimes = localStorage.getItem("ShootingBuzz") === null ? 1 : localStorage.getItem("ShootingBuzz");
      play_buzzer(buzzTimes);
      starttimer("h1-"+nextphase,ShootingTime,WarningTime);
      break;
    case "phase-Shooting":
      nextphase = "phase-Warning";
      document.getElementById(nextphase).classList.remove("hidden");
      buzzTimes = localStorage.getItem("WarningBuzz") === null ? 0 : localStorage.getItem("WarningBuzz");
      play_buzzer(buzzTimes);
      starttimer("h1-"+nextphase,WarningTime);
      break;
    case "phase-Warning":
      //TODO: Code for next archer!
      if (archers_per_lane > current_line_of_archers){
        nextphase = "phase-Stop";
        document.getElementById(nextphase).classList.remove("hidden");
        buzzTimes = localStorage.getItem("StopBuzz") === null ? 3 : localStorage.getItem("StopBuzz");
        next_line_of_archers();
        play_buzzer(buzzTimes);
        starttimer("h1-phase-Warning",(buzzTimes * audiotime / 1000));
      } else {
        nextphase = "phase-Stop";
        document.getElementById(nextphase).classList.remove("hidden");
        buzzTimes = localStorage.getItem("StopBuzz") === null ? 3 : localStorage.getItem("StopBuzz");
        play_buzzer(buzzTimes);

      }
      break;
    case "phase-Stop":
      nextphase = "phase-GetReady";
      document.getElementById(nextphase).classList.remove("hidden");
      buzzTimes = localStorage.getItem("getReadyBuzz") === null ? 2 : localStorage.getItem("getReadyBuzz");
      play_buzzer(buzzTimes);
      starttimer("h1-"+nextphase,getReadyTime);
      break;
    default: //go to stop as a default
      nextphase = "phase-Stop";
      document.getElementById(nextphase).classList.remove("hidden");
      buzzTimes = localStorage.getItem("StopBuzz") === null ? 3 : localStorage.getItem("StopBuzz");
      play_buzzer(buzzTimes);
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
    if (current_line_of_archers == i){
      ArcherSpan.classList.add("inverted");
    }
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
/**
 *
 */
function starttimer(htmlId,starttime,endtime = 0){
  if (starttime < 0)
    return;
  //reset the timer is its runnning.
  if (typeof count_down !== 'undefined') {
    window.clearInterval(count_down);
  }
  document.getElementById(htmlId).innerHTML = starttime;
  var current_count_down = starttime++;
  count_down = setInterval(function() {
    current_count_down--;
    document.getElementById(htmlId).innerHTML = current_count_down;
    if (current_count_down <= endtime) {
      clearInterval(count_down);
      activate_next_phase();
    }

  },1000);
}
function next_line_of_archers() {
  var ArcherSpan = document.getElementById("archer" + current_line_of_archers);
  ArcherSpan.classList.remove("inverted");
  current_line_of_archers++;
  if (current_line_of_archers >= archers_per_lane) {
    current_line_of_archers = 0;
  }
  ArcherSpan = document.getElementById("archer" + current_line_of_archers);
  ArcherSpan.classList.add("inverted");

}
