-- Insert the 10 predefined categories with specific IDs
INSERT INTO categories (id, name, description, createdAt, updatedAt) VALUES
(1, 'Terror', 'Historias de terror, horror y suspenso que te mantendrán al borde del asiento', NOW(), NOW()),
(2, 'Acción', 'Aventuras trepidantes llenas de acción y adrenalina', NOW(), NOW()),
(3, 'Romance', 'Historias de amor y relaciones que te llegarán al corazón', NOW(), NOW()),
(4, 'Ciencia Ficción', 'Explora futuros imaginarios, tecnología avanzada y mundos alternativos', NOW(), NOW()),
(5, 'Fantasía', 'Mundos mágicos, criaturas fantásticas y aventuras épicas', NOW(), NOW()),
(6, 'Misterio', 'Intriga, crímenes y enigmas por resolver', NOW(), NOW()),
(7, 'Historia', 'Relatos basados en hechos históricos y épocas pasadas', NOW(), NOW()),
(8, 'Biografía', 'Vidas reales de personas extraordinarias', NOW(), NOW()),
(9, 'Tecnología', 'Libros sobre tecnología, programación y el mundo digital', NOW(), NOW()),
(10, 'Autoayuda', 'Desarrollo personal, motivación y crecimiento personal', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  name = VALUES(name),
  description = VALUES(description),
  updatedAt = NOW();
