import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore'
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
const q = query(colRef, where('author', '==', 'dr z'))

onSnapshot(q, (snapshot) => {
  let books = []
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})
// onSnapshot(colRef, (snapshot) => {
//   let books = []
//   snapshot.docs.forEach((doc) => {
//     books.push({ ...doc.data(), id: doc.id })
//   })
//   console.log(books)
// })

const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  })
    .then(() => {
      addBookForm.reset()
    })
    .catch((err) => console.log(err.message))
})

const delBookForm = document.querySelector('.delete')
delBookForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const docRef = doc(db, 'books', delBookForm.id.value)
  deleteDoc(docRef)
    .then(() => {
      delBookForm.reset()
    })
    .catch((err) => console.log(err.message))
})
