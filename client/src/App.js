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
import SearchForm from './component/search/SearchForm';
import Collection from './component/collection/Collection';
import Movie from './component/movies/Movie';
import Genres from './component/genres/Genres';
import GenresSeries from './component/genres/GenresSeries';
import Profil from './component/profil/Profil';
import StaffAndActors from './component/staffAndActors/StaffAndActors';
import Series from './component/series/Series';
import Season from './component/series/Season';
import Seasons from './component/series/Seasons';
import SearchResults from './component/search/SearchResults';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import Alerts from './component/layout/Alerts';


// * Import Context
import FavoriteState from './context/favorite/FavoriteState';
import SearchState from './context/search/SearchState';
import MoviesState from './context/movies/MoviesState';
import SeriesState from './context/series/SeriesState';
import PeopleState from './context/people/PeopleState';
import ConfigurationState from './context/configuration/ConfigurationState';
import UserState from './context/user/UserState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';


const App = () => {
  return (
    <AuthState>
      <ConfigurationState>
        <UserState>
          <SearchState>
            <MoviesState>
              <SeriesState>
                <PeopleState>
                  <FavoriteState>
                    <AlertState>
                      <Router>
                        <Fragment>
                          <Navbar />
                          <div className="app">
                            <SearchForm />
                            <Alerts />
                            <Switch>
                              <Route exact path="/" component={Home} />
                              <Route exact path="/register" component={Register} />
                              <Route exact path="/login" component={Login} />
                              <Route exact path="/search/query=:text" component={SearchResults} />
                              <Route exact path="/about" component={About} />
                              <Route exact path="/movie/:movieId" component={Movie} />
                              <Route exact path="/series/:seriesId" component={Series} />
                              <Route exact path="/series/:seriesId/season/:seasonNumber" component={Season} />
                              <Route exact path="/series/:seriesId/seasons/" component={Seasons} />
                              <Route exact path="/profil" component={Profil} />
                              <Route exact path="/collection/:collectionId" component={Collection} />
                              <Route exact path="/genre/:genreId" component={Genres} />
                              <Route exact path="/genre/series/:genreSeriesId" component={GenresSeries} />
                              <Route exact path="/staffAndActors/:actorsId" component={StaffAndActors} />
                            </Switch>   
                          </div> 
                        </Fragment>
                      </Router>  
                    </AlertState>
                  </FavoriteState>
                </PeopleState>  
              </SeriesState>
            </MoviesState>  
          </SearchState>  
        </UserState>
      </ConfigurationState>  
    </AuthState>
  );
}

export default App;
