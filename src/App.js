import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import { GlobalStyle } from './styles/globalStyles.js';
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
    <GlobalStyle />
      <NavBar />
      <div>
      <Outlet />
      <Footer />
      </div>
    </>
  );
}

export default App;
