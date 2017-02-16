import React from 'react';
import GoogleMap from './Map'
import {GoogleApiWrapper} from 'google-maps-react'

export class MapContainer extends React.Component {

    render() {

        return (
            <div>
                <GoogleMap google={this.props.google} />
            </div>
        )
    }
}
export default GoogleApiWrapper({
    apiKey:  'AIzaSyDySZz45rznaB9fi5BL3FNpOJ0n_T3mhEo',
    libraries: ['places','visualization']
})(MapContainer)

