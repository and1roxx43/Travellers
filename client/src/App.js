import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';

import Footer from "./components/Footer"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container className="container">
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
      </Router>
      <Footer className="footer" /> 
    </AuthProvider>
  );
}

export default App;
