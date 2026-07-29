import {Routes , Route} from 'react-router-dom';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
