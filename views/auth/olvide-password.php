<h1 class="nombre-pagina">Olvidé Password</h1>
<p class="descripcion-pagina">Restablece tu password escribiendo tu E-Mail a continuación</p>
<?php 
    include_once __DIR__ .'/../templates/alertas.php';
?>
<form class="formulario" method="POST" action="/olvide">
    <div class="campo">
        <label for="email">E-Mail</label>
        <input type="email" id="email" placeholder="Ingresa tu E-mail" name="email">
    </div>
    <input type="submit" value="Enviar Instrucciones" class="boton">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
    <a href="/crear-cuenta">¿Aún no tienes una cuenta? Crea una</a>
</div>