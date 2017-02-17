import React, {Component} from 'react';
import firebase from 'firebase';
const evtNames = [ 'click','mouseover', 'dragend'];

class Boxes extends Component{
    constructor(){
        super();
        this.state={
            boxes:[],
        }
    };
    componentDidMount(){
        const firebaseRef = firebase.database().ref('boxes');
        const boxes = [];
        firebaseRef.on('child_added',(snapshot)=>{
            const newLocation = {
                position:snapshot.val().position,
                content:[snapshot.val().fullAddress,snapshot.val().operatingName],
                icon:'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
            };
            boxes.push(newLocation);
            if(boxes.length >= 580){
                this.setState({boxes: boxes});

            }
            // render markers when there is something to render
            if(this.state.boxes.length > 0){
                this.renderMarker();
            }
        })
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
    renderMarker() {
        let {
            map, google
        } = this.props;
        const boxMarkers = this.state.boxes.map((box,i) => {
            const newMarker = {
                content: box.content,
                pos: box.position,
                icon: box.icon
            };
            const position = new google.maps.LatLng(newMarker.pos.lat, newMarker.pos.lng);
            const pref = {
                map: map,
                position: position,
                icon: newMarker.icon,
                content: newMarker.content,
                clickable: true
            };
            this.marker = new google.maps.Marker(pref);
            evtNames.map(e => {
                this.marker.addListener(e, this.handleEvent(e,i));
            });
        });
    }
    handleEvent(evt,i) {
        return () => {
            const evtName = `on${this.camelize(evt)}`;
            if (this.props[evtName]) {
                this.props[evtName](this.state.boxes[i]);
                const boxClicked = this.state.boxes[i];
                this.props.onBoxSelect(boxClicked);
            }
        }
    }
    render(){
        return null;
    }
}
Boxes.propTypes = {
    onClick: React.PropTypes.func
};
Boxes.defaultProps = {
    onClick () {}
};
export default Boxes