import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, NavLink, Route } from 'react-router-dom';
import { Signin } from './components/Signin';
import { Signup } from './components/Signup';
import { Main } from './components/Main';
import { User } from './components/User';
import './style/app.css';

function App() {
  const [verifyToken, setVerifyToken] = useState(false);
  useEffect(() => {
    fetch('/', {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        token:localStorage.getItem('token')
      })
    })
    .then((response) => {
      if(response.ok){
        setVerifyToken(true);
      } else {
        setVerifyToken(false);
      }
    })
    .catch(e => {
      console.log(e);
      setVerifyToken(false);
    })
  }, []);

  if(verifyToken){
    return (
      <div>
   <BrowserRouter>
        <div className="wrapper-nav">
          <nav>
            <NavLink exact to="/" className="link-nav" activeClassName="active-link">Home</NavLink>
            <NavLink to="/user" className="link-nav" activeClassName="active-link">Account</NavLink>
          </nav>
        </div>
        <Switch>
          <Route path="/user">
            <User/>
          </Route>

          <Route path="/">
            <Main/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
    )
  } else if(!verifyToken) {
  return (
    <div>
      <BrowserRouter>
        <div className="wrapper-nav">
          <nav>
            <NavLink exact to="/" className="link-nav" activeClassName="active-link">Home</NavLink>
            <NavLink to="/signin" className="link-nav" activeClassName="active-link">Sign in</NavLink>
            <NavLink to="/signup" className="link-nav" activeClassName="active-link">Sign up</NavLink>
          </nav>
        </div>
        <Switch>
          <Route path="/signin">
            <Signin/>
          </Route>

          <Route path="/signup">
            <Signup/>
          </Route>

          <Route path="/">
            <Main/>
          </Route>
        </Switch>

      </BrowserRouter>
    </div>
  );
  } else {
    return (
      <div>Loading ...</div>
    )
  }
}

export default App;
