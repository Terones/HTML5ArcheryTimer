if (typeof(Storage) !== "undefined") {

} else {
    alert("No local storage, unable to run this Config.");
}
var archers_per_target = localStorage.getItem("archers_per_target") === null ? 1 : localStorage.getItem("archers_per_target");
var archery_pattern = localStorage.getItem("archery_pattern") === null ? 1 : localStorage.getItem("archery_pattern");
var configuration = localStorage.getItem("configuration") === null ? JSON.parse("[ ]") : JSON.parse(localStorage.getItem("configuration"));
var ends_before_retrieval = localStorage.getItem("ends_before_retrieval") === null ? 1 : localStorage.getItem("ends_before_retrieval");
function add_phase(){
  let name = document.getElementById("name").value;
  let color = document.getElementById("color").value;
  let timer = document.getElementById("timer").value;
  let nextphase = document.getElementById("nextphase").value;
  let buzzer = document.getElementById("buzzer").value;
  let label = document.getElementById("label").value;
  configuration.push({
      "name" : name,
      "color" : color,
      "timer" : timer,
      "nextphase" : nextphase,
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
  let temp_archery_pattern = archery_pattern;
  document.getElementById("archers_per_target").value = archers_per_target;
  archers_per_target_change(archers_per_target);
  document.getElementById("archery_pattern").value = temp_archery_pattern;
  localStorage.setItem("archery_pattern",temp_archery_pattern);
  document.getElementById("ends_before_retrieval").value = ends_before_retrieval;

  fill_saved_config();
}

function reload_table(){
  let phases_table = document.getElementById("phases");
  console.log(phases_table.rows.length);
  tempLength = phases_table.rows.length - 1;
  for (let i = 1; i < tempLength; i++) {
    console.log("deleteRow");
    phases_table.deleteRow(1);
  }
  for (let i = 0; i < configuration.length; i++) {
    let row = phases_table.insertRow(phases_table.rows.length - 1);
    row.insertCell(0).innerHTML = i;
    row.insertCell(1).innerHTML = configuration[i].name;
    row.insertCell(2).innerHTML = configuration[i].color;
    row.insertCell(3).innerHTML = configuration[i].timer;
    row.insertCell(4).innerHTML = configuration[i].nextphase;
    row.insertCell(5).innerHTML = configuration[i].buzzer;
    row.insertCell(6).innerHTML = configuration[i].label;
    let editcell = row.insertCell(7);
    //TODO: Add function to edit a phase
    //editcell.innerHTML = "Edit";
    //add_edit_function(editcell,i);
    let deletecel = row.insertCell(8);
    deletecel.innerHTML = "Delete";
    add_delete_function(deletecel,i);
    console.log(configuration[i]);
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
  localStorage.setItem("config-barebow",'{"archers_per_target": 1,"archery_pattern": "A","ends_before_retrieval": 1, "configuration": [{"name":"stop","color":"#FF0000","timer":"-1","nextphase":"0","buzzer":"3","label":"STOP"},{"name":"shoot","color":"#00FF00","timer":"-1","nextphase":"0","buzzer":"1","label":""}]}');
  localStorage.setItem("config-FITA-4",'{"archers_per_target": 4,"archery_pattern": "AB / CD","ends_before_retrieval": 1, "configuration": [{"name":"stop","color":"#FF0000","timer":"-1","nextphase":"0","buzzer":"3","label":"STOP"},{"name":"get ready","color":"#FF0000","timer":"20","nextphase":"0","buzzer":"2","label":"{T}"},{"name":"shooting","color":"#00FF00","timer":"120","nextphase":"30","buzzer":"1","label":"{T}"},{"name":"warning","color":"#FF7F00","timer":"30","nextphase":"0","buzzer":"0","label":"{T}"}]}');
  localStorage.setItem("config-Faceoff-AB-20sec", '{"archers_per_target":"2","archery_pattern":"A / B","ends_before_retrieval": 3,"configuration":[{"name":"stop","color":"#FF0000","timer":"-1","nextphase":"0","buzzer":"3","label":"STOP"},{"name":"Shooting","color":"#00FF00","timer":"20","nextphase":"0","buzzer":"1","label":"{T}"}]}');
}

function archers_per_target_change(archers_per_target){
  console.log("archers_per_target_change " + archers_per_target);
  localStorage.setItem("archers_per_target",archers_per_target);
  let pattern_selector = document.getElementById("archery_pattern");
  console.log(pattern_selector);
  while (pattern_selector.options.length > 0) {
    pattern_selector.options.remove(0);
  }
  let opt1 = document.createElement("option");
  let opt2 = document.createElement("option");
  let opt3 = document.createElement("option");
  let opt4 = document.createElement("option");
  let opt5 = document.createElement("option");
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

function ends_before_retrieval_change(ends_before_retrieval){
  console.log("ends_before_retrieval_change " + ends_before_retrieval);
  localStorage.setItem("ends_before_retrieval",ends_before_retrieval);
}

function set_saved_config(config){
  if(config == "") //exit function if you choose the first (empty) option)
    return;
  /*
    archers_per_target": 1,
    "archery_pattern": "A",
    "configuration": [
      {"name":"stop","color":"#FF0000","timer":"-1","nextphase":"0","buzzer":"3","label":"STOP"},
      {"name":"shoot","color":"#00FF00","timer":"-1","nextphase":"0","buzzer":"1","label":""}
    ]
    */
  console.log("set_saved_config :" + config);
  config_to_be = JSON.parse(config);
  localStorage.setItem("archery_pattern",config_to_be.archery_pattern);
  localStorage.setItem("archers_per_target",config_to_be.archers_per_target);
  localStorage.setItem("ends_before_retrieval",config_to_be.ends_before_retrieval);
  localStorage.setItem("configuration",JSON.stringify(config_to_be.configuration));
  location.reload();

}
function fill_saved_config(){
  let saved_config_selector = document.getElementById("saved_config");
  for (let i = 0; i < localStorage.length; i++){
    if (localStorage.key(i).startsWith("config-")){
      console.log("Read from storage " + localStorage.key(i) + " : " + localStorage.getItem(localStorage.key(i)));
      let opt = document.createElement("option");
      opt.text = localStorage.key(i);
      opt.value = localStorage.getItem(localStorage.key(i));
      saved_config_selector.options.add(opt);
      console.log("config added");
    }
  }
}
function save_current(){
  let config_name = prompt("Please enter a name (start with 'config-')", "config-");
  console.log("saving " + config_name);
  if (config_name != null) {
    let config = {
      "archers_per_target": archers_per_target,
      "archery_pattern": archery_pattern,
      "ends_before_retrieval": ends_before_retrieval,
      "configuration": configuration
    };
    localStorage.setItem(config_name,JSON.stringify(config));
  }
}
