import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import HeaderFooter from "./components/HeaderFooter/HeaderFooter";

import './assets/style/style.css'

//toastify - popup windows
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

import Register from "./pages/Register";
import {useEffect} from "react";
import {getMe} from "./store/features/userSlice";
import {useDispatch, useSelector} from "react-redux";
import CreatePost from "./pages/CreatePost";
import MyPosts from "./pages/MyPosts";
import PostItem from "./pages/PostItem";
import MyComments from "./pages/MyComments";


function App() {

    console.log('Attempt N1')

    const dispatch = useDispatch()

    const user = useSelector(state=>state.user.name)

    useEffect(()=>{
        if (localStorage.getItem('authorization')){
            dispatch(getMe())
        }
    }, [])

    return (
        <>
          {/*change to hashrouter*/}
              <HashRouter>
                  <Routes>
                      <Route path='' element={<HeaderFooter/>}>
                          <Route index element={<Home/>}/>

                          {user &&
                          <Route path='/myPosts' element={<MyPosts/>}/>
                          }

                          {user &&
                              <Route path='/createPost' element={<CreatePost/>}/>
                          }
                          {user &&
                              <Route path='/myComments' element={<MyComments/>}/>
                          }

                          <Route path='/posts/:id' element={<PostItem/>}/>

                          <Route path='/register' element={<Register/>}/>
                          <Route path='*' element={<NoPage/>}/>
                      </Route>
                  </Routes>
              </HashRouter>

              <ToastContainer position='bottom-right' theme='dark'/>
        </>
    );
}

export default App;
