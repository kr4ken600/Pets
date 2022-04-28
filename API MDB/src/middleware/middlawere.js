const jwt = require('jsonwebtoken');
const moment = require('moment');

exports.ensureAuthenticated = (req, res, next) => {
    if(!req.headers.authorization){
      return res
        .status(403)
        .send({ message: "Tu petición no tiene cabecera de autorización" });
    }
  
    var token = req.headers.authorization.split(" ")[1];
    token = token.replace("\"", "");
    var payload = jwt.decode(token, {complete: true});
    payload = payload.payload;

    if(payload.exp <= moment().unix()){
      return res.status(401).send({ message: "El token ha expirado" });
    }
  
    next();
  }