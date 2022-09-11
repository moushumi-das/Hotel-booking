import './App.css';
import Home from './pages/home/Home'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import List from './pages/listing/List';
import Hotel from './pages/hotel/Hotel';

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/hotels" element={<List/>}/>
    <Route path="/hotels/:id" element={<Hotel/>}/>
  </Routes>

  </BrowserRouter>
  );
}

export default App;
