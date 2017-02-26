import React, {Component} from 'react';

class InfoPanel extends Component {
    render() {
        if (this.props.confirmedNewLocation && this.props.addNewLocation && !this.props.hideInfoPanel) {
            if(this.props.newLocationSubmitted){
                return(
                    <div style ={{background:'grey',height:75, color:'white'}}>
                        Location successfully submitted!
                        <button onClick={this.props.onInfoPanelClose}>
                            X
                        </button>
                    </div>
                )} else{
                return (
                <div
                style ={{background:'grey',height:75}}>
                    <div>confirmed location address goes here</div>
                    <form>
                        <div>
                            <input
                                type="text"
                                placeholder="Drop Box Name or Operator"/>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Additional Comments"/>
                        </div>

                    </form>
                    <button onClick={()=>this.props.onSubmitNewBoxLocation()}>
                        SUBMIT
                    </button>
                    <button
                        onClick={()=>this.props.onCancelAddNewLocation()}>
                        CANCEL
                    </button>
                </div>)}
        }
        else if (this.props.selectedBoxLength !== 0 && !this.props.hideInfoPanel && !this.props.addNewLocation){
            const address = this.props.selectedBox.content[0];
            const operator = this.props.selectedBox.content[1];
            const source = this.props.selectedBox.content[2];
            return (
                <div
                    style={{background:'grey'}}>
                    <div>Address: {address}</div>
                    <div>Operating Name: {operator}</div>
                    <div>Source: {source}</div>
                    <button >
                        Navigate
                    </button>
                    <button
                        onClick={this.props.onInfoPanelClose}>
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
