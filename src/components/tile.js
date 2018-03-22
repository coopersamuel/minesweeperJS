import React from 'react';
import '../css/tile.css';

class Tile extends React.Component {
    render() {
        let tileColors = {
            backgroundColor : '#3a3a3a'
        }

        let valueColor = this.props.isBomb ? 'red' : '#797979';

        if (this.props.wasClicked) {
            tileColors = {
                color : valueColor,
                backgroundColor : '#4e4d4d'
            }
        }

        if (this.props.hasFlag) {
            tileColors = {
                color : '#4643D6',
                backgroundColor : '#3a3a3a'
            }
        }

        return (
            <span className="tile">
                <button disabled={this.props.wasClicked} style={tileColors} onClick={() => {
                    this.props.onTileClick.call(this.props.board, this);
                }} onContextMenu={(event) => {
                    event.preventDefault();
                    this.props.onRightClick.call(this.props.board, this);
                }}>
                    {this.props.value}
                </button>
            </span>
        );
    }
}

export default Tile;