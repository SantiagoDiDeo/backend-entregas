const socket = io();

socket.on('connect', () => {
    console.log('connected')
});
//agregar nuevo producto
const form = document.getElementById('form')
try {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const producto = {
            title: tableProducts[0].value,
            price: tableProducts[1].value,
            thumbnail: tableProducts[2].value
        }
        socket.emit('newProduct', producto)
        form.reset()
        })
} catch {
    console.log(new Error)
}


//lista productos
socket.on('products',  (data) => {
    products = data;
    let htmlToRender = `
  <table class="table container">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Precio</th>
        <th scope="col">Foto</th>
      </tr>
    </thead>
    </tbody>`;

    products.forEach(( element, index) => {
        htmlToRender = htmlToRender + `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${element.title}</td>
          <td>${element.price}</td>
          <td><img src=${element.thumbnail} style="max-width: 50px; height: auto;"</td>
        </tr>` 
    
    })
    document.getElementById('products').innerHTML = htmlToRender;
})




//chat
socket.on('chat', (data) => {
    chat = data;    
    htmlToRender = '';
    for (let i = 0; i < chat.length; i++) {
        htmlToRender = htmlToRender + `
        <tr>
            <td><h1 class='user'>${chat[i].email}</h1></td>
            <td><h1 class='mensaje'>${chat[i].message}</h1></td>
            <td><h1 class='date'>${chat[i].date}</h1></td>
        </tr>
        `
    }
    document.getElementById('message').innerHTML = htmlToRender;
})

function validateEmail(email) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(email.match(mailformat)) {
      return true
    } else {
      alert("You have entered an invalid email address!");
      return false
    }
  }

let addMessage = (addMessage) => {
let messageToAdd = {
    email: email.value,
    message: message.value,
    date: new Date().toLocaleDateString()
}

if(validateEmail(email.value)) {

    socket.emit('newMessage', messageToAdd)
}
}
