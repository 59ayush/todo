function addListener(){
    var check = document.getElementsByClassName('check');
    for (let i = 0; i<check.length; ++i){
        //console.log(check[i]);
        check[i].addEventListener("change", function(event){
            if (check[i].checked){
                eradicate(check[i]);
            }
        })
    }
}

var periodic = setInterval(addListener, 50);

var removeText = ""
function eradicate(checkbox){
    //console.log(checkbox)
    var parent = checkbox.parentElement;
    removeText = parent.innerText.slice(1)
    postInfor()
    parent.remove();
}

async function postInfor(){
    const res = await fetch('http://localhost:3000/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            removal: removeText
        })
    })
}