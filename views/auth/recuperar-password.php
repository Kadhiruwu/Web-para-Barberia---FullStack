<h1 class="nombre-pagina">Recuperar Password</h1>
<p class="descripcion-pagina">Coloca tu nuevo Password a continuación</p>
<?php 
    include_once __DIR__ .'/../templates/alertas.php';
?>
<?php if($error) return?>
<form class="formulario" method="POST">

    <div class="campo">
        <label for="password">Password</label>
        <input type="password" 
        id="password" 
        placeholder="Tu Password" 
        name="password">
        <!--value="?php //echo //s($auth->password); ?>"-->
        
    </div>

    <input type="submit" class="boton" value="Guardar nuevo Password">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
    <a href="/crear-cuenta">¿No tienes cuenta? Crea una</a>
</div>