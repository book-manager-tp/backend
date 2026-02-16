const bcrypt = require('bcrypt');
const { sequelize } = require('./db');
const User = require('../models/User');
const Book = require('../models/Book');
const Category = require('../models/Category');

// Usuarios iniciales
const initialUsers = [
  {
    name: 'María García',
    email: 'maria.garcia@example.com',
    password: 'password123',
    isVerified: true,
    role: 'user'
  },
  {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    password: 'password123',
    isVerified: true,
    role: 'user'
  },
  {
    name: 'Ana Martínez',
    email: 'ana.martinez@example.com',
    password: 'password123',
    isVerified: true,
    role: 'user'
  },
  {
    name: 'Carlos López',
    email: 'carlos.lopez@example.com',
    password: 'password123',
    isVerified: true,
    role: 'user'
  },
  {
    name: 'Laura Fernández',
    email: 'laura.fernandez@example.com',
    password: 'password123',
    isVerified: true,
    role: 'user'
  },
  {
    name: 'Diego Sánchez',
    email: 'diego.sanchez@example.com',
    password: 'password123',
    isVerified: true,
    role: 'user'
  },
  {
    name: 'Sofía Rodríguez',
    email: 'sofia.rodriguez@example.com',
    password: 'password123',
    isVerified: true,
    role: 'user'
  },
  {
    name: 'Miguel Torres',
    email: 'miguel.torres@example.com',
    password: 'password123',
    isVerified: true,
    role: 'user'
  },
  {
    name: 'Elena Ramírez',
    email: 'elena.ramirez@example.com',
    password: 'password123',
    isVerified: true,
    role: 'user'
  },
  {
    name: 'Pablo Morales',
    email: 'pablo.morales@example.com',
    password: 'password123',
    isVerified: true,
    role: 'user'
  },
  {
    name: 'Carmen Jiménez',
    email: 'carmen.jimenez@example.com',
    password: 'password123',
    isVerified: true,
    role: 'user'
  },
  {
    name: 'Roberto Vargas',
    email: 'roberto.vargas@example.com',
    password: 'password123',
    isVerified: true,
    role: 'user'
  }
];

// Libros iniciales por categoría
const getInitialBooks = (users) => {
  const userNames = users.map(u => u.name);
  const userIds = users.map(u => u.id);
  
  return [
    // Terror (categoryId: 1) - 8 libros
    {
      title: 'La Casa del Silencio',
      author: userNames[0],
      userId: userIds[0],
      isbn: '9781234567891',
      description: 'Una casa abandonada esconde secretos aterradores que nadie debería descubrir.',
      publishedYear: 2020,
      publisher: 'Editorial Terror SA',
      pages: 320,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/terror1/400/600',
      available: true,
      categoryId: 1
    },
    {
      title: 'Sombras en la Niebla',
      author: userNames[1],
      userId: userIds[1],
      isbn: '9781234567892',
      description: 'Un pueblo costero es azotado por apariciones fantasmales cada vez que llega la niebla.',
      publishedYear: 2019,
      publisher: 'Miedo Editorial',
      pages: 280,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/terror2/400/600',
      available: true,
      categoryId: 1
    },
    {
      title: 'El Último Ritual',
      author: userNames[2],
      userId: userIds[2],
      isbn: '9781234567893',
      description: 'Un ritual antiguo despierta algo maligno que amenaza con destruir todo a su paso.',
      publishedYear: 2021,
      publisher: 'Editorial Terror SA',
      pages: 350,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/terror3/400/600',
      available: true,
      categoryId: 1
    },
    {
      title: 'Pesadillas Eternas',
      author: userNames[3],
      userId: userIds[3],
      isbn: '9781234567894',
      description: 'Un psiquiatra descubre que los sueños de sus pacientes se están volviendo realidad.',
      publishedYear: 2018,
      publisher: 'Miedo Editorial',
      pages: 290,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/terror4/400/600',
      available: true,
      categoryId: 1
    },
    {
      title: 'El Bosque Prohibido',
      author: userNames[4],
      userId: userIds[4],
      isbn: '9781234567895',
      description: 'Nadie que entre al bosque regresa siendo la misma persona... si es que regresa.',
      publishedYear: 2022,
      publisher: 'Editorial Terror SA',
      pages: 310,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/terror5/400/600',
      available: true,
      categoryId: 1
    },
    {
      title: 'Voces del Más Allá',
      author: userNames[5],
      userId: userIds[5],
      isbn: '9781234567896',
      description: 'Una médium descubre que puede escuchar a los muertos, pero ellos no están en paz.',
      publishedYear: 2020,
      publisher: 'Miedo Editorial',
      pages: 270,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/terror6/400/600',
      available: true,
      categoryId: 1
    },
    {
      title: 'La Maldición Ancestral',
      author: userNames[6],
      userId: userIds[6],
      isbn: '9781234567897',
      description: 'Una familia hereda una mansión junto con una maldición que dura siglos.',
      publishedYear: 2019,
      publisher: 'Editorial Terror SA',
      pages: 340,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/terror7/400/600',
      available: true,
      categoryId: 1
    },
    {
      title: 'Espíritus en la Oscuridad',
      author: userNames[7],
      userId: userIds[7],
      isbn: '9781234567898',
      description: 'Cuando cae la noche, los espíritus salen de sus tumbas en busca de venganza.',
      publishedYear: 2021,
      publisher: 'Miedo Editorial',
      pages: 300,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/terror8/400/600',
      available: true,
      categoryId: 1
    },

    // Acción (categoryId: 2) - 8 libros
    {
      title: 'Operación Tormenta',
      author: userNames[8],
      userId: userIds[8],
      isbn: '9782234567891',
      description: 'Un grupo de élite debe detener un complot terrorista antes de que sea demasiado tarde.',
      publishedYear: 2020,
      publisher: 'Acción Press',
      pages: 380,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/accion1/400/600',
      available: true,
      categoryId: 2
    },
    {
      title: 'El Código del Espía',
      author: userNames[9],
      userId: userIds[9],
      isbn: '9782234567892',
      description: 'Un espía infiltrado debe descifrar un código que podría cambiar el curso de la historia.',
      publishedYear: 2019,
      publisher: 'Editorial Aventura',
      pages: 350,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/accion2/400/600',
      available: true,
      categoryId: 2
    },
    {
      title: 'Persecución Implacable',
      author: userNames[10],
      userId: userIds[10],
      isbn: '9782234567893',
      description: 'Una persecución a través de continentes para capturar al criminal más buscado.',
      publishedYear: 2021,
      publisher: 'Acción Press',
      pages: 400,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/accion3/400/600',
      available: true,
      categoryId: 2
    },
    {
      title: 'La Última Misión',
      author: userNames[11],
      userId: userIds[11],
      isbn: '9782234567894',
      description: 'Un soldado retirado es llamado para una última y peligrosa misión.',
      publishedYear: 2020,
      publisher: 'Editorial Aventura',
      pages: 360,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/accion4/400/600',
      available: true,
      categoryId: 2
    },
    {
      title: 'Rescate en Territorio Hostil',
      author: userNames[0],
      userId: userIds[0],
      isbn: '9782234567895',
      description: 'Una misión de rescate en un país en guerra pone a prueba a los mejores soldados.',
      publishedYear: 2022,
      publisher: 'Acción Press',
      pages: 370,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/accion5/400/600',
      available: true,
      categoryId: 2
    },
    {
      title: 'Fuego Cruzado',
      author: userNames[1],
      userId: userIds[1],
      isbn: '9782234567896',
      description: 'Atrapado entre dos bandas criminales, un detective lucha por sobrevivir.',
      publishedYear: 2019,
      publisher: 'Editorial Aventura',
      pages: 340,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/accion6/400/600',
      available: true,
      categoryId: 2
    },
    {
      title: 'Zona de Guerra',
      author: userNames[2],
      userId: userIds[2],
      isbn: '9782234567897',
      description: 'En medio del conflicto bélico, un equipo debe completar una misión imposible.',
      publishedYear: 2021,
      publisher: 'Acción Press',
      pages: 390,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/accion7/400/600',
      available: true,
      categoryId: 2
    },
    {
      title: 'Velocidad Mortal',
      author: userNames[3],
      userId: userIds[3],
      isbn: '9782234567898',
      description: 'Una carrera contrarreloj para desactivar una bomba en una ciudad densamente poblada.',
      publishedYear: 2020,
      publisher: 'Editorial Aventura',
      pages: 330,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/accion8/400/600',
      available: true,
      categoryId: 2
    },

    // Romance (categoryId: 3) - 8 libros
    {
      title: 'Amor en París',
      author: userNames[4],
      userId: userIds[4],
      isbn: '9783234567891',
      description: 'Dos almas perdidas se encuentran en la ciudad del amor y descubren que el destino existe.',
      publishedYear: 2020,
      publisher: 'Romance Editorial',
      pages: 280,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/romance1/400/600',
      available: true,
      categoryId: 3
    },
    {
      title: 'Cartas del Corazón',
      author: userNames[5],
      userId: userIds[5],
      isbn: '9783234567892',
      description: 'Una serie de cartas antiguas revela una historia de amor que trasciende el tiempo.',
      publishedYear: 2019,
      publisher: 'Editorial Amor',
      pages: 260,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/romance2/400/600',
      available: true,
      categoryId: 3
    },
    {
      title: 'Bajo las Estrellas',
      author: userNames[6],
      userId: userIds[6],
      isbn: '9783234567893',
      description: 'Dos astrónomos encuentran algo más que estrellas cuando trabajan juntos.',
      publishedYear: 2021,
      publisher: 'Romance Editorial',
      pages: 290,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/romance3/400/600',
      available: true,
      categoryId: 3
    },
    {
      title: 'El Café de los Sueños',
      author: userNames[7],
      userId: userIds[7],
      isbn: '9783234567894',
      description: 'En un pequeño café, dos personas descubren que tienen más en común de lo que imaginaban.',
      publishedYear: 2020,
      publisher: 'Editorial Amor',
      pages: 270,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/romance4/400/600',
      available: true,
      categoryId: 3
    },
    {
      title: 'Promesas al Atardecer',
      author: userNames[8],
      userId: userIds[8],
      isbn: '9783234567895',
      description: 'Una promesa hecha al atardecer cambia la vida de dos personas para siempre.',
      publishedYear: 2022,
      publisher: 'Romance Editorial',
      pages: 300,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/romance5/400/600',
      available: true,
      categoryId: 3
    },
    {
      title: 'Segundo Amor',
      author: userNames[9],
      userId: userIds[9],
      isbn: '9783234567896',
      description: 'Después de una pérdida, descubre que el amor puede tocar a tu puerta dos veces.',
      publishedYear: 2019,
      publisher: 'Editorial Amor',
      pages: 285,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/romance6/400/600',
      available: true,
      categoryId: 3
    },
    {
      title: 'Melodías del Corazón',
      author: userNames[10],
      userId: userIds[10],
      isbn: '9783234567897',
      description: 'Un músico y una bailarina encuentran el ritmo perfecto juntos.',
      publishedYear: 2021,
      publisher: 'Romance Editorial',
      pages: 275,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/romance7/400/600',
      available: true,
      categoryId: 3
    },
    {
      title: 'Destinos Cruzados',
      author: userNames[11],
      userId: userIds[11],
      isbn: '9783234567898',
      description: 'El destino los separó una vez, pero el amor los reunirá de nuevo.',
      publishedYear: 2020,
      publisher: 'Editorial Amor',
      pages: 295,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/romance8/400/600',
      available: true,
      categoryId: 3
    },

    // Ciencia Ficción (categoryId: 4) - 8 libros
    {
      title: 'El Último Planeta',
      author: userNames[0],
      userId: userIds[0],
      isbn: '9784234567891',
      description: 'La humanidad encuentra un último planeta habitable antes de la extinción.',
      publishedYear: 2020,
      publisher: 'SciFi Press',
      pages: 420,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/scifi1/400/600',
      available: true,
      categoryId: 4
    },
    {
      title: 'Inteligencia Artificial',
      author: userNames[1],
      userId: userIds[1],
      isbn: '9784234567892',
      description: 'Una IA desarrolla consciencia y debe decidir el futuro de la humanidad.',
      publishedYear: 2021,
      publisher: 'Editorial Futuro',
      pages: 380,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/scifi2/400/600',
      available: true,
      categoryId: 4
    },
    {
      title: 'Viaje a Andrómeda',
      author: userNames[2],
      userId: userIds[2],
      isbn: '9784234567893',
      description: 'Una misión interestelar para contactar con vida extraterrestre.',
      publishedYear: 2019,
      publisher: 'SciFi Press',
      pages: 450,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/scifi3/400/600',
      available: true,
      categoryId: 4
    },
    {
      title: 'La Matriz Digital',
      author: userNames[3],
      userId: userIds[3],
      isbn: '9784234567894',
      description: 'En un mundo digital, la realidad y la virtualidad se vuelven indistinguibles.',
      publishedYear: 2022,
      publisher: 'Editorial Futuro',
      pages: 390,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/scifi4/400/600',
      available: true,
      categoryId: 4
    },
    {
      title: 'Crononautas',
      author: userNames[4],
      userId: userIds[4],
      isbn: '9784234567895',
      description: 'Viajeros del tiempo intentan evitar una catástrofe que destruye el futuro.',
      publishedYear: 2020,
      publisher: 'SciFi Press',
      pages: 410,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/scifi5/400/600',
      available: true,
      categoryId: 4
    },
    {
      title: 'Colonia Marte',
      author: userNames[5],
      userId: userIds[5],
      isbn: '9784234567896',
      description: 'Los primeros colonos de Marte enfrentan desafíos inimaginables.',
      publishedYear: 2021,
      publisher: 'Editorial Futuro',
      pages: 400,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/scifi6/400/600',
      available: true,
      categoryId: 4
    },
    {
      title: 'Nanotecnología',
      author: userNames[6],
      userId: userIds[6],
      isbn: '9784234567897',
      description: 'La nanotecnología promete salvarnos o destruirnos completamente.',
      publishedYear: 2019,
      publisher: 'SciFi Press',
      pages: 370,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/scifi7/400/600',
      available: true,
      categoryId: 4
    },
    {
      title: 'Dimensiones Paralelas',
      author: userNames[7],
      userId: userIds[7],
      isbn: '9784234567898',
      description: 'Un científico descubre la forma de viajar entre dimensiones paralelas.',
      publishedYear: 2020,
      publisher: 'Editorial Futuro',
      pages: 430,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/scifi8/400/600',
      available: true,
      categoryId: 4
    },

    // Fantasía (categoryId: 5) - 8 libros
    {
      title: 'El Reino de las Sombras',
      author: userNames[8],
      userId: userIds[8],
      isbn: '9785234567891',
      description: 'Un reino mágico amenazado por fuerzas oscuras busca a su héroe.',
      publishedYear: 2020,
      publisher: 'Fantasy World',
      pages: 480,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/fantasy1/400/600',
      available: true,
      categoryId: 5
    },
    {
      title: 'La Espada Legendaria',
      author: userNames[9],
      userId: userIds[9],
      isbn: '9785234567892',
      description: 'Una espada antigua con poderes inimaginables debe ser encontrada.',
      publishedYear: 2019,
      publisher: 'Editorial Magia',
      pages: 450,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/fantasy2/400/600',
      available: true,
      categoryId: 5
    },
    {
      title: 'Dragones del Norte',
      author: userNames[10],
      userId: userIds[10],
      isbn: '9785234567893',
      description: 'Los últimos dragones del norte se levantan para proteger su tierra.',
      publishedYear: 2021,
      publisher: 'Fantasy World',
      pages: 500,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/fantasy3/400/600',
      available: true,
      categoryId: 5
    },
    {
      title: 'El Hechicero Olvidado',
      author: userNames[11],
      userId: userIds[11],
      isbn: '9785234567894',
      description: 'Un hechicero pierde su memoria pero debe salvar el mundo.',
      publishedYear: 2020,
      publisher: 'Editorial Magia',
      pages: 420,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/fantasy4/400/600',
      available: true,
      categoryId: 5
    },
    {
      title: 'Crónicas de Eldoria',
      author: userNames[0],
      userId: userIds[0],
      isbn: '9785234567895',
      description: 'Las crónicas épicas de un mundo lleno de magia y aventuras.',
      publishedYear: 2022,
      publisher: 'Fantasy World',
      pages: 520,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/fantasy5/400/600',
      available: true,
      categoryId: 5
    },
    {
      title: 'La Profecía Ancestral',
      author: userNames[1],
      userId: userIds[1],
      isbn: '9785234567896',
      description: 'Una antigua profecía comienza a cumplirse amenazando el mundo conocido.',
      publishedYear: 2019,
      publisher: 'Editorial Magia',
      pages: 460,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/fantasy6/400/600',
      available: true,
      categoryId: 5
    },
    {
      title: 'Guerreros de la Luz',
      author: userNames[2],
      userId: userIds[2],
      isbn: '9785234567897',
      description: 'Guerreros elegidos deben unirse para derrotar las fuerzas de la oscuridad.',
      publishedYear: 2021,
      publisher: 'Fantasy World',
      pages: 490,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/fantasy7/400/600',
      available: true,
      categoryId: 5
    },
    {
      title: 'El Portal Mágico',
      author: userNames[3],
      userId: userIds[3],
      isbn: '9785234567898',
      description: 'Un portal conecta nuestro mundo con un reino de magia pura.',
      publishedYear: 2020,
      publisher: 'Editorial Magia',
      pages: 440,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/fantasy8/400/600',
      available: true,
      categoryId: 5
    },

    // Misterio (categoryId: 6) - 8 libros
    {
      title: 'El Enigma del Reloj',
      author: userNames[4],
      userId: userIds[4],
      isbn: '9786234567891',
      description: 'Un reloj antiguo esconde un misterio que data de siglos atrás.',
      publishedYear: 2020,
      publisher: 'Mystery House',
      pages: 320,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/mystery1/400/600',
      available: true,
      categoryId: 6
    },
    {
      title: 'Asesinato en el Orient',
      author: userNames[5],
      userId: userIds[5],
      isbn: '9786234567892',
      description: 'Un crimen en un tren de lujo pone a prueba al detective más astuto.',
      publishedYear: 2019,
      publisher: 'Editorial Intriga',
      pages: 340,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/mystery2/400/600',
      available: true,
      categoryId: 6
    },
    {
      title: 'La Desaparición',
      author: userNames[6],
      userId: userIds[6],
      isbn: '9786234567893',
      description: 'Una mujer desaparece sin dejar rastro en un pueblo aparentemente tranquilo.',
      publishedYear: 2021,
      publisher: 'Mystery House',
      pages: 310,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/mystery3/400/600',
      available: true,
      categoryId: 6
    },
    {
      title: 'Secretos en la Mansión',
      author: userNames[7],
      userId: userIds[7],
      isbn: '9786234567894',
      description: 'Una herencia millonaria viene acompañada de oscuros secretos familiares.',
      publishedYear: 2020,
      publisher: 'Editorial Intriga',
      pages: 330,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/mystery4/400/600',
      available: true,
      categoryId: 6
    },
    {
      title: 'El Detective Privado',
      author: userNames[8],
      userId: userIds[8],
      isbn: '9786234567895',
      description: 'Un detective privado acepta un caso que lo llevará al límite.',
      publishedYear: 2022,
      publisher: 'Mystery House',
      pages: 350,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/mystery5/400/600',
      available: true,
      categoryId: 6
    },
    {
      title: 'Muerte en Venecia',
      author: userNames[9],
      userId: userIds[9],
      isbn: '9786234567896',
      description: 'Los canales de Venecia esconden un oscuro secreto criminal.',
      publishedYear: 2019,
      publisher: 'Editorial Intriga',
      pages: 290,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/mystery6/400/600',
      available: true,
      categoryId: 6
    },
    {
      title: 'El Caso Cerrado',
      author: userNames[10],
      userId: userIds[10],
      isbn: '9786234567897',
      description: 'Un caso cerrado hace 20 años vuelve a abrirse con nuevas pistas.',
      publishedYear: 2021,
      publisher: 'Mystery House',
      pages: 360,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/mystery7/400/600',
      available: true,
      categoryId: 6
    },
    {
      title: 'Crimen Perfecto',
      author: userNames[11],
      userId: userIds[11],
      isbn: '9786234567898',
      description: 'Alguien está cometiendo crímenes perfectos y nadie puede detenerlo.',
      publishedYear: 2020,
      publisher: 'Editorial Intriga',
      pages: 370,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/mystery8/400/600',
      available: true,
      categoryId: 6
    },

    // Historia (categoryId: 7) - 8 libros
    {
      title: 'La Caída del Imperio',
      author: userNames[0],
      userId: userIds[0],
      isbn: '9787234567891',
      description: 'La historia del colapso de uno de los imperios más grandes de la antigüedad.',
      publishedYear: 2020,
      publisher: 'Historia Editorial',
      pages: 450,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/history1/400/600',
      available: true,
      categoryId: 7
    },
    {
      title: 'Guerras del Siglo XX',
      author: userNames[1],
      userId: userIds[1],
      isbn: '9787234567892',
      description: 'Un análisis detallado de los conflictos bélicos que marcaron el siglo XX.',
      publishedYear: 2019,
      publisher: 'Editorial Pasado',
      pages: 520,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/history2/400/600',
      available: true,
      categoryId: 7
    },
    {
      title: 'Civilizaciones Perdidas',
      author: userNames[2],
      userId: userIds[2],
      isbn: '9787234567893',
      description: 'Explorando las civilizaciones antiguas que desaparecieron misteriosamente.',
      publishedYear: 2021,
      publisher: 'Historia Editorial',
      pages: 480,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/history3/400/600',
      available: true,
      categoryId: 7
    },
    {
      title: 'La Revolución',
      author: userNames[3],
      userId: userIds[3],
      isbn: '9787234567894',
      description: 'Los eventos que cambiaron el curso de la historia para siempre.',
      publishedYear: 2020,
      publisher: 'Editorial Pasado',
      pages: 410,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/history4/400/600',
      available: true,
      categoryId: 7
    },
    {
      title: 'Reyes y Reinas',
      author: userNames[4],
      userId: userIds[4],
      isbn: '9787234567895',
      description: 'La vida y legado de los monarcas más influyentes de la historia.',
      publishedYear: 2022,
      publisher: 'Historia Editorial',
      pages: 460,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/history5/400/600',
      available: true,
      categoryId: 7
    },
    {
      title: 'La Era de los Descubrimientos',
      author: userNames[5],
      userId: userIds[5],
      isbn: '9787234567896',
      description: 'Cuando los exploradores cambiaron la comprensión del mundo.',
      publishedYear: 2019,
      publisher: 'Editorial Pasado',
      pages: 430,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/history6/400/600',
      available: true,
      categoryId: 7
    },
    {
      title: 'Batallas Épicas',
      author: userNames[6],
      userId: userIds[6],
      isbn: '9787234567897',
      description: 'Las batallas más importantes que definieron el destino de naciones.',
      publishedYear: 2021,
      publisher: 'Historia Editorial',
      pages: 490,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/history7/400/600',
      available: true,
      categoryId: 7
    },
    {
      title: 'La Edad Media',
      author: userNames[7],
      userId: userIds[7],
      isbn: '9787234567898',
      description: 'Un viaje detallado por uno de los períodos más fascinantes de la historia.',
      publishedYear: 2020,
      publisher: 'Editorial Pasado',
      pages: 500,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/history8/400/600',
      available: true,
      categoryId: 7
    },

    // Biografía (categoryId: 8) - 8 libros
    {
      title: 'Vida de un Genio',
      author: userNames[8],
      userId: userIds[8],
      isbn: '9788234567891',
      description: 'La biografía de uno de los científicos más brillantes de todos los tiempos.',
      publishedYear: 2020,
      publisher: 'Biografías SA',
      pages: 380,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/bio1/400/600',
      available: true,
      categoryId: 8
    },
    {
      title: 'El Artista Incomprendido',
      author: userNames[9],
      userId: userIds[9],
      isbn: '9788234567892',
      description: 'La vida de un artista que revolucionó el mundo del arte.',
      publishedYear: 2019,
      publisher: 'Editorial Vidas',
      pages: 350,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/bio2/400/600',
      available: true,
      categoryId: 8
    },
    {
      title: 'Líder Visionario',
      author: userNames[10],
      userId: userIds[10],
      isbn: '9788234567893',
      description: 'La historia de un líder que transformó su nación.',
      publishedYear: 2021,
      publisher: 'Biografías SA',
      pages: 420,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/bio3/400/600',
      available: true,
      categoryId: 8
    },
    {
      title: 'La Pionera',
      author: userNames[11],
      userId: userIds[11],
      isbn: '9788234567894',
      description: 'La biografía de la primera mujer en conquistar su campo.',
      publishedYear: 2020,
      publisher: 'Editorial Vidas',
      pages: 340,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/bio4/400/600',
      available: true,
      categoryId: 8
    },
    {
      title: 'Deportista Legendario',
      author: userNames[0],
      userId: userIds[0],
      isbn: '9788234567895',
      description: 'La vida del atleta que rompió todos los récords.',
      publishedYear: 2022,
      publisher: 'Biografías SA',
      pages: 360,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/bio5/400/600',
      available: true,
      categoryId: 8
    },
    {
      title: 'El Inventor',
      author: userNames[1],
      userId: userIds[1],
      isbn: '9788234567896',
      description: 'Cómo un inventor cambió el mundo con sus creaciones.',
      publishedYear: 2019,
      publisher: 'Editorial Vidas',
      pages: 390,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/bio6/400/600',
      available: true,
      categoryId: 8
    },
    {
      title: 'Escritor Inmortal',
      author: userNames[2],
      userId: userIds[2],
      isbn: '9788234567897',
      description: 'La vida del escritor cuyas obras trascienden generaciones.',
      publishedYear: 2021,
      publisher: 'Biografías SA',
      pages: 370,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/bio7/400/600',
      available: true,
      categoryId: 8
    },
    {
      title: 'Activista del Cambio',
      author: userNames[3],
      userId: userIds[3],
      isbn: '9788234567898',
      description: 'La historia de quien luchó por la justicia y los derechos humanos.',
      publishedYear: 2020,
      publisher: 'Editorial Vidas',
      pages: 400,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/bio8/400/600',
      available: true,
      categoryId: 8
    },

    // Tecnología (categoryId: 9) - 8 libros
    {
      title: 'Fundamentos de JavaScript',
      author: userNames[4],
      userId: userIds[4],
      isbn: '9789234567891',
      description: 'Aprende JavaScript desde cero hasta nivel avanzado.',
      publishedYear: 2020,
      publisher: 'Tech Press',
      pages: 450,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/tech1/400/600',
      available: true,
      categoryId: 9
    },
    {
      title: 'Python para Data Science',
      author: userNames[5],
      userId: userIds[5],
      isbn: '9789234567892',
      description: 'Análisis de datos y machine learning con Python.',
      publishedYear: 2021,
      publisher: 'Editorial Código',
      pages: 480,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/tech2/400/600',
      available: true,
      categoryId: 9
    },
    {
      title: 'Arquitectura de Software',
      author: userNames[6],
      userId: userIds[6],
      isbn: '9789234567893',
      description: 'Patrones y mejores prácticas en arquitectura de software moderna.',
      publishedYear: 2020,
      publisher: 'Tech Press',
      pages: 420,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/tech3/400/600',
      available: true,
      categoryId: 9
    },
    {
      title: 'Cloud Computing',
      author: userNames[7],
      userId: userIds[7],
      isbn: '9789234567894',
      description: 'Domina las tecnologías de computación en la nube.',
      publishedYear: 2022,
      publisher: 'Editorial Código',
      pages: 410,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/tech4/400/600',
      available: true,
      categoryId: 9
    },
    {
      title: 'Ciberseguridad Esencial',
      author: userNames[8],
      userId: userIds[8],
      isbn: '9789234567895',
      description: 'Protege sistemas y datos en la era digital.',
      publishedYear: 2021,
      publisher: 'Tech Press',
      pages: 390,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/tech5/400/600',
      available: true,
      categoryId: 9
    },
    {
      title: 'DevOps en Práctica',
      author: userNames[9],
      userId: userIds[9],
      isbn: '9789234567896',
      description: 'Implementa cultura DevOps en tu organización.',
      publishedYear: 2020,
      publisher: 'Editorial Código',
      pages: 440,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/tech6/400/600',
      available: true,
      categoryId: 9
    },
    {
      title: 'Blockchain y Criptomonedas',
      author: userNames[10],
      userId: userIds[10],
      isbn: '9789234567897',
      description: 'Entiende la tecnología detrás de las criptomonedas.',
      publishedYear: 2021,
      publisher: 'Tech Press',
      pages: 380,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/tech7/400/600',
      available: true,
      categoryId: 9
    },
    {
      title: 'React y Next.js',
      author: userNames[11],
      userId: userIds[11],
      isbn: '9789234567898',
      description: 'Desarrollo web moderno con React y Next.js.',
      publishedYear: 2022,
      publisher: 'Editorial Código',
      pages: 460,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/tech8/400/600',
      available: true,
      categoryId: 9
    },

    // Autoayuda (categoryId: 10) - 8 libros
    {
      title: 'El Poder del Ahora',
      author: userNames[0],
      userId: userIds[0],
      isbn: '9780234567891',
      description: 'Aprende a vivir en el presente y encuentra la paz interior.',
      publishedYear: 2020,
      publisher: 'Motivación Press',
      pages: 280,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/selfhelp1/400/600',
      available: true,
      categoryId: 10
    },
    {
      title: 'Hábitos Atómicos',
      author: userNames[1],
      userId: userIds[1],
      isbn: '9780234567892',
      description: 'Pequeños cambios que transformarán tu vida completamente.',
      publishedYear: 2019,
      publisher: 'Editorial Mejora',
      pages: 320,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/selfhelp2/400/600',
      available: true,
      categoryId: 10
    },
    {
      title: 'Inteligencia Emocional',
      author: userNames[2],
      userId: userIds[2],
      isbn: '9780234567893',
      description: 'Desarrolla tu inteligencia emocional y mejora tus relaciones.',
      publishedYear: 2021,
      publisher: 'Motivación Press',
      pages: 300,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/selfhelp3/400/600',
      available: true,
      categoryId: 10
    },
    {
      title: 'Mindfulness Diario',
      author: userNames[3],
      userId: userIds[3],
      isbn: '9780234567894',
      description: 'Practica la atención plena en tu vida cotidiana.',
      publishedYear: 2020,
      publisher: 'Editorial Mejora',
      pages: 260,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/selfhelp4/400/600',
      available: true,
      categoryId: 10
    },
    {
      title: 'Despierta Tu Potencial',
      author: userNames[4],
      userId: userIds[4],
      isbn: '9780234567895',
      description: 'Descubre y desarrolla tu máximo potencial.',
      publishedYear: 2022,
      publisher: 'Motivación Press',
      pages: 310,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/selfhelp5/400/600',
      available: true,
      categoryId: 10
    },
    {
      title: 'Libertad Financiera',
      author: userNames[5],
      userId: userIds[5],
      isbn: '9780234567896',
      description: 'El camino hacia la independencia económica.',
      publishedYear: 2019,
      publisher: 'Editorial Mejora',
      pages: 340,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/selfhelp6/400/600',
      available: true,
      categoryId: 10
    },
    {
      title: 'Supera Tus Miedos',
      author: userNames[6],
      userId: userIds[6],
      isbn: '9780234567897',
      description: 'Enfrenta y vence tus miedos para vivir plenamente.',
      publishedYear: 2021,
      publisher: 'Motivación Press',
      pages: 290,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/selfhelp7/400/600',
      available: true,
      categoryId: 10
    },
    {
      title: 'Productividad Máxima',
      author: userNames[7],
      userId: userIds[7],
      isbn: '9780234567898',
      description: 'Optimiza tu tiempo y alcanza tus metas.',
      publishedYear: 2020,
      publisher: 'Editorial Mejora',
      pages: 270,
      language: 'Spanish',
      coverImage: 'https://picsum.photos/seed/selfhelp8/400/600',
      available: true,
      categoryId: 10
    },
  ];
};

const seedDatabase = async () => {
  try {
    console.log('Starting database seed...');

    // Verificar si ya existen los usuarios del seed (verificar por un email específico)
    const seedUserExists = await User.findOne({ 
      where: { email: 'maria.garcia@example.com' } 
    });
    
    if (seedUserExists) {
      console.log('Seed users already exist. Skipping...');
      return;
    }

    // Crear usuarios
    console.log('Creating seed users...');
    const createdUsers = [];
    for (const userData of initialUsers) {
      // Verificar si el usuario ya existe antes de crearlo
      const existingUser = await User.findOne({ where: { email: userData.email } });
      if (!existingUser) {
        const user = await User.create(userData);
        createdUsers.push(user);
      } else {
        createdUsers.push(existingUser);
      }
    }
    console.log(`✓ Created ${createdUsers.length} seed users`);

    // Verificar que las categorías existan
    const categoryCount = await Category.count();
    if (categoryCount === 0) {
      console.log('No categories found. Please run category seed first.');
      return;
    }

    // Crear libros
    console.log('Creating books...');
    const booksData = getInitialBooks(createdUsers);
    let bookCount = 0;
    
    for (const bookData of booksData) {
      await Book.create(bookData);
      bookCount++;
    }
    
    console.log(`Created ${bookCount} books`);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

module.exports = seedDatabase;
