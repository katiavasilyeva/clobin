import React,{Component} from 'react';

class SubmitNewLocation extends Component{
    render(){
        if(this.props.showComponent){
            return(
                <button style ={{background:'#71C3B3'}}
                >
                    Confirm Box Location
                </button>
                )
        }else{
            return null;
        }
    }

}

export default SubmitNewLocation