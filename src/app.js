import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import {Provider} from 'react-redux'
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import {} from './functions'
import {} from './redux/actions'

import SettingsPage from './components/SettingsPage'
import WelcomePage from './components/WelcomePage'
import PlayingPage from './components/PlayingPage'
import Header from './components/Header'

import configureStore from './redux/configureStore'



//React-Router paths
const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Route path='/' component={Header}/>
            <Switch>
                <Route path='/' exact component={WelcomePage} />
                <Route path='/settings' component={SettingsPage} />
                <Route path='/playing' component={PlayingPage} />
            </Switch>
        </div>
    </BrowserRouter>
)




//Redux Store
const store = configureStore()

store.subscribe(()=>{
    // console.log(store.getState());
})







const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)


ReactDOM.render(jsx, document.getElementById('app'));
