let discos = [];

function codigoExistente(codigo) {
    return discos.some((disco) => disco.codigo === codigo);
}

let contadorDiscos = 0;

function Cargar() {
    const nombreDisco = document.getElementById("nombreDisco").value;
    const bandaAutor = document.getElementById("bandaAutor").value;
    const codigoDisco = parseInt(document.getElementById("codigoDisco").value);
    
    const pistas = [];

    if (nombreDisco === "" || bandaAutor === "" || isNaN(codigoDisco) || codigoDisco < 1 || codigoDisco > 999) {
        mostrarError("Por favor, ingrese datos válidos.");
        return;
    }

    if (codigoExistente(codigoDisco)) {
        mostrarError("El código numérico ya ha sido utilizado. Ingrese otro código.");
        return;
    }

    while (true) {
        const nombrePista = prompt("Ingrese nombre de la pista (deje en blanco para finalizar):");
        if (nombrePista === "") {
            break;
        }

        const duracionPista = parseInt(prompt("Ingrese duración de la pista (en segundos):"));
        if (isNaN(duracionPista) || duracionPista < 0 || duracionPista > 7200) {
            mostrarError("La duración de la pista debe estar entre 0 y 7200 segundos.");
            continue;
        }

    pistas.push({ nombre: nombrePista, duracion: duracionPista });
    }

    discos.push({
        nombre: nombreDisco,
        autor: bandaAutor,
        codigo: codigoDisco,
        pistas: pistas,
    });

    contadorDiscos++;
    actualizarContador();
    alert("Disco cargado con éxito.");
}

function Mostrar() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    discos.forEach((disco) => {
        resultado.innerHTML += `<li class="list-group-item">
            <p><strong>Nombre del Disco:</strong> ${disco.nombre}</p>
            <p><strong>Autor o Banda:</strong> ${disco.autor}</p>
            <p><strong>Código Único:</strong> ${disco.codigo}</p>
    
            <ul class="list-group">
                ${generarListaPistas(disco.pistas)}
            </ul>
            <p><strong>Duración Total del Disco:</strong> ${calcularDuracionTotal(disco)} segundos</p>
        </li>`;
    });
}

function generarListaPistas(pistas) {
    let listaHTML = "";
    pistas.forEach((pista) => {
        listaHTML += `
            <li class="list-group-item ${pista.duracion > 180 ? 'text-danger' : ''}">
                <strong>Nombre de la Pista:</strong> ${pista.nombre}
                <br>
                <strong>Duración:</strong> ${pista.duracion} segundos
            </li>`;
    });
    return listaHTML;
}

document.querySelector("button.btn-primary").addEventListener("click", Cargar);
document.querySelector("button.btn-secondary").addEventListener("click", Mostrar);

function calcularDuracionTotal(disco) {
    let duracionTotal = 0;
    disco.pistas.forEach((pista) => {
        duracionTotal += pista.duracion;
    });
    return duracionTotal;
}

function mostrarError(mensaje) {
    alert(`Error: ${mensaje}`);
}

function actualizarContador() {
    const contadorElement = document.getElementById("contadorDiscos");
    contadorElement.innerText = `Total de discos cargados: ${contadorDiscos}`;
}