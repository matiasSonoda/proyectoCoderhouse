let info = document.getElementById("nameId").innerText;
try{
    const response = await fetch('/api/carts/:cid/products/:pid', {
        method: 'POST',
        body: formData
      })
      if (!response.ok){
        console.log("fallo peticion")
        return;
      }

}
catch(error){
    console.error('Error:', error);

}