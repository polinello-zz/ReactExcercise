import './App.css';
import SearchForm from './components/SearchForm';
import { Container } from 'react-bootstrap';
import DetailShow from './components/DetailShow';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
function App() {
    return (
        <Router>
            <Container>
                <Switch>
                    <Route exact path="/">
                        <SearchForm />
                    </Route>
                    <Route path='/:id'>
                        <DetailShow />
                    </Route>
                </Switch>
            </Container>
        </Router >
    );
}

export default App;

