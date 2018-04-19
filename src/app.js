import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import { MDCRipple } from '@material/ripple';
import { FaGithub, FaLinkedin } from 'react-icons/lib/fa'

import './css/style.scss';

class App extends React.Component {
    render() {
        let store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());       

        return (
            <div>
                <header className="mdc-top-app-bar top-bar">
                    <div className="mdc-top-app-bar__row">
                        <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start top-bar-title-container">
                            <span className="mdc-top-app-bar__title title">MINESWEEPERJS</span>
                        </section>
                        <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end top-bar-button-container" role="toolbar">
                            <a href="https://github.com/coopersamuel" className="mdc-button top-bar-button">
                                <FaGithub className="mdc-button__icon" />
                            </a>
                            <a href="https://www.linkedin.com/in/samuel-cooper-b81945a5/" className="mdc-button top-bar-button">
                                <FaLinkedin className="mdc-button__icon" />
                            </a>
                        </section>
                    </div>
                </header>
                <div className="content mdc-layout-grid">
                    <Provider store={store}>
                        <Board numberOfRows={10} numberOfColumns={10} numberOfBombs={20} />
                    </Provider>
                    <div className="foo-button mdc-button">Hello World!</div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        // Attach a ripple to all buttons in the application
        let btns = document.querySelectorAll('.mdc-button');
        for (var i = 0, btn; btn = btns[i]; i++) {
            let ripple = new MDCRipple(btn);
        }
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App;