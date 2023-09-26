async  function  auth(req,res,next){
    const modal = useModal()
    try{
    if(req.session.email==="admin@admin.com"&& req.session.password==="admin"){
        return next()
    }
    return res.send("No tenes accesos a este contenido")}
    catch(error){
        console.log(error)
        modal.abrir("Error")
        // abrir modal de error
    }
}
function useModal(){
    let abierto = false
    let mensaje = null

    return {
        abrir: (msg) => {
            mensaje = msg 
            abierto = true
        },
        cerrar: () => abierto = false
    }
}