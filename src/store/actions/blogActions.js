
export const createBlog = (blog) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore()
          dispatch({type:'BLOGGING IN'})
        firestore.collection('blogs').add({
            ...blog
        }).then((data) => {
            console.log('blog created', data)
            dispatch({ type: 'ADD BLOG', data })
        }).catch((error) => {
            console.log(error)
        })
    }
}
export const clearBlog = () => {
    return {
        type: 'CLEAR BLOG'
    }
}
export const deleteBlog = (id) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore()
        dispatch({type:'DELETING'})
        firestore.collection('blogs').doc(id).delete()
            .then((data) => {
                console.log(data)
                dispatch({type:'DELETE BLOG'})
            }).catch((error) => {
                console.log(error)
            })
    }
}
export const updateBlog = (id,blog) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore()
        dispatch({type:'UPDATING'})
        firestore.collection('blogs').doc(id).update({
           ...blog
          })
            .then((data) => {
                console.log(data)
                dispatch({type:'UPDATING BLOG'})
            }).catch((error) => {
                console.log(error)
            })
    }
}