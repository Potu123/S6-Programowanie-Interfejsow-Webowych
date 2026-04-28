"use strict";

const wyszarz = (e) => {
    if (e.target.tagName === "BUTTON") {
        return;
    }

    const span = e.currentTarget.querySelector(".lista-middle-div-item-text");

    if (span.style.color === "grey") {
        span.style.color = "black";
        span.style.textDecoration = "none";
        span.innerText = span.innerText.split(" Wykonane:")[0].trim();

    } else {
        const data = new Date();

        span.style.color = "grey";
        span.style.textDecoration = "line-through";
        span.innerText += `     Wykonane: ${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}  ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()} `;
    }
}
const dodajElement = () => {
    const input = document.getElementById("lista-header-add-textInput");
    const zawartosc = input.value;

    if (zawartosc.trim() === "") {
        return;
    }

    const li = document.createElement("li");
    li.className = "lista-middle-div-item";
    li.addEventListener('click', wyszarz);

    const span = document.createElement("span");
    span.className = "lista-middle-div-item-text";
    span.innerText = zawartosc;

    const btn = document.createElement("button");
    btn.className = "lista-middle-div-ul-item-deleteBTN";
    btn.innerText = "X";
    btn.onclick = () => { usun(btn) };

    li.appendChild(span);
    li.appendChild(btn);

    const ul = document.getElementById("lista-middle-div-ul");
    ul.appendChild(li);

    input.value = "";
}

const usun = async (przycisk) => {
    const spanText = przycisk.parentElement.querySelector(".lista-middle-div-item-text").innerText.split("Wykonane:")[0].trim();
    document.getElementById("modal-h3").innerText = `Czy na pewno chcesz usunąć zadanie o treści:\n ${spanText}`;

    const modal = document.getElementById("deleteItem-modal");
    modal.showModal();

    const result = await new Promise((resolve) => {
        modal.addEventListener('close', () => {
            resolve(modal.returnValue);
        }, { once: true });
    });

    if (result === "true") {
        return;
    }

    const kosz = document.getElementById("kosz");

    if (kosz.children.length > 1) {
        kosz.removeChild(kosz.children[1]);
    }

    przycisk.innerText = "przywróć";

    przycisk.onclick = () => { przywruc(przycisk) };
    kosz.append(przycisk.parentElement);
}

const przywruc = (przycisk) => {
    const ul = document.getElementById("lista-middle-div-ul");

    przycisk.innerText = "X";
    przycisk.onclick = () => { usun(przycisk) };

    ul.append(przycisk.parentElement);
}


const elementyListy = document.querySelectorAll('.lista-middle-div-item');
elementyListy.forEach(li => {
    li.addEventListener('click', wyszarz);
});