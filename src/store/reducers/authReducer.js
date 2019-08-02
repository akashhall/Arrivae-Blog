
const authReducer = (state = {}, action) => {
   switch (action.type) {
      case 'LOGIGING IN':
         return {
            ...state,
            isFetching: true,
            authError: null
         }
      case 'SIGNUP SUCCESS':
         return {
            ...state,
            loggedIn: true,
            isFetching: false
         }
         case 'SIGNUP FALIURE':
         return {
            ...state,
            authError: true,
            isFetching: false,
            errMessage: action.err.message
         }
      case 'LOGIN SUCCESS':
         return {
            ...state,
            loggedIn: true,
            isFetching: false,
            authError: null
         }
      case 'LOGIN FALIURE':
         return {
            ...state,
            authError: true,
            isFetching: false,
            errMessage: action.err.message
         }
      case 'LOGGED OUT':
         return {
            ...state,
            isFetching: false,
         }
      case 'CLEAR AUTH ERROR':
         return {
            errMessage: false
         }

      default:
         return state
   }
}

export default authReducer