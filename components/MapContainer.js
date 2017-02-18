import React from 'react';
import GoogleMap from './Map'
import {GoogleApiWrapper} from 'google-maps-react'
import Marker from './Marker'
import Boxes from './Boxes'
import InfoPanel from './InfoPanel'
import NewLocationMarker from './NewLocationMarker'

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
            updatePositionMarker:true,
            addNewLocation:false,
            newBoxLocation:{}
        };
        this.onSearchedAddress = this.onSearchedAddress.bind(this);
        this.onBoxSelect = this.onBoxSelect.bind(this);
        this.onInfoPanelClose = this.onInfoPanelClose.bind(this);
        this.onAddNewLocation = this.onAddNewLocation.bind(this);
        this.getNewBoxLocation = this.getNewBoxLocation.bind(this);
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
                           addNewLocation = {this.state.addNewLocation}
                           getNewBoxLocation = {(newLocation)=>this.getNewBoxLocation(newLocation)}
                           newBoxLocation = {this.state.newBoxLocation}>
                    <Marker />
                    <NewLocationMarker

                    />
                    <Boxes
                        onBoxSelect = {(box)=>this.onBoxSelect(box)}/>
                </GoogleMap>
                <button
                    style={{background:'yellow'}}
                    onClick={this.onAddNewLocation}>
                    Add Missing Location
                </button>
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
        const zoom =19;
        this.setState({
            currentLocation:position,
            zoom:zoom,
            updatePositionMarker:true
        });
    }
    onBoxSelect(box) {
        const boxClicked = {
            content: box.content,
            position: box.position,
        };
        const zoom=19;
        const boxLength = boxClicked.length;
        this.setState({
            selectedBox: boxClicked,
            zoom:zoom,
            currentLocation:boxClicked.position,
            updatePositionMarker:false,
            hideInfoPanel:false,
            selectedBoxLength:boxLength
        });
    }
    onInfoPanelClose(){
        this.setState({hideInfoPanel:true})
    }
    onAddNewLocation(){
        this.setState({addNewLocation:true,updatePositionMarker:false,});
    }
    getNewBoxLocation(newLocation){
        this.setState({newBoxLocation:newLocation,updatePositionMarker:false,});
    }
}
export default GoogleApiWrapper({
    apiKey:  'AIzaSyDySZz45rznaB9fi5BL3FNpOJ0n_T3mhEo',
    libraries: ['places','visualization']
})(MapContainer)

