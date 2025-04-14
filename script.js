// Arreglo que actúa como almacenamiento temporal del inventario de productos
let inventario = [];
let idSeleccionado = null; // ID del producto actualmente seleccionado en la tabla

// Agrega un nuevo producto al inventario, validando campos y conservando fechas si se ingresan
function agregarProducto() {
  const nombre = document.getElementById('nombre').value;
  const distribuidor = document.getElementById('distribuidor').value;
  const fechaRecibido = document.getElementById('fechaRecibido').value;
  const fechaVencimiento = document.getElementById('fechaVencimiento').value;
  const id = document.getElementById('id').value;
  const cantidad = document.getElementById('cantidad').value;

  // Verifica que los campos obligatorios (nombre, distribuidor, id, cantidad) estén completos antes de continuar
  if (!nombre || !distribuidor || !id || !cantidad) return;

  // Agrega el nuevo producto al inventario con todos los campos capturados
  inventario.push({
    nombre,
    distribuidor,
    fechaRecibido,
    fechaVencimiento,
    id,
    cantidad
  });

  renderInventario();
  limpiarCampos();
}

// Renderiza dinámicamente la tabla HTML con los productos actuales del inventario
function renderInventario() {
  const tabla = document.getElementById('tabla-inventario');
  tabla.innerHTML = '';
  inventario.forEach(prod => {
    const fila = document.createElement('tr');
    fila.classList.add('fila-producto');
    if (prod.id === idSeleccionado) fila.classList.add('seleccionado');

    fila.innerHTML = `
      <td colspan="4">
        <div class="contenido-producto">
          <span>${prod.nombre}</span>
          <span>${prod.distribuidor}</span>
          <span>${prod.id}</span>
          <span>${prod.cantidad}</span>
        </div>
        <div class="barra-fechas">
          <div>📥 Recibido: ${prod.fechaRecibido || 'N/A'}</div>
          <div>⏳ Vence: ${prod.fechaVencimiento || 'N/A'}</div>
        </div>
      </td>
    `;

    // Permite seleccionar un producto al hacer clic sobre su fila
    fila.addEventListener('click', () => {
      idSeleccionado = prod.id;
      cargarProductoEnFormulario(prod);
      // No renderices la tabla aquí
    });
    

    tabla.appendChild(fila);
  });
}

// Carga los datos del producto seleccionado en el formulario para su visualización o edición
function cargarProductoEnFormulario(prod) {
  document.getElementById('nombre').value = prod.nombre;
  document.getElementById('distribuidor').value = prod.distribuidor;
  document.getElementById('fechaRecibido').value = prod.fechaRecibido;
  document.getElementById('fechaVencimiento').value = prod.fechaVencimiento;
  document.getElementById('id').value = prod.id;
  document.getElementById('cantidad').value = prod.cantidad;
}

// Limpia los campos del formulario para permitir el ingreso de un nuevo producto
function limpiarCampos() {
  document.getElementById('nombre').value = '';
  document.getElementById('distribuidor').value = '';
  document.getElementById('fechaRecibido').value = '';
  document.getElementById('fechaVencimiento').value = '';
  document.getElementById('id').value = '';
  document.getElementById('cantidad').value = '';
  idSeleccionado = null;
}

// Elimina del inventario el producto actualmente seleccionado y actualiza la tabla
function eliminarProducto() {
  if (!idSeleccionado) return;
  inventario = inventario.filter(item => item.id !== idSeleccionado);
  idSeleccionado = null;
  renderInventario();
  limpiarCampos();
}

// Reemplaza los datos del producto cuyo ID coincide con el ingresado, manteniendo el ID
function modificarProducto() {
  const id = document.getElementById('id').value;
  const index = inventario.findIndex(item => item.id === idSeleccionado);
  console.log('idSeleccionado:', idSeleccionado);
  console.log('index encontrado:', index);

  if (index !== -1) {
    inventario[index] = {
      nombre: document.getElementById('nombre').value,
      distribuidor: document.getElementById('distribuidor').value,
      fechaRecibido: document.getElementById('fechaRecibido').value,
      fechaVencimiento: document.getElementById('fechaVencimiento').value,
      id,
      cantidad: document.getElementById('cantidad').value
    };
    renderInventario();
    limpiarCampos();
  }
}

// Filtra el inventario en base al id que se busque, y actualiza la tabla con los resultados coincidentes
function buscarProducto() {
  const termino = document.getElementById('buscador').value.toLowerCase();
  const tabla = document.getElementById('tabla-inventario');
  tabla.innerHTML = '';
  inventario
    .filter(p => p.id.toLowerCase().includes(termino))
    .forEach(prod => {
      const fila = document.createElement('tr');
      fila.classList.add('fila-producto');
      fila.innerHTML = `
        <td colspan="4">
          <div class="contenido-producto">
            <span>${prod.nombre}</span>
            <span>${prod.distribuidor}</span>
            <span>${prod.id}</span>
            <span>${prod.cantidad}</span>
          </div>
          <div class="barra-fechas">
            <div>Recibido: ${prod.fechaRecibido || 'N/A'}</div>
            <div>Vence: ${prod.fechaVencimiento || 'N/A'}</div>
          </div>
        </td>
      `;
      fila.addEventListener('click', () => {
        idSeleccionado = prod.id;
        cargarProductoEnFormulario(prod);
        renderInventario();
      });
      tabla.appendChild(fila);
    });
}
// Permite que al hacer clic en la barra de búsqueda completa se enfoque el input
  document.querySelector('.search-bar').addEventListener('click', () => {
  document.getElementById('buscador').focus();
});

