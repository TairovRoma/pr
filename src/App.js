import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Card from './components/Card/Card.jsx';
import CharacterDetail from './components/CharacterDetail/CharacterDetail.jsx'; 


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
