const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
require("dotenv").config();

module.exports = (context) => {

    // context = { ...headers }
    const authHeader = context.req.headers.authorization;
    if(authHeader) {
        // convention for tokens: "Bearer ..."
       const token = authHeader.split("Bearer ")[1]; 
        if(token){
            try{
            const user = jwt.verify(token, process.env.TOKEN_KEY);
            return user;
        } catch(err) {
            throw new AuthenticationError("Invalid/Expired token");
        }
       }
       throw new Error("Authentication token must be provided");
    }
    throw new Error("Authorisation header must be provided");
}