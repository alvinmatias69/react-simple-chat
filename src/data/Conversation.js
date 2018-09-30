import { parseDate } from '../lib/date';

export default class Conversation {
  constructor() {
    this.conversations = [];
  }

  process(conversations) {
    this.conversations = conversations.map(item => ({
      ...item,
      date: parseDate(item.date),
      selected: false,
    }));
  }

  select(id) {
    this.conversations = this.conversations.map(item => ({
      ...item,
      selected: item.id === id ? !item.selected : item.selected,
    }));
  }

  removeSelected() {
    this.conversations = this.conversations.map(item => ({
      ...item,
      selected: false,
    }));
  }

  getSelectedId() {
    return this.conversations.reduce((acc, cur) => {
      if (cur.selected) {
        acc.push(cur.id);
      }
      return acc;
    }, []);
  }

  deleteSelected() {
    this.conversations = this.conversations.filter(item => !item.selected);
  }

  countSelected() {
    return this.conversations.reduce((acc, cur) => {
      if (cur.selected) {
        acc += 1;
      }

      return acc;
    }, 0);
  }
}