// localStorage.setItem('nombre','daniel');
// sessionStorage.setItem('nombre', ' Santiago')
// const producto ={
//     nombre: 'Celuar',
//     precio: 300000
// }
// const productoString = JSON.stringify(producto);
// localStorage.setItem('productoJSON',productoString);
// console.log(producto);
// console.log(productoString);
//varibles
const listaTweets = document.querySelector('#lista-tweets');
const formulario = document.querySelector('#formulario');
let tweets=[];
eventListeners();
function eventListeners(){
    formulario.addEventListener('submit', agregarTweet);
    listaTweets.addEventListener('click', borrarTweet);
    document.addEventListener('DOMContentLoaded',() => {
        tweets =JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHTML();
    });
}
function agregarTweet(evento){
    evento.preventDefault();
    const tweet=document.querySelector('#tweet').value;
    if(tweet ==''){
        mostrarError('ingrese todos los campos');
        return;
    }
}


function mostrarError(error) {
    const mensajeEerror = document.createElement('p');
    mensajeEerror.textContent = error;
    mensajeEerror.classList.add('error');

    const contenido = document.querySelector('#contenido'); 
    contenido.appendChild (mensajeEerror);

    setTimeout(() => {
        mensajeEerror.remove();
    }, 3000);
}
function agregarTweet(evento){
    evento.preventDefault();
    const tweet=document.querySelector('#tweet').value;

    if (tweet ===''){
        mostrarError('Ingrese todos los campos');
        return;
    }
    const tweetObj ={
        id: Date.now(),
        texto: tweet
    }
    tweets = [...tweets,tweetObj];
    crearHTML();
    formulario.reset();
}
function crearHTML(){
    limpiarHTML();
    if(tweets.length > 0){
        tweets.forEach(tweet => {
            const li = document.createElement('li');
            li.classList.add('tweet'); // Agregar clase tweet
            li.innerText = tweet.texto;
            const botonBorrar = document.createElement('button');
            botonBorrar.classList = 'borrar-tweet';
            botonBorrar.innerText = 'X';
            li.appendChild(botonBorrar);
            li.dataset.tweetId = tweet.id;
            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}

function borrarTweet(e){
    e.preventDefault();
    const id=e.target.parentElement.dataset.tweetId;
    tweets=tweets.filter(tweet => tweet.id !=id);
    crearHTML();
}
function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
document.getElementById('tweet').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { //con enter tambien sube el tweet  
        event.preventDefault(); // Evitar el salto de línea
        formulario.dispatchEvent(new Event('submit')); 
    }
});

