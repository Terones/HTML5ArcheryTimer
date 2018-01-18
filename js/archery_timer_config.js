if (typeof(Storage) !== "undefined") {

} else {
    alert("No local storage, unable to run this Config.");
}
var archers_per_lane = localStorage.getItem("archers_per_lane") === null ? 1 : localStorage.getItem("archers_per_lane");
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
  reload_table();
}

function reload_table(){
  var phases_table = document.getElementById("phases");
  console.log(phases_table.rows.length);
  tempLength = phases_table.rows.length - 1
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
// <td><input type="text" name="name" value=""></td>
// <td><input type="color" name="color" value=""></td>
// <td><input type="number" name="timer" value=""></td>
// <td><input type="number" name="buzzer" value=""></td>
// <td><input type="text" name="label" value=""></td>


// function save_all() {
//   console.log("save_all");
//   var elements = document.getElementById("form_stages").elements;
//   console.log(elements);
//   for (var i = 0; i < elements.length; i++) {
//     if(elements[i].localName == "input") {
//         console.log(elements[i].name + " - " + elements[i].value);
//         localStorage.setItem(elements[i].name, elements[i].value);
//     }
//   }
//   var free_elements = document.getElementById("free_form_stages").elements;
//   console.log(free_elements);
//   for (var j = 0; j < free_elements.length; j++) {
//     if(free_elements[j].localName == "input") {
//         console.log(free_elements[j].name + " - " + free_elements[j].value);
//         localStorage.setItem(free_elements[j].name, free_elements[j].value);
//     }
//   }
// }
// function fill_on_load(){
//   console.log("fill_on_load");
//   for (var i = 0; i < localStorage.length; i++){
//     name = localStorage.key(i);
//     htmlobject = document.getElementsByName(name);
//     for (var j = 0; j < htmlobject.length; j++){
//       console.log(htmlobject[j].type);
//       if (htmlobject[j].value == localStorage.getItem(name)) {
//         htmlobject[j].click();
//       } else if (htmlobject[j].name == name && htmlobject[j].type != "radio") {
//         htmlobject[j].value = localStorage.getItem(name);
//       }
//     }
//   }
// }
