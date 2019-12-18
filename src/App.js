import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Upload from './upload';
import Gallery from './gallery'



class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path='/' component={Upload} />
                        <Route path="/upload" component={Upload} exact={true} />
                        <Route path="/gallery" component={Gallery} exact={true} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
