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
        let createDiv = document.createElement('div');

        setAttributes(createDiv, {"id": `${idCount}`, "class": "element"});
        parentElement.appendChild(createDiv);

        createDiv.append(data[elem].name, ' ' , data[elem].surname, ' ', data[elem].DoB);

        idCount++;
    }
}


addEventListener('click', (ev) => ev.target.className === "element" ? setInfo(ev.target.id) : console.log('no'));


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