// Reading Plan Data extracted from PDF
export interface Book {
  id: string;
  week: number;
  title: string;
  author: string;
  pages: number;
  reason: string;
  startDate: string;
  endDate: string;
  block: number;
  blockName: string;
  completed: boolean;
  notes: string;
  rating?: number;
}

export const readingBlocks = [
  { id: 1, name: "Reinicio del Hábito", weeks: "1-8", description: "Lecturas cortas y accesibles para retomar el hábito" },
  { id: 2, name: "Cultura General Sólida", weeks: "9-16", description: "Marco histórico, científico y social" },
  { id: 3, name: "Filosofía y Criterio", weeks: "17-26", description: "Pensamiento crítico y ético" },
  { id: 4, name: "Poder, Historia y Sociedad", weeks: "27-38", description: "Análisis político y social" },
  { id: 5, name: "Consolidación Intelectual", weeks: "39-52", description: "Obras complejas y cierre del año" },
];

export const books: Book[] = [
  // BLOQUE I - Reinicio del Hábito (Semanas 1-8)
  { id: "1", week: 1, title: "El extranjero", author: "Albert Camus", pages: 128, reason: "Entrena pensamiento crítico y confronta el absurdo sin retórica moral.", startDate: "2025-12-29", endDate: "2026-01-04", block: 1, blockName: "Reinicio del Hábito", completed: false, notes: "" },
  { id: "2", week: 2, title: "La muerte de Iván Ilich", author: "León Tolstói", pages: 96, reason: "Reflexión sobre vida auténtica, miedo y autoengaño.", startDate: "2026-01-05", endDate: "2026-01-11", block: 1, blockName: "Reinicio del Hábito", completed: false, notes: "" },
  { id: "3", week: 3, title: "Fahrenheit 451", author: "Ray Bradbury", pages: 158, reason: "Defensa de la lectura, pensamiento independiente y memoria cultural.", startDate: "2026-01-12", endDate: "2026-01-18", block: 1, blockName: "Reinicio del Hábito", completed: false, notes: "" },
  { id: "4", week: 4, title: "Ensayo sobre la ceguera", author: "José Saramago", pages: 192, reason: "Anatomía moral de la sociedad cuando colapsan las normas.", startDate: "2026-01-19", endDate: "2026-01-25", block: 1, blockName: "Reinicio del Hábito", completed: false, notes: "" },
  { id: "5", week: 5, title: "Rebelión en la granja", author: "George Orwell", pages: 112, reason: "Introducción clara a la lógica del poder y la corrupción ideológica.", startDate: "2026-01-26", endDate: "2026-02-01", block: 1, blockName: "Reinicio del Hábito", completed: false, notes: "" },
  { id: "6", week: 6, title: "Crónica de una muerte anunciada", author: "Gabriel García Márquez", pages: 120, reason: "Estructuras sociales, destino y responsabilidad colectiva.", startDate: "2026-02-02", endDate: "2026-02-08", block: 1, blockName: "Reinicio del Hábito", completed: false, notes: "" },
  { id: "7", week: 7, title: "El viejo y el mar", author: "Ernest Hemingway", pages: 128, reason: "Disciplina, dignidad y resistencia sin sentimentalismo.", startDate: "2026-02-09", endDate: "2026-02-15", block: 1, blockName: "Reinicio del Hábito", completed: false, notes: "" },
  { id: "8", week: 8, title: "Carta al padre", author: "Franz Kafka", pages: 96, reason: "Psicología del poder, culpa y autoridad interiorizada.", startDate: "2026-02-16", endDate: "2026-02-22", block: 1, blockName: "Reinicio del Hábito", completed: false, notes: "" },
  
  // BLOQUE II - Cultura General Sólida (Semanas 9-16)
  { id: "9", week: 9, title: "Sapiens (versión resumida)", author: "Yuval Noah Harari", pages: 224, reason: "Marco general para entender historia, cultura y sistemas humanos.", startDate: "2026-02-23", endDate: "2026-03-01", block: 2, blockName: "Cultura General Sólida", completed: false, notes: "" },
  { id: "10", week: 10, title: "Breve historia de casi todo", author: "Bill Bryson", pages: 208, reason: "Ciencia explicada con rigor y claridad.", startDate: "2026-03-02", endDate: "2026-03-08", block: 2, blockName: "Cultura General Sólida", completed: false, notes: "" },
  { id: "11", week: 11, title: "El mundo y sus demonios", author: "Carl Sagan", pages: 192, reason: "Defensa del pensamiento racional frente a superstición.", startDate: "2026-03-09", endDate: "2026-03-15", block: 2, blockName: "Cultura General Sólida", completed: false, notes: "" },
  { id: "12", week: 12, title: "Historia mínima de México", author: "Daniel Cosío Villegas", pages: 224, reason: "Contexto histórico serio, sin propaganda ni mitificación.", startDate: "2026-03-16", endDate: "2026-03-22", block: 2, blockName: "Cultura General Sólida", completed: false, notes: "" },
  { id: "13", week: 13, title: "Armas, gérmenes y acero", author: "Jared Diamond", pages: 240, reason: "Explica desigualdades históricas desde factores estructurales.", startDate: "2026-03-23", endDate: "2026-03-29", block: 2, blockName: "Cultura General Sólida", completed: false, notes: "" },
  { id: "14", week: 14, title: "Una breve historia del tiempo", author: "Stephen Hawking", pages: 198, reason: "Amplía la cosmovisión científica y comprensión del universo.", startDate: "2026-03-30", endDate: "2026-04-05", block: 2, blockName: "Cultura General Sólida", completed: false, notes: "" },
  { id: "15", week: 15, title: "El miedo a la libertad", author: "Erich Fromm", pages: 224, reason: "Psicología social del autoritarismo y evasión de responsabilidad.", startDate: "2026-04-06", endDate: "2026-04-12", block: 2, blockName: "Cultura General Sólida", completed: false, notes: "" },
  { id: "16", week: 16, title: "Meditaciones", author: "Marco Aurelio", pages: 176, reason: "Estoicismo práctico, disciplina mental y autocontrol real.", startDate: "2026-04-13", endDate: "2026-04-19", block: 2, blockName: "Cultura General Sólida", completed: false, notes: "" },
  
  // BLOQUE III - Filosofía y Criterio (Semanas 17-26)
  { id: "17", week: 17, title: "Apología de Sócrates", author: "Platón", pages: 96, reason: "Defensa radical del pensamiento crítico y la verdad personal.", startDate: "2026-04-20", endDate: "2026-04-26", block: 3, blockName: "Filosofía y Criterio", completed: false, notes: "" },
  { id: "18", week: 18, title: "Ética a Nicómaco (selección)", author: "Aristóteles", pages: 192, reason: "Base racional de la ética occidental.", startDate: "2026-04-27", endDate: "2026-05-03", block: 3, blockName: "Filosofía y Criterio", completed: false, notes: "" },
  { id: "19", week: 19, title: "Sobre la brevedad de la vida", author: "Séneca", pages: 96, reason: "Gestión del tiempo, muerte y sentido sin misticismo.", startDate: "2026-05-04", endDate: "2026-05-10", block: 3, blockName: "Filosofía y Criterio", completed: false, notes: "" },
  { id: "20", week: 20, title: "Así habló Zaratustra", author: "Friedrich Nietzsche", pages: 224, reason: "Ruptura de valores heredados y formación de criterio propio.", startDate: "2026-05-11", endDate: "2026-05-17", block: 3, blockName: "Filosofía y Criterio", completed: false, notes: "" },
  { id: "21", week: 21, title: "Más allá del bien y del mal", author: "Friedrich Nietzsche", pages: 208, reason: "Pensamiento crítico contra la moral dogmática.", startDate: "2026-05-18", endDate: "2026-05-24", block: 3, blockName: "Filosofía y Criterio", completed: false, notes: "" },
  { id: "22", week: 22, title: "El mito de Sísifo", author: "Albert Camus", pages: 160, reason: "El absurdo tratado con lucidez y coherencia.", startDate: "2026-05-25", endDate: "2026-05-31", block: 3, blockName: "Filosofía y Criterio", completed: false, notes: "" },
  { id: "23", week: 23, title: "Tratado sobre la tolerancia", author: "Voltaire", pages: 128, reason: "Racionalismo, libertad y crítica al fanatismo.", startDate: "2026-06-01", endDate: "2026-06-07", block: 3, blockName: "Filosofía y Criterio", completed: false, notes: "" },
  { id: "24", week: 24, title: "El contrato social", author: "Jean-Jacques Rousseau", pages: 192, reason: "Fundamentos del poder político moderno.", startDate: "2026-06-08", endDate: "2026-06-14", block: 3, blockName: "Filosofía y Criterio", completed: false, notes: "" },
  { id: "25", week: 25, title: "Leviatán (selección)", author: "Thomas Hobbes", pages: 192, reason: "Naturaleza humana, orden y autoridad.", startDate: "2026-06-15", endDate: "2026-06-21", block: 3, blockName: "Filosofía y Criterio", completed: false, notes: "" },
  { id: "26", week: 26, title: "La república (libros I–IV)", author: "Platón", pages: 224, reason: "Justicia, educación y estructura del Estado.", startDate: "2026-06-22", endDate: "2026-06-28", block: 3, blockName: "Filosofía y Criterio", completed: false, notes: "" },
  
  // BLOQUE IV - Poder, Historia y Sociedad (Semanas 27-38)
  { id: "27", week: 27, title: "El príncipe", author: "Nicolás Maquiavelo", pages: 160, reason: "Poder real, no idealizado.", startDate: "2026-06-29", endDate: "2026-07-05", block: 4, blockName: "Poder, Historia y Sociedad", completed: false, notes: "" },
  { id: "28", week: 28, title: "1984", author: "George Orwell", pages: 328, reason: "Control social, lenguaje y vigilancia.", startDate: "2026-07-06", endDate: "2026-07-12", block: 4, blockName: "Poder, Historia y Sociedad", completed: false, notes: "" },
  { id: "29", week: 29, title: "Los orígenes del totalitarismo (selección)", author: "Hannah Arendt", pages: 240, reason: "Cómo nacen los regímenes totalitarios.", startDate: "2026-07-13", endDate: "2026-07-19", block: 4, blockName: "Poder, Historia y Sociedad", completed: false, notes: "" },
  { id: "30", week: 30, title: "Historia del siglo XX (fragmentos)", author: "Eric Hobsbawm", pages: 240, reason: "Comprensión global del mundo moderno.", startDate: "2026-07-20", endDate: "2026-07-26", block: 4, blockName: "Poder, Historia y Sociedad", completed: false, notes: "" },
  { id: "31", week: 31, title: "La guerra del Peloponeso (selección)", author: "Tucídides", pages: 224, reason: "Política, guerra y naturaleza humana.", startDate: "2026-07-27", endDate: "2026-08-02", block: 4, blockName: "Poder, Historia y Sociedad", completed: false, notes: "" },
  { id: "32", week: 32, title: "El poder", author: "Bertrand Russell", pages: 224, reason: "Análisis moderno del poder político y social.", startDate: "2026-08-03", endDate: "2026-08-09", block: 4, blockName: "Poder, Historia y Sociedad", completed: false, notes: "" },
  { id: "33", week: 33, title: "Propaganda", author: "Edward Bernays", pages: 192, reason: "Manipulación de masas y opinión pública.", startDate: "2026-08-10", endDate: "2026-08-16", block: 4, blockName: "Poder, Historia y Sociedad", completed: false, notes: "" },
  { id: "34", week: 34, title: "Psicología de las masas", author: "Gustave Le Bon", pages: 176, reason: "Comportamiento colectivo y liderazgo.", startDate: "2026-08-17", endDate: "2026-08-23", block: 4, blockName: "Poder, Historia y Sociedad", completed: false, notes: "" },
  { id: "35", week: 35, title: "El choque de civilizaciones (selección)", author: "Samuel Huntington", pages: 224, reason: "Geopolítica y conflicto cultural.", startDate: "2026-08-24", endDate: "2026-08-30", block: 4, blockName: "Poder, Historia y Sociedad", completed: false, notes: "" },
  { id: "36", week: 36, title: "Por qué fracasan los países", author: "Acemoglu & Robinson", pages: 240, reason: "Instituciones, poder y desarrollo.", startDate: "2026-08-31", endDate: "2026-09-06", block: 4, blockName: "Poder, Historia y Sociedad", completed: false, notes: "" },
  { id: "37", week: 37, title: "La sociedad del cansancio", author: "Byung-Chul Han", pages: 128, reason: "Diagnóstico lúcido del mundo contemporáneo.", startDate: "2026-09-07", endDate: "2026-09-13", block: 4, blockName: "Poder, Historia y Sociedad", completed: false, notes: "" },
  { id: "38", week: 38, title: "La agonía del Eros", author: "Byung-Chul Han", pages: 112, reason: "Crítica a la cultura del rendimiento y consumo.", startDate: "2026-09-14", endDate: "2026-09-20", block: 4, blockName: "Poder, Historia y Sociedad", completed: false, notes: "" },
  
  // BLOQUE V - Consolidación Intelectual (Semanas 39-52)
  { id: "39", week: 39, title: "Crimen y castigo", author: "Fiódor Dostoievski", pages: 430, reason: "Moral, culpa y psicología profunda.", startDate: "2026-09-21", endDate: "2026-09-27", block: 5, blockName: "Consolidación Intelectual", completed: false, notes: "" },
  { id: "40", week: 40, title: "El hombre en busca de sentido", author: "Viktor Frankl", pages: 160, reason: "Sentido existencial sin autoayuda barata.", startDate: "2026-09-28", endDate: "2026-10-04", block: 5, blockName: "Consolidación Intelectual", completed: false, notes: "" },
  { id: "41", week: 41, title: "Los hermanos Karamázov (selección)", author: "Fiódor Dostoievski", pages: 320, reason: "Fe, razón, ética y responsabilidad.", startDate: "2026-10-05", endDate: "2026-10-11", block: 5, blockName: "Consolidación Intelectual", completed: false, notes: "" },
  { id: "42", week: 42, title: "Don Quijote de la Mancha (selección)", author: "Miguel de Cervantes", pages: 300, reason: "Fundamento de la literatura moderna.", startDate: "2026-10-12", endDate: "2026-10-18", block: 5, blockName: "Consolidación Intelectual", completed: false, notes: "" },
  { id: "43", week: 43, title: "Ulises (fragmentos guiados)", author: "James Joyce", pages: 240, reason: "Experimentación literaria y lenguaje.", startDate: "2026-10-19", endDate: "2026-10-25", block: 5, blockName: "Consolidación Intelectual", completed: false, notes: "" },
  { id: "44", week: 44, title: "El lobo estepario", author: "Hermann Hesse", pages: 240, reason: "Identidad, conflicto interno y cultura.", startDate: "2026-10-26", endDate: "2026-11-01", block: 5, blockName: "Consolidación Intelectual", completed: false, notes: "" },
  { id: "45", week: 45, title: "El proceso", author: "Franz Kafka", pages: 240, reason: "Burocracia, culpa y absurdo moderno.", startDate: "2026-11-02", endDate: "2026-11-08", block: 5, blockName: "Consolidación Intelectual", completed: false, notes: "" },
  { id: "46", week: 46, title: "La náusea", author: "Jean-Paul Sartre", pages: 240, reason: "Existencialismo sin concesiones.", startDate: "2026-11-09", endDate: "2026-11-15", block: 5, blockName: "Consolidación Intelectual", completed: false, notes: "" },
  { id: "47", week: 47, title: "El arte de la guerra", author: "Sun Tzu", pages: 128, reason: "Estrategia, conflicto y toma de decisiones.", startDate: "2026-11-16", endDate: "2026-11-22", block: 5, blockName: "Consolidación Intelectual", completed: false, notes: "" },
  { id: "48", week: 48, title: "La odisea", author: "Homero", pages: 300, reason: "Arquetipos fundacionales de Occidente.", startDate: "2026-11-23", endDate: "2026-11-29", block: 5, blockName: "Consolidación Intelectual", completed: false, notes: "" },
  { id: "49", week: 49, title: "Fausto", author: "Goethe", pages: 240, reason: "Ambición, conocimiento y límites humanos.", startDate: "2026-11-30", endDate: "2026-12-06", block: 5, blockName: "Consolidación Intelectual", completed: false, notes: "" },
  { id: "50", week: 50, title: "El anticristo", author: "Friedrich Nietzsche", pages: 128, reason: "Crítica radical a la moral occidental.", startDate: "2026-12-07", endDate: "2026-12-13", block: 5, blockName: "Consolidación Intelectual", completed: false, notes: "" },
  { id: "51", week: 51, title: "Cartas a un joven poeta", author: "Rainer Maria Rilke", pages: 96, reason: "Pensamiento introspectivo sin misticismo barato.", startDate: "2026-12-14", endDate: "2026-12-20", block: 5, blockName: "Consolidación Intelectual", completed: false, notes: "" },
  { id: "52", week: 52, title: "Ensayos (selección)", author: "Michel de Montaigne", pages: 224, reason: "Cierre del año con pensamiento autónomo y maduro.", startDate: "2026-12-21", endDate: "2026-12-27", block: 5, blockName: "Consolidación Intelectual", completed: false, notes: "" },
];
