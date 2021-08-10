const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
require("dotenv").config();

const TOKEN_KEY = "Token secret lives here"

module.exports = (context) => {

    // context = { ...headers }
    const authHeader = context.req.headers.authorization;
    if(authHeader) {
        // convention for tokens: "Bearer ..."
       const token = authHeader.split("Bearer ")[1]; 
        if(token){
            try{
            const user = jwt.verify(token, TOKEN_KEY);
            return user;
        } catch(err) {
            throw new AuthenticationError("Invalid/Expired token");
        }
       }
       throw new Error("Authentication token must be provided");
    }
    throw new Error("Authorisation header must be provided");
}