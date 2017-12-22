import React from 'react';
import ReactDOM from 'react-dom';
import Board from './board';

import '../css/style.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <h3 className="title">Minesweeper</h3>
                <div className="board">
                    <Board numberOfRows={10} numberOfColumns={10} numberOfBombs={10} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App;