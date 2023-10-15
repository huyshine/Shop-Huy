import { Routes , Route  } from 'react-router-dom'
import LayoutAdmin from './layout/LayoutAdmin';
import Dashboard from './pages/Admin/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ListCategory from './pages/Admin/Category/List';
import AddCategory from './pages/Admin/Category/Add';
import EditCategory from './pages/Admin/Category/Edit';
import ListProduct from './pages/Admin/Product/List';
import AddProduct from './pages/Admin/Product/Add';
import EditProduct from './pages/Admin/Product/Edit';
import ListPost from './pages/Admin/Post/List';
import AddPost from './pages/Admin/Post/Add';
import EditPost from './pages/Admin/Post/Edit';
import ListFeedBack from './pages/Admin/Feedback/List';
import ListComment from './pages/Admin/Comment/List';
import ListOrder from './pages/Admin/Order/List';
import ListUser from './pages/Admin/User/List';


function App() {


  return (
    <Routes>
      <Route path='/auth'>
        <Route index element={<Login/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
      </Route>
      <Route path='/admin' element={<LayoutAdmin/>}>
         <Route index  element={<Dashboard/>}/>
         <Route path='category'>
            <Route index element={<ListCategory/>} />
            <Route path='add' element={<AddCategory/>} />
            <Route path='edit/:id' element={<EditCategory/>} />
         </Route>
         <Route path='product'>
            <Route index element={<ListProduct/>} />
            <Route path='add' element={<AddProduct/>} />
            <Route path='edit/:id' element={<EditProduct/>} />
         </Route>
         <Route path='post'>
            <Route index element={<ListPost/>} />
            <Route path='add' element={<AddPost/>} />
            <Route path='edit/:id' element={<EditPost/>} />
         </Route>
         <Route path='feedback' element={<ListFeedBack/>}/>
         <Route path='comment' element={<ListComment/>}/>
         <Route path='order' element={<ListOrder/>}/>
         <Route path='auth' element={<ListUser/>}/>
      </Route>
      <Route path='/' element={<LayoutAdmin/>}>
         <Route index  />
      </Route>
    </Routes>
  )
}

export default App;
