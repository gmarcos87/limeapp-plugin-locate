'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _style = require('./style.less');

var _style2 = _interopRequireDefault(_style);

var _redux = require('redux');

var _preactRedux = require('preact-redux');

var _locateActions = require('./locateActions');

var _locateSelectors = require('./locateSelectors');

var _reactLeaflet = require('react-leaflet');

var _reactLeafletGoogle = require('react-leaflet-google');

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseLayer = _reactLeaflet.LayersControl.BaseLayer;

var key = 'AIzaSyBS0M7H7Ltk1ipjwqi8r9_WQJOzWfav4Ok	';
var hybrid = 'HYBRID';
var road = 'ROADMAP';

/*
 * Fix issue leaflet+webpack
 * https://github.com/Leaflet/Leaflet/issues/4968
*/
_leaflet2.default.Icon.Default.imagePath = '.';
delete _leaflet2.default.Icon.Default.prototype._getIconUrl;
_leaflet2.default.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

var Locate = function (_Component) {
  _inherits(Locate, _Component);

  function Locate(props) {
    _classCallCheck(this, Locate);

    var _this = _possibleConstructorReturn(this, (Locate.__proto__ || Object.getPrototypeOf(Locate)).call(this, props));

    _this.state = {
      draggable: false
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
    key: 'toggleDraggable',
    value: function toggleDraggable() {
      this.setState({ draggable: !this.state.draggable });
    }
  }, {
    key: 'render',
    value: function render(_ref, _ref2) {
      var user = _ref.user;
      var time = _ref2.time,
          count = _ref2.count;


      return (0, _preact.h)(
        _reactLeaflet.Map,
        { center: [this.props.stationLocation.lat, this.props.stationLocation.lon], zoomControl: false, zoom: 16, style: { width: '100vw', height: '100vh' }, layers: [] },
        (0, _preact.h)(
          _reactLeaflet.LayersControl,
          { position: 'bottomright' },
          (0, _preact.h)(
            BaseLayer,
            { checked: true, name: 'OpenStreetMap.Mapnik' },
            (0, _preact.h)(_reactLeaflet.TileLayer, {
              attribution: '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
              url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            })
          ),
          (0, _preact.h)(
            BaseLayer,
            { name: 'Google Maps Hybrid' },
            (0, _preact.h)(_reactLeafletGoogle.GoogleLayer, { googlekey: key, maptype: hybrid })
          )
        ),
        (0, _preact.h)(
          _reactLeaflet.Marker,
          {
            onDragend: this.updatePosition.bind(this),
            position: [this.props.stationLocation.lat, this.props.stationLocation.lon],
            draggable: this.state.draggable },
          (0, _preact.h)(
            _reactLeaflet.Popup,
            null,
            (0, _preact.h)(
              'span',
              null,
              (0, _preact.h)(
                'strong',
                null,
                window.I18n.t('Station'),
                ' '
              ),
              ' ',
              this.props.stationHostname,
              (0, _preact.h)('br', null),
              (0, _preact.h)(
                'span',
                { onClick: this.toggleDraggable.bind(this) },
                this.state.draggable ? (0, _preact.h)(
                  'u',
                  null,
                  window.I18n.t('MOVE TO NEW POSITION')
                ) : (0, _preact.h)(
                  'u',
                  null,
                  window.I18n.t('PRES TO ENABLE CHANGES')
                )
              )
            )
          )
        ),
        (0, _preact.h)(
          _reactLeaflet.Marker,
          {
            position: [this.props.userLocation.lat, this.props.userLocation.lon],
            draggable: false },
          (0, _preact.h)(
            _reactLeaflet.Popup,
            null,
            (0, _preact.h)(
              'span',
              null,
              (0, _preact.h)(
                'strong',
                null,
                window.I18n.t('User')
              )
            )
          )
        )
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2NhdGVQYWdlLmpzIl0sIm5hbWVzIjpbIkJhc2VMYXllciIsImtleSIsImh5YnJpZCIsInJvYWQiLCJJY29uIiwiRGVmYXVsdCIsImltYWdlUGF0aCIsInByb3RvdHlwZSIsIl9nZXRJY29uVXJsIiwibWVyZ2VPcHRpb25zIiwiaWNvblJldGluYVVybCIsInJlcXVpcmUiLCJpY29uVXJsIiwic2hhZG93VXJsIiwiTG9jYXRlIiwicHJvcHMiLCJzdGF0ZSIsImRyYWdnYWJsZSIsImxvYWRMb2NhdGlvbiIsInJlcXVlc3RDdXJyZW50UG9zaXRpb24iLCJlIiwidGFyZ2V0IiwiX2xhdGxuZyIsImxhdCIsImxuZyIsImNoYW5nZUxvY2F0aW9uIiwidG9GaXhlZCIsImxvbiIsIm5hdmlnYXRvciIsImdlb2xvY2F0aW9uIiwiZ2V0Q3VycmVudFBvc2l0aW9uIiwibG9jYXRpb24iLCJzZXRVc2VyTG9jYXRpb24iLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsInNldFN0YXRlIiwidXNlciIsInRpbWUiLCJjb3VudCIsInN0YXRpb25Mb2NhdGlvbiIsIndpZHRoIiwiaGVpZ2h0IiwidXBkYXRlUG9zaXRpb24iLCJiaW5kIiwid2luZG93IiwiSTE4biIsInQiLCJzdGF0aW9uSG9zdG5hbWUiLCJ0b2dnbGVEcmFnZ2FibGUiLCJ1c2VyTG9jYXRpb24iLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBOztBQUNBOztBQUVBOztBQUNBOztBQUVBOztBQUNBOztBQU9BOzs7Ozs7Ozs7Ozs7SUFMUUEsUywrQkFBQUEsUzs7QUFDUixJQUFNQyxNQUFNLDBDQUFaO0FBQ0EsSUFBTUMsU0FBUyxRQUFmO0FBQ0EsSUFBTUMsT0FBTyxTQUFiOztBQUlBOzs7O0FBSUEsa0JBQUVDLElBQUYsQ0FBT0MsT0FBUCxDQUFlQyxTQUFmLEdBQTJCLEdB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QUF6QixFQUE2Q3RDLE1BQTdDLEMiLCJmaWxlIjoibG9jYXRlUGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgc3R5bGUgZnJvbSAnLi9zdHlsZS5sZXNzJztcblxuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3ByZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGxvYWRMb2NhdGlvbiwgY2hhbmdlTG9jYXRpb24sIHNldFVzZXJMb2NhdGlvbiB9IGZyb20gJy4vbG9jYXRlQWN0aW9ucyc7XG5pbXBvcnQgeyBnZXRMb2NhdGlvbiwgZ2V0VXNlckxvY2F0aW9uLCBnZXRTZWxlY3RlZEhvc3QgfSBmcm9tICcuL2xvY2F0ZVNlbGVjdG9ycyc7XG5cbmltcG9ydCB7IE1hcCwgTWFya2VyLCBQb3B1cCwgTGF5ZXJzQ29udHJvbCwgVGlsZUxheWVyIH0gZnJvbSAncmVhY3QtbGVhZmxldCc7XG5pbXBvcnQgeyBHb29nbGVMYXllciB9IGZyb20gJ3JlYWN0LWxlYWZsZXQtZ29vZ2xlJztcblxuY29uc3QgeyBCYXNlTGF5ZXIgfSA9IExheWVyc0NvbnRyb2w7XG5jb25zdCBrZXkgPSAnQUl6YVN5QlMwTTdIN0x0azFpcGp3cWk4cjlfV1FKT3pXZmF2NE9rXHQnO1xuY29uc3QgaHlicmlkID0gJ0hZQlJJRCc7XG5jb25zdCByb2FkID0gJ1JPQURNQVAnO1xuXG5pbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcblxuLypcbiAqIEZpeCBpc3N1ZSBsZWFmbGV0K3dlYnBhY2tcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9MZWFmbGV0L0xlYWZsZXQvaXNzdWVzLzQ5NjhcbiovXG5MLkljb24uRGVmYXVsdC5pbWFnZVBhdGggPSAnLic7XG5kZWxldGUgTC5JY29uLkRlZmF1bHQucHJvdG90eXBlLl9nZXRJY29uVXJsO1xuTC5JY29uLkRlZmF1bHQubWVyZ2VPcHRpb25zKHtcbiAgaWNvblJldGluYVVybDogcmVxdWlyZSgnbGVhZmxldC9kaXN0L2ltYWdlcy9tYXJrZXItaWNvbi0yeC5wbmcnKSxcbiAgaWNvblVybDogcmVxdWlyZSgnbGVhZmxldC9kaXN0L2ltYWdlcy9tYXJrZXItaWNvbi5wbmcnKSxcbiAgc2hhZG93VXJsOiByZXF1aXJlKCdsZWFmbGV0L2Rpc3QvaW1hZ2VzL21hcmtlci1zaGFkb3cucG5nJylcbn0pO1xuXG5cblxuY2xhc3MgTG9jYXRlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZHJhZ2dhYmxlOiBmYWxzZVxuICAgIH07XG4gICAgXG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy5sb2FkTG9jYXRpb24oKTtcbiAgICB0aGlzLnJlcXVlc3RDdXJyZW50UG9zaXRpb24oKTtcbiAgfVxuXG4gIHVwZGF0ZVBvc2l0aW9uKGUpIHtcbiAgICBsZXQgeyBsYXQsIGxuZyB9ID0gZS50YXJnZXQuX2xhdGxuZztcbiAgICB0aGlzLnByb3BzLmNoYW5nZUxvY2F0aW9uKHtsYXQ6IGxhdC50b0ZpeGVkKDUpLGxvbjpsbmcudG9GaXhlZCg1KX0pO1xuICB9XG5cbiAgcmVxdWVzdEN1cnJlbnRQb3NpdGlvbigpIHtcbiAgICBpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChsb2NhdGlvbik9PntcbiAgICAgICAgdGhpcy5wcm9wcy5zZXRVc2VyTG9jYXRpb24oe2xhdDpsb2NhdGlvbi5jb29yZHMubGF0aXR1ZGUsbG9uOmxvY2F0aW9uLmNvb3Jkcy5sb25naXR1ZGV9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZURyYWdnYWJsZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtkcmFnZ2FibGU6ICF0aGlzLnN0YXRlLmRyYWdnYWJsZX0pO1xuICB9XG5cbiAgcmVuZGVyKHsgdXNlciB9LCB7IHRpbWUsIGNvdW50IH0pIHtcblxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPE1hcCBjZW50ZXI9e1t0aGlzLnByb3BzLnN0YXRpb25Mb2NhdGlvbi5sYXQsdGhpcy5wcm9wcy5zdGF0aW9uTG9jYXRpb24ubG9uXX0gem9vbUNvbnRyb2w9e2ZhbHNlfSB6b29tPXsxNn0gc3R5bGU9e3t3aWR0aDonMTAwdncnLCBoZWlnaHQ6ICcxMDB2aCd9fSBsYXllcnM9e1tdfT5cbiAgICAgICAgICA8TGF5ZXJzQ29udHJvbCBwb3NpdGlvbj17J2JvdHRvbXJpZ2h0J30+XG4gICAgICAgICAgICAgIDxCYXNlTGF5ZXIgY2hlY2tlZCBuYW1lPSdPcGVuU3RyZWV0TWFwLk1hcG5payc+XG4gICAgICAgICAgICAgICAgPFRpbGVMYXllclxuICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb249JyZjb3B5IDxhIGhyZWY9XCJodHRwOi8vb3NtLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXG4gICAgICAgICAgICAgICAgICB1cmw9J2h0dHA6Ly97c30udGlsZS5vc20ub3JnL3t6fS97eH0ve3l9LnBuZydcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0Jhc2VMYXllcj5cbiAgICAgICAgICAgICAgPEJhc2VMYXllciAgbmFtZT0nR29vZ2xlIE1hcHMgSHlicmlkJz5cbiAgICAgICAgICAgICAgICA8R29vZ2xlTGF5ZXIgZ29vZ2xla2V5PXtrZXl9ICBtYXB0eXBlPXtoeWJyaWR9IC8+XG4gICAgICAgICAgICAgIDwvQmFzZUxheWVyPlxuICAgICAgICAgIDwvTGF5ZXJzQ29udHJvbD5cbiAgICAgICAgICA8TWFya2VyXG4gICAgICAgICAgICBvbkRyYWdlbmQ9e3RoaXMudXBkYXRlUG9zaXRpb24uYmluZCh0aGlzKX1cbiAgICAgICAgICAgIHBvc2l0aW9uPXtbdGhpcy5wcm9wcy5zdGF0aW9uTG9jYXRpb24ubGF0LHRoaXMucHJvcHMuc3RhdGlvbkxvY2F0aW9uLmxvbl19XG4gICAgICAgICAgICBkcmFnZ2FibGU9e3RoaXMuc3RhdGUuZHJhZ2dhYmxlfT5cbiAgICAgICAgICAgICAgPFBvcHVwPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgPHN0cm9uZz57d2luZG93LkkxOG4udCgnU3RhdGlvbicpfSA8L3N0cm9uZz4ge3RoaXMucHJvcHMuc3RhdGlvbkhvc3RuYW1lfTxici8+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXt0aGlzLnRvZ2dsZURyYWdnYWJsZS5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5kcmFnZ2FibGUgPyAoPHU+e3dpbmRvdy5JMThuLnQoJ01PVkUgVE8gTkVXIFBPU0lUSU9OJyl9PC91PikgOiAoPHU+e3dpbmRvdy5JMThuLnQoJ1BSRVMgVE8gRU5BQkxFIENIQU5HRVMnKX08L3U+KX1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvUG9wdXA+XG4gICAgICAgICAgPC9NYXJrZXI+XG4gICAgICAgICAgPE1hcmtlclxuICAgICAgICAgICAgcG9zaXRpb249e1t0aGlzLnByb3BzLnVzZXJMb2NhdGlvbi5sYXQsdGhpcy5wcm9wcy51c2VyTG9jYXRpb24ubG9uXX1cbiAgICAgICAgICAgIGRyYWdnYWJsZT17ZmFsc2V9PlxuICAgICAgICAgICAgICA8UG9wdXA+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICA8c3Ryb25nPnt3aW5kb3cuSTE4bi50KCdVc2VyJyl9PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L1BvcHVwPlxuICAgICAgICAgIDwvTWFya2VyPlxuICAgICAgICA8L01hcD5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHN0YXRpb25Mb2NhdGlvbjogZ2V0TG9jYXRpb24oc3RhdGUpLFxuICAgIHVzZXJMb2NhdGlvbjogZ2V0VXNlckxvY2F0aW9uKHN0YXRlKSxcbiAgICBzdGF0aW9uSG9zdG5hbWU6IGdldFNlbGVjdGVkSG9zdChzdGF0ZSlcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGxvYWRMb2NhdGlvbjogYmluZEFjdGlvbkNyZWF0b3JzKGxvYWRMb2NhdGlvbiwgZGlzcGF0Y2gpLFxuICAgIGNoYW5nZUxvY2F0aW9uIDogYmluZEFjdGlvbkNyZWF0b3JzKGNoYW5nZUxvY2F0aW9uLCBkaXNwYXRjaCksXG4gICAgc2V0VXNlckxvY2F0aW9uIDogYmluZEFjdGlvbkNyZWF0b3JzKHNldFVzZXJMb2NhdGlvbiwgZGlzcGF0Y2gpXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShMb2NhdGUpOyJdfQ==