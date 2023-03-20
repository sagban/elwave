import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import About from './pages/about';
import Home from './pages/home';
import Header from './components/header';
import Footer from './components/footer';
import { BrowserRouter as Router, Routes as Switch, Route, Link } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import FindShade from './pages/findshade';
import PlayColor from './pages/playcolor';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.title = "EL Wave | Estee Lauder";
root.render(
  <React.StrictMode>
    <div>
      <ReactNotifications />
      <Header />
      <Router>
        <Switch>
          <Route exact path='/' element={<Home />} />
        </Switch>
        <Switch>
          <Route exact path='/about' element={<About />} />
        </Switch>
        <Switch>
          <Route exact path='/find-lipshade' element={<FindShade />} />
        </Switch>
        <Switch>
          <Route exact path='/listen-colors' element={<PlayColor />} />
        </Switch>
      </Router>
      <Footer />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();