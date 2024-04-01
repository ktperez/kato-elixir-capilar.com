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
        if (userMessage.trim() !== '') {
            // Crear un nuevo mensaje de usuario con avatar
            var userAvatar = '<div class="avatar"><img src="user_avatar.png" alt="User Avatar"></div>';
            var messageContent = '<div class="message user-message">' + userAvatar + userMessage + '</div>';
            $('#chat-box').append(messageContent);

            $('#user-input').val('');
            playMessageSound();
            
            // Convertir el mensaje del usuario a minúsculas para comparar
            userMessage = userMessage.toLowerCase();

            // Definir preguntas y respuestas
            var queryPatterns = {
                "hola": "¡Hola! Soy Kato, ¿En qué puedo ayudarte hoy?",
                "producto": "Tenemos disponible el Elixir Capilar Kato Capilar, ideal para cabello, cejas y barba. ¿Te gustaría conocer más detalles?",
                // Otros patrones y respuestas aquí...
            };

            // Verificar si el mensaje del usuario coincide con algún patrón
            var foundResponse = false;
            for (var pattern in queryPatterns) {
                if (userMessage.includes(pattern)) {
                    var response = queryPatterns[pattern];
                    // Crear un nuevo mensaje de Kato con avatar
                    var katoAvatar = '<div class="avatar"><img src="KATO.png" alt="Kato Avatar"></div>';
                    var katoMessage = '<div class="message kato-message">' + katoAvatar + response + '</div>';
                    $('#chat-box').append(katoMessage);
                    playMessageSound();
                    foundResponse = true;
                    break; // Salir del bucle una vez que se encuentra una respuesta
                }
            }

            // Si no se encontró una respuesta predefinida, enviar al servidor
            if (!foundResponse) {
                sendToServer(userMessage);
            }
        }
    }

    // Función para enviar al servidor si no hay respuesta predefinida
    function sendToServer(userMessage) {
        // Código para enviar userMessage al servidor y obtener respuesta
        // Este es solo un ejemplo, reemplaza con tu código real de envío al servidor
        var responseFromServer = "Respuesta del servidor para: " + userMessage;
        // Crear un nuevo mensaje de Kato con avatar para la respuesta del servidor
        var katoAvatar = '<div class="avatar"><img src="KATO.png" alt="Kato Avatar"></div>';
        var serverResponse = '<div class="message kato-message">' + katoAvatar + responseFromServer + '</div>';
        $('#chat-box').append(serverResponse);
        playMessageSound();
    }

    // Reproducir sonido al enviar un mensaje
    function playMessageSound(){
        var audio = new Audio('message.mp3');
        audio.play();
    }
});
$(document).ready(function(){
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
});

