const inputbox = document.getElementsByClassName("add-text")[0];
var input = ""
inputbox.addEventListener("keydown", function(e) {
    if (e.keyCode === 13){
        enterpressed()
    }
})

function enterpressed(){
    input = inputbox.value
    inputbox.value = ""

    addelement(input)
}


function addelement(input){    
    var table = document.getElementsByClassName("table")[0]

    //console.log(table)

    var task = document.createElement("tr")
    task.classList.add("row")

    var check = document.createElement("input")
    check.setAttribute("type", "checkbox")
    check.classList.add("check")

    task.appendChild(check)
    task.innerHTML += " " + input

    table.appendChild(task)

    postInfo();
    
}


async function postInfo(){
    //console.log(1)
    const baseURL = 'http://localhost:3000/'
    //e.preventDefault();
    //console.log(input)
    const res = await fetch(baseURL + 'add', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: input
        })
    })
}



