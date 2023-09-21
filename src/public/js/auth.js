async  function  auth(req,res,next){
    try{
    if(req.session.email==="admin@admin.com"&& req.session.password==="admin"){
        return next()
    }
    return res.send("No tenes accesos a este contenido")}
    catch(error){
        console.log(error)
    }
}
