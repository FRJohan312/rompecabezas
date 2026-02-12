// Configuración del rompecabezas
const ROWS = 5;
const COLS = 6;
const TOTAL_PIECES = ROWS * COLS; // 30 piezas
const IMAGE_PATH = 'pista.jpg';
const REDIRECT_URL = 'https://frjohan312.github.io/a-oymes/';

// Botón de auto-completar (para pruebas) - Cambia a false para deshabilitar
const ENABLE_CHEAT_BUTTON = false;

// Configuración de EmailJS (misma que en el resto del proyecto)
const EMAILJS_CONFIG = {
    publicKey: 'rQsNPFPIBLjw5H_O1',
    serviceId: 'service_n03t122',
    templateId: 'template_b1fiuhm'  // Usando el template del activador
};

const EMAIL_PARAMS = {
    to_email: 'archivodeltiempo2112@gmail.com',
    subject: 'Bien hecho',
    message: 'deberías jugar para relajarte un rato, mientras recuerdas dulces momentos...',
    from_name: 'Sistema'
};

let piecesPlaced = 0;
let puzzleState = Array(TOTAL_PIECES).fill(null);

// Inicializar el juego
function initGame() {
    createPuzzleSlots();
    createPuzzlePieces();
    updateProgress();

    // Mostrar/ocultar botón de auto-completar
    const cheatButton = document.getElementById('cheat-button');
    if (cheatButton) {
        cheatButton.style.display = ENABLE_CHEAT_BUTTON ? 'block' : 'none';
    }
}

// Función para auto-completar el puzzle (para pruebas)
function autoCompletePuzzle() {
    // Simular que todas las piezas fueron colocadas
    piecesPlaced = TOTAL_PIECES;
    puzzleState = Array(TOTAL_PIECES).fill(true);

    // Llenar todos los slots con las piezas correctas
    const slots = document.querySelectorAll('.puzzle-slot');
    const pieces = document.querySelectorAll('.puzzle-piece');

    slots.forEach((slot, index) => {
        if (!slot.classList.contains('filled')) {
            const position = parseInt(slot.dataset.position);
            const row = Math.floor(position / COLS);
            const col = position % COLS;

            // Crear pieza visual
            const placedPiece = document.createElement('div');
            placedPiece.className = 'puzzle-piece';
            placedPiece.style.backgroundImage = `url('${IMAGE_PATH}')`;
            placedPiece.style.backgroundPosition = `${col * 100 / (COLS - 1)}% ${row * 100 / (ROWS - 1)}%`;
            placedPiece.style.width = '100%';
            placedPiece.style.height = '100%';
            placedPiece.style.cursor = 'default';
            placedPiece.draggable = false;

            slot.appendChild(placedPiece);
            slot.classList.add('filled');
        }
    });

    // Eliminar todas las piezas del contenedor
    pieces.forEach(piece => {
        piece.remove();
    });

    // Actualizar progreso
    updateProgress();

    // Completar el puzzle
    setTimeout(() => {
        completePuzzle();
    }, 500);
}

// Crear los espacios del rompecabezas
function createPuzzleSlots() {
    const container = document.getElementById('puzzle-container');

    for (let i = 0; i < TOTAL_PIECES; i++) {
        const slot = document.createElement('div');
        slot.className = 'puzzle-slot';
        slot.dataset.position = i;

        // Eventos de arrastrar y soltar
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('drop', handleDrop);
        slot.addEventListener('dragleave', handleDragLeave);

        container.appendChild(slot);
    }
}

// Crear las piezas del rompecabezas
function createPuzzlePieces() {
    const container = document.getElementById('pieces-container');
    const pieces = [];

    // Crear array de piezas
    for (let i = 0; i < TOTAL_PIECES; i++) {
        pieces.push(i);
    }

    // Mezclar las piezas
    shuffleArray(pieces);

    // Crear elementos de las piezas
    pieces.forEach(position => {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.draggable = true;
        piece.dataset.position = position;

        // Calcular la posición de la imagen de fondo
        const row = Math.floor(position / COLS);
        const col = position % COLS;

        piece.style.backgroundImage = `url('${IMAGE_PATH}')`;
        piece.style.backgroundPosition = `${col * 100 / (COLS - 1)}% ${row * 100 / (ROWS - 1)}%`;

        // Eventos de arrastre
        piece.addEventListener('dragstart', handleDragStart);
        piece.addEventListener('dragend', handleDragEnd);

        container.appendChild(piece);
    });
}

// Mezclar array (Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Manejar inicio de arrastre
function handleDragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', e.target.dataset.position);
    e.target.style.opacity = '0.5';
}

// Manejar fin de arrastre
function handleDragEnd(e) {
    e.target.style.opacity = '1';
}

// Manejar arrastre sobre el slot
function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    if (!e.currentTarget.classList.contains('filled')) {
        e.currentTarget.classList.add('drag-over');
    }
}

// Manejar salida de arrastre
function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

// Manejar soltar pieza
function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    const slotPosition = parseInt(e.currentTarget.dataset.position);
    const piecePosition = parseInt(e.dataTransfer.getData('text/plain'));

    // Verificar si la pieza es correcta para este slot
    if (slotPosition === piecePosition && !puzzleState[slotPosition]) {
        placePiece(e.currentTarget, piecePosition);
    }
}

// Colocar pieza en el slot
function placePiece(slot, position) {
    // Encontrar la pieza original
    const piece = document.querySelector(`.puzzle-piece[data-position="${position}"]`);

    if (!piece || piece.classList.contains('placed')) return;

    // Crear una copia de la pieza en el slot
    const placedPiece = piece.cloneNode(true);
    placedPiece.draggable = false;
    placedPiece.style.opacity = '1';
    placedPiece.style.width = '100%';
    placedPiece.style.height = '100%';
    placedPiece.style.cursor = 'default';

    slot.appendChild(placedPiece);
    slot.classList.add('filled');

    // Eliminar la pieza original del contenedor de piezas con animación
    piece.style.transition = 'all 0.3s ease';
    piece.style.transform = 'scale(0)';
    piece.style.opacity = '0';

    setTimeout(() => {
        piece.remove();
    }, 300);

    // Actualizar estado
    puzzleState[position] = true;
    piecesPlaced++;

    updateProgress();

    // Verificar si el rompecabezas está completo
    if (piecesPlaced === TOTAL_PIECES) {
        completePuzzle();
    }
}

// Actualizar barra de progreso
function updateProgress() {
    const progress = Math.round((piecesPlaced / TOTAL_PIECES) * 100);
    document.getElementById('progress').textContent = `${progress}%`;
    document.getElementById('pieces-placed').textContent = `${piecesPlaced}/${TOTAL_PIECES}`;
}

// Completar rompecabezas
async function completePuzzle() {
    // Mostrar modal
    const modal = document.getElementById('completion-modal');
    modal.classList.add('show');

    // Actualizar modal: Enviando correo
    updateModalStatus('sending');

    // Enviar correo
    const emailSent = await sendEmail();

    if (emailSent) {
        // Actualizar modal: Correo enviado
        updateModalStatus('sent');

        // Esperar 2 segundos antes de redirigir
        setTimeout(() => {
            // Actualizar modal: Redirigiendo
            updateModalStatus('redirecting');

            // Redirigir después de 1 segundo más
            setTimeout(() => {
                window.location.href = REDIRECT_URL;
            }, 1000);
        }, 2000);
    } else {
        // Si falla el envío, redirigir de todos modos después de 2 segundos
        updateModalStatus('error');
        setTimeout(() => {
            window.location.href = REDIRECT_URL;
        }, 2000);
    }
}

// Actualizar el estado visual del modal
function updateModalStatus(status) {
    const title = document.getElementById('modal-title');
    const message = document.getElementById('modal-message');
    const statusText = document.getElementById('modal-status');
    const loader = document.getElementById('modal-loader');

    switch (status) {
        case 'sending':
            title.textContent = '¡Felicidades!';
            message.textContent = 'Has completado el rompecabezas';
            statusText.textContent = '📧 Enviando correo...';
            loader.style.display = 'block';
            break;
        case 'sent':
            title.textContent = '✅ ¡Correo Enviado!';
            message.textContent = 'El mensaje ha sido enviado exitosamente';
            statusText.textContent = 'Preparando redirección...';
            loader.style.display = 'block';
            break;
        case 'redirecting':
            title.textContent = '🔗 Redirigiendo...';
            message.textContent = 'Serás redirigido en un momento';
            statusText.textContent = 'Por favor espera...';
            loader.style.display = 'block';
            break;
        case 'error':
            title.textContent = '⚠️ Advertencia';
            message.textContent = 'Hubo un problema al enviar el correo';
            statusText.textContent = 'Redirigiendo de todos modos...';
            loader.style.display = 'none';
            break;
    }
}

// Enviar correo electrónico usando EmailJS
async function sendEmail() {
    try {
        // Inicializar EmailJS
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('✅ EmailJS inicializado');

        // Preparar parámetros del template
        const templateParams = {
            to_email: EMAIL_PARAMS.to_email,
            subject: EMAIL_PARAMS.subject,
            message: EMAIL_PARAMS.message,
            from_name: EMAIL_PARAMS.from_name,
            to_name: 'UmVsb2o='
        };

        console.log('📧 Enviando correo a:', EMAIL_PARAMS.to_email);

        // Enviar email
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        );

        console.log('✅ Email enviado exitosamente:', response);
        return true;

    } catch (error) {
        console.error('❌ Error al enviar email:', error);
        return false;
    }
}

// Iniciar el juego cuando se carga la página
window.addEventListener('load', () => {
    initGame();
});
