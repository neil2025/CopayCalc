addSection = document.getElementById("addSection");
addSection.onsubmit = () => {};

form = document.querySelector("#Data");

form.onsubmit = (e) => {
  // console.log("test");
  e.preventDefault();

  let data = e.target.elements;
  main(data);
};

function main(d) {
  // Refactor me..... eventually
  const max = parseFloat(d.max.value);
  const pendingClaims = parseFloat(d.pending.value);
  let yearly = !isNaN(max) && !isNaN(pendingClaims) ? max - pendingClaims : max;
  let ded = parseFloat(d.ded.value);

  let pay = 0;
  for (ent of document.querySelectorAll(".procedure")) {
    let p = parseFloat(ent.children[3].value) / 100;
    let f = parseFloat(ent.children[1].value) - ded;
    ded = 0;
    pay += p * f;
  }

  if (pay < 0) {
    pay = 0;
  }

  if (pay > yearly) {
    pay = yearly;
  }

  let tf = 0;
  for (ent of document.querySelectorAll(".procedure")) {
    tf += parseFloat(ent.children[1].value);
  }
  console.log(tf, pay);
  document.querySelector("#output").innerHTML = `Patient $${
    tf - pay
  }\nInsurance: $${pay}`; // pat = sum of fees - pay
}

function add() {
  let n = document.createElement("fieldset");
  n.className = "procedure";
  content = `
            <legend>Procedure Info</legend>
            <input type="text" name="Fee" id="fee">
            <label for="Fee">*Fee</label>
            <input type="text" name="Percent" id="perc">
            <label for="Percent">*Percent</label>
            <p class="close" onclick = "this.parentElement.remove()">✖</p>`;
  n.innerHTML = content;
  form.appendChild(n);
}
