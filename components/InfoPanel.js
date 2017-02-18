import React, {Component} from 'react';

class InfoPanel extends Component {
    render() {
        if (this.props.confirmedNewLocation && this.props.addNewLocation) {
            return (
                <div
                style ={{background:'grey',height:75}}>
                    <div>confirmed location address goes here</div>
                    <button>
                        SUBMIT
                    </button>
                    <button
                        onClick={()=>this.props.onCancelAddNewLocation()}>
                        CANCEL
                    </button>
                </div>)
        }
        else if (this.props.selectedBoxLength !== 0  && !this.props.confirmedNewLocation){
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
        else{
            return null;
        }

}}

export default InfoPanel
