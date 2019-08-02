import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { connect } from 'react-redux'
import { createBlog, clearBlog } from './../../store/actions/blogActions'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Spinner from './../Spinner'

const styles = {
  paper: {
    marginTop: '64px',
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
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


class CreateBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      blogData: null,
      blogDescription : false,
      blogTitle : false,
    }
  }
  componentWillUnmount() {
    this.props.clearBlog()
  }
  render() {
    const {blogDescription, blogTitle} = this.state
    const {blogStatus, isFetching} = this.props
    const handleSubmit = (e) => {
      e.preventDefault()
      let createdAt = new Date()
      let blogData = {
        blogTitle: this.blogTitle.value,
        blogDescription: this.blogDescription.value,
        createdAt : createdAt.toLocaleString(),
      }
      this.setState({ loading: true })
      this.props.createBlog(blogData)
    }
    const createBlogButtonDisable = blogDescription && blogTitle
    return (
      <Container maxWidth="lg">
        {blogStatus && this.props.history.push('/')}
        {isFetching && <Spinner />}
        <div style={styles.paper}>
          <Typography component="h1" variant="h5">
            Create Blog
        </Typography>
          <form style={styles.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="blogTitle"
              label="Blog Title"
              type="text"
              name="blogTitle"
              autoComplete="blogTitle"
              autoFocus
              onBlur={(e) => { this.setState({ [e.target.name]: e.target.value }) }}
              inputRef={(blogTitle) => { this.blogTitle = blogTitle }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              multiline
              fullWidth
              name="blogDescription"
              label="Blog Description"
              type="text"
              id="blogDescription"
              autoComplete="blogDescription"
              onBlur={(e) => { this.setState({ [e.target.name]: e.target.value }) }}      
              inputRef={(blogDescription) => { this.blogDescription = blogDescription }}
            />
            <Button
              size="small"
              type="submit"
              variant="contained"
              color="primary"
              style={styles.submit}
              disabled={!createBlogButtonDisable}
            >
              Add Blog
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
    blogStatus: state.blog.blogAdded,
    isFetching: state.blog.isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createBlog: (blog) => dispatch(createBlog(blog)),
    clearBlog: () => dispatch(clearBlog())
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
      { collection: 'blogs'}
  ])
)(CreateBlog);