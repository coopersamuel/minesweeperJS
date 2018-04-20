import React from 'react';

class Tile extends React.Component {
    render() {
        let tileColor;

        if (this.props.hasFlag) {
            tileColor = 'flag-tile';
        } else if (this.props.wasClicked) {
            tileColor = this.props.isBomb ? 'bomb-tile' : 'clicked-tile';
        } else {
            tileColor = '';
        }

        return (
            <span className="tile">
                <button className={`mdc-button mdc-button--unelevated tile-button normal-tile ${tileColor}`}
                        disabled={this.props.wasClicked}
                        onClick={() => {
                            this.props.onTileClick.call(this.props.board, this.props.row, this.props.column);
                        }} 
                        onContextMenu={(event) => {
                            event.preventDefault();
                            this.props.onRightClick.call(this.props.board, this.props.row, this.props.column);
                        }}>
                    {this.props.value}
                </button>
            </span>
        );
    }
}

export default Tile;