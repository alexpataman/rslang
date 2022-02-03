import { ObserverItem } from './ObserverItem';

interface IObserver {
  subscribe(observer: ObserverItem): void;

  unsubscribe(observer: ObserverItem): void;

  fire(): void;
}

export class Observer implements IObserver {
  private handlers: ObserverItem[];

  constructor(handlers = []) {
    this.handlers = handlers;
  }

  subscribe(item: ObserverItem) {
    if (!this.handlers.find((el) => el.name === item.name)) {
      this.handlers.push(item);
    }
  }

  unsubscribe(item: ObserverItem) {
    this.handlers = this.handlers.filter((el) => el.name !== item.name);
  }

  async fire() {
    await Promise.allSettled(this.handlers.map((item) => item.fire()));
  }
}
