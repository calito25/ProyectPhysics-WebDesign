// ------------------------------
// Declaramos un array llamado "estudiantes".
// Cada elemento del array es un objeto que representa a un estudiante.
// Cada objeto tiene dos propiedades: "nombre" (string) y "nota" (número).
let estudiantes = [
    { nombre: "Ana", nota: 4.5 },   // Primer estudiante
    { nombre: "Luis", nota: 3.8 },  // Segundo estudiante
    { nombre: "María", nota: 5.0 }  // Tercer estudiante
];

// ------------------------------
// Definimos una función llamada "mostrarAprobados".
// Esta función recibe un parámetro llamado "lista" (será un array de estudiantes).
function mostrarAprobados(lista) {

    // Usamos el método .filter() para crear un nuevo array llamado "aprobados".
    // Este array contendrá solo los estudiantes cuya nota sea mayor o igual a 4.0.
    // "est" es el parámetro que representa cada estudiante mientras se filtra.
    let aprobados = lista.filter(est => est.nota >= 4.0);

    // Recorremos el array "aprobados" usando el método .forEach().
    // Para cada estudiante "est", mostramos en consola su nombre y su nota.
    aprobados.forEach(est => {
        console.log(est.nombre + " ha aprobado con " + est.nota);
    });
}

// ------------------------------
// Llamamos a la función "mostrarAprobados" pasando el array "estudiantes" como argumento.
// Esto mostrará solo los estudiantes que tengan nota >= 4.0.
mostrarAprobados(estudiantes);

// ------------------------------
// Salida esperada en la consola:
// Ana ha aprobado con 4.5
// María ha aprobado con 5