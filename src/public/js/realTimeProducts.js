document.getElementById('formProduct').addEventListener('submit', async function (event) {
  event.preventDefault(); // Evita que el formulario se envíe de la forma predeterminada

  // Crea un objeto FormData a partir del formulario
  let formData = new FormData(this);
  try {
    // Realiza una solicitud AJAX para agregar el producto
    const response = await fetch('/api/products', {
      method: 'POST',
      body: formData
    })
    
    if(!response.ok){
      console.log("fallo la peticion")
      return;
    }

    const product = response.json()
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


  } catch (error) {
    console.error('Error:', error);
  }

});