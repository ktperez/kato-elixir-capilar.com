$(document).ready(function(){
    // Mostrar la bola emergente pequeña
    $('.chat-ball').click(function(){
        $(this).hide();
        $('.chat-popup').fadeIn();
        playMessageSound(); // Reproducir sonido al abrir el chat
    });

    // Cerrar la bola emergente completa
    $('#close-btn').click(function(){
        $('.chat-popup').fadeOut();
        $('.chat-ball').fadeIn();
    });

    // Enviar mensaje al hacer clic en Enviar
    $('#send-btn').click(function(){
        sendMessage();
    });

    // Enviar mensaje al presionar Enter en el campo de texto
    $('#user-input').keypress(function(event){
        if (event.which == 13) {
            sendMessage();
        }
    });

    // Función para enviar mensaje
    function sendMessage(){
        var userMessage = $('#user-input').val();
        console.log("Mensaje del usuario:", userMessage); // Agregar console.log para ver el mensaje del usuario
        if (userMessage.trim() !== '') {
            // Crear un nuevo mensaje de usuario con avatar
            var userAvatar = '<div class="avatar"><img src="./img/user_avatar.png" alt="User Avatar"></div>';
            var messageContent = '<div class="message user-message">' + userAvatar + userMessage + '</div>';
            $('#chat-box').append(messageContent);

            $('#user-input').val('');
            playMessageSound();
            
            // Convertir el mensaje del usuario a minúsculas para comparar
            userMessage = userMessage.toLowerCase();
            console.log("Mensaje del usuario en minúsculas:", userMessage); // Agregar console.log para ver el mensaje en minúsculas

            // Definir opciones del menú y respuestas asociadas
            var menuOptions = {
                "1": {
                    "text": "Compra del Elixir Capilar 🛒. ¿Qué tamaño de aceite le gustaría? aceite de 10ml o aceite de 30ml. Digite 10 o 30",
                    "options": {
                        "10": {
                            "text": "Has seleccionado el aceite de 10ml por 30,000 COP.",
                            "confirmation": true,
                            "redirect": "https://wa.link/frfgbk"
                        },
                        "30": {
                            "text": "Has seleccionado el aceite de 30ml por 60,000 COP.",
                            "confirmation": true,
                            "redirect": "https://wa.link/frfgbk"
                        }
                    }
                },
                "2": {
                    "text": "💆‍♂️ Modo de Uso",
                    "options": {
                        "🔄": "Frecuencia de aplicación en la barba: Se sugiere aplicar Kato Capilar de 3 a 5 veces por semana en la barba para obtener mejores resultados",
                        "💧": "Cantidad recomendada para la barba: La cantidad adecuada es un promedio entre 7 y 12 gotas en toda la zona de la barba que deseas hidratar.",
                        "👁️‍🗨️": "Aplicación en cejas o pestañas: Para cejas o pestañas, aplica Kato Capilar entre 2 a 3 veces por semana. Unta la brocha de tu máscara de pestañas con nuestro elixir y cepilla bien las cejas o pestañas para una aplicación uniforme.",
                        "⚠️": "Precauciones al usar: Debido a que es un óleo capilar, se recomienda usarlo de manera gradual para evitar posibles irritaciones. Inicia con 3 aplicaciones a la semana y aumenta gradualmente.",
                        "🌿": "Ingredientes principales: Nuestro producto está elaborado con aceites esenciales como argán, jojoba y ricino, dedicados a la hidratación y estimulación del crecimiento capilar.",
                        "❗": "En caso de irritación: Si experimentas irritación al usar Kato Capilar, suspende el uso del producto hasta que la irritación desaparezca por completo del cuerpo."
                    }
                },
                "3": {
                    "text": "💇‍♂️💛 Recomendaciones Capilares",
                    "options": {
                        "🏼": "Para el cabello liso, se recomienda lavarlo casi a diario con un champú ligero y evitar productos nutritivos pesados. Además, puedes aplicar el Elixir Capilar Kato Capilar de 3 a 5 veces por semana en la raíz para estimular el crecimiento y mantenerlo hidratado",
                        "🌀": "Si tienes cabello rizado, es preferible espaciar los lavados para evitar el encrespamiento. Aplica una mascarilla hidratante una vez por semana y complementa con el uso del Elixir Capilar Kato Capilar cada tres días para mantener la nutrición y controlar el frizz",
                        "🎨": "Para cabello teñido, utiliza champús y acondicionadores específicos para cabello coloreado para prolongar la duración del color. También, aplica el Elixir Capilar Kato Capilar dos veces por semana para proteger el cabello y mantenerlo suave y brillante",
                        "👱‍♂️": "Si tu cabello es fino y sin volumen, evita productos que lo sobrecarguen. Opta por champús voluminizadores y utiliza el Elixir Capilar Kato Capilar una vez por semana en las puntas para darles fuerza y cuerpo",
                        "🛢️": "Para cabello con tendencia grasa, es recomendable lavarlo con champú suave cada dos días y evitar el uso excesivo de productos que lo engrasen. Aplica el Elixir Capilar Kato Capilar solo en las puntas para evitar que se vuelvan grasosas"
                    }
                }
            };

            // Verificar si el mensaje del usuario coincide con alguna opción del menú
            if (userMessage in menuOptions) {
                var response = menuOptions[userMessage];
                console.log("Respuesta del menú:", response); // Agregar console.log para ver la respuesta del menú

                // Crear un nuevo mensaje de Kato con avatar
                var katoAvatar = '<div class="avatar"><img src="./img/imagen.jpg" alt="User Avatar"></div>';
                var katoMessage = '<div class="message kato-message">' + katoAvatar + response.text + '</div>';
                $('#chat-box').append(katoMessage);

                // Si hay opciones específicas para la opción seleccionada, mostrarlas
                if (response.options) {
                    var options = response.options;
                    for (var key in options) {
                        if (options.hasOwnProperty(key)) {
                            var option = options[key];
                            var optionMessage = '<div class="message kato-message menu-option" data-option="' + key + '">' + key + '. ' + option + '</div>'; // Agregar la clase menu-option
                            $('#chat-box').append(optionMessage);
                            playMessageSound();
                            if (option.confirmation) {
                                // Mostrar ventana emergente de confirmación
                                $('#confirmationModal').modal('show');

                                // Configurar el botón de redirección
                                $('#confirmRedirect').click(function(){
                                    window.location.href = option.redirect;
                                });
                            }
                        }
                    }
                }
                playMessageSound();
            } else {
                // Si el usuario ingresa una opción inválida, mostrar un mensaje de error
                var errorMessage = "Opción inválida. Por favor selecciona una opción válida del menú.";
                var katoAvatar = '<div class="avatar"><img src="./img/imagen.jpg" alt="Kato Avatar"></div>';
                var errorResponse = '<div class="message kato-message">' + katoAvatar + errorMessage + '</div>';
                $('#chat-box').append(errorResponse);
                playMessageSound();
            }
        }
    }

    // Reproducir sonido al enviar un mensaje
    function playMessageSound(){
        var audio = new Audio('message.mp3');
        audio.play();
    }

    // Configuración del carrusel
    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev">Anterior</button>',
        nextArrow: '<button type="button" class="slick-next">Siguiente</button>'
    });

    // Función para manejar la selección de opción del menú
    $(".menu-option").click(function(){
        var option = $(this).attr("data-option");
        $("#user-input").val(option); // Insertar la opción en el campo de entrada
    });
    
    // Permitir la selección de opciones "2" y "3" ingresando el número en el campo de entrada
    $('#user-input').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '50' || keycode == '51') {
            var option = String.fromCharCode(keycode);
            $("#user-input").val(option);
            sendMessage();
        }
    });
});
