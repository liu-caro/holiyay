import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Upload from './upload';
import Gallery from './gallery';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";



class App extends Component {
    render() {
        return (
            <Router>
                <ThemeProvider>
                    <CSSReset />
                <div>
                    <Switch>
                        <Route exact path='/' component={Upload} />
                        <Route path="/upload" component={Upload} exact={true} />
                        <Route path="/gallery" component={Gallery} exact={true} />
                    </Switch>
                </div>
                </ThemeProvider>
            </Router>
        );
    }
}

export default App;
