<?php

namespace Model;

class Usuario extends ActiveRecord
{
    //Base de Datos
    protected static $tabla = 'usuarios';
    protected static $columnasDB = ['id', 'nombre', 'apellido', 'email', 'password', 'telefono', 'admin', 'confirmado', 'token'];

    //CREAMOS UNA VARIABLE PARA CADA COLUMNA
    public $id;
    public $nombre;
    public $apellido;
    public $email;
    public $password;
    public $telefono;
    public $admin;
    public $confirmado;
    public $token;

    //CREAMOS un ARREGLO que tendrá ARGUMENTOS, pero por defecto sera un ARRAY VACIO
    //Siempre primero el $this->id(esto es la variable que creamos para cada columna) = $args['id'](es la columna de la bd). 
    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->apellido = $args['apellido'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->password = $args['password'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->admin = $args['admin'] ?? '0';
        $this->confirmado = $args['confirmado'] ?? '0';
        $this->token = $args['token'] ?? '';
    }

    //Mensajes de validación para la creacion de una cuenta
    public function validarNuevaCuenta()
    {
        if (!$this->nombre) {
            self::$alertas['error'][] = 'El nombre es Obligatorio';
        }

        if (!$this->apellido) {
            self::$alertas['error'][] = 'El Apellido es Obligatorio';
        }

        
        if (!$this->telefono) {
            self::$alertas['error'][] = 'El telefono es Obligatorio';
        }

        if (!$this->email) {
            self::$alertas['error'][] = 'El E-Mail es Obligatorio';
        }

        if (!$this->password) {
            self::$alertas['error'][] = 'El Password es Obligatorio';
        }

        if (strlen($this->password) < 6){
            self::$alertas['error'][] = 'El Password tiene que tener más letras';
        }

        return self::$alertas;
    }

    public function validarLogin(){
        if(!$this->email){
            self::$alertas['error'][] = "El email es obligatorio";
        }

        if(!$this->password){
            self::$alertas['error'][] = "El password es obligatorio";
        }

        return self::$alertas;
    }

    //Validar Email

    public function validarEmail(){
        if(!$this->email){
            self::$alertas['error'][] = "El email es obligatorio";
        }
        
        return self::$alertas;
    }

    public function validarPassword(){
        if(!$this->password){
            self::$alertas['error'][] = "El password es obligatorio";
        }
        if(strlen($this->password)<6){
            self::$alertas['error'][] = "El password debe tener al menos 6 caracteres";
        }

        return self::$alertas;
    }

    //Revisa si el usuario ya existe
    public function existeUsuario(){
        $query = " SELECT * FROM " . self::$tabla . " WHERE email = '" . $this->email . "' LIMIT 1";
        $resultado = self::$db->query($query);

        if($resultado->num_rows){
            self::$alertas['error'][] = "El usuario ya está registrado";
        }

        return $resultado;
    }

    public function hashPassword(){
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    public function crearToken(){
        $this->token = uniqid();
    }

    public function comprobarPasswordAndVerificado($password){
        $resultado = password_verify($password, $this->password);
       if(!$resultado || !$this->confirmado){
            self::$alertas['error'][]= 'Password incorrecto o tu cuenta aún no es confirmada';
       }else{
            return true;
       }
    }

}
