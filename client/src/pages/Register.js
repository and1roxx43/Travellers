import { useMutation, gql } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    // success
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push('/');
    },
    // failure
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
    <div className="space"></div>
    <Header as='h2' color='purple' textAlign='center'>
        Resister your account
    </Header>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        
        <Form.Input
          type="text"
          placeholder="Username..."
          name="username"
          size="big"
          value={values.username}
          error={!!errors.username}
          onChange={onChange}
        />
        <Form.Input
          type="email"
          placeholder="Email..."
          name="email"
          size="big"
          value={values.email}
          error={!!errors.email}
          onChange={onChange}
        />
        <Form.Input
          type="password"
          placeholder="Password..."
          name="password"
          size="big"
          value={values.password}
          error={!!errors.password}
          onChange={onChange}
        />
        <Form.Input
          type="password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          size="big"
          value={values.confirmPassword}
          error={!!errors.confirmPassword}
          onChange={onChange}
        />
        <Button style={{width: "100%"}} type="submit" color="purple" size="big">
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    register(
      registerInput: { username: $username, email: $email, password: $password, confirmPassword: $confirmPassword }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
