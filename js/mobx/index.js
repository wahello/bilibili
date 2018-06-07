import BaseTheme from "../base/BaseTheme";
import BookClassStore from './BookClassStore';
import BookClassListStore from './BookClassListStore';
import BookDetailStore from './BookDetailStore';
const baseTheme = new BaseTheme();
const bookClassStore = new BookClassStore();
const bookClassListStore = new BookClassListStore();
const bookDetailStore = new BookDetailStore();
const store = {
    baseTheme,bookClassStore,bookClassListStore,bookDetailStore
};

export default store;





