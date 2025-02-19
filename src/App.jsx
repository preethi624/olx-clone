import { useContext, useState,useEffect ,Suspense,lazy} from 'react'

import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import './App.css'

import Header from './components/Header/Header'



import Post from './store/PostContext'

import Footer from './components/Footer/Footer'
import { AuthContext,firebaseContext } from './store/firebaseContext'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import View from './components/View/View'
import Create from "./components/Create/Create"
import logo from "./assets/logo.webp"



const Home = lazy(() => import("./Pages/Home"));

function App() {
  const [count, setCount] = useState(0)
  const {user,setUser}=useContext(AuthContext)
  const {auth}=useContext(firebaseContext)
  const [isLoading,setIsLoading]=useState(true)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth, setUser]);

  return (
    <>
    <Post>
     <Router>
     {isLoading ? (
            <div className="loading">
              <img
                src={logo}
                alt="Loading"
                className="loading-logo"
              />
            </div>
          ) : (
            <Suspense
              fallback={
                <div className="loading">
                  <p>Loading...</p>
                </div>
              }
            >
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        {user&&<Route path='/create' element={<Create/>}/>}
        <Route path='/view' element={<View/>}/>
      </Routes>
      </Suspense>
          )}
     
     </Router>
     </Post>
    </>
  )
}

export default App
