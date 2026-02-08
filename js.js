let datajs;

(function lol() {
    fetch('data.json') 
    .then(res => res.json())
    .then(data => {
        datajs = data;
        initializeElements(data);
    })
}) ();


function setAttributes(element, attrs) {
    for (let attr in attrs) {
        element.setAttribute(attr, attrs[attr]);
    }
}

function initializeElements(data) {

    let parentElement = document.getElementById('scroll-list');
    let idCount = 1;
    for (let elem in data) {
        let aboveDiv = document.createElement('div');
        let belowDiv = document.createElement('div');

        let createDiv = document.createElement('div');

        setAttributes(createDiv, {"id": `${idCount}`, "class": "element"});
        parentElement.appendChild(createDiv);

        createDiv.append(data[elem].name, ' ' , data[elem].surname, ' ', data[elem].DoB);

        createDiv.appendChild(aboveDiv);
        createDiv.appendChild(belowDiv);

        setAttributes(aboveDiv, {"class": "additional-div set-0-top", "id": "above-div-id"});
        setAttributes(belowDiv, {"class": "additional-div set-0-bottom", "id": "below-div-id"});

        idCount++;
    }
}


addEventListener('click', (ev) => ev.target.className === "element" ? setInfo(ev.target.id) : 0);


function setInfo(info) {
    let createImg = document.createElement("img");
    let parentElement = document.getElementById('photo-place');

    let name = document.getElementById('name');
    let surname = document.getElementById('surname');
    let DoB = document.getElementById('DoB');
    let salary = document.getElementById('salary');

    setAttributes(createImg, {"class": "picture", "src": `${datajs[info - 1].url}`});

    parentElement.removeChild(parentElement.firstElementChild);

    name.textContent = datajs[info - 1].name;
    surname.textContent = datajs[info - 1].surname;
    DoB.textContent = datajs[info - 1].DoB;
    salary.textContent = datajs[info - 1].salary;

    parentElement.appendChild(createImg);
}

addEventListener("click", (ev) => ev.target.className === "element" ? selectedElement(ev.target.id) : 0);

function selectedElement(id) {
    let parent = document.getElementById(id);
    let aboveDiv = parent.querySelector("#above-div-id");
    let belowDiv = parent.querySelector("#below-div-id");

    let allAbove = document.querySelectorAll(".set-0-top");
    let allBelow = document.querySelectorAll(".set-0-bottom");



    for (let iter = 0; iter < allAbove.length; iter++) {
        if (allAbove[iter].className === "additional-div set-0-top go-up") allAbove[iter].classList.toggle("go-up");


        if (allBelow[iter].className === "additional-div set-0-bottom go-down") allBelow[iter].classList.toggle("go-down");
    }


    aboveDiv.classList.toggle("go-up");
    belowDiv.classList.toggle("go-down");

}

addEventListener('keydown', (ev) => {
    if (ev.key == 'Enter' && ev.target.id == "find_field") findPerson()});

function activateFieldFind() {
    let field = document.getElementById('find_field');

    field.classList.toggle('hidden');
}

function findPerson() {
    let valueFromField = document.getElementById('find_field').value;
    for (let iter = 0; iter < datajs.length; iter++) {
        if (valueFromField == datajs[iter].surname) {
            selectedElement(iter + 1);
            document.getElementById(`${iter + 1}`).scrollIntoView();
        }
    }
}

function activateFieldCreate() {
    let dd = document.querySelectorAll('.inputField');

    for (let iter = 0; iter < dd.length; iter++) {
        dd[iter].classList.toggle('hidden1');
    }
}

