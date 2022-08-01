import nodemailer from "nodemailer";


export const emailRegistro = async (datos) => {
  const { nombre, email, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: '"Restaurante" <admin@restaurante.com>', // sender address
    to: email, // list of receivers
    subject: "Restaurante - Comprueba tu cuenta", // Subject line
    text: "Comprueba tu cuenta en Restaurante ", // plain text body
    html: `
              <b>Hola ${nombre}</b>
                <p>Gracias por registrarte con nosotros.</p>
                <p>Para finalizar con el registr es importante dar click en el siguiente enlace
                con el fin de autenticar tu cuenta 
                <a href="${process.env.URL_FRONT}/super-restaurantes/confirmar/${token}" target="_blanck">Enlace</a></p>
                <p>En caso de recibir este email por error, puedes ignorarlo.</p>

                <p>Restaurante team</p>
               
        `, // html body
  });
};

export const emailOlvidoPassword = async (datos) => {
  const { nombre, email, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: '"Restaurante" <admin@restaurante.com>', // sender address
    to: email, // list of receivers
    subject: "Restaurante - Reestablece tu cuenta", // Subject line
    text: "Restablece tu cuenta en Restaurante ", // plain text body
    html: `<b>Hola ${nombre}</b>
                <p>Has solicitado recuperar tu password.</p>
                <p>Sigue el siguiente enlace para generar un nuevo password 
                <a href="${process.env.URL_FRONT}/super-restaurantes/olvide-password/${token}" target="_blanck">Reestablecer password</a></p>
                <p>Un saludo</p>
                <p>Restaurante team</p>
        `, // html body
  });
};

export const emailPedido = async (datos) => {
  const { nombre, email, pedido, restaurante, fecha, total, estado } = datos;


  const proPedido = pedido.map(
    (pedido) => `
  <tr>
    <td>${pedido.cantidad}</td>
    <td>${pedido.nombre}</td>
    <td>€${pedido.precio}</td>
  </tr>
  `
  );

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: '"Restaurante" <admin@restaurante.com>', // sender address
    to: email, // list of receivers
    subject: "Pedi2 - Pedido realizado correctamente", // Subject line
    text: "Pedido realizado correctamente", // plain text body
    html: `
      <!doctype html>
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <style type="text/css">
            table {
              font-family: arial, sans-serif;
              border-collapse: collapse;
              width: 100%;
            }
            
            td, th {
              border:  #ccc;
              text-align: left;
              padding: 8px;
            }
            
            tr:nth-child(even) {
              background-color: #e6fffc;
            }
            .logo{
              width:60px;
              height:60px;
              margin-right:5px;
            }
            .logoName{
              font-size:40px;
              color:#959595;
              font-weight: bold
            }
            .banner{
              display:flex;
              justify-content:center;
              background: #73FCDA;
              width:100%;
              align-items:center;
              
            }
            .separador{
              padding-top:20px;
              padding-bottom:20px;
            }
            .total{
              color:#959595;;
              font-size:20px;
            }
            .partner{
              font-size:20px;
              text-align:center;
              background-color:#525252;
              color:#FFFFFF;
            }
            .footer{
              display:flex;
              flex-direction:column;
              background-color:#1C1C1C;
              color:#FFFFFF;
              padding-left:5px;
            }
            a{
              text-decoration:none;
              color:#FFFFFF;

            }
            .email{
              color: #D8CF44;
            }
            .ing{
              width:30px;
              height:30px;
              margin-right:5px;
              align-text: center;
            }
            .gmail{
              width:30px;
              height:30px;
              margin-right:5px;
              align-text: center;
            }
            .redes{
              display:flex;
              align-items: center;
            }
            .separadorMargin{
              margin-top:5px;
              margin-bottom:5px;
            }
            .equipo2{
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
            }
            .contactoFooter{
              color:#FFFFFF;
            }
            </style>
          </head>
            <body style="font-family: sans-serif;">
            <div class="container">
              <div class="banner separador">
                <img src="https://i.ibb.co/PwX6SF9/olla.png" class="logo" />
                <h1 class="logoName">PEDI2</h1>
              </div>
            </div>
            <div>
              <p class="separador">Hola ${nombre}</p>
              <p>Gracias por realizar tu pedido con nosotros y tu restaurante favorito:</p>
              <p class="partner">${restaurante}</p>
              <p>A continuación un breve resumen de tu pedido:</p>
            
            </div>    
              <table class="separador">
                <tbody>
                  <tr>
                    <th>Cantidad</th>
                    <th>Producto</th>
                    <th>Precio Unidad</th>
                  </tr>
                  ${proPedido}
                </tbody>
              </table>
              <div>
              <p>Estado: ${estado == 1 || estado == 2 ? "Pendiente de pagar" : "Pagado"}</p>
                <p>IMPORTE: <span class="total">€${total}</span></p>
              </div>
              <footer class="separador">
                <div class="footer separador">
                <div>
                  <h3 class="contactoFooter">CONTÁCTANOS</h3>
                </div>
                  <div class="redes">
                    <a href="https://www.instagram.com/pedi2.me/" target="_blank">
                      <img src="https://cdn.pixabay.com/photo/2021/06/15/12/17/instagram-6338401_1280.png" class="ing" />
                      
                    </a>
                    <a href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRtsVrqwckxjcQvvwKPXHSKmtQQRjKbTHqgljPhsWDNbbGKgXjLfKPMqxsncfWJPkswJkBq" target="_blank" class="email">
                    <img src="https://icones.pro/wp-content/uploads/2021/05/icones-de-messagerie-violet.png" class="gmail" />
                    </a> 
                  </div>
                  <div class="equipo2">
                    <img src="https://i.ibb.co/PwX6SF9/olla.png" class="logo" />
                    <p>Equipo PEDI2</p>
                  </div>
                  <div>
                  </div>
                </div>
              
              </footer>
              
              </body>
            </html> 
      `, // html body
  });
};
