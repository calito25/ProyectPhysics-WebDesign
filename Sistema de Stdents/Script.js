window.estudiantes = [];

function calcularPromedio(notas) {
    let suma = 0;
    for (let i = 0; i < notas.length; i++) {
        suma += notas[i];
    }
    return suma / notas.length;
}

window.mostrarEstudiantesEnPagina = function () {
    const contenedor = document.getElementById('lista-estudiantes');
    let html = '';
    estudiantes.forEach((est, idx) => {
        let promedio = calcularPromedio(est.notas).toFixed(2);
        html += `<div class="estudiante-card">
            <strong>Nombre:</strong> ${est.nombre}<br>
            <strong>Edad:</strong> ${est.edad}<br>
            <strong>Promedio:</strong> ${promedio}<br>
            <button class='eliminar-btn' onclick='eliminarEstudiante(${idx})'>Eliminar</button>
        </div>`;
    });
    contenedor.innerHTML = html;
}

window.mostrarEstudiantes = function () {
    window.mostrarEstudiantesEnPagina();
}

window.ocultarEstudiantes = function () {
    const contenedor = document.getElementById('lista-estudiantes');
    contenedor.innerHTML = '';
}

function promedioGeneral(estudiantes) {
    let sumaPromedios = 0;
    for (let i = 0; i < estudiantes.length; i++) {
        let promedio = calcularPromedio(estudiantes[i].notas);
        sumaPromedios += promedio;
    }
    return sumaPromedios / estudiantes.length;
}

function estudianteMayorPromedio(estudiantes) {
    let mayorPromedio = -1;
    let estudianteMejor = null;
    for (let i = 0; i < estudiantes.length; i++) {
        let promedio = calcularPromedio(estudiantes[i].notas);
        if (promedio > mayorPromedio) {
            mayorPromedio = promedio;
            estudianteMejor = estudiantes[i];
        }
    }
    return estudianteMejor;
}

window.mostrarEstudianteMayorPromedio = function () {
    const estudiante = estudianteMayorPromedio(estudiantes);
    const contenedor = document.getElementById('lista-estudiantes');
    if (estudiante) {
        const promedio = calcularPromedio(estudiante.notas).toFixed(2);
        contenedor.innerHTML = `<div>Estudiante con mayor promedio:<br>Nombre: ${estudiante.nombre}, Edad: ${estudiante.edad}, Promedio: ${promedio}</div>`;
    } else {
        contenedor.innerHTML = '<div>No hay estudiantes.</div>';
    }
}

window.agregarEstudiante = function () {
    const nombre = document.getElementById('nombre').value.trim();
    const edad = parseInt(document.getElementById('edad').value);
    const notasStr = document.getElementById('notas').value.trim();
    if (!nombre || isNaN(edad) || !notasStr) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
    }
    const notas = notasStr.split(',').map(n => parseFloat(n));
    if (notas.some(isNaN)) {
        alert('Las notas deben ser números separados por coma.');
        return;
    }
    estudiantes.push({ nombre, edad, notas });
    document.getElementById('nombre').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('notas').value = '';
    window.mostrarEstudiantesEnPagina();
}

// ✅ Aquí está el problema resuelto
function eliminarEstudiante(idx) {
    if (confirm('¿Seguro que deseas eliminar este estudiante?')) {
        estudiantes.splice(idx, 1);
        window.mostrarEstudiantesEnPagina();
    }
}
window.eliminarEstudiante = eliminarEstudiante; // <--- Aquí se expone al scope global
