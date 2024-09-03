import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// const firebaseConfig = {
//   apiKey: "AIzaSyDvF17Y5ApfuVBSm_bemsZYoPrNVUT1r2s",
//   authDomain: "music-temp-2a2ab.firebaseapp.com",
//   projectId: "music-temp-2a2ab",
//   storageBucket: "music-temp-2a2ab.appspot.com",
//   appId: "1:513389509498:web:f976453109bb87de1034c3",
// };

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCKnQyEdQ5iVD6qJgkUK_2k5rtBpLUJJW0',
  authDomain: 'master-vue3-music.firebaseapp.com',
  projectId: 'master-vue3-music',
  // 存储桶
  storageBucket: 'master-vue3-music.appspot.com',
  messagingSenderId: '530669814151',
  appId: '1:530669814151:web:fa46dd3d8b6cc636d0d322',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
  storage,
}
