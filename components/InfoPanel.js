import React, {Component} from 'react';

class InfoPanel extends Component {
    render() {
        if (this.props.selectedBoxLength === 0 || this.props.hideInfoPanel){
            return null;
        }
        else{
            const address = this.props.selectedBox.content[0];
        const operator = this.props.selectedBox.content[1];
        return (
            <div
            style={{background:'grey'}}>
                <div>Address: {address}</div>
                <div>Operator: {operator}</div>
                <button >
                    Navigate
                </button>
                <button
                    onClick={this.props.onInfoPanelClose}
                >
                    X
                </button>

            </div>
        )
    }

}}

export default InfoPanel
