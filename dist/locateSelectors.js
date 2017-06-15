'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getLocation = exports.getLocation = function getLocation(state) {
  if (typeof state.locate.station !== 'undefined') {
    return {
      lat: Number(state.locate.station.lat),
      lon: Number(state.locate.station.lon)
    };
  }
  return {
    lat: 0,
    lon: 0
  };
};

var getUserLocation = exports.getUserLocation = function getUserLocation(state) {
  return state.locate.user;
};
var getSelectedHost = exports.getSelectedHost = function getSelectedHost(state) {
  return state.meta.selectedHost;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2NhdGVTZWxlY3RvcnMuanMiXSwibmFtZXMiOlsiZ2V0TG9jYXRpb24iLCJzdGF0ZSIsImxvY2F0ZSIsInN0YXRpb24iLCJsYXQiLCJOdW1iZXIiLCJsb24iLCJnZXRVc2VyTG9jYXRpb24iLCJ1c2VyIiwiZ2V0U2VsZWN0ZWRIb3N0IiwibWV0YSIsInNlbGVjdGVkSG9zdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBTyxJQUFNQSxvQ0FBYyxTQUFkQSxXQUFjLENBQUNDLEtBQUQsRUFBVztBQUNwQyxNQUFJLE9BQU9BLE1BQU1DLE1BQU4sQ0FBYUMsT0FBcEIsS0FBZ0MsV0FBcEMsRUFBaUQ7QUFDL0MsV0FBTztBQUNMQyxXQUFLQyxPQUFRSixNQUFNQyxNQUFOLENBQWFDLE9BQWIsQ0FBcUJDLEdBQTdCLENBREE7QUFFTEUsV0FBS0QsT0FBUUosTUFBTUMsTUFBTixDQUFhQyxPQUFiLENBQXFCRyxHQUE3QjtBQUZBLEtBQVA7QUFJRDtBQUNELFNBQU87QUFDTEYsU0FBSyxDQURBO0FBRUxFLFNBQUs7QUFGQSxHQUFQO0FBSUQsQ0FYTTs7QUFhQSxJQUFNQyw0Q0FBa0IsU0FBbEJBLGVBQWtCLENBQUNOLEtBQUQ7QUFBQSxTQUFXQSxNQUFNQyxNQUFOLENBQWFNLElBQXhCO0FBQUEsQ0FBeEI7QUFDQSxJQUFNQyw0Q0FBa0IsU0FBbEJBLGVBQWtCLENBQUNSLEtBQUQ7QUFBQSxTQUFXQSxNQUFNUyxJQUFOLENBQVdDLFlBQXRCO0FBQUEsQ0FBeEIiLCJmaWxlIjoibG9jYXRlU2VsZWN0b3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGdldExvY2F0aW9uID0gKHN0YXRlKSA9PiB7XG4gIGlmICh0eXBlb2Ygc3RhdGUubG9jYXRlLnN0YXRpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhdDogTnVtYmVyIChzdGF0ZS5sb2NhdGUuc3RhdGlvbi5sYXQpLFxuICAgICAgbG9uOiBOdW1iZXIgKHN0YXRlLmxvY2F0ZS5zdGF0aW9uLmxvbilcbiAgICB9O1xuICB9XG4gIHJldHVybiB7XG4gICAgbGF0OiAwLFxuICAgIGxvbjogMFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFVzZXJMb2NhdGlvbiA9IChzdGF0ZSkgPT4gc3RhdGUubG9jYXRlLnVzZXI7XG5leHBvcnQgY29uc3QgZ2V0U2VsZWN0ZWRIb3N0ID0gKHN0YXRlKSA9PiBzdGF0ZS5tZXRhLnNlbGVjdGVkSG9zdDtcbiJdfQ==