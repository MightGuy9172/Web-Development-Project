const form = document.forms["form"];
const display = form["display"];

function val(val) {
  display.value = display.value + val;
}

function result() {
  if (display.value == "") {
    alert("Please enter something !");
  } else {
    display.value = eval(display.value);
  }
}

const btn = form["vequal"];
btn.addEventListener("dblclick", () => {
  display.value = "";
});

function allClear() {
  display.value = "";
}

function del() {
  display.value = display.value.slice(0, -1);
}
