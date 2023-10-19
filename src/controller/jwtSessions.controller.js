export const postJwtLoginSession = async(req,res)=>{
    res.status(200).send({ mensaje: req.user})
    console.log(req.user.user)
    req.session.user={
        first_name: req.user.user.first_name,
        last_name: req.user.user.last_name,
        age: req.user.user.age,
        email: req.user.user.email
    }
}