
var currentphase = 0;
var current_line_of_archers = 0;
var current_end = 0;
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('').map((c) => c.toUpperCase());
var archery_pattern_storage = localStorage.getItem("archery_pattern") === null ? "A" : localStorage.getItem("archery_pattern");
var archery_pattern = archery_pattern_storage.replace(/\s+/g, '').split('/');
var archers_per_target = archery_pattern.length;
var ends_before_retrieval = localStorage.getItem("ends_before_retrieval") === null ? 1 : localStorage.getItem("ends_before_retrieval");
var configuration = localStorage.getItem("configuration") === null ? JSON.parse("[ ]") : JSON.parse(localStorage.getItem("configuration"));
var count_down;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
  //await sleep(audiotime);
}

function on_load_Body() {
  //hide_all_phases();
  create_all_phases();
  add_onclick_all_phases();
  enable_archers_per_target();
  if (archers_per_target == 1){
    //no need for archers_per_target when there is only one.
    document.getElementById("archers_per_target").classList.add("hidden");
  }

}
function create_all_phases() {
  //{"name":"stop","color":"#FF0000","timer":"-1","nextphase":"0","buzzer":"3","label":"STOP"}
  var phases_placeholder = document.getElementById("phases");
  //an empty div has a text child, I want to make sure its nonexistent
  while (phases_placeholder.firstChild) {
    phases_placeholder.removeChild(phases_placeholder.firstChild);
  }
  for (var i = 0; i < configuration.length; i++) {
    var phasediv = document.createElement('div');
    var phaseh1 = document.createElement('h1');
    phaseh1.id = "h1-phase"+i;
    phaseh1.classList.add("large");
    phaseh1.innerHTML = configuration[i].label.replace("{T}",configuration[i].timer);
    phasediv.appendChild(phaseh1);
    phasediv.id = "phase"+i;
    phasediv.classList.add("max-viewport");
    if (i != 0) {
      phasediv.classList.add("hidden");
    }
    phasediv.style.backgroundColor = configuration[i].color;
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

function activate_next_phase(){
  hide_all_phases();
  var buzzTimes;
  currentphase++;
  if(currentphase >= configuration.length){
    currentphase = 0;
    if (archers_per_target - current_line_of_archers > 1 ){
      currentphase = 1;
    }
    next_line_of_archers();
    if (ends_before_retrieval - current_end > 1) {
      currentphase = 1;
      current_end++;
    }else{
      current_end = 0;
    }
    //TODO: activate next archer if multiple archer per target
  }
  document.getElementById("phase"+currentphase).classList.remove("hidden");
  play_buzzer(configuration[currentphase].buzzer);
  starttimer("h1-phase"+currentphase,configuration[currentphase].timer,configuration[currentphase].nextphase);
}

function enable_archers_per_target(){
  var archers_per_target_placeholder = document.getElementById('archers_per_target');

  disable_archers_per_target();

  for (var i = 0; i < archers_per_target; i++) {
    var ArcherSpan = document.createElement('span');
    ArcherSpan.innerHTML = archery_pattern[i];
    ArcherSpan.id = "archer"+i;
    if (current_line_of_archers == i){
      ArcherSpan.classList.add("inverted");
    }
    archers_per_target_placeholder.appendChild( ArcherSpan );
    console.log("Add: " + archery_pattern[i]);
  }
}
function disable_archers_per_target(){
  var archers_per_target_placeholder = document.getElementById('archers_per_target');
  console.log(archers_per_target_placeholder);
  if (archers_per_target_placeholder.childNodes.length == 0)
    return;
  while( archers_per_target_placeholder.firstChild ) {
      archers_per_target_placeholder.removeChild( archers_per_target_placeholder.firstChild );
  }
}
function next_line_of_archers() {
  var ArcherSpan = document.getElementById("archer" + current_line_of_archers);
  ArcherSpan.classList.remove("inverted");
  current_line_of_archers++;
  if (current_line_of_archers >= archers_per_target) {
    current_line_of_archers = 0;
  }
  ArcherSpan = document.getElementById("archer" + current_line_of_archers);
  ArcherSpan.classList.add("inverted");

}

function oposite_color(htmlObject, base_color){
  htmlObject.classList.add("inverted");
  htmlObject.style.color = base_color;
}

/**
 * Timer functions
 */
function starttimer(htmlId,starttime,endtime = 0){
  //reset the timer is its runnning.
  if (typeof count_down !== 'undefined') {
    window.clearInterval(count_down);
  }
  // do not start a new timer
  if (starttime < 0)
    return;

  //configuration[i].label.replace("{T}",configuration[i].timer);
  document.getElementById(htmlId).innerHTML = configuration[currentphase].label.replace("{T}",starttime);
  var current_count_down = starttime++;
  count_down = setInterval(function() {
    current_count_down--;
    document.getElementById(htmlId).innerHTML = configuration[currentphase].label.replace("{T}",current_count_down);
    if (current_count_down <= endtime) {
      clearInterval(count_down);
      activate_next_phase();
    }

  },1000);
}
/*
audio features
*/
var buzzer = new Audio('resources/buzzer.wav');
var audiotime = 0.500; //letting the buzzer only play for about an half a second.
async function play_buzzer(x) { // jshint ignore:line
  if (x == 0)
    return;
  console.log("play_buzzer-"+x);
	buzzer.play();
  while (buzzer.currentTime < audiotime) {
    await sleep(audiotime*1000/10); // jshint ignore:line
  }
  for (var i = 1; i < x; i++) {
  	buzzer.currentTime = 0;
    console.log("play_buzzer again");
    while (buzzer.currentTime < audiotime) {
      await sleep(audiotime*1000/10); // jshint ignore:line
    }
  }
  buzzer.pause(); // stop playing
  buzzer.currentTime = 0; // reset the buzzer
}
