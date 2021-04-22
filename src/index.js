import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import routes from './route';  
const App = () =>  (
        <div id="app">
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        {routes.map(item=> (
                        <Route
                            path={item.path}
                            component={item.component}
                            exact={item.exact}
                            key={item.path} />
                            )
                        )}
                    </Switch>
                </BrowserRouter>
            </Provider>
        </div>
    )


hydrate(<App />, document.querySelector('#root'));