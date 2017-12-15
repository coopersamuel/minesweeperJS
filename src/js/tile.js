import React from 'react';
import '../css/tile.css';

class Tile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value : this.props.isBomb ? 'B' : ''
        }
    }

    render() {
        return (
            <span className="tile">
                <button onClick={() => {
                    this.props.onTileClick.call(this.props.board, this);
                }}>
                    {this.state.value}
                </button>
            </span>
        );
    }
}

export default Tile;