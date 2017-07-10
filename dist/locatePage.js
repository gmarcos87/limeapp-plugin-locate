'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _style = require('./style.less');

var _style2 = _interopRequireDefault(_style);

var _reactLoadScript = require('react-load-script');

var _reactLoadScript2 = _interopRequireDefault(_reactLoadScript);

var _redux = require('redux');

var _preactRedux = require('preact-redux');

var _locateActions = require('./locateActions');

var _locateSelectors = require('./locateSelectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var key = 'AIzaSyBS0M7H7Ltk1ipjwqi8r9_WQJOzWfav4Ok';

var L = void 0;

var Locate = function (_Component) {
  _inherits(Locate, _Component);

  function Locate(props) {
    _classCallCheck(this, Locate);

    var _this = _possibleConstructorReturn(this, (Locate.__proto__ || Object.getPrototypeOf(Locate)).call(this, props));

    _this.state = {
      scriptLoaded: false,
      scriptError: false
    };

    return _this;
  }

  _createClass(Locate, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.loadLocation();
      this.requestCurrentPosition();
    }
  }, {
    key: 'updatePosition',
    value: function updatePosition(e) {
      var _e$target$_latlng = e.target._latlng,
          lat = _e$target$_latlng.lat,
          lng = _e$target$_latlng.lng;

      this.props.changeLocation({ lat: lat.toFixed(5), lon: lng.toFixed(5) });
    }
  }, {
    key: 'requestCurrentPosition',
    value: function requestCurrentPosition() {
      var _this2 = this;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (location) {
          _this2.props.setUserLocation({ lat: location.coords.latitude, lon: location.coords.longitude });
        });
      }
    }
  }, {
    key: 'handleScriptCreate',
    value: function handleScriptCreate() {
      this.setState({ scriptLoaded: false });
    }
  }, {
    key: 'handleScriptError',
    value: function handleScriptError() {
      this.setState({ scriptError: true });
    }
  }, {
    key: 'handleScriptLoad',
    value: function handleScriptLoad() {
      var _this3 = this;

      this.setState({ scriptLoaded: true });
      L = window.L;

      var map = this.map = L.map('map').setView([this.props.stationLocation.lat, this.props.stationLocation.lon], 13);

      import('leaflet.gridlayer.googlemutant').then(function () {

        var satellite = L.gridLayer.googleMutant({ type: 'satellite' });
        var hybrid = L.gridLayer.googleMutant({ type: 'hybrid' });
        var base = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

        L.control.layers({
          "Open Streat Map": base,
          "Google Maps Satellite": satellite,
          "Google Maps Hybrid": hybrid
        }, {}, { position: 'bottomright' }).addTo(map);
      });

      L.Icon.Default.imagePath = '.';
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png')
      });

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      var popupNode = L.popup().setLatLng([this.props.stationLocation.lat, this.props.stationLocation.lon]).setContent('<strong>' + window.I18n.t('Station') + ' </strong> ' + this.props.stationHostname + '<br/>\n          <span">\n              ' + window.I18n.t('MOVE TO NEW POSITION') + '\n          </span>\n        </span>');

      var marker = this.marker = L.marker([this.props.stationLocation.lat, this.props.stationLocation.lon], {
        draggable: true
      }).addTo(map).on('click', function (x) {
        return map.setView(x.target._latlng);
      }).on('drag', function (x) {
        return map.setView(x.target._latlng);
      }).on('moveend', function (x) {
        return _this3.updatePosition(x);
      }).bindPopup(popupNode);
    }
  }, {
    key: 'isLoaded',
    value: function isLoaded(exist) {
      if (exist === true) {
        return (0, _preact.h)('div', null);
      }
      return (0, _preact.h)(
        'div',
        null,
        'Loading...'
      );
    }
  }, {
    key: 'rerenderMap',
    value: function rerenderMap(latlon) {
      if (this.state.scriptLoaded === true) {
        this.map.setView([latlon.lat, latlon.lon]);
        this.marker.setLatLng([latlon.lat, latlon.lon]);
      }
    }
  }, {
    key: 'render',
    value: function render(_ref, _ref2) {
      var user = _ref.user;
      var time = _ref2.time,
          count = _ref2.count;

      return (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(_reactLoadScript2.default, {
          url: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet-src.js',
          onCreate: this.handleScriptCreate.bind(this),
          onError: this.handleScriptError.bind(this),
          onLoad: this.handleScriptLoad.bind(this)
        }),
        (0, _preact.h)(_reactLoadScript2.default, { url: "https://maps.googleapis.com/maps/api/js?key=" + key }),
        (0, _preact.h)('div', { id: 'map' }),
        this.isLoaded(this.state.scriptLoaded),
        this.rerenderMap(this.props.stationLocation)
      );
    }
  }]);

  return Locate;
}(_preact.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    stationLocation: (0, _locateSelectors.getLocation)(state),
    userLocation: (0, _locateSelectors.getUserLocation)(state),
    stationHostname: (0, _locateSelectors.getSelectedHost)(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    loadLocation: (0, _redux.bindActionCreators)(_locateActions.loadLocation, dispatch),
    changeLocation: (0, _redux.bindActionCreators)(_locateActions.changeLocation, dispatch),
    setUserLocation: (0, _redux.bindActionCreators)(_locateActions.setUserLocation, dispatch)
  };
};

exports.default = (0, _preactRedux.connect)(mapStateToProps, mapDispatchToProps)(Locate);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2NhdGVQYWdlLmpzIl0sIm5hbWVzIjpbImtleSIsIkwiLCJMb2NhdGUiLCJwcm9wcyIsInN0YXRlIiwic2NyaXB0TG9hZGVkIiwic2NyaXB0RXJyb3IiLCJsb2FkTG9jYXRpb24iLCJyZXF1ZXN0Q3VycmVudFBvc2l0aW9uIiwiZSIsInRhcmdldCIsIl9sYXRsbmciLCJsYXQiLCJsbmciLCJjaGFuZ2VMb2NhdGlvbiIsInRvRml4ZWQiLCJsb24iLCJuYXZpZ2F0b3IiLCJnZW9sb2NhdGlvbiIsImdldEN1cnJlbnRQb3NpdGlvbiIsImxvY2F0aW9uIiwic2V0VXNlckxvY2F0aW9uIiwiY29vcmRzIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJzZXRTdGF0ZSIsIndpbmRvdyIsIm1hcCIsInNldFZpZXciLCJzdGF0aW9uTG9jYXRpb24iLCJ0aGVuIiwic2F0ZWxsaXRlIiwiZ3JpZExheWVyIiwiZ29vZ2xlTXV0YW50IiwidHlwZSIsImh5YnJpZCIsImJhc2UiLCJ0aWxlTGF5ZXIiLCJjb250cm9sIiwibGF5ZXJzIiwicG9zaXRpb24iLCJhZGRUbyIsIkljb24iLCJEZWZhdWx0IiwiaW1hZ2VQYXRoIiwicHJvdG90eXBlIiwiX2dldEljb25VcmwiLCJtZXJnZU9wdGlvbnMiLCJpY29uUmV0aW5hVXJsIiwicmVxdWlyZSIsImljb25VcmwiLCJzaGFkb3dVcmwiLCJhdHRyaWJ1dGlvbiIsInBvcHVwTm9kZSIsInBvcHVwIiwic2V0TGF0TG5nIiwic2V0Q29udGVudCIsIkkxOG4iLCJ0Iiwic3RhdGlvbkhvc3RuYW1lIiwibWFya2VyIiwiZHJhZ2dhYmxlIiwib24iLCJ4IiwidXBkYXRlUG9zaXRpb24iLCJiaW5kUG9wdXAiLCJleGlzdCIsImxhdGxvbiIsInVzZXIiLCJ0aW1lIiwiY291bnQiLCJoYW5kbGVTY3JpcHRDcmVhdGUiLCJiaW5kIiwiaGFuZGxlU2NyaXB0RXJyb3IiLCJoYW5kbGVTY3JpcHRMb2FkIiwiaXNMb2FkZWQiLCJyZXJlbmRlck1hcCIsIm1hcFN0YXRlVG9Qcm9wcyIsInVzZXJMb2NhdGlvbiIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE1BQU0seUNBQVo7O0FBRUEsSUFBSUMsVUFBSjs7SUFFTUMsTTs7O0FBQ0osa0JBQVlDLEtBQVosRUFBa0I7QUFBQTs7QUFBQSxnSEFDVkEsS0FEVTs7QUFFaEIsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLG9CQUFjLEtBREg7QUFFWEMsbUJBQWE7QUFGRixLQUFiOztBQUZnQjtBQU9qQjs7Ozt5Q0FFb0I7QUFDbkIsV0FBS0gsS0FBTCxDQUFXSSxZQUFYO0FBQ0EsV0FBS0Msc0JBQUw7QUFDRDs7O21DQUVjQyxDLEVBQUc7QUFBQSw4QkFDR0EsRUFBRUMsTUFBRixDQUFTQyxPQURaO0FBQUEsVUFDVkMsR0FEVSxxQkFDVkEsR0FEVTtBQUFBLFVBQ0xDLEdBREsscUJBQ0xBLEdBREs7O0FBRWhCLFdBQUtWLEtBQUwsQ0FBV1csY0FBWCxDQUEwQixFQUFDRixLQUFLQSxJQUFJRyxPQUFKLENBQVksQ0FBWixDQUFOLEVBQXFCQyxLQUFJSCxJQUFJRSxPQUFKLENBQVksQ0FBWixDQUF6QixFQUExQjtBQUNEOzs7NkNBRXdCO0FBQUE7O0FBQ3ZCLFVBQUlFLFVBQVVDLFdBQWQsRUFBMkI7QUFDekJELGtCQUFVQyxXQUFWLENBQXNCQyxrQkFBdEIsQ0FBeUMsVUFBQ0MsUUFBRCxFQUFZO0FBQ25ELGlCQUFLakIsS0FBTCxDQUFXa0IsZUFBWCxDQUEyQixFQUFDVCxLQUFJUSxTQUFTRSxNQUFULENBQWdCQyxRQUFyQixFQUE4QlAsS0FBSUksU0FBU0UsTUFBVCxDQUFnQkUsU0FBbEQsRUFBM0I7QUFDRCxTQUZEO0FBR0Q7QUFDRjs7O3lDQUVvQjtBQUNuQixXQUFLQyxRQUFMLENBQWMsRUFBRXBCLGNBQWMsS0FBaEIsRUFBZDtBQUNE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WEgsT0FESjtBQWVEOzs7Ozs7QUFHSCxJQUFNZ0Qsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDekUsS0FBRCxFQUFXO0FBQ2pDLFNBQU87QUFDTHlCLHFCQUFpQixrQ0FBWXpCLEtBQVosQ0FEWjtBQUVMMEUsa0JBQWMsc0NBQWdCMUUsS0FBaEIsQ0FGVDtBQUdMdUQscUJBQWlCLHNDQUFnQnZELEtBQWhCO0FBSFosR0FBUDtBQUtELENBTkQ7O0FBUUEsSUFBTTJFLHFCQUFxQixTQUFyQkEsa0JBQXFCLENBQUNDLFFBQUQsRUFBYztBQUN2QyxTQUFPO0FBQ0x6RSxrQkFBYyw0REFBaUN5RSxRQUFqQyxDQURUO0FBRUxsRSxvQkFBaUIsOERBQW1Da0UsUUFBbkMsQ0FGWjtBQUdMM0QscUJBQWtCLCtEQUFvQzJELFFBQXBDO0FBSGIsR0FBUDtBQUtELENBTkQ7O2tCQVFlLDBCQUFRSCxlQUFSLEVBQXlCRSxrQkFBekIsRUFBNkM3RSxNQUE3QyxDIiwiZmlsZSI6ImxvY2F0ZVBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHN0eWxlIGZyb20gJy4vc3R5bGUubGVzcyc7XG5cbmltcG9ydCBTY3JpcHQgZnJvbSAncmVhY3QtbG9hZC1zY3JpcHQnO1xuXG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgbG9hZExvY2F0aW9uLCBjaGFuZ2VMb2NhdGlvbiwgc2V0VXNlckxvY2F0aW9uIH0gZnJvbSAnLi9sb2NhdGVBY3Rpb25zJztcbmltcG9ydCB7IGdldExvY2F0aW9uLCBnZXRVc2VyTG9jYXRpb24sIGdldFNlbGVjdGVkSG9zdCB9IGZyb20gJy4vbG9jYXRlU2VsZWN0b3JzJztcblxuY29uc3Qga2V5ID0gJ0FJemFTeUJTME03SDdMdGsxaXBqd3FpOHI5X1dRSk96V2ZhdjRPayc7XG5cbmxldCBMO1xuXG5jbGFzcyBMb2NhdGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzY3JpcHRMb2FkZWQ6IGZhbHNlLFxuICAgICAgc2NyaXB0RXJyb3I6IGZhbHNlXG4gICAgfTtcbiAgICBcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLmxvYWRMb2NhdGlvbigpO1xuICAgIHRoaXMucmVxdWVzdEN1cnJlbnRQb3NpdGlvbigpO1xuICB9XG5cbiAgdXBkYXRlUG9zaXRpb24oZSkge1xuICAgIGxldCB7IGxhdCwgbG5nIH0gPSBlLnRhcmdldC5fbGF0bG5nO1xuICAgIHRoaXMucHJvcHMuY2hhbmdlTG9jYXRpb24oe2xhdDogbGF0LnRvRml4ZWQoNSksbG9uOmxuZy50b0ZpeGVkKDUpfSk7XG4gIH1cblxuICByZXF1ZXN0Q3VycmVudFBvc2l0aW9uKCkge1xuICAgIGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKGxvY2F0aW9uKT0+e1xuICAgICAgICB0aGlzLnByb3BzLnNldFVzZXJMb2NhdGlvbih7bGF0OmxvY2F0aW9uLmNvb3Jkcy5sYXRpdHVkZSxsb246bG9jYXRpb24uY29vcmRzLmxvbmdpdHVkZX0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlU2NyaXB0Q3JlYXRlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzY3JpcHRMb2FkZWQ6IGZhbHNlIH0pO1xuICB9XG4gIFxuICBoYW5kbGVTY3JpcHRFcnJvcigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2NyaXB0RXJyb3I6IHRydWUgfSk7XG4gIH1cbiAgXG4gIGhhbmRsZVNjcmlwdExvYWQoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNjcmlwdExvYWRlZDogdHJ1ZSB9KTtcbiAgICBMID0gd2luZG93Lkw7XG4gICAgXG4gICAgY29uc3QgbWFwID0gdGhpcy5tYXAgPSBMLm1hcCgnbWFwJykuc2V0VmlldyhbdGhpcy5wcm9wcy5zdGF0aW9uTG9jYXRpb24ubGF0LCB0aGlzLnByb3BzLnN0YXRpb25Mb2NhdGlvbi5sb25dLCAxMyk7XG5cbiAgICBpbXBvcnQoJ2xlYWZsZXQuZ3JpZGxheWVyLmdvb2dsZW11dGFudCcpLnRoZW4oKCkgPT4ge1xuXG4gICAgICBjb25zdCBzYXRlbGxpdGUgPSBMLmdyaWRMYXllci5nb29nbGVNdXRhbnQoe3R5cGU6ICdzYXRlbGxpdGUnfSk7XG4gICAgICBjb25zdCBoeWJyaWQgPSBMLmdyaWRMYXllci5nb29nbGVNdXRhbnQoe3R5cGU6ICdoeWJyaWQnfSk7XG4gICAgICBjb25zdCBiYXNlID0gTC50aWxlTGF5ZXIoJ2h0dHA6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnKTtcblxuXG4gICAgICBMLmNvbnRyb2wubGF5ZXJzKFxuICAgICAgICB7XG4gICAgICAgICAgXCJPcGVuIFN0cmVhdCBNYXBcIjogYmFzZSxcbiAgICAgICAgICBcIkdvb2dsZSBNYXBzIFNhdGVsbGl0ZVwiOnNhdGVsbGl0ZSxcbiAgICAgICAgICBcIkdvb2dsZSBNYXBzIEh5YnJpZFwiOmh5YnJpZFxuICAgICAgICB9LHt9LHtwb3NpdGlvbjonYm90dG9tcmlnaHQnfVxuICAgICAgKS5hZGRUbyhtYXApO1xuICAgIH0pO1xuXG5cbiAgICBMLkljb24uRGVmYXVsdC5pbWFnZVBhdGggPSAnLic7XG4gICAgZGVsZXRlIEwuSWNvbi5EZWZhdWx0LnByb3RvdHlwZS5fZ2V0SWNvblVybDtcbiAgICBMLkljb24uRGVmYXVsdC5tZXJnZU9wdGlvbnMoe1xuICAgICAgaWNvblJldGluYVVybDogcmVxdWlyZSgnbGVhZmxldC9kaXN0L2ltYWdlcy9tYXJrZXItaWNvbi0yeC5wbmcnKSxcbiAgICAgIGljb25Vcmw6IHJlcXVpcmUoJ2xlYWZsZXQvZGlzdC9pbWFnZXMvbWFya2VyLWljb24ucG5nJyksXG4gICAgICBzaGFkb3dVcmw6IHJlcXVpcmUoJ2xlYWZsZXQvZGlzdC9pbWFnZXMvbWFya2VyLXNoYWRvdy5wbmcnKVxuICAgIH0pO1xuICAgIFxuICAgIEwudGlsZUxheWVyKCdodHRwOi8ve3N9LnRpbGUub3NtLm9yZy97en0ve3h9L3t5fS5wbmcnLCB7XG4gICAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cDovL29zbS5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xuICAgIH0pLmFkZFRvKG1hcCk7XG5cblxuICAgIGNvbnN0IHBvcHVwTm9kZSA9IEwucG9wdXAoKVxuICAgICAgLnNldExhdExuZyhbdGhpcy5wcm9wcy5zdGF0aW9uTG9jYXRpb24ubGF0LCB0aGlzLnByb3BzLnN0YXRpb25Mb2NhdGlvbi5sb25dKVxuICAgICAgLnNldENvbnRlbnQoYDxzdHJvbmc+JHt3aW5kb3cuSTE4bi50KCdTdGF0aW9uJyl9IDwvc3Ryb25nPiAke3RoaXMucHJvcHMuc3RhdGlvbkhvc3RuYW1lfTxici8+XG4gICAgICAgICAgPHNwYW5cIj5cbiAgICAgICAgICAgICAgJHt3aW5kb3cuSTE4bi50KCdNT1ZFIFRPIE5FVyBQT1NJVElPTicpfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPmApO1xuXG4gICAgY29uc3QgbWFya2VyID0gdGhpcy5tYXJrZXIgPSBMLm1hcmtlcihbdGhpcy5wcm9wcy5zdGF0aW9uTG9jYXRpb24ubGF0LCB0aGlzLnByb3BzLnN0YXRpb25Mb2NhdGlvbi5sb25dLHtcbiAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICB9KVxuICAgICAgLmFkZFRvKG1hcClcbiAgICAgIC5vbignY2xpY2snLCAoeCk9PiBtYXAuc2V0Vmlldyh4LnRhcmdldC5fbGF0bG5nKSlcbiAgICAgIC5vbignZHJhZycsICh4KT0+IG1hcC5zZXRWaWV3KHgudGFyZ2V0Ll9sYXRsbmcpKVxuICAgICAgLm9uKCdtb3ZlZW5kJywgKHgpPT4gdGhpcy51cGRhdGVQb3NpdGlvbih4KSlcbiAgICAgIC5iaW5kUG9wdXAocG9wdXBOb2RlKTtcbiAgfVxuXG4gIGlzTG9hZGVkKGV4aXN0KSB7XG4gICAgaWYgKGV4aXN0ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuICg8ZGl2PkxvYWRpbmcuLi48L2Rpdj4pO1xuICB9XG4gIFxuICByZXJlbmRlck1hcChsYXRsb24pIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5zY3JpcHRMb2FkZWQgPT09IHRydWUpIHtcbiAgICAgIHRoaXMubWFwLnNldFZpZXcoW2xhdGxvbi5sYXQsIGxhdGxvbi5sb25dKTtcbiAgICAgIHRoaXMubWFya2VyLnNldExhdExuZyhbbGF0bG9uLmxhdCwgbGF0bG9uLmxvbl0pO1xuICAgIH1cbiAgfVxuICByZW5kZXIoeyB1c2VyIH0sIHsgdGltZSwgY291bnQgfSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPFNjcmlwdFxuICAgICAgICAgICAgdXJsPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvbGVhZmxldC8xLjAuMy9sZWFmbGV0LXNyYy5qc1wiXG4gICAgICAgICAgICBvbkNyZWF0ZT17dGhpcy5oYW5kbGVTY3JpcHRDcmVhdGUuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uRXJyb3I9e3RoaXMuaGFuZGxlU2NyaXB0RXJyb3IuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uTG9hZD17dGhpcy5oYW5kbGVTY3JpcHRMb2FkLmJpbmQodGhpcyl9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8U2NyaXB0IHVybD17XCJodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanM/a2V5PVwiK2tleX0gLz5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IGlkPVwibWFwXCI+PC9kaXY+XG4gICAgICAgICAge3RoaXMuaXNMb2FkZWQodGhpcy5zdGF0ZS5zY3JpcHRMb2FkZWQpfVxuICAgICAgICAgIHt0aGlzLnJlcmVuZGVyTWFwKHRoaXMucHJvcHMuc3RhdGlvbkxvY2F0aW9uKX1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBzdGF0aW9uTG9jYXRpb246IGdldExvY2F0aW9uKHN0YXRlKSxcbiAgICB1c2VyTG9jYXRpb246IGdldFVzZXJMb2NhdGlvbihzdGF0ZSksXG4gICAgc3RhdGlvbkhvc3RuYW1lOiBnZXRTZWxlY3RlZEhvc3Qoc3RhdGUpXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBsb2FkTG9jYXRpb246IGJpbmRBY3Rpb25DcmVhdG9ycyhsb2FkTG9jYXRpb24sIGRpc3BhdGNoKSxcbiAgICBjaGFuZ2VMb2NhdGlvbiA6IGJpbmRBY3Rpb25DcmVhdG9ycyhjaGFuZ2VMb2NhdGlvbiwgZGlzcGF0Y2gpLFxuICAgIHNldFVzZXJMb2NhdGlvbiA6IGJpbmRBY3Rpb25DcmVhdG9ycyhzZXRVc2VyTG9jYXRpb24sIGRpc3BhdGNoKVxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoTG9jYXRlKTsiXX0=