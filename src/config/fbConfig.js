  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/auth'

  var firebaseConfig = {
    apiKey: "AIzaSyB0QHYfOeyOlSuv6fOsO47IWq6zYfxR-O4",
    authDomain: "arrivae-dec13.firebaseapp.com",
    databaseURL: "https://arrivae-dec13.firebaseio.com",
    projectId: "arrivae-dec13",
    storageBucket: "",
    messagingSenderId: "358301417691",
    appId: "1:358301417691:web:6c1719223afc567d"
  };

  firebase.initializeApp(firebaseConfig);
//   firebase.firestore().settings({timestampsInSnapshots : true})

  export default firebase