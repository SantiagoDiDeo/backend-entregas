const socket = io();

socket.on('connect', () => {
    console.log('connected')
});
//agregar nuevo producto
const formulario = document.getElementById('form')

const formAddE = async () => {

    let formulario = await formulario.addEventListener('submit',  e => {
        e.preventDefault()
        const product = {
            "title": title.value,
            "price": price.value,
            "thumbnail": thumbnail.value
        }
         socket.emit('newProduct', product)
        
        })

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
   
    products.forEach(( element) => {
        htmlToRender = htmlToRender + `
        <tr>
          <th scope="row">${element.id}</th>
          <td>${element.title}</td>
          <td>${element.price}</td>
          <td><img src=${element.thumbnail} style="max-width: 50px; height: auto;"</td>
        </tr>` 
    
    })
    htmlToRender = htmlToRender + '</tbody></table>';
    document.getElementById('tableProducts').innerHTML = htmlToRender;
})




//chat
socket.on('chat', (data) => {
    chat = data;    
    htmlToRender = '';
    chat.forEach((element) => {

        htmlToRender = htmlToRender + `
        <tr>
            <th><h1 class='user'>${element.email}</h1></th>
            <th><h1 class='mensaje'>${element.message}</h1></th>
            <th><h1 class='date'>${element.date}</h1></th>
        </tr>
        `
    })

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
    message: mensaje.value,
    date: new Date().toLocaleDateString()
}

if(validateEmail(email.value)) {

    socket.emit('newMessage', messageToAdd)
}
}
