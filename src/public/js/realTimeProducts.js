document.getElementById('formProduct').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la forma predeterminada
  
    // Crea un objeto FormData a partir del formulario
    let formData = new FormData(this);
  
    // Realiza una solicitud AJAX para agregar el producto
    fetch('/api/products', {
      method: 'POST',
      body: formData
    })
    .then(function(response) {
      return response.json(); // Convierte la respuesta en JSON
    })
    .then(function(product) {
      // Agrega el nuevo producto a la lista de productos
      let productsContainer = document.getElementById('products-container');
      let productDiv = document.createElement('div');
      productDiv.innerHTML = `
        <p>ID:${product.id}</p>
        <p>Titulo:${product.title}</p>
        <p>Descripcion:${product.description}</p>
        <p>Precio:${product.price}</p>
        <p>status:${product.status}</p>
        <p>code:${product.code}</p>
        <p>stock:${product.stock}</p>
      `;
      productsContainer.appendChild(productDiv);
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
  });