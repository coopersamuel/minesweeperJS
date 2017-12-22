import React from 'react';
import '../css/tile.css';

class Tile extends React.Component {
    render() {
        return (
            <span className="tile">
                <button disabled={this.props.wasClicked} onClick={() => {
                    this.props.onTileClick.call(this.props.board, this);
                }}>
                    {this.props.value}
                </button>
            </span>
        );
    }
}

export default Tile;