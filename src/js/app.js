let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;
const cita ={
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function(){
   
    iniciarApp();
});

function iniciarApp(){
    mostrarSeccion(); //Muestra y oculta las secciones
    tabs(); //Cambia la seccion cuando se presionen los tabs
    botonesPaginador(); //Agrega o quita los botones del paginador
    paginaSiguiente();
    paginaAnterior();

    consultarAPI(); //Consulta la api en el backend de php

    idCliente(); 
    nombreCliente(); //Añade el nombre del cliente al objeto
    seleccionarFecha(); //Añade la fecha de la cita en el objeto
    seleccionarHora(); //Añade la hora de la cita en el objeto
    mostrarResumen(); //Muestra el resumen de la cita
}

function mostrarSeccion(){

    //Ocultar la seccion que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');
    if(seccionAnterior){
        seccionAnterior.classList.remove('mostrar');
    }
   

    //Seleccionar la seccion con el paso
    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');

    //Ocultar el resaltado en el tab que ya no es actual
    const tabAnterior = document.querySelector('.actual');
    if(tabAnterior){
        tabAnterior.classList.remove("actual");
    }

    //Resalta de blanco el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add("actual");
}

function tabs(){
    const botones = document.querySelectorAll('.tabs button');

    botones.forEach( (boton) => {
        boton.addEventListener('click', function(e){
            paso = parseInt(e.target.dataset.paso); //dataset esta dentro de target q es propiedad de "e"

            mostrarSeccion();
            botonesPaginador();

        });
    })
}

function botonesPaginador(){
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');
    if(paso === 1){
        paginaAnterior.classList.add("ocultar");
        paginaSiguiente.classList.remove("ocultar");
    }else if(paso === 3){
        paginaAnterior.classList.remove("ocultar");
        paginaSiguiente.classList.add("ocultar");
        mostrarResumen();
    }else{
        paginaAnterior.classList.remove("ocultar");
        paginaSiguiente.classList.remove("ocultar");
    }

    mostrarSeccion();
}

function paginaAnterior(){
    const paginaAnterior = document.querySelector('#anterior')
    paginaAnterior.addEventListener("click", function(){
        if(paso <= pasoInicial) return;
        paso--;
        botonesPaginador();
    })
}

function paginaSiguiente(){
    const paginaSiguiente = document.querySelector('#siguiente')
    paginaSiguiente.addEventListener("click", function(){
        if(paso >= pasoFinal) return;
        paso++;
        botonesPaginador();
    })
}

//para mostrar los srvivicios de la api -- vinculado con el de abajo
async function consultarAPI(){
    try {
        const url = 'http://localhost:3000/api/servicios';
        const resultado = await fetch(url);  
        const servicios = await resultado.json();
        mostrarServicios(servicios);
    } catch (error) {
        console.log(error);   
    }
}

//para mostrar los srvivicios de la api -- vinculado con el de arriba
function mostrarServicios(servicios){
    servicios.forEach(servicio =>{
        const {id, nombre, precio} = servicio;
        
        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent= nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent= `$${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        //para hacer click y se meta en el arreglo de servicios
        servicioDiv.onclick = function(){
            seleccionarServicio(servicio);
        }

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);
    })
}
 //para hacer click y se meta en el arreglo de servicios
function seleccionarServicio(servicio){
    const {id} = servicio;
    const {servicios} = cita;
    //identificar el elemento al que se le da click
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`); //poner de azul cuando 

    //Comprobar si un servicio ya fue agregado
    if(servicios.some(agregado =>agregado.id === id)){ //some es true o false, ya está agregado o nuevo no estaba agregado
        //eliminarlo
        cita.servicios = servicios.filter(agregado => agregado.id != id); //para eliminar un servicio del objeto
        divServicio.classList.remove('seleccionado'); 
    }else{
        //agregarlo
        cita.servicios = [...servicios, servicio];   //copia del arreglo y reescribe, no usa el mismo arreglo SE AGREGA A cita.servicios
        divServicio.classList.add('seleccionado'); 
    }

    console.log(cita);
}

function idCliente(){
    const nombreid = document.querySelector('#id').value;
    cita.id = nombreid;   //lo agrega al objeto en el campo cita....nombre
}

function nombreCliente(){
    const nombre = document.querySelector('#nombre').value;
    cita.nombre = nombre;   //lo agrega al objeto en el campo cita....nombre
}

function seleccionarFecha(){
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function(e){

        const dia = new Date(e.target.value).getUTCDay();

        if([6, 0].includes(dia)){ //domingo es 0
            e.target.value = '';
            mostrarAlerta('Fines de semana no se trabaja', 'error', '#paso-2 p');    
        }else{
            cita.fecha = e.target.value;
        }
    });
}

function seleccionarHora(){
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e){
        //console.log(e.target.value);

        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0];
        if(hora < 10 || hora > 18){
            e.target.value = '';
            mostrarAlerta('Hora no permitida', 'error', '#paso-2 p');

        }else{
            cita.hora = e.target.value;
            console.log(cita);
        }
    });
}


function mostrarAlerta(mensaje, tipo, elemento, desaparece=true){
    //si ya existe no se vuelve a mostrar
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) {
        alertaPrevia.remove();
    }

    //scripting para crear la alerta
    const alerta = document.createElement('DIV');
    alerta.textContent= mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta); //appendchild para agregar a la vista, a la web

    if(desaparece){
        setTimeout(() => { //para que desaparezca el objeto, es esta CASO LA ALERTA 1000= 1segundo
            alerta.remove();
        }, 2500);
    
    }

}

function mostrarResumen(){
    const resumen = document.querySelector('.contenido-resumen');


    //Limpiar el contenido de resumen
    while (resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }

    if(Object.values(cita).includes('') || cita.servicios.length === 0){ //se pone el object.values para convertirlos tipo en arreglo, y ver si un campo está vacio
        mostrarAlerta('Faltan datos de Servicios, Fecha u Hora', 'error', '.contenido-resumen', false);
        return;
    }  
    
    //Formatear el div de resumen
    const {nombre, fecha, hora, servicios} = cita; //para mostrar en el resumen todo el contenido el nombre hora y fecha

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    //Formatear la fecha en español
    const fechaObj = new Date(fecha); //cuando se usa new date, se atrasa un dia
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate()+2;
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date(Date.UTC(year, mes, dia)); 

    const opcionesFecha = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const fechaFormateada = fechaUTC.toLocaleDateString('es-PE', opcionesFecha)


    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`; 

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora} Horas`;

    //heading para Servicios en resumen 
    const headingServicios = document.createElement('H3');
    headingServicios.textContent= 'Resumen de Servicios';
    resumen.appendChild(headingServicios);

    //iterando y mostrando los servicios
    servicios.forEach(servicio =>{
        const {id, precio, nombre} = servicio;
        const contenedorServicio = document.createElement('DIV'); //para mostrar en el resumen todo el contenido LOS SERVICIOS
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    })

    //heading para Cliente en resumen 
    const headingCliente = document.createElement('H3');
    headingCliente.textContent = 'Datos del Cliente';
    resumen.appendChild(headingCliente);

    //boton para crear una cita
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent= 'Reservar Cita';
    botonReservar.onclick = reservarCita;

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
    resumen.appendChild(botonReservar);
}

async function reservarCita(){
    const {nombre, fecha, hora, servicios, id} = cita;
    const idServicios = servicios.map( servicio => servicio.id);
 

    const datos = new FormData();
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('usuarioId', id);
    datos.append('servicios', idServicios);

    //console.log([...datos]); sirve para ver que datos estamos mandando en el formdata

    try {
        //peticion hacia la API
    const url = 'http://localhost:3000/api/citas';

    //la funcion tiene que ser ASYNC para usar el AWAIT
    const respuesta = await fetch(url, {
        method: 'POST',
        body: datos
    });

    const resultado = await respuesta.json();
    console.log(resultado.resultado);

    if(resultado.resultado){
        Swal.fire({
            icon: "success",
            title: "Cita Creada",
            text: "Tu cita fue creada Correctamente!",
            button: 'OK'
        }).then( () =>{
            window.location.reload();
        })
    }   
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un error al guardar la Cita!",
          });
    }

    

}

