const localStorageKey = 'to-do-list-3ads';

function validateIfExistsNewTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let inputValue = document.getElementById('input-nova-tarefa').value;
    let exists = values.find(x => x.name == inputValue);
    return !exists ? false : true;
}

function novaTarefa() {
    let input = document.getElementById('input-nova-tarefa');
    let data = document.getElementById('input-nova-data');
    input.style.border = '';
    data.style.border = '';

    if (!input.value) {
        input.style.border = '1px solid red';
        alert('Digite alguma informação para adicionar em sua lista');
    }
    else if (!data.value) {
        data.style.border = '1px solid red';
        alert('Digite alguma data para adicionar em sua lista');
    }
    else if (validateIfExistsNewTask()) {
        alert('Já existe uma tarefa com essa descrição');
    }
    else {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        values.push({
            name: input.value,
            name1: data.value,
            concluded: false
        });
        localStorage.setItem(localStorageKey, JSON.stringify(values));
        showValues();
    }
    input.value = '';
    data.value = '';
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.getElementById('to-do-list');
    list.innerHTML = '';
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>
            <span class="a1 ${values[i].concluded ? 'grifar' : ''}">${values[i].name}</span>
            <span id="a2">${values[i].name1}</span>
            <button id='btn-ok' onclick='concluirItem(${i})'><i class="bi bi-check2"></i></button>
            <button id='btn-apagar' onclick='removeItem(${i})'><i class="bi bi-x-lg"></i></button>
            <button id='btn-editar' onclick='editarItem(${i})'><i class="bi bi-pencil-fill"></i></button>
        </li>`;
    }
}

function removeItem(index) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    values.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
}

function concluirItem(index) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    values[index].concluded = !values[index].concluded;
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
}

function editarItem(index) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let newName = prompt("Edite a descrição da tarefa:", values[index].name);
    let newDate = prompt("Edite a data da tarefa:", values[index].name1);
    if (newName !== null && newName !== "") {
        values[index].name = newName;
    }
    if (newDate !== null && newDate !== "") {
        values[index].name1 = newDate;
    }
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
}

showValues();