async function getInitial(){
    const baseURL = 'http://localhost:3000/'

    const res = await fetch(baseURL + "initial", {
        method: 'GET',
    });

    const data = await res.json();
    
    initialise(data);
}

getInitial();


function initialise(data){
    if (data.length <= 0){
        return;
    }

    for (var i = 0; i < data.length; i++){
        if (data[i].length <= 0){
            continue;
        }
        addelement(data[i]);
    }
}

function addelement(input){   
    if (input.length <= 0){
        return;
    } 
    var table = document.getElementsByClassName("table")[0];

    //console.log(table)

    var task = document.createElement("tr");
    task.classList.add("row");

    var check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.classList.add("check");

    task.appendChild(check);
    task.innerHTML += " " + input;

    table.appendChild(task);
    
}