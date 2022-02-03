type Fn = () => void;
type asyncFn = () => Promise<void>;

export class ObserverItem {
  readonly name: string;

  private item: Fn | asyncFn;

  constructor(name: string, item: Fn) {
    this.name = name;
    this.item = item;
  }

  async fire() {
    await this.item();
  }
}
