import React,{Component} from 'react';

class ConfirmNewLocation extends Component{
    render(){
        if(this.props.addNewLocation && this.props.newBoxLocationLength !==0 && !this.props.newLocationSubmitted){
            return(
                <button style ={{background:'#71C3B3'}}
                onClick={()=>this.props.onConfirmNewLocation()}>
                    Confirm Box Location
                </button>
                )
        }
        else{
            return null;
        }
    }
}

export default ConfirmNewLocation