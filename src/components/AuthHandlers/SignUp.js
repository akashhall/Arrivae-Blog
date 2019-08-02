import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { connect } from 'react-redux'
import { singUp, clearAuthError } from './../../store/actions/authActions'
import Spinner from './../Spinner'
import { Redirect } from 'react-router-dom'

const styles = {
  paper: {
    marginTop: '64px',
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: '8px',
    backgroundColor: '#3f51b5'
  },
  form: {
    width: "100%",
    marginTop: '16px'
  },
  submit: {
    margin: '24px 0'
  },
  error: {
    marginTop: '10px'
  }
}

class SignUp extends React.Component {
  constructor (props) {
    super(props)
    this.state ={
      firstName : false,
      lastName : false,
      email : false,
      password : false,
    }
  }
  componentWillUnmount() {
    this.props.clearAuthError()
  }
  render() {
    const { auth, loading, authError, authMessage } = this.props
    const handleSubmit = (e) => {
      e.preventDefault()
      let userDetails = {
        email: this.email.value,
        password: this.password.value,
        firstName: this.firstname.value,
        lastName: this.lastname.value,
      }
      this.props.singUp(userDetails)
    }
    const signUpButtonDisable = this.state.firstName && this.state.lastName && this.state.email && this.state.password;
    console.log('signUp', signUpButtonDisable)
    return (
      <Container maxWidth="xs">
        <div style={styles.paper}>
          {loading && <Spinner />}
          {auth.uid && <Redirect to='/' />}
          <Avatar style={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
        </Typography>
          {authError &&
            <Typography style={styles.error} component="h6" color="error">
              {authMessage}
            </Typography>}
          <form style={styles.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="firstName"
              label="FirstName"
              type="text"
              id="firstname"
              autoComplete="firstname"
              autoFocus
              onBlur={(e) => { this.setState({ [e.target.name]: e.target.value }) }}
              inputRef={(firstname) => { this.firstname = firstname }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="LastName"
              type="lastname"
              id="lastname"
              autoComplete="lastname"
              inputRef={(lastname) => { this.lastname = lastname }}
              onBlur={(e) => { this.setState({ [e.target.name]: e.target.value }) }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email address"
              type="email"
              name="email"
              autoComplete="email"
              inputRef={(email) => { this.email = email }}
              onBlur={(e) => { this.setState({ [e.target.name]: e.target.value }) }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={(password) => { this.password = password }}
              onBlur={(e) => { this.setState({ [e.target.name]: e.target.value }) }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={styles.submit}
              disabled={!signUpButtonDisable}
            >
              Sign Up
          </Button>
          </form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    auth: state.firebase.auth,
    loading: state.auth.isFetching,
    authError: state.auth.authError,
    authMessage: state.auth.errMessage
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    singUp: (userDetails) => dispatch(singUp(userDetails)),
    clearAuthError: () => dispatch(clearAuthError())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)