import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ScrollToTop from './ScrollToTop';

// Redux imports
import { Provider } from 'react-redux';
import store from './utils/store';

// Toast imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Persist imports
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { useParams } from 'react-router-dom';

// Router imports
import { HashRouter, Routes, Route } from 'react-router-dom';

import Manden from './pages/ProductOverviews/Manden.jsx';
import Speelgoed from './pages/ProductOverviews/Speelgoed.jsx';
import HomePage from './pages/HomePage';
import ShoppingCart from './pages/ShoppingCart';
import Halsbanden from './pages/ProductOverviews/Halsbanden';
import Login from './pages/Login';
import { ProductOverview } from './pages/ProductOverviews/ProductOverview.jsx';
import SearchResults from './pages/ProductOverviews/SearchResults';
import NotFound from './pages/NotFound';
import ProductDetails from './pages/ProductDetails/ProductDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store);

root.render( 
  <React.StrictMode>
    <Provider store={store}>
    <HashRouter>
    <ScrollToTop />
    <ToastContainer position="bottom-right" hideProgressBar={true} autoClose={1500} newestOnTop={true}/>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="/producten" element={<ProductOverview />} />

        <Route path="/manden" element={<Manden />} />
        <Route path="/manden/:product" element={<ProductDetails />} />

        <Route path="/speelgoed" element={<Speelgoed />} />
        <Route path="/speelgoed/:product" element={<ProductDetails />} />

        <Route path="/halsbanden" element={<Halsbanden />} />
        <Route path="/halsbanden/:product" element={<ProductDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/winkelwagen" element={<ShoppingCart />} />
        <Route path="/zoekresultaten" element={<SearchResults />} />
        <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
    </HashRouter>
    </Provider>
  </React.StrictMode>
);
