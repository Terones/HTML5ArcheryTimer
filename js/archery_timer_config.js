if (typeof(Storage) !== "undefined") {

} else {
    alert("No local storage, unable to run this Config.");
}
var archers_per_lane = localStorage.getItem("archers_per_target") === null ? 1 : localStorage.getItem("archers_per_target");
var configuration = localStorage.getItem("configuration") === null ? JSON.parse("[ ]") : JSON.parse(localStorage.getItem("configuration"));

function add_phase(){
  var name = document.getElementById("name").value;
  var color = document.getElementById("color").value;
  var timer = document.getElementById("timer").value;
  var buzzer = document.getElementById("buzzer").value;
  var label = document.getElementById("label").value;
  configuration.push({
      "name" : name,
      "color" : color,
      "timer" : timer,
      "buzzer" : buzzer,
      "label" : label
  });
  localStorage.setItem("configuration", JSON.stringify(configuration));
  reload_table();
  console.log(JSON.stringify(configuration));
}
function fill_on_load(){
  store_default_phases();
  reload_table();
  var nr_archers = document.getElementById("archers_per_target");
  nr_archers.value = archers_per_lane;
  archers_per_target_change(archers_per_lane);

}

function reload_table(){
  var phases_table = document.getElementById("phases");
  console.log(phases_table.rows.length);
  tempLength = phases_table.rows.length - 1;
  for (var i = 1; i < tempLength; i++) {
    console.log("deleteRow");
    phases_table.deleteRow(1);
  }
  for (var j = 0; j < configuration.length; j++) {
    var row = phases_table.insertRow(phases_table.rows.length - 1);
    row.insertCell(0).innerHTML = j;
    row.insertCell(1).innerHTML = configuration[j].name;
    row.insertCell(2).innerHTML = configuration[j].color;
    row.insertCell(3).innerHTML = configuration[j].timer;
    row.insertCell(4).innerHTML = configuration[j].buzzer;
    row.insertCell(5).innerHTML = configuration[j].label;
    var editcell = row.insertCell(6);
    editcell.innerHTML = "Edit";
    add_edit_function(editcell,j);
    var deletecel = row.insertCell(7);
    deletecel.innerHTML = "Delete";
    add_delete_function(deletecel,j);
    console.log(configuration[j]);
  }
}
function add_delete_function(htmlObject, id){
  htmlObject.onclick = function() {
    configuration.splice(id,1);
    localStorage.setItem("configuration", JSON.stringify(configuration));
    reload_table();
   };
}
function add_edit_function(htmlObject, id){
  htmlObject.onclick = function() { alert("Edit row " + id); };
}


function store_default_phases(){
  localStorage.setItem("config-barebow",'[{"name":"stop","color":"#FF0000","timer":"-1","buzzer":"3","label":"STOP"},{"name":"shoot","color":"#00FF00","timer":"-1","buzzer":"1","label":""}]');
  localStorage.setItem("config-FITA3",'[{"name":"stop","color":"#FF0000","timer":"-1","buzzer":"3","label":"STOP"},{"name":"get ready","color":"#FF0000","timer":"2","buzzer":"2","label":"{T}"},{"name":"shooting","color":"#00FF00","timer":"120","buzzer":"1","label":"{T}"},{"name":"warning","color":"#FFFF00","timer":"30","buzzer":"0","label":"{T}"}]');
}

function archers_per_target_change(archers_per_target){
  console.log("archers_per_target_change " + archers_per_target);
  localStorage.setItem("archers_per_target",archers_per_target);
  var pattern_selector = document.getElementById("archery_pattern");
  console.log(pattern_selector);
  while (pattern_selector.options.length > 0) {
    pattern_selector.options.remove(0);
  }
  var opt1 = document.createElement("option");
  var opt2 = document.createElement("option");
  var opt3 = document.createElement("option");
  var opt4 = document.createElement("option");
  var opt5 = document.createElement("option");
  switch (parseInt(archers_per_target)) {
    case 1:
      opt1.text = "A";
      pattern_selector.options.add(opt1);
      break;
    case 2:
      opt1.text = "A / B";
      pattern_selector.options.add(opt1);
      break;
    case 3:
      opt1.text = "A / B / C";
      pattern_selector.options.add(opt1);
      opt2.text = "AB / C";
      pattern_selector.options.add(opt2);
      opt3.text = "AC / B";
      pattern_selector.options.add(opt3);
      break;
    case 4:
      opt1.text = "A / B / C / D";
      pattern_selector.options.add(opt1);
      opt2.text = "AB / CD";
      pattern_selector.options.add(opt2);
      opt3.text = "AC / BD";
      pattern_selector.options.add(opt3);
      break;
    case 5:
      opt1.text = "A / B / C / D / E";
      pattern_selector.options.add(opt1);
      opt2.text = "AB / CD / E";
      pattern_selector.options.add(opt2);
      opt3.text = "AD / BE / C";
      pattern_selector.options.add(opt3);
      opt4.text = "ABC / DE";
      pattern_selector.options.add(opt4);
      opt5.text = "ACE / BD";
      pattern_selector.options.add(opt5);
      break;
    case 6:
      opt1.text = "A / B / C / D / E / F";
      pattern_selector.options.add(opt1);
      opt2.text = "AB / CD / EF";
      pattern_selector.options.add(opt2);
      opt3.text = "AD / BE / CF";
      pattern_selector.options.add(opt3);
      opt4.text = "ABC / DEF";
      pattern_selector.options.add(opt4);
      opt5.text = "ACE / BDF";
      pattern_selector.options.add(opt5);
      break;
  }
  localStorage.setItem("archery_pattern",opt1.text);

}
function set_archery_pattern(pattern){
  localStorage.setItem("archery_pattern",pattern);
}
