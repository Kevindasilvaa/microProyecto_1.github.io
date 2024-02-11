let n;
let turnoActual = 0;
let numerosGenerados = new Set();
participantes =[
  {
     name:"",
     matriz:[],
     resultado:0,
     victoria:0
  },
  {
    name:"",
    matriz:[],
    resultado:0,
    victoria:0
  },
  {
    name:"",
    matriz:[],
    resultado:0,
    victoria:0
  },
  {
    name:"",
    matriz:[],
    resultado:0,
    victoria:0
  }
]

//este metodo devuelve el indice del participante ganador en la lista de participantes
function devolverGanador(){
  if(participantes[0].resultado > participantes[1].resultado && participantes[0].resultado > participantes[2].resultado && participantes[0].resultado > participantes[3].resultado){
    participantes[0].victoria = 1;
    //mostrar ganador
    document.getElementById('ganador').innerHTML = "Ganador: " + participantes[0].name;
    return 0;
  }else if(participantes[1].resultado > participantes[0].resultado && participantes[1].resultado > participantes[2].resultado && participantes[1].resultado > participantes[3].resultado){
    participantes[1].victoria = 1;
    document.getElementById('ganador').innerHTML = "Ganador: " + participantes[1].name;
    return 1;
  }else if(participantes[2].resultado > participantes[0].resultado && participantes[2].resultado > participantes[1].resultado && participantes[2].resultado > participantes[3].resultado){
    participantes[2].victoria = 1;
    document.getElementById('ganador').innerHTML = "Ganador: " + participantes[2].name;
    return 2;
  }else if(participantes[3].resultado > participantes[0].resultado && participantes[3].resultado > participantes[2].resultado && participantes[3].resultado > participantes[1].resultado){
    participantes[3].victoria = 1;
    document.getElementById('ganador').innerHTML = "Ganador: " + participantes[3].name;
    return 3;
  }else{
    document.getElementById('ganador').innerHTML = "No hay Ganador";
    return 4; //no hubo ganador, fue un empate
  }
}

function guardar_local_storage(){
  for (var i = 0; i < participantes.length; i++) {
    if(localStorage.getItem(participantes[i].name)){
      let victoriasActualizadas = participantes[i].victoria + parseInt(localStorage.getItem(participantes[i].name),10);
      console.log(victoriasActualizadas+"  "+participantes[i].name);
      localStorage.setItem(participantes[i].name,victoriasActualizadas);
    }else{
      localStorage.setItem(participantes[i].name,participantes[i].victoria);
    }
  } 
}
function mostrarMenu(){
  //ocultamos el juego
  var div = document.getElementById("juego");
  div.classList.add('oculto');
  div.classList.remove('seccion-1__derecha');
  //borramos los nombres que hay en las casillas de los inputs
  document.getElementById('input-participante 1').value = "";
  document.getElementById('input-participante 2').value = "";
  document.getElementById('input-participante 3').value = "";
  document.getElementById('input-participante 4').value = "";
  //mostramos el menu
  var div = document.getElementById("menu");
  div.classList.remove('oculto');
}
function comenzarPartida(){
  //verificamos que todos los input tengan nombre
    if(document.getElementById('input-participante 1').value == "" || document.getElementById('input-participante 2').value == "" || document.getElementById('input-participante 3').value == "" || document.getElementById('input-participante 4').value == ""){
      alert("Falta colocar el nombre de uno/s de los participantes");
    }else{
      //ocultamos el menu
      var div = document.getElementById("menu");
      div.classList.add('oculto');
      //mostramos el juego
      var div = document.getElementById("juego");
      div.classList.remove('oculto');
      div.classList.add('seccion-1__derecha');

      numerosGenerados = new Set(); //volvemos a inicializar numeros generados para que se borren los anteriores
      turnoActual = 0;
      document.getElementById('contador').innerText = `Turno Actual: 0`;//reiniciamos turno actual en la pagina
      document.getElementById('numeroGenerado').innerText = `Numero Generado: 0`;//reiniciamos numero generado en la pagina
      
      //ocultar resultados
      var div = document.getElementById("contenido_fin_partida");
      div.classList.add('oculto');
      //mostrar parte de arriba del nav
      var encabezado_juego = document.getElementById("encabezado_juego");
      encabezado_juego.classList.remove('oculto');
      //mostrar el nav
      var navElement = document.getElementById("mi-nav");
      navElement.classList.remove('oculto');
      //mostrar el boton de finalzar
      var boton_finalizar_partida = document.getElementById("boton_finalizar_partida");
      boton_finalizar_partida.classList.remove('oculto');
      //mostrar el boton de siguiente turno
      var boton_finalizar_partida = document.getElementById("boton_siguiente_turno");
      boton_finalizar_partida.classList.remove('oculto');

      //asignamos los nombres a los participantes
      participantes[0].name = document.getElementById('input-participante 1').value;
      participantes[1].name = document.getElementById('input-participante 2').value;
      participantes[2].name = document.getElementById('input-participante 3').value;
      participantes[3].name = document.getElementById('input-participante 4').value;
      //asignamos el tamano carton a n
      asignarTamanoCarton();
      console.log(n);
      //generamos las 4 matrices segun el numero n aleatorio
      participantes[0].matriz = generarMatriz(n);
      participantes[1].matriz = generarMatriz(n);
      participantes[2].matriz = generarMatriz(n);
      participantes[3].matriz = generarMatriz(n);

      //reiniciamos los resultados de los nuevos participantes
      participantes[0].resultado = 0;
      participantes[1].resultado = 0;
      participantes[2].resultado = 0;
      participantes[3].resultado = 0;

      //reiniciamos las victorias de los nuevos participantes
      participantes[0].victoria = 0;
      participantes[1].victoria = 0;
      participantes[2].victoria = 0;
      participantes[3].victoria = 0;

      mostrarHistorialParticipantes();

      //dibujamos las matrices en la pagina
      drawTokens1(n);
      //mostramos el boton fin partida
      var div_fin_partida = document.getElementById("fin_partida");
      div_fin_partida.classList.remove('oculto');
      
      //coloca los nombres de los participantes en la barra del nav
      var navElement = document.getElementById("mi-nav");
      var enlaces = navElement.getElementsByTagName("a");
      for (var i = 0; i < (enlaces.length - 1); i++) {
        enlaces[i].textContent = participantes[i].name;
      } 
    }
    
}

//asignara el tamano del carton correspondiente a la variable n, segun lo que el usuario escogio
function asignarTamanoCarton(){
  let element = document.getElementById('tamanoCarton').value;
  if(element == "opcion1"){
    n = 3;
  }else if(element == "opcion2"){
    n = 4;
  }else if(element == "opcion3"){
    n = 5;
  }
}

function siguienteTurno(){
  if(verificarSiHayCartonLLeno == true){
    alert("Uno de los participantes tiene carton lleno\nVerifica los tableros y presiona Finalizar Partida para continuar");
  }else if(turnoActual < 25){
    let numeroNuevo = Math.floor(Math.random() * 50) + 1;
    while (numerosGenerados.has(numeroNuevo)) {
      numeroNuevo = Math.floor(Math.random() * 50) + 1;
    }
    turnoActual++;
    document.getElementById('contador').innerText = `Turno Actual: ${turnoActual}`;//accede al id contador y agrega ese texto
    document.getElementById('numeroGenerado').innerText = `Numero Generado: ${numeroNuevo}`;
    verificarNumeroPaginaWeb(numeroNuevo);
    verificarNumeroEnMatriz(numeroNuevo);
  }else{
    alert("El ultimo turno es 25,es decir,la partida ha terminado\nVerifica los tableros y presiona Finalizar Partida para continuar");
  }
}

function finPartida(){
  // Ocultar todos los divs
  var divs = document.querySelectorAll("div[id^='div']");
  divs.forEach(function(div) {
    div.classList.remove('board'+n);
    div.classList.add('oculto');
  });

  //ocultar parte de arriba del nav
  var encabezado_juego = document.getElementById("encabezado_juego");
  encabezado_juego.classList.add('oculto');
  //ocultar el nav
  var navElement = document.getElementById("mi-nav");
  navElement.classList.add('oculto');
  //ocultar el boton de finalzar
  var boton_finalizar_partida = document.getElementById("boton_finalizar_partida");
  boton_finalizar_partida.classList.add('oculto');
  //ocultar el boton de siguiente turno
  var boton_finalizar_partida = document.getElementById("boton_siguiente_turno");
  boton_finalizar_partida.classList.add('oculto');

  //eliminar los elementos de los resultados pasados
  const ulLista = document.getElementById('lista');
  document.getElementById('lista').innerHTML = '';
  
  //actualizar resultados
  actualizarResultados();
  //preparar resultados
  for (let i = 0; i < participantes.length; i++) {
    // Obtenemos una referencia a la plantilla y la clonamos para crear una nueva entrada
    const template = document.getElementById('template-lista');
    const elemento = template.content.cloneNode(true);
    // Cambiamos los valores de la plantilla para el nuevo componente
    // Usamos querySelector para usar selectores de la misma forma que en CSS
    // en este caso, se seleccionan la clase "nombre" y la clase "edad"
    elemento.querySelector('.nombre').innerText = participantes[i].name;
    elemento.querySelector('.resultado').innerText = participantes[i].resultado;
    // Agregamos el nuevo componente clonado al elementod de la lista
    ulLista.appendChild(elemento);
  }
  //mostrar resultados
  var div = document.getElementById("contenido_fin_partida");
  div.classList.remove('oculto');

  let indiceGanador = devolverGanador();
  guardar_local_storage();
}

function mostrarHistorialParticipantes(){
  //eliminar los elementos de los resultados pasados
  const ulLista = document.getElementById('lista_del_historico');
  document.getElementById('lista_del_historico').innerHTML = '';
  for (let i = 0; i < participantes.length; i++) {
    // Obtenemos una referencia a la plantilla y la clonamos para crear una nueva entrada
    const template = document.getElementById('template-lista-historial');
    const elemento = template.content.cloneNode(true);
    // Cambiamos los valores de la plantilla para el nuevo componente
    // Usamos querySelector para usar selectores de la misma forma que en CSS
    // en este caso, se seleccionan la clase "nombre" y la clase "edad"
    if(localStorage.getItem(participantes[i].name)){//si el participante ya existe en el localstorage
      elemento.querySelector('.nombre').innerText = participantes[i].name;
      elemento.querySelector('.victorias').innerText = localStorage.getItem(participantes[i].name);
    }else{//si el participante es nuevo
      elemento.querySelector('.nombre').innerText = participantes[i].name;
      elemento.querySelector('.victorias').innerText = participantes[i].resultado;
    }
    // Agregamos el nuevo componente clonado al elementod de la lista
    ulLista.appendChild(elemento);

    //cada vez que esta funcion se llame quiere decir que se ha iniciado una partida
    //por lo tanto, se debe mostrar el historial de los participantes
    var div5 = document.getElementById('div5');
    div5.classList.remove('oculto');
  }
}

function actualizarResultados(){
  for (let i = 0; i < participantes.length; i++) {
    //lineas horizontales, 1pto c/u
    participantes[i].resultado += contarLineasHorizontales(participantes[i].matriz);
    //lineas verticales, 1pto c/u
    participantes[i].resultado += contarLineasVerticales(participantes[i].matriz);
    //carton lleno 5ptos
    if(verificarMatrizCeros(participantes[i].matriz) == true){
      participantes[i].resultado += 5;
    }
    //diagonal principal, 1pto
    if(verificarDiagonalPrincipal(participantes[i].matriz) == true){
      participantes[i].resultado += 1;
    }
    //diagonal secundaria, 1pto
    if(verificarDiagonalSecundaria(participantes[i].matriz) == true){
      participantes[i].resultado += 1;
    }
  }
}

function generarMatriz(n){
    // Crear una matriz de tamaño n x n
  let matri = [];
  for (let i = 0; i < n; i++) {
    matri[i] = [];
  }

  let numerosUsados = new Set();
// Generar números aleatorios únicos para cada posición de la matriz
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let numeroAleatorio = Math.floor(Math.random() * 50) + 1;
      while (numerosUsados.has(numeroAleatorio)) {
        numeroAleatorio = Math.floor(Math.random() * 50) + 1;
      }
      matri[i][j] = numeroAleatorio;
      numerosUsados.add(numeroAleatorio);
    }
  }
  return matri;
}

// function mostrarDi(numero) {
//     // Ocultar todos los divs
//     var divs = document.querySelectorAll("div[id^='div']");
//     divs.forEach(function(div) {
//       div.style.display = "none";
//     });
//     // Mostrar el div correspondiente al número seleccionado
//     var divMostrar = document.getElementById("div" + numero);
//     divMostrar.style.display = "grid";
// }

function verificarSiHayCartonLLeno(){
  for (let i = 0; i < participantes.length; i++) {
    if(verificarMatrizCeros(participantes[i].matriz) == true){
      return true;
    }
  }
  return false;
}
function mostrarDiv(numero) {
  // Ocultar todos los divs
  var divs = document.querySelectorAll("div[id^='div']");
  divs.forEach(function(div) {
    div.classList.remove('board'+n);
    div.classList.add('oculto');
  });
  // Mostrar el div correspondiente al número seleccionado
  var divMostrar = document.getElementById("div" + numero);
  console.log(numero);
  if([1,2,3,4].includes(numero)){//si es el div de un participante
    divMostrar.classList.add('board'+n);
    divMostrar.classList.remove('oculto');
  }else{//si es el historial
    divMostrar.classList.remove('oculto');
  }
}

function drawTokens1(n){
  let div1 = document.querySelector('#div1');
  let div2 = document.querySelector('#div2');
  let div3 = document.querySelector('#div3');
  let div4 = document.querySelector('#div4');
  // Vaciar el contenido de los elementos div antes de generar nuevos elementos
  div1.innerHTML = '';
  div2.innerHTML = '';
  div3.innerHTML = '';
  div4.innerHTML = '';
  //lo desasociamos de todas las clases que tenia
  div1.classList.remove(...div1.classList);
  div2.classList.remove(...div2.classList);
  div3.classList.remove(...div3.classList);
  div4.classList.remove(...div4.classList);
  //los ocultamos para que no salgan todos de una vez 
  div1.classList.add('oculto');
  div2.classList.add('oculto');
  div3.classList.add('oculto');
  div4.classList.add('oculto');
  //dibujamos la matriz de cada participante
  participantes[0].matriz.forEach(row => row.forEach(function (element) {
    div1.innerHTML += `<div class="board__cell">${element}</div>`;
    }))
  participantes[1].matriz.forEach(row => row.forEach(function (element) {
    div2.innerHTML += `<div class="board__cell">${element}</div>`;
    }))
  participantes[2].matriz.forEach(row => row.forEach(function (element) {
    div3.innerHTML += `<div class="board__cell">${element}</div>`;
  }))
  participantes[3].matriz.forEach(row => row.forEach(function (element) {
    div4.innerHTML += `<div class="board__cell">${element}</div>`;
  }))
}

//esta funcion verifica si el nuevo  numero esta en la matriz de los participantes
//en caso de estarlo cambia su diseno en la pagina web, y lo refleja en la matriz del programa
function verificarNumeroPaginaWeb(numeroNuevo){
  const boardCells = document.querySelectorAll('.board__cell');
  let id = 0;
  for (const cell of boardCells) {
    const idActual = id;
    console.log(cell.textContent);
      if (!cell.classList.contains('board__cell--hit') && cell.textContent == numeroNuevo) {
        cell.classList.add('board__cell--hit');
      }
    id += 1;
  }
}
//esta matriz verifica si el numero nuevo es igual a alguna de las posiciones de las matrices
//en caso de serlo convierte esa posicion en 0
function verificarNumeroEnMatriz(numeroNuevo){
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if(participantes[0].matriz[i][j] == numeroNuevo){
        participantes[0].matriz[i][j] = 0;
      }
      if(participantes[1].matriz[i][j] == numeroNuevo){
        participantes[1].matriz[i][j] = 0;
      }
      if(participantes[2].matriz[i][j] == numeroNuevo){
        participantes[2].matriz[i][j] = 0;
      }
      if(participantes[3].matriz[i][j] == numeroNuevo){
        participantes[3].matriz[i][j] = 0;
      }
    }
  }
}

function verificarDiagonalPrincipal(matriz) {
  // Verificar diagonal principal
  for (let i = 0; i < matriz.length; i++) {
    if (matriz[i][i] !== 0) {
      return false;
    }
  }
  return true;
}
function verificarDiagonalSecundaria(matriz) {
  // Verificar diagonal secundaria
  for (let i = 0; i < matriz.length; i++) {
    if (matriz[i][matriz.length - 1 - i] !== 0) {
      return false;
    }
  }
  return true;
}
function contarLineasVerticales(matriz) {
  let contador = 0;

  for (let j = 0; j < matriz.length; j++) {
    let esLineaVertical = true;

    for (let i = 0; i < matriz.length; i++) {
      if (matriz[i][j] !== 0) {
        esLineaVertical = false;
        break;
      }
    }

    if (esLineaVertical) {
      contador++;
    }
  }

  return contador;
}
function contarLineasHorizontales(matriz) {
  let contador = 0;
  const n = matriz.length;

  for (let i = 0; i < n; i++) {
    let esLineaHorizontal = true;

    for (let j = 0; j < n; j++) {
      if (matriz[i][j] !== 0) {
        esLineaHorizontal = false;
        break;
      }
    }

    if (esLineaHorizontal) {
      contador++;
    }
  }

  return contador;
}
function verificarMatrizCeros(matriz) {
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      if (matriz[i][j] !== 0) {
        return false;
      }
    }
  }

  return true;
}