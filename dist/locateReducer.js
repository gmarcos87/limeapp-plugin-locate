'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.initialState = undefined;

var _locateConstants = require('./locateConstants');

var initialState = exports.initialState = {
  station: {
    lon: 0,
    lat: 0
  },
  user: {
    lon: 0,
    lat: 0
  }
};

var reducer = exports.reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var _ref = arguments[1];
  var type = _ref.type,
      payload = _ref.payload,
      meta = _ref.meta;

  switch (type) {

    case _locateConstants.LOCATION_LOAD_SUCCESS:
      return Object.assign({}, state, { station: payload });

    case _locateConstants.LOCATION_CHANGE_SUCCESS:
      return Object.assign({}, state, { station: payload });

    case _locateConstants.LOCATION_USER_SET:
      return Object.assign({}, state, { user: payload });

    default:
      return state;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2NhdGVSZWR1Y2VyLmpzIl0sIm5hbWVzIjpbImluaXRpYWxTdGF0ZSIsInN0YXRpb24iLCJsb24iLCJsYXQiLCJ1c2VyIiwicmVkdWNlciIsInN0YXRlIiwidHlwZSIsInBheWxvYWQiLCJtZXRhIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBT08sSUFBTUEsc0NBQWU7QUFDMUJDLFdBQVM7QUFDUEMsU0FBSyxDQURFO0FBRVBDLFNBQUs7QUFGRSxHQURpQjtBQUsxQkMsUUFBTTtBQUNKRixTQUFLLENBREQ7QUFFSkMsU0FBSztBQUZEO0FBTG9CLENBQXJCOztBQVlBLElBQU1FLDRCQUFVLFNBQVZBLE9BQVUsR0FBbUQ7QUFBQSxNQUFsREMsS0FBa0QsdUVBQTFDTixZQUEwQztBQUFBO0FBQUEsTUFBMUJPLElBQTBCLFFBQTFCQSxJQUEwQjtBQUFBLE1BQXBCQyxPQUFvQixRQUFwQkEsT0FBb0I7QUFBQSxNQUFYQyxJQUFXLFFBQVhBLElBQVc7O0FBQ3hFLFVBQVFGLElBQVI7O0FBRUU7QUFDRSxhQUFPRyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkwsS0FBbEIsRUFBeUIsRUFBRUwsU0FBU08sT0FBWCxFQUF6QixDQUFQOztBQUVGO0FBQ0UsYUFBT0UsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JMLEtBQWxCLEVBQXlCLEVBQUVMLFNBQVNPLE9BQVgsRUFBekIsQ0FBUDs7QUFFRjtBQUNFLGFBQU9FLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCTCxLQUFsQixFQUF5QixFQUFFRixNQUFNSSxPQUFSLEVBQXpCLENBQVA7O0FBRUY7QUFDRSxhQUFPRixLQUFQO0FBWko7QUFjRCxDQWZNIiwiZmlsZSI6ImxvY2F0ZVJlZHVjZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBMT0NBVElPTl9MT0FEX1NVQ0NFU1MsXG4gIExPQ0FUSU9OX0NIQU5HRV9TVUNDRVNTLFxuICBMT0NBVElPTl9VU0VSX1NFVFxufSBmcm9tICcuL2xvY2F0ZUNvbnN0YW50cyc7XG5cblxuZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgc3RhdGlvbjoge1xuICAgIGxvbjogMCxcbiAgICBsYXQ6IDBcbiAgfSxcbiAgdXNlcjoge1xuICAgIGxvbjogMCxcbiAgICBsYXQ6IDBcbiAgfVxufTtcblxuXG5leHBvcnQgY29uc3QgcmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgeyB0eXBlLCBwYXlsb2FkLCBtZXRhIH0pID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG5cbiAgICBjYXNlIExPQ0FUSU9OX0xPQURfU1VDQ0VTUzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBzdGF0aW9uOiBwYXlsb2FkIH0pO1xuXG4gICAgY2FzZSBMT0NBVElPTl9DSEFOR0VfU1VDQ0VTUzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBzdGF0aW9uOiBwYXlsb2FkIH0pO1xuXG4gICAgY2FzZSBMT0NBVElPTl9VU0VSX1NFVDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyB1c2VyOiBwYXlsb2FkIH0pO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcbiJdfQ==