import React from 'react';
import '../css/tile.css';

class Tile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value : this.props.isBomb ? 'B' : ''
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onTileClick(this);
    }

    render() {
        return (
            <span className="tile">
                <button onClick={this.handleClick}>
                    {this.state.value}
                </button>
            </span>
        );
    }
}

export default Tile;