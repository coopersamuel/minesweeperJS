import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import { MDCRipple } from '@material/ripple';

import './css/style.scss';

class App extends React.Component {
    render() {
        let store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());       

        return (
            <div>
                <div className="title-bar">
                    <h3 className="title">Minesweeper</h3>
                </div>
                <div className="content">
                    <div className="board">
                        <Provider store={store}>
                            <Board numberOfRows={10} numberOfColumns={10} numberOfBombs={20} />
                        </Provider>
                    </div>
                    <div className="foo-button mdc-button">Hello World!</div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const ripple = new MDCRipple(document.querySelector('.foo-button')); 
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App;