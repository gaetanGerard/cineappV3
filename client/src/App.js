// * React import
import React, { Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// * Styles import
import './style/Reset.css';
import './style/variable.css';
import './style/app.css';

// * Component import
import Navbar from './component/layout/Navbar';
import Home from './component/pages/Home';
import About from './component/pages/About';
import Favorite from './component/favorites/Favorite';
import Collection from './component/collection/Collection';
import Movie from './component/movies/Movie';
import Genres from './component/genres/Genres';
import Profil from './component/profil/Profil';

// * Import Context
import FavoriteState from './context/favorite/FavoriteState';
import MoviesState from './context/movies/MoviesState';
import SeriesState from './context/series/SeriesState';


const App = () => {
  return (
    <MoviesState>
      <SeriesState>
        <FavoriteState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="app">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/movie/:movieId" component={Movie} />
                  <Route exact path="/profil" component={Profil} />
                  <Route exact path="/favorite/:movieId" component={Favorite} />
                  <Route exact path="/collection/:collectionId" component={Collection} />
                  <Route exact path="/genre/:genreId" component={Genres} />
                </Switch>   
              </div> 
            </Fragment>
          </Router>  
        </FavoriteState>  
      </SeriesState>
    </MoviesState>
  );
}

export default App;
