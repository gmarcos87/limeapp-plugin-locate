'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUserLocation = exports.changeLocation = exports.loadLocation = undefined;

var _locateConstants = require('./locateConstants');

var loadLocation = exports.loadLocation = function loadLocation() {
  return function (dispatch, getState) {
    dispatch({
      type: _locateConstants.LOCATION_LOAD
    });
  };
};

var changeLocation = exports.changeLocation = function changeLocation(location) {
  return function (dispatch, getState) {
    dispatch({
      type: _locateConstants.LOCATION_CHANGE,
      payload: location
    });
  };
};

var setUserLocation = exports.setUserLocation = function setUserLocation(location) {
  return function (dispatch) {
    dispatch({
      type: _locateConstants.LOCATION_USER_SET,
      payload: location
    });
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2NhdGVBY3Rpb25zLmpzIl0sIm5hbWVzIjpbImxvYWRMb2NhdGlvbiIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJ0eXBlIiwiY2hhbmdlTG9jYXRpb24iLCJsb2NhdGlvbiIsInBheWxvYWQiLCJzZXRVc2VyTG9jYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFPTyxJQUFNQSxzQ0FBZSxTQUFmQSxZQUFlO0FBQUEsU0FBTyxVQUFDQyxRQUFELEVBQVdDLFFBQVgsRUFBd0I7QUFDekRELGFBQVM7QUFDUEU7QUFETyxLQUFUO0FBR0QsR0FKMkI7QUFBQSxDQUFyQjs7QUFNQSxJQUFNQywwQ0FBaUIsU0FBakJBLGNBQWlCLENBQUVDLFFBQUY7QUFBQSxTQUFnQixVQUFDSixRQUFELEVBQVdDLFFBQVgsRUFBd0I7QUFDcEVELGFBQVM7QUFDUEUsNENBRE87QUFFUEcsZUFBU0Q7QUFGRixLQUFUO0FBSUQsR0FMNkI7QUFBQSxDQUF2Qjs7QUFPQSxJQUFNRSw0Q0FBa0IsU0FBbEJBLGVBQWtCLENBQUNGLFFBQUQ7QUFBQSxTQUFjLFVBQUNKLFFBQUQsRUFBYztBQUN6REEsYUFBUztBQUNQRSw4Q0FETztBQUVQRyxlQUFTRDtBQUZGLEtBQVQ7QUFJRCxHQUw4QjtBQUFBLENBQXhCIiwiZmlsZSI6ImxvY2F0ZUFjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBMT0NBVElPTl9MT0FELFxuICBMT0NBVElPTl9DSEFOR0UsXG4gIFVQREFURV9MT0NBVElPTixcbiAgTE9DQVRJT05fVVNFUl9TRVRcbn0gZnJvbSAnLi9sb2NhdGVDb25zdGFudHMnO1xuXG5leHBvcnQgY29uc3QgbG9hZExvY2F0aW9uID0gKCApID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IExPQ0FUSU9OX0xPQURcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2hhbmdlTG9jYXRpb24gPSAoIGxvY2F0aW9uICkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogTE9DQVRJT05fQ0hBTkdFLFxuICAgIHBheWxvYWQ6IGxvY2F0aW9uXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldFVzZXJMb2NhdGlvbiA9IChsb2NhdGlvbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOkxPQ0FUSU9OX1VTRVJfU0VULFxuICAgIHBheWxvYWQ6IGxvY2F0aW9uXG4gIH0pO1xufTsiXX0=