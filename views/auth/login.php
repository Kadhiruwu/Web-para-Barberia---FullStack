<h1 class="nombre-pagina">Login</h1>
<p class="descripcion-pagina">Inicia Sesión con tus Datos</p>
<?php 
    include_once __DIR__ .'/../templates/alertas.php';
?>
<form class="formulario" method="POST" action="/">
    <div class="campo">
        <label for="email">Email</label>
        <input type="email" 
        id="email"
         placeholder="Ingresa tu email" 
         name="email">
        <!--PARA AUTOCOMPLETAR ABAJO-->
         <!--value="?php //echo //s($auth->email); ?>">--> 
         <!--name="email" es para leerlo con $_POST["email"]-->
    </div>

    <div class="campo">
        <label for="password">Password</label>
        <input type="password" 
        id="password" 
        placeholder="Tu Password" 
        name="password">
        <!--PARA AUTOCOMPLETAR ABAJO ---- ESTA EN EL LOGIN DEL LOGINCONTROLLER-->
        <!--value="?php //echo //s($auth->password); ?>"-->
        
    </div>

    <input type="submit" class="boton" value="Iniciar Sesion">
</form>

<div class="acciones">
    <a href="/crear-cuenta">¿Aùn no tienes una cuenta? Crear una</a>
    <a href="/olvide">¿Olvidaste tu password?</a>
</div>