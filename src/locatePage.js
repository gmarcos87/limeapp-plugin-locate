import { h, Component } from 'preact';
import style from './style.less';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { loadLocation, changeLocation, setUserLocation } from './locateActions';
import { getLocation, getUserLocation, getSelectedHost } from './locateSelectors';

import { Map, Marker, Popup, LayersControl, TileLayer } from 'react-leaflet';
import { GoogleLayer } from 'react-leaflet-google';

const { BaseLayer } = LayersControl;
const key = 'AIzaSyBS0M7H7Ltk1ipjwqi8r9_WQJOzWfav4Ok	';
const hybrid = 'HYBRID';
const road = 'ROADMAP';

import L from 'leaflet';

/*
 * Fix issue leaflet+webpack
 * https://github.com/Leaflet/Leaflet/issues/4968
*/
L.Icon.Default.imagePath = '.';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});



class Locate extends Component {
  constructor(props){
    super(props);
    this.state = {
      draggable: false
    };
    
  }

  componentWillMount() {
    this.props.loadLocation();
    this.requestCurrentPosition();
  }

  updatePosition(e) {
    let { lat, lng } = e.target._latlng;
    this.props.changeLocation({lat: lat.toFixed(5),lon:lng.toFixed(5)});
  }

  requestCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location)=>{
        this.props.setUserLocation({lat:location.coords.latitude,lon:location.coords.longitude});
      });
    }
  }

  toggleDraggable() {
    this.setState({draggable: !this.state.draggable});
  }

  render({ user }, { time, count }) {


    return (
        <Map center={[this.props.stationLocation.lat,this.props.stationLocation.lon]} zoomControl={false} zoom={16} style={{width:'100vw', height: '100vh'}} layers={[]}>
          <LayersControl position={'bottomright'}>
              <BaseLayer checked name='OpenStreetMap.Mapnik'>
                <TileLayer
                  attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
              </BaseLayer>
              <BaseLayer  name='Google Maps Hybrid'>
                <GoogleLayer googlekey={key}  maptype={hybrid} />
              </BaseLayer>
          </LayersControl>
          <Marker
            onDragend={this.updatePosition.bind(this)}
            position={[this.props.stationLocation.lat,this.props.stationLocation.lon]}
            draggable={this.state.draggable}>
              <Popup>
                <span>
                  <strong>{window.I18n.t('Station')} </strong> {this.props.stationHostname}<br/>
                  <span onClick={this.toggleDraggable.bind(this)}>
                      {this.state.draggable ? (<u>{window.I18n.t('MOVE TO NEW POSITION')}</u>) : (<u>{window.I18n.t('PRES TO ENABLE CHANGES')}</u>)}
                  </span>
                </span>
              </Popup>
          </Marker>
          <Marker
            position={[this.props.userLocation.lat,this.props.userLocation.lon]}
            draggable={false}>
              <Popup>
                <span>
                  <strong>{window.I18n.t('User')}</strong>
                </span>
              </Popup>
          </Marker>
        </Map>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stationLocation: getLocation(state),
    userLocation: getUserLocation(state),
    stationHostname: getSelectedHost(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadLocation: bindActionCreators(loadLocation, dispatch),
    changeLocation : bindActionCreators(changeLocation, dispatch),
    setUserLocation : bindActionCreators(setUserLocation, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Locate);