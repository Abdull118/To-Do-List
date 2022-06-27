const dellete = document.getElementsByClassName('del')
const complete = document.getElementsByClassName('completed')
const todoitem = document.querySelectorAll('.lists span')

Array.from(dellete).forEach((el) =>{
    el.addEventListener('click', deleted)
})

Array.from(complete).forEach((el) => {
    el.addEventListener('click', undo)
})

Array.from(todoitem).forEach((el) => {
    el.addEventListener('click', markCompleted)
})

async function deleted(){
    const toDoText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleted', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'Gone': toDoText

        })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
    }catch(err){
        console.log(err)
    }
}

async function undo(){
    const toDoText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('undo', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'Undone': toDoText

        })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markCompleted(){
    const toDoText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markCompleted', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'Completedd': toDoText

        })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
    }catch(err){
        console.log(err)
    }
}