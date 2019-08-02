
const blogReducer = (state = {}, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'BLOGGING IN' :
       return {
         ...state,
         isFetching: true,
         authError : null
       }
       case 'DELETING' : 
       return {
        ...state,
        deleting: true,
       } 
        case 'ADD BLOG':
        return {...state,
        isFetching: false,
        blogList: action.data,
        blogAdded : true
        }
        case 'CLEAR BLOG':
        return {
          ...state,
          blogAdded : false
        }
        case 'DELETE BLOG':
         return {
             ...state,
             deleting : false
         }
         case 'UPDATING' : 
         return {
           updating : true
         }
         case 'UPDATING BLOG' : 
         return {
          updating : false
         }
    }
    return state
}

export default blogReducer