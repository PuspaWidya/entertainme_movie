import './App.css';
import { ApolloProvider } from '@apollo/client/react';
import Homepage from './components/homepage'
import client from './config/graphql'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddMovie from './components/Add'
import Edit from './components/EditMovie'
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/lux/bootstrap.min.css";
import Navbar from './components/Navbar'
import Page from './components/page'
import Favorite from './components/Favorite'
import Hero from './components/Hero'
import HeroMovie from './components/heroMovie'




function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app">
      <Router>
        <Navbar/>
        <Switch>
           <Route exact path="/add">
               <AddMovie/>
          </Route>

          <Route path="/movie/:id">
               <Page/>
          </Route>

          <Route exact path="/movie">
               <HeroMovie/>
               <Homepage/>
          </Route>

           <Route path="/edit/:id">
               <Edit/>
          </Route>

          <Route path="/favorite">
               <Favorite/>
          </Route>

          <Route exact path="/">
            <Hero/>
            <Home/>
          </Route>
        </Switch>
      </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
