import React from 'react';
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { Switch, Route, Redirect } from 'react-router-dom'
import SignUp from './components/AuthHandlers/SignUp';
import SignIn from './components/AuthHandlers/SignIn'
import BlogList from './components/BlogList'
import CreateBlog from './components/BlogList/CreateBlog'
import { connect } from 'react-redux'

const styles = {
  App: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
}
class App extends React.Component {
  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.uid
          ? <Component {...props} />
          : <Redirect to='/' />
      )} />
    )
    return (
      <div className="App" style={styles.App}>
        <Navigation />
        <div>
          <Switch>
            <Route exact path="/" component={BlogList} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/login" component={SignIn} />
            <PrivateRoute path='/createBlog' component={CreateBlog} />
            <Route path="/createBlog" component={CreateBlog} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state)
  return {
    auth: state.firebase.auth
  }
}
export default connect(
  mapStateToProps
)(App);