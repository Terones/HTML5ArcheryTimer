var buzzer = new Audio('buzzer.wav');
var audiotime = 1008;
var runnermode = localStorage.getItem("runnermode") === null ? "free" : localStorage.getItem("runnermode");
var currentphase = "phase-Stop";
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
  //await sleep(audiotime);
}
// async function clickBody() {
// 	console.log("clickbody");
// 	if (document.body.style.backgroundColor === "red") {
// 		document.body.style.backgroundColor = "green";
// 		audio.play();
// 		await sleep(audiotime);
// 	} else {
// 		document.body.style.backgroundColor = "red";

// 	}
// }
function on_load_Body() {
  //hide_all_phases();
  console.log("Runnermode = " + runnermode);
  currentphase = "phase-Stop";
  add_onclick_all_phases();
  if (runnermode == "free"){
    set_div_colors_free();
  } else {
    set_div_colors_timed();
  }
}
function add_onclick_all_phases(){
  var phases = document.getElementsByName("phases");
  for (var i = 0; i < phases.length; i++) {
    phases[i].onclick = (activate_next_phase());
  }
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
        phases[i].style.backgroundColor = localStorage.getItem("StopColor") === null ? "#E53935" : localStorage.getItem("StopColor");
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
