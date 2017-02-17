import React, {Component} from 'react';
import firebase from 'firebase';
class Boxes extends Component{
    constructor(){
        super();
        this.state={boxes:[]}
    }

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
    renderMarker() {
        let {
            map, google
        } = this.props;
        const boxMarkers = this.state.boxes.map((box) => {
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
        });
    }
    render(){
        return null;
    }
}

export default Boxes