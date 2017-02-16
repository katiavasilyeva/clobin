import React from 'react';
import GoogleMap from './Map'
import {GoogleApiWrapper} from 'google-maps-react'
import Marker from './Marker'

export class MapContainer extends React.Component {

    render() {
        const pos = {lat: 37.759703, lng: -122.428093};

        return (
            <div>
                <GoogleMap google={this.props.google}>
                    <Marker />
                    <Marker position={pos} />
                </GoogleMap>
            </div>
        )
    }
}
export default GoogleApiWrapper({
    apiKey:  'AIzaSyDySZz45rznaB9fi5BL3FNpOJ0n_T3mhEo',
    libraries: ['places','visualization']
})(MapContainer)

