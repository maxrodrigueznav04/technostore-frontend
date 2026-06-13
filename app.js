// La raíz de tu servidor en Render
const BASE_URL = 'https://ventasperfumes.onrender.com';

// Endpoints dinámicos y limpios
const PRODUCTOS_URL = `${BASE_URL}/api/productos`;
const CLIENTES_URL  = `${BASE_URL}/api/clientes`;
const VENTAS_URL    = `${BASE_URL}/api/ventas`;

// Función para obtener productos y renderizarlos en la tabla
async function cargarProductos() {
  try {
    const respuesta = await fetch(PRODUCTOS_URL); // Usamos la variable dinámica
    const productos = await respuesta.json();
    
    const tbody = document.getElementById('productosTabla');
    tbody.innerHTML = ''; 
    
    productos.forEach(prod => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td><strong>${prod.nombre}</strong></td>
        <td>${prod.categoria}</td>
        <td>$${prod.precio}</td>
        <td>${prod.stock}</td>
        <td>${prod.marca}</td>
      `;
      tbody.appendChild(fila);
    });
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}

// Escuchar el evento del formulario para agregar un producto
document.getElementById('productoForm').addEventListener('submit', async (e) => {
  e.preventDefault(); 
  
  const nuevoProducto = {
    nombre: document.getElementById('nombre').value,
    categoria: document.getElementById('categoria').value,
    precio: Number(document.getElementById('precio').value),
    stock: Number(document.getElementById('stock').value),
    marca: document.getElementById('marca').value
  };

  try {
    const respuesta = await fetch(PRODUCTOS_URL, { // Usamos la variable dinámica
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProducto)
    });

    if (respuesta.ok) {
      document.getElementById('productoForm').reset(); 
      cargarProductos(); 
    } else {
      alert('Error al guardar el producto');
    }
  } catch (error) {
    console.error('Error al enviar el producto:', error);
  }
});

cargarProductos();