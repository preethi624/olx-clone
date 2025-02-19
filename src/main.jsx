import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {firebaseContext } from './store/firebaseContext.jsx'
import {auth, createProduct, db, storage} from "./firebase/setup.jsx"
import Context from './store/firebaseContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <firebaseContext.Provider value={{auth,db,storage,createProduct}}>
      <Context>
    <App />
    </Context>

    </firebaseContext.Provider>
    
   
  </StrictMode>,
)
