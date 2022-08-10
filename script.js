addSection = document.getElementById('addSection');
addSection.onsubmit = () => {

}

form = document.querySelector("#Data");

form.onsubmit = (e) => {
    // console.log("test");
    e.preventDefault();

    let data = e.target.elements;
    main(data);
}

// for (x of document.querySelectorAll(".close")) {
//     x.onclick = (e) => {
//         e.target.parentElement.remove();
//         console.log("lmao")
//     }
// }

function main(d) {
    let yearly = parseFloat(d.max.value) - parseFloat(d.pending.value);
    let ded = parseFloat(d.ded.value);

    let pay = 0;
    for (ent of document.querySelectorAll(".procedure")) {
        let p = parseFloat(ent.children[3].value) / 100;
        let f = parseFloat(ent.children[1].value);
        pay += p * f;
    }

    pay -= ded;

    if (pay > yearly) {
        pay = yearly;
    }

    let tf = 0;
    for (ent of document.querySelectorAll(".procedure")) {
        tf += parseFloat(ent.children[1].value);
    }
    console.log(tf, pay)
    document.querySelector("#output").innerHTML = `Patient $${tf - pay}\nInsurance: $${pay}`; // pat = sum of fees - pay
}

function add() {
    let n = document.createElement("fieldset");
    n.className = "procedure";
    content = `
            <legend>Procedure Info</legend>
            <input type="text" name="Fee" id="fee">
            <label for="Fee">Fee</label>
            <input type="text" name="Percent" id="perc">
            <label for="Percent">Percent</label>
            <p class="close" onclick = "this.parentElement.remove()">✖</p>`
    n.innerHTML = content
    form.appendChild(n);

}