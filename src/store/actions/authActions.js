export const singIn = (credentials) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firebase = getFirebase()
    dispatch({ type: 'LOGIGING IN' })
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      console.log('logged In')
      dispatch({ type: 'LOGIN SUCCESS' })
    }).catch((err) => {
      console.log(err)
      dispatch({ type: 'LOGIN FALIURE', err })
    })
  }
}

export const singUp = (userDetails) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    dispatch({ type: 'LOGIGING IN' })
    firebase.auth().createUserWithEmailAndPassword(
      userDetails.email,
      userDetails.password
    ).then((res) => {
      return firestore.collection('users').doc(res.user.uid).set({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        initials: userDetails.firstName[0] + userDetails.lastName[0]
      })
    }).then(() => {
      dispatch({type:'USER ADDED'})
    }).catch((err) => {
      console.log(err)
      dispatch({ type: 'SIGNUP FALIURE', err })
    })
  }
}
export const singOut = (credentials) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firebase = getFirebase()
    dispatch({ type: 'LOGIGING IN' })
    firebase.auth().signOut().then(() => {
      console.log('logged In')
      dispatch({ type: 'LOGGED OUT' })
    }).catch(() => {
    })
  }
}

export const clearAuthError = (dispatch) => {
  return {
    type: 'CLEAR AUTH ERROR'
  }
} 