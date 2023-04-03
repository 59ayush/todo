async function postInfo(){
    const res = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            a: 1,
            b: 2
        })
    })
}

postInfo()