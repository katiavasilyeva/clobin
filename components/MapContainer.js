import React from 'react';
import GoogleMap from './Map'
import {GoogleApiWrapper} from 'google-maps-react'
import Marker from './Marker'
import Boxes from './Boxes'
import InfoPanel from './InfoPanel'

export class MapContainer extends React.Component {
    constructor(){
        super();
        this.state = {
            currentLocation:{
                lat: 37.759703,
                lng: -122.428093
            },
            zoom:15,
            selectedBox:{},
            selectedBoxLength:0,
            hideInfoPanel:true,
            updatePositionMarker:true
        };
        this.onSearchedAddress = this.onSearchedAddress.bind(this);
        this.onBoxSelect = this.onBoxSelect.bind(this);
        this.onInfoPanelClose = this.onInfoPanelClose.bind(this);
    }
    componentDidMount() {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const coords = position.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                })
            })
        }
    }
    render() {
        return (
            <div>
                <GoogleMap google={this.props.google}
                           zoom = {this.state.zoom}
                           currentLocation={ this.state.currentLocation }
                           onSearchedAddress={this.onSearchedAddress}
                           updatePositionMarker = {this.state.updatePositionMarker}>
                    <Marker />
                    <Boxes
                        onBoxSelect = {(box)=>this.onBoxSelect(box)}
                    />
                </GoogleMap>
                <InfoPanel
                    hideInfoPanel = {this.state.hideInfoPanel}
                    selectedBox = {this.state.selectedBox}
                    selectedBoxLength = {this.state.selectedBoxLength}
                    onInfoPanelClose = {()=>this.onInfoPanelClose()}
                />
            </div>
        )
    }
    onSearchedAddress(position){
        this.setState({
            currentLocation:position,
            zoom:19,
            updatePositionMarker:true
        });
    }
    onBoxSelect(box) {
        const boxClicked = {
            content: box.content,
            position: box.position,
        };
        const boxLength = boxClicked.length;
        this.setState({
            selectedBox: boxClicked,
            zoom:18,
            currentLocation:boxClicked.position,
            updatePositionMarker:false,
            hideInfoPanel:false,
            selectedBoxLength:boxLength
        });
    }
    onInfoPanelClose(){
        this.setState({hideInfoPanel:true})
    }
}
export default GoogleApiWrapper({
    apiKey:  'AIzaSyDySZz45rznaB9fi5BL3FNpOJ0n_T3mhEo',
    libraries: ['places','visualization']
})(MapContainer)

