import {BasePageStore} from './BasePageStore';
import BaseTheme from "../base/BaseTheme";
import BookClassStore from './BookClassStore';
import BookClassListStore from './BookClassListStore';
import BookDetailStore from './BookDetailStore';
import BookReadStore from './BookReadStore';
import BookCommentStore from './BookCommentStore';
import BookSearchStore from './BookSearchStore';

const basePageStore = new BasePageStore();
const baseTheme = new BaseTheme();
const bookClassStore = new BookClassStore();
const bookClassListStore = new BookClassListStore();
const bookDetailStore = new BookDetailStore();
const bookReadStore = new BookReadStore();
const bookCommentStore = new BookCommentStore();
const bookSearchStore = new BookSearchStore();

const store = {
    basePageStore,
    baseTheme,
    bookClassStore,
    bookClassListStore,
    bookDetailStore,
    bookReadStore,
    bookCommentStore,
    bookSearchStore
};

export default store;





