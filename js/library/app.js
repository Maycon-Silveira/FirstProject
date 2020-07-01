const buttonStart_div = document.getElementById("start-button");
const buttonStop_div = document.getElementById("stop-button");

console.log("TechnoFlex Automation Application V1.0 ");

buttonStart_div.addEventListener("click", () => {
  console.log("Start");
  let pressed = document.createElement("div"); //Create a <div>
  let att = document.createAttribute("id");
  att.value = "pressed";
  pressed.setAttributeNode(att);
  buttonStart_div.appendChild(pressed); //Append <div class="pressed"> to buttonStart_div

  setTimeout(() => {
    pressed.remove();
  }, 600);
});

buttonStop_div.addEventListener("click", () => {
  console.log("Stop");
});
