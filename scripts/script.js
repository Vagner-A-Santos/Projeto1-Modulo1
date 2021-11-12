const button = document.getElementById("btn");
button.addEventListener("click", (event) => {
    event.preventDefault();
    newElement();
});

let inputValue = document.getElementById("myInput");
let myUL = document.getElementById("myUL");
let listArr = localStorage.getItem("tarefas")
    ? localStorage.getItem("tarefas").split(",") : [];
render();

function newElement() {
    if (inputValue.value == 0) {
    alert(
        "🕵️‍♂️ Ops, você precisa digitar o nome do item. Vamos tentar novamente!"
    );
    return;
    }

    listArr.push(inputValue.value);
    localStorage.setItem("tarefas", listArr);
    render();
}

function render() {
    myUL.innerHTML = "";

    listArr.forEach((element) => {
        let li = document.createElement("li");
        li.innerHTML = `<input class="myInput" onchange="markline" type=checkbox>${element}<span class="span-close"></span>`;
        myUL.appendChild(li);
        inputValue.value = "";
    });

    let inputs = document.getElementsByClassName('myInput');
    for (let i of inputs) {
        i.addEventListener('change', markline);
    }
}


function markline(e) {
    console.log(e);
    if (e.target.checked) {
        e.target.parentElement.style.textDecoration = "line-through";
        return
    }
    e.target.parentElement.style.textDecoration = "none";
}

myUL.addEventListener("click", function (e) {
    if (e.target.className == "span-close") {
    const li = e.target.parentElement;
    myUL.removeChild(li);
    listArr = listArr.filter((x) => {
        return x != li.innerText.split(" ")[0];
    });

    localStorage.removeItem("tarefas", listArr.join(","));
    localStorage.setItem("tarefas", listArr);
    }
});
