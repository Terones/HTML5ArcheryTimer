if (typeof(Storage) !== "undefined") {

} else {
    alert("No local storage");
}
function handleClick(myOption) {
  document.getElementById("freeForm").style.display = 'none';
  document.getElementById("timedForm").style.display = 'none';
  console.log('New value: ' + myOption.value);
  localStorage.setItem(myOption.name, myOption.value);
  document.getElementById(myOption.value+"Form").style.display = 'inline';
}
function save_all() {
  console.log("save_all");
  var elements = document.getElementById("form_stages").elements;
  console.log(elements);
  for (var i = 0; i < elements.length; i++) {
    if(elements[i].localName == "input") {
        console.log(elements[i].name + " - " + elements[i].value);
        localStorage.setItem(elements[i].name, elements[i].value);
    }
  }
  var free_elements = document.getElementById("free_form_stages").elements;
  console.log(free_elements);
  for (var j = 0; j < free_elements.length; j++) {
    if(free_elements[j].localName == "input") {
        console.log(free_elements[j].name + " - " + free_elements[j].value);
        localStorage.setItem(free_elements[j].name, free_elements[j].value);
    }
  }
}
function fill_on_load(){
  console.log("fill_on_load");
  for (var i = 0; i < localStorage.length; i++){
    name = localStorage.key(i);
    htmlobject = document.getElementsByName(name);
    for (var j = 0; j < htmlobject.length; j++){
      console.log(htmlobject[j].type);
      if (htmlobject[j].value == localStorage.getItem(name)) {
        htmlobject[j].click();
      } else if (htmlobject[j].name == name && htmlobject[j].type != "radio") {
        htmlobject[j].value = localStorage.getItem(name);
      }
    }
  }
}
