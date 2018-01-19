import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

import './css/style.css';

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
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App;