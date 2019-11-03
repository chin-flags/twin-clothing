import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css';
import HomePage from './pages/homepage/HomePage';
import Shop from './pages/shoppage/ShopPage';
import SignInAndSignUpPage from './pages/signin-and-signup-page/SignInAndSignUpPage';
import Header from './components/header/Header';
import { auth, createUserProfileDocument } from './firebase/firebase-util';
import setCurrentUser from './redux/user/userActions';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      } else {
          setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={Shop} />
          <Route 
            exact
            path='/signin'
            render ={() => this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />} />
        </Switch>
      </div>
    );
  }
}

const matchStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
})

const matchDispatchToProps=dispatch=> ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
})

export default connect(matchStateToProps ,matchDispatchToProps)(App);