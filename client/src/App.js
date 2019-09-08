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
import StaffAndActors from './component/staffAndActors/StaffAndActors';

// * Import Context
import FavoriteState from './context/favorite/FavoriteState';
import MoviesState from './context/movies/MoviesState';
import SeriesState from './context/series/SeriesState';
import PeopleState from './context/people/PeopleState';


const App = () => {
  return (
    <MoviesState>
      <SeriesState>
        <PeopleState>
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
                    <Route exact path="/staffAndActors/:actorsId" component={StaffAndActors} />
                  </Switch>   
                </div> 
              </Fragment>
            </Router>  
          </FavoriteState>
        </PeopleState>  
      </SeriesState>
    </MoviesState>
  );
}

export default App;
