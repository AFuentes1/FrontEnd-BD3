document.addEventListener('DOMContentLoaded', function () {
    consultarFacturaX();
});


function consultarFacturaX() {
            
    // Enviar solicitud al API
    fetch(`http://localhost:7081/facturasEmpresas?x=0`, {
        
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
           mostrarTabla(data);
        } catch (error) {
            alert("No se encontraron Facturas");
        }
        
    })
    .catch(error => {
        // Para manejar los errores
        console.error('Error:', error);
    });

    } /*else {
        alert('Por favor ingrese un número de consulta');
    }*/
            

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
            consultarFacturaEmpresa(item.id)
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


function consultarFacturaEmpresa(id) {
        const wrapperFiltro = document.getElementById('wrapperFiltro');
        const wrapperFiltro2 = document.getElementById('wrapperFiltro2');
        // Enviar solicitud al API
        fetch(`http://localhost:7081/facturasEmpresas/Detalle?id=${id}`, {
            
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
            console.log(data.status);
        
            if (data.status == 0) {
                wrapperFiltro2.style.display = 'block';
                wrapperFiltro.style.display = 'none';
                mostrarTablaConsulta(data)
                
            } else {
                alert("No se encontraron Facturas1");
            }
        
            
            
        })
        .catch(error => {
            // Para manejar los errores
            console.error('Error:', error);
        });

}

//Acción de boton regresar
document.addEventListener('DOMContentLoaded', function() {
    regresarButton2.addEventListener('click', function() {
        const wrapperFiltro2 = document.getElementById('wrapperFiltro2');
        const wrapperFiltro = document.getElementById('wrapperFiltro');

        wrapperFiltro2.style.display = 'none';
        wrapperFiltro.style.display = 'block';

        consultarFacturaX()
        
    });
});

document.addEventListener('DOMContentLoaded', function() {
    regresarButton.addEventListener('click', function() {
        window.location.href = '../Principal/FrontEND.html';

    });
});

function mostrarTablaConsulta(data) {
    // Obtener el contenedor donde se mostrará la tabla
    const dataContainer = document.getElementById('dataContainer2');

    // Crear la tabla
    const table = document.createElement('table');
    table.classList.add('tabla');

    // Crear el encabezado de la tabla para el objeto Corte
    const headerRowCorte = document.createElement('tr');
    const keysCorte = Object.keys(data.Corte).filter(key => key !== 'id'); // Excluir el id
    keysCorte.forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRowCorte.appendChild(th);
    });
    table.appendChild(headerRowCorte);

    // Crear una fila de datos para el objeto Corte
    const rowCorte = document.createElement('tr');
    keysCorte.forEach(key => {
        const cell = document.createElement('td');
        cell.textContent = data.Corte[key];
        rowCorte.appendChild(cell);
    });
    table.appendChild(rowCorte);

    // Verificar si Llamadas existe y tiene elementos
    if (data.Llamadas && data.Llamadas.length > 0) {
        // Crear el encabezado de la tabla para el array Llamadas (solo se muestra el primer objeto para determinar las columnas)
        const headerRowLlamadas = document.createElement('tr');
        const keysLlamadas = Object.keys(data.Llamadas[0]).filter(key => key !== 'id'); // Excluir el id
        keysLlamadas.forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRowLlamadas.appendChild(th);
        });
        table.appendChild(headerRowLlamadas);

        // Crear las filas de datos para cada objeto en Llamadas
        data.Llamadas.forEach(item => {
            const row = document.createElement('tr');
            keysLlamadas.forEach(key => {
                const cell = document.createElement('td');
                cell.textContent = item[key];
                row.appendChild(cell);
            });
            table.appendChild(row);
        });
    }

    // Limpiar el contenido previo del contenedor
    dataContainer.innerHTML = '';

    // Agregar la tabla al contenedor
    dataContainer.appendChild(table);
}
    
    