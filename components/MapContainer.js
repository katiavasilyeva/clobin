import React from 'react';
import GoogleMap from './Map'
import {GoogleApiWrapper} from 'google-maps-react'
import Marker from './Marker'
import Boxes from './Boxes'

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
            updatePositionMarker:true
        };
        this.onSearchedAddress = this.onSearchedAddress.bind(this);
        this.onBoxSelect = this.onBoxSelect.bind(this);
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
                           updatePositionMarker = {this.state.updatePositionMarker}
                >
                    <Marker />
                    <Boxes
                        onBoxSelect = {(box)=>this.onBoxSelect(box)}
                    />
                </GoogleMap>
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
        this.setState({
            selectedBox: boxClicked,
            zoom:18,
            currentLocation:boxClicked.position,
            updatePositionMarker:false
        });
    }
}
export default GoogleApiWrapper({
    apiKey:  'AIzaSyDySZz45rznaB9fi5BL3FNpOJ0n_T3mhEo',
    libraries: ['places','visualization']
})(MapContainer)

