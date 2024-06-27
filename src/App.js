import React from 'react';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Navbar from './component/Navbar';
import Products from './component/Products';
import Add from './component/Add';
import Update from './component/Update';
import Login from './component/Login';
import Register from './component/Register';
import Protected from './component/service/Protected';
function App() {
  
  return (
    <div className="App">
    <BrowserRouter>
     <Navbar/>
    <Routes>
      <Route path='/' element={<Protected/>}>
          <Route path='/' element={<Products/>}/>:id
          <Route path='/add' element={<Add/>}/>
          <Route path='/update' element={<Update/>}/>
          <Route path='/update/:id' element={<Update/>}/>
      </Route>
      
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
