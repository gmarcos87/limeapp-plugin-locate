import  epics from './locateEpics';
import { reducer } from './locateReducer';
import * as selector from './locateSelectors';
import * as constants from './locateConstants';
import Locate from './locatePage';
import { LocateMenu } from './locateMenu';

import i18nEs from '../i18n/translations/es.json';
import i18nEn from '../i18n/translations/en.json';

export default {
  name: 'Locate',
  page: Locate,
  menu: LocateMenu,
  store: {
    name: 'locate',
    epics,
    reducer,
    selector,
    constants
  },
  translations: Object.assign(
    i18nEn,
    i18nEs
  )
};
