"use strict";

window.addEventListener("load", start);

function start() {
    console.log("JS running");
    registerButtonClicks();
    currentScene = scene1;
    showScene(currentScene);
}

let currentScene;

const scene1A = {
    title: "Råben om hjælp",
    text: /*html*/ `<p> Du blev opdaget og stukket i ryggen. </p>
                    <p> Du døde... </p>`,
    choices: [
        {
            name: "Prøv igen",
        }
    ]
}

const scene1B = {
    title: "Vejen mod bålet",
    text: /*html*/ `<p> Når du kommer tættere på ser du at det er banditter. Hvad gør du? </p>`,
    choices: []
}

const scene1C = {
    title: "Løbet mod bålet",
    text: /*html*/ `<p> Når du kommer tættere på ser du at det er banditter. Men du er i løb og bliver derfor opdaget og taget til fange. </p>
                    <p> Du er nu fanget... </p>`,
    choices: [
        {
            name: "Prøv igen",
        }
    ]
}

const scene1 = {
    title: "Den mystiske aften",
    text: /*html*/ `<p> Du vågner i den mørke skov, du skal finde din vej igennem skoven og overleve. </p>
                   <p> Du kigger dig rundt og ser noget lys, muligvis fra noget bål. Hvad gør du? </p>`,
    choices: [
        {
            name: "Du råber om hjælp",
            node: scene1A
        },
        {
            name: "Du sniger dig hen til bålet",
            node: scene1B
        },
        {
            name: "Du løber hen til bålet",
            node: scene1C
        }
    ]
}

const scene2A = {
    title: "Skjule sig i buskene",
    text: /*html*/ `<p> Du gemmer dig i buskene og undgår opdagelse. </p>
                    <p> Efter lidt tid falder banditterne i søvn. </p>`,
    choices: []
}

const scene2B = {
    title: "Løbe gennem skoven",
    text: /*html*/ `<p> Du løber så hurtigt du kan gennem skoven. </p>
                    <p> Heldigvis når du at undgå banditterne og finder en sikker skjuleplads. </p>`,
    choices: []
}

const scene3A = {
    title: "Forsøge at snige dig væk",
    text: /*html*/ `<p> Du prøver at snige dig væk, men bliver opdaget af en vagt. </p>
                    <p> Du bliver fanget og ført tilbage til banditternes lejr. </p>`,
    choices: []
}

const scene3B = {
    title: "Angribe banditterne",
    text: /*html*/ `<p> Du vælger at angribe banditterne i overraskelsesangreb. </p>
                    <p> Du kæmper bravt, men bliver overmandet af deres antal og bliver fanget. </p>`,
    choices: []
}

const scene3C = {
    title: "Undgå banditterne",
    text: /*html*/ `<p> Du undgår opdagelse og lykkes med at komme forbi banditterne ubemærket. </p>
                    <p> Nu kan du fortsætte din rejse gennem skoven. </p>`,
    choices: []
}

scene1B.choices = [
    {
        name: "Du venter til banditterne er gået i søvn",
        node: scene2A
    },
    {
        name: "Du skynder dig at løbe væk fra dem",
        node: scene2B
    }
];

scene2A.choices = [
    {
        name: "Forsøge at snige dig væk",
        node: scene3A
    },
    {
        name: "Angribe banditterne",
        node: scene3B
    }
];

scene2B.choices = [
    {
        name: "Undgå banditterne",
        node: scene3C
    }
];

function registerButtonClicks() {
    document.querySelector("main").addEventListener("click", userClicked);
}

function userClicked(event) {
    const target = event.target;
    if (target.tagName === "BUTTON") {
        buttonClicked(target);
    }
}

function restartStory() {
    currentScene = scene1;
    showScene(currentScene);
}

function buttonClicked(button) {
    console.log(button);

    button.parentElement.innerHTML = "Du valgte: " + button.textContent;

    const index = Number(button.id.substring(10));
    const choice = currentScene.choices[index];

    console.log(choice);

    if (choice.node === undefined || choice.node === null) {
        restartStory();
    } else {
        currentScene = choice.node;
        showScene(currentScene);
    }
}

function showScene(scene) {
    const html = /*html*/ `<div class="scene">
    <h2>${scene.title}</h2>
    <div class="text">
       ${scene.text}
    </div>
    <div class="choices">
    ${scene.choices.map((choice, i) => `<button id="btn-choice${i}">${choice.name}</button>`).join(" ")}
    </div>
</div>`;

    document.querySelector("main").innerHTML = html;
}
