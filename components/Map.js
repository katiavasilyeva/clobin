import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar'
class GoogleMap extends React.Component {
    //passes down state to all of the children
    renderChildren() {
        const {children} = this.props;
        if (!children) return(null);
        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.props.currentLocation
            });
        })
    }
    // tell the map when to update
    componentDidUpdate(prevProps) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevProps.currentLocation !== this.props.currentLocation) {
            this.recenterMap();
        }
    }
    // re-centers map to current location
    recenterMap() {
        const map = this.map;
        const curr = this.props.currentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng);
            map.panTo(center)
        }
    }
    // loads the map
    loadMap() {
        if (this.props && this.props.google) {
            // google is available
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let {zoom} = this.props;
            const {lat, lng} = this.props.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            });
            this.map = new maps.Map(node, mapConfig);
        }
    }

    // renders the component
    render() {
        const style = {
            width: '100%',
            height: '100vh',
            position: 'relative'
        };
        return (
        <div>
            <SearchBar
                google = {this.props.google}
                map = {this.map}
                onSearchedAddress={this.props.onSearchedAddress }
            />
            <div
                style={style}
                ref='map'>
                Loading map...
                {this.renderChildren()}
            </div>
        </div>
        )
    }

}
GoogleMap.propTypes = {
    google: React.PropTypes.object,
    zoom: React.PropTypes.number
};
GoogleMap.defaultProps = {
    zoom: 13
};
export default GoogleMap