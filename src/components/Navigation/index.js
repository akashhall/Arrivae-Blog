import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom'
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux'
import { singOut } from './../../store/actions/authActions'
import Spinner from './../Spinner'

const styles = {
  root: {
  },
  menuButton: {
    marginRight: ''
  },
  title: {
    flexGrow: 1,
  },
  fab: {
    margin: '5px',
  },
};

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userLoggedIn: true
    }
  }
  render() {
    const { auth, profile } = this.props
    const authLinks = auth && auth.uid ? <>
    {profile.initials ?
    <>
    <Avatar size="small" style={styles.fab}>{profile.initials && profile.initials.toUpperCase()}
    </Avatar>
      <Typography component="h6" >
        ADD BLOG
      </Typography>
      <Link to="createBlog">
        <Fab size="small" color="primary" aria-label="add" style={styles.fab}>
          <AddIcon />
        </Fab>
      </Link>
      <Button color="inherit" onClick={() => { this.props.singOut() }}>Logout</Button> </>: <Spinner />  }
    </> : <><Link to="login"><Button color="inherit">Login</Button>
    </Link > <Link to="signUp"><Button color="inherit">SignUp</Button></Link> </>
    return (
      <div style={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={styles.title}>
              <Link to="/">ARRIVAE</Link>
            </Typography>
            {authLinks}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    singOut: () => dispatch(singOut())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar)