const bcrypt = require("bcrypt");
const User = require("../models/user");

function signUp(req, res){
    
    const user = new User();
    
    const {name, lastname, email, password, repeatPassword} = req.body;
    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.role = "admin";
    user.active = false;

    if (!password || !repeatPassword){
        res.status(404).send({message: "Las contraseñas son obligatorias"});
    }else{
        if(password !== repeatPassword){
            res.status(404).send({message: "Las contraseñas no son iguales"})
        }else{
            bcrypt.hash(password, 10, function(error, hash){
                if(error){
                    res.status(500).send({menssage: "Error al encriptar la contraseña"});
                } else{
                    user.password = hash;

                    user.save((err, userStored)=>{
                        if(error){
                            res.status(500).send({message: "El usuario ya existe"});
                        }else{
                            if(!userStored){
                                res.status(404).send({message: "Error al crear usuario"});
                            }else{
                                res.status(200).send({user: userStored});
                            }
                        }
                    });
                }
            })
        }
    }
}

module.exports = {
    signUp
};