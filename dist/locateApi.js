'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getLocation = exports.getLocation = function getLocation(api, sid) {
  return api.call(sid, 'get_location', {});
};

var changeLocation = exports.changeLocation = function changeLocation(api, sid, location) {
  return api.call(sid, 'set_location', location);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2NhdGVBcGkuanMiXSwibmFtZXMiOlsiZ2V0TG9jYXRpb24iLCJhcGkiLCJzaWQiLCJjYWxsIiwiY2hhbmdlTG9jYXRpb24iLCJsb2NhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBTyxJQUFNQSxvQ0FBYyxTQUFkQSxXQUFjLENBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ3ZDLFNBQU9ELElBQUlFLElBQUosQ0FBU0QsR0FBVCxFQUFjLGNBQWQsRUFBOEIsRUFBOUIsQ0FBUDtBQUNELENBRk07O0FBSUEsSUFBTUUsMENBQWlCLFNBQWpCQSxjQUFpQixDQUFDSCxHQUFELEVBQU1DLEdBQU4sRUFBV0csUUFBWCxFQUF3QjtBQUNwRCxTQUFPSixJQUFJRSxJQUFKLENBQVNELEdBQVQsRUFBYyxjQUFkLEVBQThCRyxRQUE5QixDQUFQO0FBQ0QsQ0FGTSIsImZpbGUiOiJsb2NhdGVBcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2V0TG9jYXRpb24gPSAoYXBpLCBzaWQpID0+IHtcbiAgcmV0dXJuIGFwaS5jYWxsKHNpZCwgJ2dldF9sb2NhdGlvbicsIHt9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VMb2NhdGlvbiA9IChhcGksIHNpZCwgbG9jYXRpb24pID0+IHtcbiAgcmV0dXJuIGFwaS5jYWxsKHNpZCwgJ3NldF9sb2NhdGlvbicsIGxvY2F0aW9uKTtcbn07XG4iXX0=