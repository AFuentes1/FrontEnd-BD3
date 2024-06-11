document.addEventListener('DOMContentLoaded', function() {
    buscarButton.addEventListener('click', function() {
        consultarFactura()
    });
    
   
});


function consultarFactura() {
    // Asignar evento de clic al botón de consulta
    
    // Obtener el valor del campo de texto y del filtro seleccionado
    var consultaInput = document.getElementById('consultaInput');
    var buscarButton = document.getElementById('buscarButton');
    console.log(consultaInput.value);
    var consulta = consultaInput.value;
    //console.log(consulta);

    // Verificar que valores no estén vacíos antes de realizar la consulta
    if (consulta) {
        if (consulta.length > 0) {
            var formData = {
                Numero: consulta
            };
            
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
                        console.log(data);
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

function consultarFacutura(id) {
    console.log(id);
    if (id > 0) {
        var formData = {
            id: id
        };
    
        console.log(id)
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
            console.log("data",data.status);
            if (data.status == 0) {
                console.log(data);
                mostrarTablaConsultar(data);
                
            } else {
                alert("No se encontraron Facturas");
            }
        })
        .catch(error => {
            // Para manejar los errores
            console.error('Error:', error);
        });
    } else {
        alert('Error en la consulta');
    }
}

function mostrarTabla(data) {
    // Obtener el contenedor donde se mostrará la tabla
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
            consultarFacutura(item.id)
            
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


function mostrarTablaConsultar(data) {
    // Obtener el contenedor donde se mostrará la tabla
    const dataContainer = document.getElementById('dataContainer');
    
    // Crear la tabla
    const table = document.createElement('table');
    table.classList.add('tabla');

    // Crear el encabezado de la tabla excluyendo la primera y la cuarta columna
    const headerRow = document.createElement('tr');
    const keys = Object.keys(data);
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

    // Crear la fila de la tabla con los datos excluyendo la primera y la cuarta columna
    const row = document.createElement('tr');
    const values = Object.values(data);
    for (let i = 0; i < values.length; i++) {
        if (i !== 0 && i !== 3) { // Excluir la primera columna (i=0) y la cuarta columna (i=3)
            const cell = document.createElement('td');
            cell.textContent = values[i];
            row.appendChild(cell);
        }
    }
    
    // Crear la celda para los botones
    const cellButton = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = 'Regresar';
    button.addEventListener('click', () => {
        // Acción al hacer clic en el botón
        consultarFactura()
    });
    cellButton.appendChild(button);
    row.appendChild(cellButton);

    table.appendChild(row);

    // Limpiar el contenido previo del contenedor
    dataContainer.innerHTML = '';

    // Agregar la tabla al contenedor
    dataContainer.appendChild(table);
}
