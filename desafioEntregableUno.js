/* 
1) Declarar una clase Usuario

2) Hacer que Usuario cuente con los siguientes atributos:
© nombre: String
© apellido: String
© Libros: Object[]
@ mascotas: String[]
Los valores de los atributos se deberan cargar a través del constructor, al momento de crear las instancias. 

3) Hacer que Usuario cuente con los siguientes métodos:
© getFullName(): String. Retorna el completo del usuario. Utilzar template strings.
© addMascota(String): void. Recibe un nombre de mascota y lo agrega al array de
mascotas.
© countMascotas(): Number. Retorna la cantidad de mascotas que tiene el usuario.
© addBook(String, String): void. Recibe un string 'nombre' y un string ‘autor’ y
debe agregar un objeto: { nombre: String, autor: String } al array de libros.
© getBookNames(): String[]. Retorna un array con sélo los nombres del array de
libros del usuario.
4) Crear un objeto llamado usuario con valores arbitrarios e invocar todos sus métodos.

*/

class User {
    constructor (name, lastName, books, pets) {
        this.name = name
        this.lastName = lastName
        this.books = books
        this.pets = pets
    };
};

let usuarioNuevo = new User('Santiago', 'Di Deo', [{name: 'El mundo de Sofia', author: 'Jostein Gaarder'}, {name:'Padre rico padre pobre', author: ' Robert Kiyosaki'}], ['Olivia', 'Pocho']);


const getFullName = () => {
    return `Nombre: ${usuarioNuevo.name}, Apellido: ${usuarioNuevo.lastName}`;
};

const addPet = (val) => {
    let newPet = usuarioNuevo.pets.push(val);
};

const countPets = () => {
    return usuarioNuevo.pets.length;
};

const addBook = (name, author) => {
    usuarioNuevo.books.push({name: name, author: author})
};

const getBookNames = () => {
    return usuarioNuevo.books.map(books => books.name);
};

console.log(getFullName());
 console.log(addPet('Mocho'));
console.log(countPets());
console.log(addBook('El Señor de los Anillos', 'J. R. R. Tolkien'))
 console.log(usuarioNuevo);  
console.log(getBookNames());




