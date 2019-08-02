import React from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Spinner from './../Spinner'
import { deleteBlog, updateBlog } from './../../store/actions/blogActions'

const styles = {
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: '24px 20px',
    },
    paper: {
        maxWidth: '90%',
        margin: '16px auto',
        padding: '16px',
        fontWeight: '900'
    },
    paperBackground: {
        maxWidth: '90%',
        margin: `8px auto`,
        padding: '16px',
        background: '#3f51b5',
        color: 'white',
        fontWeight: '900'
    },
    fab: {
        margin: '8px',
    },
}


class BlogList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        const handleSave = (e, blogValue, defaultValue, isEditable, id) => {
            this.setState({ [isEditable]: false });
            let blogData = {
                blogDescription: this.state[blogValue] ? this.state[blogValue] : defaultValue
            }
            this.props.updateBlog(id, blogData)
        }
        const { auth } = this.props
        return (
            <div style={styles.root}>
                <Paper style={styles.paperBackground}>
                    <Grid container wrap="wrap" justify="center" spacing={2}>
                        <Grid item>
                            {'Blogs List'}
                        </Grid>
                    </Grid>
                    {!this.props.updating && !this.props.blogDeleted && this.props.blogs ? this.props.blogs.map((blog, index) => {
                        return (
                            <Paper style={styles.paper} key={index}>
                                <Grid container wrap="wrap" direction="column" spacing={2}>
                                    <Grid item>
                                        {blog.blogTitle} &nbsp;
                                        {blog.createdAt}
                                        <hr />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            variant="outlined"
                                            id="blog-description"
                                            label="Blog description"
                                            name={`blogDescription${index}`}
                                            type="text"
                                            multiline
                                            disabled={this.state[`isEditable${index}`] ? false : true}
                                            fullWidth
                                            value={this.state[`blogDescription${index}`] !== undefined ? this.state[`blogDescription${index}`] : blog.blogDescription}
                                            onChange={(e) => { this.setState({ [e.target.name]: e.target.value }) }}
                                        />
                                    </Grid>
                                    { auth && auth.uid &&
                                    <Grid item xs>
                                        <Fab color="primary" size="small"
                                            disabled={this.state[`isEditable${index}`] ? this.state[`isEditable${index}`] : false}
                                            onClick={() => { this.setState({ [`isEditable${index}`]: true }) }}
                                            aria-label="edit" style={styles.fab}>
                                            <Icon >edit_icon</Icon>
                                        </Fab>
                                        <Fab size="small" color="secondary" aria-label="delete" style={styles.fab}
                                            onClick={() => { this.props.deleteBlog(blog.id); delete this.state[`blogDescription${index}`] }}>
                                            <DeleteIcon />
                                        </Fab>
                                        {this.state[`isEditable${index}`] && 
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                style={styles.fab}
                                                disabled={this.state[`blogDescription${index}`] !== '' ? false : true}
                                                onClick={(e) => { handleSave(e, `blogDescription${index}`,blog.blogDescription, `isEditable${index}`, blog.id) }
                                                }
                                            > Save
                                        </Button>
                                        }
                                    </Grid>}
                                </Grid>
                            </Paper>
                        )
                    }) : <Spinner />}
                </Paper>
            </div>
        );
    }
}

const mapStateToprops = (state) => {
    return {
        updating: state.blog.updating,
        blogs: state.firestore.ordered.blogs,
        blogDeleted: state.blog.deleting,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteBlog: (id) => dispatch(deleteBlog(id)),
        updateBlog: (id, blog) => dispatch(updateBlog(id, blog))
    }
}

export default compose(
    connect(mapStateToprops, mapDispatchToProps),
    firestoreConnect([
        { collection: 'blogs', orderBy : ['createdAt', 'desc'] },
    ])
)(BlogList);