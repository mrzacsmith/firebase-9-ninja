import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCcSfhUSz6gYlKxILbsX9UfRufQFkx5mHc',
  authDomain: 'fir-9-ninja-9603d.firebaseapp.com',
  projectId: 'fir-9-ninja-9603d',
  storageBucket: 'fir-9-ninja-9603d.appspot.com',
  messagingSenderId: '671798938461',
  appId: '1:671798938461:web:5a3581e4ac09260d52f6b4',
}

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()

const colRef = collection(db, 'books')
getDocs(colRef)
  .then((snapshot) => {
    let books = []
    snapshot.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
  })
  .catch((err) => console.log(err.message))
