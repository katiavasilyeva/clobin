import React, {Component} from 'react';
class NewLocationMarker extends Component{
    componentDidUpdate(nextProps){
        if (this.marker) {
            this.marker.setMap(null);
        }
        if( this.props.map!== nextProps.map ||
            this.props.newBinLocation !== nextProps.newBinLocation
            && this.props.addNew){
            this.renderNewBin(this.props.newBinLocation);
        }
    }
    renderNewBin(location){
        let {
            map, google
        } = this.props;
        let pos = location;
        const position = new google.maps.LatLng(pos.lat, pos.lng);
        const pref = {
            map: map,
            position: position,
        };
        this.marker = new google.maps.Marker(pref);
    }

    render(){
        return null;
    }
}
export default NewLocationMarker;
