const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const { TOKEN_KEY } = require('../../config');
const User = require('../../models/User');


module.exports = { Mutation: {
    async login(_, { username, password }) {
        const { errors, valid } = validateLoginInput(username, password);
  
        // input validation issues
        if (!valid) {
          throw new UserInputError('Errors', { errors });
        }
  
        const user = await User.findOne({ username });
  
        // wrong username
        if (!user) {
          errors.general = 'User does not exist';
          throw new UserInputError('User does not exist', { errors });
        }
  
        // wrong password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          errors.general = 'Wrong credentials';
          throw new UserInputError('Wrong credentials', { errors });
        }
  
        // login is good, issue the user a token
        const token = generateToken(user);
  
        return {
          ...user._doc,
          id: user._id,
          token,
        };
      },
      async register(_, { registerInput: { username, email, password, confirmPassword } }) {
        // Validate user data
        const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword);
  
        if (!valid) {
          throw new UserInputError('Errors', { errors });
        }
  
        // TODO: Make sure user doesn't already exist
        const user = await User.findOne({ username });
        if (user) {
          throw new UserInputError('Username is taken', {
            errors: {
              username: 'Username is taken.',
            },
          });
        }
  
        // Hash the password
        password = await bcrypt.hash(password, 10);
  
        // create the new user with the model and passed in data
        const newUser = new User({
          email,
          username,
          password,
          createdAt: new Date().toISOString(),
        });
  
        // save the user to the DB
        const res = await newUser.save();
        // Create auth token
        const token = generateToken(res);
  
        return {
          ...res._doc,
          id: res._id,
          token,
        };
      },
    },
  };

function generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      TOKEN_KEY,
      { expiresIn: '1h' }
    );
  }