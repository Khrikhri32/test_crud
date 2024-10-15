const db = require('./db');

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS productos`);

    db.run(`CREATE TABLE productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(50) NOT NULL,
        descripcion VARCHAR(255),
        precio DECIMAL(10, 2) NOT NULL,
        cantidad INTEGER NOT NULL,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);

    const query = db.prepare("INSERT INTO productos (nombre, descripcion, precio, cantidad) VALUES (?, ?, ?, ?)");
    query.run("Catan", "El objetivo principal de Catán es alcanzar los 10 puntos de victoria necesarios para ganar, estos pueden ser mediante construcciones, la ruta más larga, el ejército más grande, o cartas de desarrollo. Por lo tanto, la interacción entre los jugadores es vital, ya que, por cada decisión se puede efectuar a todos en la mesa. Sumado, está la incertidumbre y la estrategia con la presencia del Ladrón, quien puede aparecer cuando se lanza un siete en los dados, bloqueando así la recolección de recursos y añadiendo táctica y planificación en cada turno.", 24890, 10);
    query.run("Dominion", "Con un amplio listado de premios internacionales, Dominion destaca por su sorprendente sistema de reglas, considerado como la piedra fundacional de los llamados Juegos de Mazos Construibles. (Deck Building Games en inglés)En Dominion cada jugador posee un Reino (su mazo inicial) y unas inevitables ganas de aumentar sus recursos, objetivo que no es fácil de alcanzar cuando hay tres o cuatro jugadores que tienen los mismos planes.", 34990, 10);
    query.run("Aventureros al tren", "Con un modo de juego muy simple, el juego de mesa Aventureros al Tren, o Ticket to Ride en su idioma original, puede ser aprendido en menos de 15 minutos, mientras que ofrece una intensidad estratégica y decisiones táctica importantes en cada turno. La tensión llega cuando se está forzado a controlar las ambiciones, agregando más cartas en la mano y temer o perder una ruta clave ante el oponente.", 44990, 5);
    query.run("Exit", "La saga de juegos Exit nos trae en cada caja todo lo necesario para vivir la emoción de las mejores Escape room o salas de escape desde el salón de casa. Cada título tiene una temática y una historia completamente diferente en la que los jugadores son los protagonistas. Una aventura ideal para pasar una divertida tarde en solitario, en familia o entre amigos que pondrá a prueba la capacidad de observación, el ingenio y la creatividad de todos los participantes. El formato compacto y portátil de la caja convierten este juego en un compañero ideal para cualquier viaje.", 12990, 5);
    query.run("Takenoko", "Después de una larga serie de conflictos, las relaciones diplomáticas entre Japón y China por fin están recuperándose. Para celebrar adecuadamente esta alianza, el Emperador de China regaló a su homólogo japonés un animal sagrado como símbolo de paz: ¡un oso panda gigante!Como miembros de la corte del emperador, tendrán que intentar controlar el hambre que este voraz animal siente ante la presencia de un tierno y jugoso brote de bambú.", 29990, 1);
    query.run("7 Wonders", "Lidera una de las siete ciudades más grandes de la antigüedad. Mejora el ejército la ciencia, la cultura y la economía de tu civilización. ¿Logrará tu maravilla sobrevivir a los avatares del tiempo?", 43990, 3);
    query.finalize();

    console.log('Tabla productos creada y datos insertados.');
});
