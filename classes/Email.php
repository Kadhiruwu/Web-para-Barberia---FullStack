<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;
class Email{

    public $email;
    public $nombre;
    public $token;

    
    public function __construct($nombre, $email, $token){
        
        $this->nombre = $nombre;
        $this->email = $email;
        $this->token = $token;
    }

    public function enviarConfirmacion(){
        //Crear el objeto de Email
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = $_ENV['EMAIL_HOST'];
        $mail->SMTPAuth = true;
        $mail->Port = $_ENV['EMAIL_PORT'];
        $mail->Username = $_ENV['EMAIL_USER'];
        $mail->Password = $_ENV['EMAIL_PASS'];

        $mail->setFrom('kadhir.avila.gallardo@gmail.com');
        $mail->addAddress($this->email, 'appsalon.com');
        $mail->Subject = "Confirma tu Cuenta";

        //Set HTML
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';

        $contenido = "<html>
        <head>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    line-height: 1.6;
                    color: black;
                }
                p {
                    margin-bottom: 15px;
                    color: black;
                }
                a {
                    color: #007bff;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <p>Hola " . $this->nombre . ",</p>
            <p>Has creado tu cuenta en AppSalon. Para confirmar tu cuenta, por favor presiona el siguiente enlace:</p>
            <p><a href='" . $_ENV['APP_URL'] . "/confirmar-cuenta?token=" . $this->token . "'>Confirmar Cuenta</a></p>
            <p>Si no solicitaste esta cuenta, puedes ignorar este mensaje.</p>
        </body>
      </html>";
        $mail->Body = $contenido;



        //Enviar el email
        $mail->send();
    }

    public function enviarInstrucciones(){
                //Crear el objeto de Email
                $mail = new PHPMailer();
                $mail->isSMTP();
                $mail->Host = $_ENV['EMAIL_HOST'];
                $mail->SMTPAuth = true;
                $mail->Port = $_ENV['EMAIL_PORT'];
                $mail->Username = $_ENV['EMAIL_USER'];
                $mail->Password = $_ENV['EMAIL_PASS'];
        
                $mail->setFrom('kadhir.avila.gallardo@gmail.com');
                $mail->addAddress($this->email, 'appSalon.com');
                $mail->Subject = "Reestablece tu Password";
        
                //Set HTML
                $mail->isHTML(true);
                $mail->CharSet = 'UTF-8';
        
                $contenido = "<html>
                <head>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            line-height: 1.6;
                            color: black;
                        }
                        p {
                            margin-bottom: 15px;
                           
                        }
                        a {
                            color: #007bff;
                            text-decoration: none;
                        }
                    </style>
                </head>
                <body>
                    <p>Hola " . $this->nombre . ",</p>
                    <p>Has solicitado cambiar tu password en AppSalón. Para confirmar seguir el proceso, por favor presiona el siguiente enlace:</p>
                    <p><a href='" . $_ENV['APP_URL'] . "/recuperar-password?token=" . $this->token . "'>Cambiar Password</a></p>
                    <p>Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
                </body>
              </html>";
                $mail->Body = $contenido;
        
                //Enviar el email
                $mail->send();
    }
}
?>