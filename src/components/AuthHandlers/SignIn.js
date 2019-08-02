import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { connect } from 'react-redux'
import { singIn, clearAuthError } from './../../store/actions/authActions'
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
  }
}

class SignIn extends React.Component {
  componentWillUnmount() {
    this.props.clearAuthError()
  }
  render() {
    const { loading, authError, auth, authMessage } = this.props
    const handleSubmit = (e) => {
      e.preventDefault()
      let cred = {
        email: this.email.value,
        password: this.password.value
      }
      this.props.singIn(cred)
    }
    return (
      <Container maxWidth="xs">
        {loading && <Spinner />}
        {auth.uid && <Redirect to='/' />}
        <div style={styles.paper}>
          <Avatar style={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
        {authError && 
        <Typography component="h6" color="error">
           {authMessage}
        </Typography>}
          <form style={styles.form} noValidate onSubmit={handleSubmit}>
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
              autoFocus
              inputRef={(email) => { this.email = email }}
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={styles.submit}
            >
              Sign In
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
    singIn: (creds) => dispatch(singIn(creds)),
    clearAuthError : () => dispatch(clearAuthError())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)