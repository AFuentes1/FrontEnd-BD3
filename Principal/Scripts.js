document.addEventListener('DOMContentLoaded', function() {
    
    buscarButton.addEventListener('click', function() {
        consultarFactura()
    });
    
   
});

//Acción de boton regresar
document.addEventListener('DOMContentLoaded', function() {
    regresarButton.addEventListener('click', function() {
        const wrapperFiltro2 = document.getElementById('wrapperFiltro2');
        const wrapperFiltro = document.getElementById('wrapperFiltro');

        const botonx = document.getElementById('EstadoCuentaX');
        const botony = document.getElementById('EstadoCuentaY');

        wrapperFiltro2.style.display = 'none';
        wrapperFiltro.style.display = 'block';

        botonx.style.display = 'block';
        botony.style.display = 'block';

        
        consultarFactura()
        
    });
});


function consultarFactura() {
    // Asignar evento de clic al botón de consulta
    
    // Obtener el valor del campo de texto y del filtro seleccionado
    var consultaInput = document.getElementById('consultaInput');
    var buscarButton = document.getElementById('buscarButton');
    var consulta = consultaInput.value;
    //console.log(consulta);

    // Verificar que valores no estén vacíos antes de realizar la consulta
    if (consulta) {
        if (consulta.length > 0) {
            var formData = {
                Numero: consulta
            };
            console.log(formData);
            // Enviar solicitud al API
            fetch(`http://localhost:7081/Facturas?numero=${formData.Numero}`, {
                
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json' // Incluye la userKey en el encabezado de autorización si es necesario
                },
            })
            .then(response => {
                

                if (response.ok) {
                    return response.json(); // Devuelve los datos JSON de la respuesta
                } else {
                    throw new Error('La respuesta del servidor no es válida');
                }
            })
            .then(data => {
                // Llamar a la función para mostrar la tabla con los datos recibidos de la API
                
                try {
                    if (data.status == 0) {
                        mostrarTabla(data);
                        
                    } else {
                        alert("No se encontraron Facturas");
                    }
                } catch (error) {
                    alert("No se encontraron Facturas");
                }
                
            })
            .catch(error => {
                // Para manejar los errores
                console.error('Error:', error);
            });

        } else {
            alert('Por favor ingrese un número de consulta');
        }
        
    }
    
}

function consultarFacturaDetalle(id) {
    console.log(id);
    if (id > 0) {
        var formData = {
            id: id
        };
        
        const wrapperFiltro2 = document.getElementById('wrapperFiltro2');
        const wrapperFiltro = document.getElementById('wrapperFiltro');

        const botonx = document.getElementById('EstadoCuentaX');
        const botony = document.getElementById('EstadoCuentaY');
        
        // Enviar solicitud al API
        fetch(`http://localhost:7081/Facturas/Detalle?id=${formData.id}`, {
            
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' // Incluye la userKey en el encabezado de autorización si es necesario
            },
        })
        
        .then(response => {
            
            if (response.ok) {
                return response.json(); // Devuelve los datos JSON de la respuesta
            } else {
                throw new Error('La respuesta del servidor no es válida');
            }
        }) 
        
        .then(data => {
            // Llamar a la función para mostrar la tabla con los datos recibidos de la API
            if (data.status == 0) {
                console.log("elementos", data.Factura.Elementos);
                console.log("llamadas", data.Factura.Llamadas);
                console.log("gigas", data.Factura.Gigas);

                botonx.style.display = 'none';
                botony.style.display = 'none';

                wrapperFiltro2.style.display = 'block';
                wrapperFiltro.style.display = 'none';
                mostrarTablaElementos(data.Factura.Elementos)
                mostrarTablaLlamadas(data.Factura.Llamadas)
                mostrarTablaGigas(data.Factura.Gigas)
                
            } else {
                alert("No se encontraron Facturas");
            }
        })
        .catch(error => {
            // Para manejar los errores
            //console.error('Error:', error);
        });
    } else {
        alert('Error en la consulta');
    }
}

function mostrarTabla(data) {
    // Obtener el contenedor donde se mostrará la tabla
    console.log(data)
    const dataContainer = document.getElementById('dataContainer');
    
    // Crear la tabla
    const table = document.createElement('table');
    table.classList.add('tabla');

    // Crear el encabezado de la tabla excluyendo la primera y la cuarta columna
    const headerRow = document.createElement('tr');
    const keys = Object.keys(data.Lista[0]);
    for (let i = 0; i < keys.length; i++) {
        if (i !== 0 && i !== 3) { // Excluir la primera columna (i=0) y la cuarta columna (i=3)
            const th = document.createElement('th');
            th.textContent = keys[i];
            headerRow.appendChild(th);
        }
    }
    // Agregar un encabezado para la columna de botones
    const thButton = document.createElement('th');
    thButton.textContent = 'Acciones';
    headerRow.appendChild(thButton);

    table.appendChild(headerRow);

    // Crear las filas de la tabla con los datos excluyendo la primera y la cuarta columna
    data.Lista.forEach(item => {
        const row = document.createElement('tr');
        const values = Object.values(item);
        for (let i = 0; i < values.length; i++) {
            if (i !== 0 && i !== 3) { // Excluir la primera columna (i=0) y la cuarta columna (i=3)
                const cell = document.createElement('td');
                cell.textContent = values[i];
                row.appendChild(cell);
            }
        }
        // Crear y agregar el botón "Consultar" al final de la fila
        const cellButton = document.createElement('td');
        const button = document.createElement('button');
        button.textContent = 'Consultar';



        // Puedes agregar un event listener al botón aquí si es necesario
        button.addEventListener('click', () => {
            // Acción al hacer clic en el botón
            consultarFacturaDetalle(item.id)
        });
        
        cellButton.appendChild(button);
        row.appendChild(cellButton);

        table.appendChild(row);
    });

    // Limpiar el contenido previo del contenedor
    dataContainer.innerHTML = '';

    // Agregar la tabla al contenedor
    dataContainer.appendChild(table);
}


//Mostrar tabla de consulta de factura
function mostrarTablaElementos(elementos) {
    // Obtener el contenedor donde se mostrará la tabla de elementos
    const elementosContainer = document.getElementById('dataContainer4');

    // Crear la tabla
    const table = document.createElement('table');
    table.classList.add('tabla');

    // Crear el encabezado de la tabla
    const headerRow = document.createElement('tr');

    // Crear las columnas del encabezado
    const headers = ['Nombre', 'Valor', 'Monto']; // Columnas que quieres mostrar
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    // Agregar el encabezado a la tabla
    table.appendChild(headerRow);

    // Crear las filas de la tabla con los datos de elementos
    elementos.forEach(elemento => {
        const row = document.createElement('tr');

        // Agregar las celdas con los datos de cada elemento
        const columns = ['Nombre', 'Valor', 'Monto']; // Columnas que coinciden con el encabezado
        columns.forEach(columnName => {
            const cell = document.createElement('td');
            cell.textContent = elemento[columnName]; // Obtener el valor del objeto según el nombre de la columna
            row.appendChild(cell);
        });

        // Agregar la fila a la tabla
        table.appendChild(row);
    });
 
 
    // Limpiar el contenido previo del contenedor de elementos
    elementosContainer.innerHTML = '';

    // Agregar la tabla al contenedor de elementos
    elementosContainer.appendChild(table);
}

// scripts.js
function mostrarTablaLlamadas(llamadas) {
    // Obtener el contenedor donde se mostrará la tabla de elementos
    const elementosContainer = document.getElementById('dataContainer2');

    // Crear la tabla
    const table = document.createElement('table');
    table.classList.add('tabla');

    // Crear el encabezado de la tabla
    const headerRow = document.createElement('tr');

    // Crear las columnas del encabezado
    const headers = ['Saliente', 'Entrante', 'Fin', 'Inicio', 'Minutos', 'Saliente']; // Columnas que quieres mostrar
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    // Agregar el encabezado a la tabla
    table.appendChild(headerRow);

    // Crear las filas de la tabla con los datos de elementos
    llamadas.forEach(elemento => {
        const row = document.createElement('tr');

        // Agregar las celdas con los datos de cada elemento
        const columns = ['Saliente', 'Entrante', 'Fin', 'Inicio', 'Minutos', 'Saliente']; 
        columns.forEach(columnName => {
            const cell = document.createElement('td');
            cell.textContent = elemento[columnName]; 
            row.appendChild(cell);
        });

        // Agregar la fila a la tabla
        table.appendChild(row);
    });

    // Limpiar el contenido previo del contenedor de elementos
    elementosContainer.innerHTML = '';

    // Agregar la tabla al contenedor de elementos
    elementosContainer.appendChild(table);
}

function mostrarTablaGigas(Gigas) {
    // Obtener el contenedor donde se mostrará la tabla de elementos
    const elementosContainer = document.getElementById('dataContainer3');

    // Crear la tabla
    const table = document.createElement('table');
    table.classList.add('tabla');

    // Crear el encabezado de la tabla
    const headerRow = document.createElement('tr');

    // Crear las columnas del encabezado
    const headers = ['Fecha', 'Cantidad']; // Columnas que quieres mostrar
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        th.classList.add('header-cell'); // Añadir clase CSS a las celdas del encabezado
        headerRow.appendChild(th);
    });

    // Agregar el encabezado a la tabla
    table.appendChild(headerRow);

    // Crear las filas de la tabla con los datos de elementos
    Gigas.forEach(elemento => {
        const row = document.createElement('tr');

        // Agregar las celdas con los datos de cada elemento
        const columns = ['Fecha', 'Cantidad']; // Columnas que coinciden con el encabezado
        columns.forEach(columnName => {
            const cell = document.createElement('td');
            let cellText = elemento[columnName];
            // Si la columna es 'Fecha', eliminar 'T00:00:00'
            if (columnName === 'Fecha') {
                cellText = cellText.split('T')[0];
            }
            cell.textContent = cellText; // Obtener el valor del objeto según el nombre de la columna
            cell.classList.add('data-cell'); // Añadir clase CSS a las celdas de datos
            row.appendChild(cell);
        });

        // Agregar la fila a la tabla
        table.appendChild(row);
    });

    // Limpiar el contenido previo del contenedor de elementos
    elementosContainer.innerHTML = '';

    // Agregar la tabla al contenedor de elementos
    elementosContainer.appendChild(table);
}



document.getElementById('EstadoCuentaX').addEventListener('click', function() {
    window.location.href = '../EstadoCuentaX/CuentaX.html';
    console.log("click")
});