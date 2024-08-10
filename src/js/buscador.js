document.addEventListener('DOMContentLoaded', function(){
    iniciarApp()

});

function iniciarApp(){
    buscarPorFecha();
}

function buscarPorFecha(){
    const fechaInput = document.querySelector('#fecha');
    fechaInput.addEventListener('input', function(e){
        const fechaSeleccionda = e.target.value;
        console.log(fechaSeleccionda);

        window.location = `?fecha=${fechaSeleccionda}`; //para ponerlo en la url 
    });
}   