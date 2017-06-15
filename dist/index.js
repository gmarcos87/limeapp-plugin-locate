'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _locateEpics = require('./locateEpics');

var _locateEpics2 = _interopRequireDefault(_locateEpics);

var _locateReducer = require('./locateReducer');

var _locateSelectors = require('./locateSelectors');

var selector = _interopRequireWildcard(_locateSelectors);

var _locateConstants = require('./locateConstants');

var constants = _interopRequireWildcard(_locateConstants);

var _locatePage = require('./locatePage');

var _locatePage2 = _interopRequireDefault(_locatePage);

var _locateMenu = require('./locateMenu');

var _es = require('../i18n/translations/es.json');

var _es2 = _interopRequireDefault(_es);

var _en = require('../i18n/translations/en.json');

var _en2 = _interopRequireDefault(_en);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Locate',
  page: _locatePage2.default,
  menu: _locateMenu.LocateMenu,
  store: {
    name: 'locate',
    epics: _locateEpics2.default,
    reducer: _locateReducer.reducer,
    selector: selector,
    constants: constants
  },
  translations: Object.assign(_en2.default, _es2.default)
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJzZWxlY3RvciIsImNvbnN0YW50cyIsIm5hbWUiLCJwYWdlIiwibWVudSIsInN0b3JlIiwiZXBpY3MiLCJyZWR1Y2VyIiwidHJhbnNsYXRpb25zIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztJQUFZQSxROztBQUNaOztJQUFZQyxTOztBQUNaOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7a0JBRWU7QUFDYkMsUUFBTSxRQURPO0FBRWJDLDRCQUZhO0FBR2JDLDhCQUhhO0FBSWJDLFNBQU87QUFDTEgsVUFBTSxRQUREO0FBRUxJLGdDQUZLO0FBR0xDLG1DQUhLO0FBSUxQLHNCQUpLO0FBS0xDO0FBTEssR0FKTTtBQVdiTyxnQkFBY0MsT0FBT0MsTUFBUDtBQVhELEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgIGVwaWNzIGZyb20gJy4vbG9jYXRlRXBpY3MnO1xuaW1wb3J0IHsgcmVkdWNlciB9IGZyb20gJy4vbG9jYXRlUmVkdWNlcic7XG5pbXBvcnQgKiBhcyBzZWxlY3RvciBmcm9tICcuL2xvY2F0ZVNlbGVjdG9ycyc7XG5pbXBvcnQgKiBhcyBjb25zdGFudHMgZnJvbSAnLi9sb2NhdGVDb25zdGFudHMnO1xuaW1wb3J0IExvY2F0ZSBmcm9tICcuL2xvY2F0ZVBhZ2UnO1xuaW1wb3J0IHsgTG9jYXRlTWVudSB9IGZyb20gJy4vbG9jYXRlTWVudSc7XG5cbmltcG9ydCBpMThuRXMgZnJvbSAnLi4vaTE4bi90cmFuc2xhdGlvbnMvZXMuanNvbic7XG5pbXBvcnQgaTE4bkVuIGZyb20gJy4uL2kxOG4vdHJhbnNsYXRpb25zL2VuLmpzb24nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdMb2NhdGUnLFxuICBwYWdlOiBMb2NhdGUsXG4gIG1lbnU6IExvY2F0ZU1lbnUsXG4gIHN0b3JlOiB7XG4gICAgbmFtZTogJ2xvY2F0ZScsXG4gICAgZXBpY3MsXG4gICAgcmVkdWNlcixcbiAgICBzZWxlY3RvcixcbiAgICBjb25zdGFudHNcbiAgfSxcbiAgdHJhbnNsYXRpb25zOiBPYmplY3QuYXNzaWduKFxuICAgIGkxOG5FbixcbiAgICBpMThuRXNcbiAgKVxufTtcbiJdfQ==