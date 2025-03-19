import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';


function App() {
  
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Cart/>}></Route>
        </Routes>

    </BrowserRouter>
  );
}

export default App;
