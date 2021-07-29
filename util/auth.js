const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
const { SECRET_KEY} = require("../config/connection");

module.exports = (context) => {

    //
    const authHeader = context.req.headers.authorization;
    if(authHeader) {
       const token = authHeader.split("Bearer ")[1]; 

       if(token){

        try{
            const user = jwt.verify(token, SECRET_KEY);
            return user;
        } catch(err) {
            throw new AuthenticationError("Invalid/Expired token");
        }
       }
       throw new Error("Authentication token must be provided");
    }
    throw new Error("Authorisation header must be provided");
}