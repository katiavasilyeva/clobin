import React from 'react';
import GoogleMap from './Map'
import {GoogleApiWrapper} from 'google-maps-react'
import Marker from './Marker'

export class MapContainer extends React.Component {
    constructor(){
        super();
        this.state = {currentLocation:{lat: 37.759703, lng: -122.428093}, zoom:17};
        this.onSearchedAddress = this.onSearchedAddress.bind(this);
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
                           onSearchedAddress={this.onSearchedAddress}>
                    <Marker />
                    <Marker position={this.state.currentLocation} />
                </GoogleMap>
            </div>
        )
    }
    onSearchedAddress(position){
        this.setState({currentLocation:position, zoom:19});

    }
}
export default GoogleApiWrapper({
    apiKey:  'AIzaSyDySZz45rznaB9fi5BL3FNpOJ0n_T3mhEo',
    libraries: ['places','visualization']
})(MapContainer)

