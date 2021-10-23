const { resolveObjectURL } = require('buffer')
const fs = require('fs')

const archivo = (nombre, delimitador) => { // Función que lee un archivo
  const contenido = fs.readFileSync(nombre).toString() //Lo lee y convierte en String
  return contenido.split(delimitador) // Separa el contenido en un array
}

const equipoA = archivo('basket/equipo-A.txt', '\n')
const equipoB = archivo('basket/equipo-B.txt', '\n')
const partido = archivo('basket/partido.log', '\n')

// {
//   apellido o nombre: puntos,
//   apellido o nombre: puntos
// }
const puntosEquipo = (registro, equipo) => {
  const registroEquipo = registro.filter(anotacion => {
    // "APELLIDO,TIPO"
    let apellido = anotacion.split(',')[0]
    let apellidos = equipo.map(nombreCompleto => nombreCompleto.split(" ")[1])
    
    return apellidos.includes(apellido)
  })

  const puntos = {}
  let total = 0
  registroEquipo.forEach(anotacion => {
    const apellido = anotacion.split(",")[0] 
    let tanto = anotacion.split(",")[1]
    tanto = (tanto === 'DOBLE') ? 2 : 3
    puntos[apellido] = puntos[apellido] || 0 //El jugador ya fue registrado?
    puntos[apellido] += tanto // puntos[apellido] = puntos[apellido] + tanto
    total += tanto
  })

  return {
    total,
    puntos
  }
 
}

const puntosEquipoA = puntosEquipo(partido, equipoA)
const puntosEquipoB = puntosEquipo(partido, equipoB)

console.log(puntosEquipoA, puntosEquipoB) // Imprime los puntos hechos por cada equipo y por cada jugador

const resultadoFinal = () => {
 
  const ganador = (puntosEquipoA.total > puntosEquipoB.total) ? "GANÓ EL EQUIPO A"  : "GANÓ EL EQUIPO B"
  return ganador
}
console.log(resultadoFinal()) // Imprime el equipo ganador

const goleadorXequipo = (equipo) => {
  const array = Object.values(equipo);
  const objeto = {} = array[1];
 
  let jugador = null
  let puntaje = 0;
  let goleador = null;
  let max = 0;
  
  for (const property in objeto) {
      jugador = property;
      puntaje = objeto[property];

      if(puntaje > max){
        max = puntaje;
        goleador = jugador
      }

    }
    return [goleador, max];
  

}
  const goleadorA = [] = goleadorXequipo(puntosEquipoA) //obtenemos el goleador del equipo A
  const goleadorB = [] = goleadorXequipo(puntosEquipoB) //obtenemos el goleador del equipo B
  
const goleadorDefinitivo = (jugador1, jugador2) => {
    return (jugador1[1] > jugador2[1]) ? "El goleador es " + jugador1[0] :  "El goleador es " + jugador2[0]
}

console.log(goleadorDefinitivo(goleadorA,goleadorB)) // Imprime al goleador de todo el partido

const distribucionDePuntaje = () => {

  const array = [];
  const registroEquipo = partido.filter(anotacion => {
    let puntaje = anotacion.split(',')[1]
    array.push(puntaje);
  })

  let cantDoble = 0;
  let cantTriple = 0;

  array.forEach(i => {
    if(i == "DOBLE"){
      cantDoble++
    }else{
      cantTriple++
    }
    
  });

  console.log("Se anotaron "+ cantDoble + " DOBLES y "+ cantTriple+ " TRIPLES") 
}

distribucionDePuntaje() // Imprime cuantos DOBLES y cuantos TRIPLES se anotaron durante el partido
