import NavBar from './components/navigation/NavBar.jsx';
import Footer from './components/Footer.jsx';
import { GlobalStyle } from './styles/globalStyles.js';
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <GlobalStyle />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
