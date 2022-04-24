const $btnNuevo = $('#btn-nuevo');
const $btnPedir = $('#btn-pedir');
const $btnDetener = $('#btn-detener');

const numeros = [2,3,4,5,6,7,8,9,10];
const letras = ['A','Q','J','K'];
const palos = ['C','D','S','H'];

let baraja = [];
let carta;
let valor = 0;
let puntoTotalJugador = 0;
let puntoTotalComputadora = 0;

let crearBaraja = () =>{

    for(const n of numeros){
        for(const p of palos){
            baraja.push(n+p);
        }
    }
    for(const l of letras){
        for(const p of palos){
            baraja.push(l+p);
        }
    }

    console.log(baraja);
    baraja = _.shuffle(baraja);
    console.log(baraja);
    
};

let valorCarta = (carta) => {
    valor = carta.slice(0,-1);
    return letras.includes(valor) ? (valor === 'A' ? 11 : 10) : valor * 1;
    
}

let mostraMensaje = (ganoJugador) => {
     setTimeout(() => {
        $('#mensaje').removeAttr('hidden');
        if(ganoJugador === true){
            
    
            $('#mensaje').text('El jugador gano');
            $('#mensaje').addClass('bg-success');
            $('#mensaje').removeClass('bg-danger');
            
        }else{
            $('#mensaje').text('La computadora gano');
            
            $('#mensaje').removeClass('bg-success');
            $('#mensaje').addClass('bg-danger');
    
        }
        
    }, 400);
}

let nuevoJuego = () => {
    $('#cartasJugador').html('');
    puntoTotalJugador = 0;
    $('#puntosJugador').text(puntoTotalJugador);
    $('#cartasComputadora').html('');
    puntoTotalComputadora = 0;
    $('#puntosComputadora').text(puntoTotalComputadora);

    $btnPedir.removeAttr('disabled');
    $btnDetener.removeAttr('disabled');

    $('#mensaje').attr('hidden','true');

}

let pedirBaraja = () => {
    carta = baraja.shift();
    $('#cartasJugador').html($('#cartasJugador').html() + `<img src="./cartas/${carta}.png" alt="">`)
    puntoTotalJugador += valorCarta(carta);
    $('#puntosJugador').text(puntoTotalJugador);
    if(puntoTotalJugador > 21){
        $btnPedir.attr('disabled','true');
        $btnDetener.attr('disabled','true')
        detener();
    }
}

let detener = () => {
    let ganoJugador = true;
    $btnPedir.attr('disabled','true');
    $btnDetener.attr('disabled','true')
    const interval = setInterval(() => {
        carta = baraja.shift();
        $('#cartasComputadora').html($('#cartasComputadora').html() + `<img src="./cartas/${carta}.png" alt="">`);
        puntoTotalComputadora += valorCarta(carta);
        $('#puntosComputadora').text(puntoTotalComputadora);

        if(puntoTotalJugador > 21 || (puntoTotalComputadora >= puntoTotalJugador && puntoTotalComputadora <= 21)){
            clearInterval(interval);
            ganoJugador = false;
            mostraMensaje(ganoJugador);
        }
        if(puntoTotalComputadora > 21){
            clearInterval(interval);
            mostraMensaje(ganoJugador);
        }

    },250);
}

crearBaraja();

$btnNuevo.click(function () {
    nuevoJuego();
});

$btnPedir.click(function () {
    pedirBaraja();
});

$btnDetener.click(function () {
    detener();
});
