import React, {Component} from 'react';
const evtNames = ['dragend'];
let latestPosition = {};
class NewLocationMarker extends Component{
    constructor(){
        super();
        this.state= {markerConfirmedPosition:{}};
    }
    camelize(word) {
        const str = JSON.stringify(word);
        let eventName = '';
        for (let char of str) {
            if (char !== '"') {
                eventName = eventName + char
            }
        }
        const event = eventName.charAt(0).toUpperCase() + eventName.slice(1);
        return event;
    }
    componentDidUpdate(nextProps,prevProps) {
        if (this.marker) {
            this.marker.setMap(null);
        }
        if (this.marker && !this.props.addNew && this.props.addNew !== nextProps.addNew){
            this.marker.setMap(null);
        }
        if (this.props.confirmed){
            this.getLatestPosition();
            this.renderNewBin(latestPosition)
        }
        if (this.props.map !== nextProps.map ||
            this.props.newBinLocation !== prevProps.newBinLocation
            && this.props.addNew && !this.props.confirmed
        ) {
            this.renderNewBin(this.props.newBinLocation)
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
            draggable:true,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        };
        this.marker = new google.maps.Marker(pref);
        evtNames.map(e => {
            this.marker.addListener(e, this.handleEvent(e));
        });
    }
    handleEvent(evt) {
        return (e) => {
            const evtName = `on${this.camelize(evt)}`;
            if (this.props[evtName]) {
                this.props[evtName](this.props, this.props.map, e);
            }
        }
    }
    getLatestPosition(){
        if(this.marker){
            const lat = this.marker.getPosition().lat();
            const lng = this.marker.getPosition().lng();
            const currentMarkerLocation = {lat:lat,lng:lng};
            latestPosition = currentMarkerLocation
        }
    }
    render(){
        return null;
    }
}
NewLocationMarker.propTypes = {
    onDragend : React.PropTypes.func
};
NewLocationMarker.defaultProps = {
    onDragend () {}
};
export default NewLocationMarker;
