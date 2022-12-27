const socket = io();

socket.on('connection', () => {
    console.log('connected')
});

let prod = [];

socket.on('products', (data) => {
    prod = data;
    htmlToRender = '';
    for (let index = 0; index < prod.length; index++) {
        htmlToRender = htmlToRender + `
        <tr>
            <td><h1>${prod[i].title}</h1></td>
            <td><h1>${prod[i].price}</h1></td>
            <td><img src'${prod[i].thumbnail}'</td>
        </tr>
        `
    }
    document.getElementById('products').innerHTML = htmlToRender;
})


socket.on('chat', (data) => {
    prod = data;
    htmlToRender = '';
    for (let index = 0; index < prod.length; index++) {
        htmlToRender = htmlToRender + `
        <tr>
            <td><h1>${prod[i].email}</h1></td>
            <td><h1>${prod[i].message}</h1></td>
            <td><h1>${prod[i].date}</h1></td>
        </tr>
        `
    }
    document.getElementById('message').innerHTML = htmlToRender;
})

addMessages = (addMessage) => {
let messageToAdd = {
    email: '',
    message: '',
    date: '',
}
}