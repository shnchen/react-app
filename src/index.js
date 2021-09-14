import React from 'react';
import  {render} from 'react-dom';
import {HashRouter,Switch,Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import routes from './route';
const App = () => {
    return <div id="app">
        <Provider store={store}>
        <HashRouter>
            <Switch>
                {routes.map(item=> <Route path={item.path} component={item.component} exact={item.exact} key={item.path} />)}
            </Switch>
        </HashRouter>
        </Provider>
    </div>
}

render(<App />, document.querySelector('#root'));