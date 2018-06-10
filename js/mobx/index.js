import {BasePageStore} from './BasePageStore';
import BaseTheme from "../base/BaseTheme";
import BookClassStore from './BookClassStore';
import BookClassListStore from './BookClassListStore';
import BookDetailStore from './BookDetailStore';
import BookReadStore from './BookReadStore';
const basePageStore = new BasePageStore();
const baseTheme = new BaseTheme();
const bookClassStore = new BookClassStore();
const bookClassListStore = new BookClassListStore();
const bookDetailStore = new BookDetailStore();
const bookReadStore = new BookReadStore();
const store = {
    basePageStore,baseTheme,bookClassStore,bookClassListStore,bookDetailStore,bookReadStore
};

export default store;





