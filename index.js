const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3977;
const {API_VERSION, IP_SERVER, portDb} = require("./config");

mongoose.set("useFindAndModify", false);

mongoose.connect("mongodb://"+IP_SERVER+":"+portDb+"/nombredatabase",{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}, (err, res)=> {
    if(err){
        throw err;
    }else{
        console.log("Conexión a la base de datos correctamente");

        app.listen(port, ()=>{
            console.log("----------------");
            console.log("----API_REST----");
            console.log("----------------");
            console.log("http://"+IP_SERVER+":"+port+"/api/"+API_VERSION+"/");
        })
    }
});

