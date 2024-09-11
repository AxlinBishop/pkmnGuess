/* Declarar variables*/
let score = 0;
const img = document.getElementById('pkmnImage');
const siguienteRonda = document.getElementById('siguienteRonda');
const api = 'assets/json/pkmn.json';
const pkmnAdivinar = document.getElementById('pkmnElegido');
const volverIntentar = document.getElementById('volverIntentar');
const puntaje = document.getElementById('puntaje');
const adivinar = document.getElementById('adivinar');
let numero = 0


/* Función que se repetira durante todo el juego */
async function ronda(){
    /* volver todo como estaba al inicio */
    document.getElementById('pkmn').innerHTML = ''
    pkmnAdivinar.value = '';
    numero = 0
    img.classList.add('opacar');
    siguienteRonda.classList.add('ocultar')
    volverIntentar.classList.add('ocultar')
    adivinar.classList.remove('ocultar')


    try{
        /* fetch */
        const response = await fetch(api);
        const data = await response.json();
        console.log(data) /* para ver los objetos */

        /* Iterar las opciones del autocompletado */
        data.forEach(element => {
            document.getElementById('pkmn').innerHTML += `<option>${element.nombre}</option>`
        });

        /* elegir un pkmn random */
        numero = Math.floor(Math.random() * parseInt(data.length));
        console.log(data[numero].nombre)


        img.setAttribute('src', data[numero].imagen)
        adivinar.addEventListener('click', function adivinarPkmn() {
            adivinar.removeEventListener('click', adivinarPkmn); /* Eliminamos el eventlistener para que no se duplique */

            if(data[numero].nombre === pkmnAdivinar.value ){
                score += 1;
                puntaje.innerHTML = score;
                img.classList.remove('opacar')
                adivinar.classList.add('ocultar')
                siguienteRonda.classList.remove('ocultar')
            }else{
                adivinar.classList.add('ocultar');
                console.log('mal')
                volverIntentar.classList.remove('ocultar')
            }
        })


    }catch(error){
        console.error('No se pudo cargar la información', error);
    }
}
siguienteRonda.addEventListener('click', ronda)

/* Para que la primera letra siempre sea mayuscula */
pkmnAdivinar.addEventListener('input', () => {
    const valor = pkmnAdivinar.value;
    if (valor.length > 0) {
        pkmnAdivinar.value = valor.charAt(0).toUpperCase() + valor.slice(1);
    }
});

volverIntentar.addEventListener('click', ()=>{
    location.reload();
})

ronda()

