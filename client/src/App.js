// * React import
import React, { Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// * Styles import
import './style/Reset.css';
import './style/variable.css';
import './style/app.css';

// * Component import
// ! ./component/layout import 
import Navbar from './component/layout/Navbar';
// ! ./component/pages import
import Home from './component/pages/Home';
import About from './component/pages/About';
// ! ./component/favorite import
import Favorite from './component/favorites/Favorite';
//! ./component/collection import
import Collection from './component/collection/Collection';
//! ./component/movies import
import Movie from './component/movies/Movie';
//! ./component/genres import
import Genres from './component/genres/Genres';

// * Import Context
// ! ./context/favorite
import FavoriteState from './context/favorite/FavoriteState';
// ! ./context/movies
import MoviesState from './context/movies/MoviesState';


const App = () => {
  return (
    <MoviesState>
      <FavoriteState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="app">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/favorite/:movieId" component={Favorite} />
                <Route exact path="/movie/:movieId" component={Movie} />
                <Route exact path="/collection/:collectionId" component={Collection} />
                <Route exact path="/genre/:genreId" component={Genres} />
              </Switch>   
            </div> 
          </Fragment>
        </Router>  
      </FavoriteState>
    </MoviesState>
  );
}

export default App;
