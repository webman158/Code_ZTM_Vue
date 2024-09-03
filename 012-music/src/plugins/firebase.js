// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'

// 需要对用户进行身份验证，所以需要导入以下模块
import 'firebase/auth'

// firestore
import 'firebase/firestore'

// storage 文件存储
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCKnQyEdQ5iVD6qJgkUK_2k5rtBpLUJJW0',
  authDomain: 'master-vue3-music.firebaseapp.com',
  projectId: 'master-vue3-music',
  // 存储桶
  storageBucket: 'master-vue3-music.appspot.com',
  messagingSenderId: '530669814151',
  appId: '1:530669814151:web:fa46dd3d8b6cc636d0d322'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const storage = firebase.storage()
const db = firebase.firestore()

// 数据持久化缓存，离线的时候，读取缓存数据
db.enablePersistence().catch((error) => console.log(error))

const userCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')

export { auth, db, userCollection, storage, songsCollection, commentsCollection }
