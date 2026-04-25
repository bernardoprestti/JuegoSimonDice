let jugadores=0;
let secuenciaMaquina=[];
let secuenciaUsuario=[];
const $colores= document.querySelectorAll('.color');
let temporizadorTurno=null;
let jugadorActual=0;
let rondaActual=1;

document.querySelector("#comenzar").addEventListener('click', function(){
    borrarJugadores();
    cantidadJugadores();
    crearJugadores();
    iniciar();
    cuentaRegresiva();
});

function cuentaRegresiva(){
    const $encabezado=document.querySelector("#encabezado");
    let contador=3;

    $encabezado.textContent=contador;

    const intervalo=setInterval(()=>{
        contador--;

        if(contador > 0){
            $encabezado.textContent=contador;
        }else{
            clearInterval(intervalo);
            $encabezado.textContent=`Comienza el juego`;
            setTimeout(()=>{
            turnoMaquina();
            }, 500)
        }
    }, 1000)
};

function cantidadJugadores(){
    jugadores=Number(prompt('Ingrese la cantida de jugadores'));
};

function sumarRondaJugadorActual(jugador, ronda){
    const $jugador=document.querySelector(`#puntos-${jugador}`);
    $jugador.innerText=ronda;
}

function ganador(){
    let mejorPuntaje=-1;
    let empate=false;
    let ganador=0;

    const $encabezado=document.querySelector("#encabezado");

    for(let i=0;i<jugadores;i++){
        const $jugadores=document.querySelector(`#puntos-${i}`);
        const puntaje=Number($jugadores.innerText);
        
        if(puntaje > mejorPuntaje){
            mejorPuntaje=puntaje;
            empate=false;
            ganador=i;
        }else if(puntaje === mejorPuntaje){
            empate=true;
        }
    }
    if(empate){
        $encabezado.textContent=`La partida termino en empate con ${mejorPuntaje} rondas`;
    } else{
        $encabezado.textContent=`El ganador es el jugador ${ganador + 1} con ${mejorPuntaje} rondas`;
    }
};

function crearJugadores(){
    document.querySelector("#puntuaciones").style.display="";
    for(let i=0;i<jugadores; i++){ 
        const $tdJugador=document.createElement("td");
        $tdJugador.innerText=`jugador ${i + 1}`;
        const $tdRonda=document.createElement("td");
        $tdRonda.innerText=0;
        $tdRonda.classList='ronda';
        $tdRonda.id=`puntos-${i}`;
        const $tr=document.createElement("tr");
        $tr.id=`jugador-${i}`;
        $tr.appendChild($tdJugador);
        $tr.appendChild($tdRonda);
        document.querySelector("#tabla-de-puntos").appendChild($tr);
    }
};
function borrarJugadores(){
    
    for(let i=0;i<jugadores;i++){
        const jugador=document.querySelector(`#jugador-${i}`);
            if(jugador){
                jugador.remove();
            }
    }
    document.querySelector("#puntuaciones").style.display="none";
}

function resaltarColor(color){
    document.querySelector('.' + color).style.opacity = 1;
    setTimeout(()=>{
        document.querySelector('.' + color).style.opacity = 0.5;
    }, 500)
};

function reiniciar(){
    clearTimeout(temporizadorTurno);
    secuenciaMaquina=[];
    secuenciaUsuario=[];
    jugadorActual=0;
    rondaActual=1;

    ganador();

    for(let i=0;i<$colores.length;i++){
        $colores[i].style.display="none";
    }
};

function siguienteJugador(){
    clearTimeout(temporizadorTurno);
    secuenciaMaquina=[];
    secuenciaUsuario=[];
    rondaActual=1;
    jugadorActual++;
    verificarJugadorActual();
};


function desbloquearUsuario(){
    clearTimeout(temporizadorTurno);
    for(let i=0;i<$colores.length;i++){
            $colores[i].onclick = function(){
                secuenciaUsuario.push(this.dataset.color);
                resaltarColor(this.dataset.color)
                console.log(secuenciaUsuario);
                turnoUsuario();
            }
        }
    };

function bloquearUsuario(){;
    for(let i=0;i<$colores.length;i++){
        $colores[i].onclick = null;
    }
};


function turnoMaquina(){
    bloquearUsuario();
    const colores=recolectarColores();
    secuenciaMaquina.push(elegirColorAleatorio(colores));
    document.querySelector("#encabezado").innerText=`Jugador ${jugadorActual + 1} - Ronda ${rondaActual}`;

    for(let i=0;i<secuenciaMaquina.length;i++){
        setTimeout(()=>{
            resaltarColor(secuenciaMaquina[i]);
        }, 1000 * (i + 1));
    }
    setTimeout(()=>{
        desbloquearUsuario();
        tiempoUsuario();
    }, 1000 * (secuenciaMaquina.length +1))
    console.log(secuenciaMaquina);
    
    
};



function tiempoUsuario(){
    clearTimeout(temporizadorTurno);
        
    temporizadorTurno = setTimeout(()=>{
        console.log("perdiste");
        siguienteJugador();
    }, 3000)
};

function verificarJugadorActual(){
    if(jugadorActual >= jugadores){
        return reiniciar();
    }else{
        turnoMaquina();
    }
};

function turnoUsuario(){
    const color= secuenciaUsuario.length - 1;
    
        if(secuenciaUsuario[color] !== secuenciaMaquina[color]){
            clearTimeout(temporizadorTurno);
            console.log("perdiste");
            return siguienteJugador();
        }
   
    if(secuenciaMaquina.length === secuenciaUsuario.length){
        clearTimeout(temporizadorTurno);
       secuenciaUsuario=[];
       sumarRondaJugadorActual(jugadorActual, rondaActual);
       rondaActual++;
       
       setTimeout(()=>{
        turnoMaquina();
       }, 500);
       return;
    }
    
};
    

function elegirColorAleatorio(colores){
    return colores [Math.floor(Math.random() * colores.length)]
};

function recolectarColores(){
    const COLORES=[];
     for(let i=0; i<$colores.length; i++){
        COLORES.push($colores[i].dataset.color);
     }
     return COLORES;
     
}

function iniciar(){
    for(let i=0; i<$colores.length; i++){
        $colores[i].style.display="";
    }
};
