declare interface CodeWidgetOptions {
  hideOnZoom: boolean;
  getComp(): HTMLKulCodeElement;
  getProps(): Promise<Record<string, unknown>>;
  getValue(): Promise<string>;
  setProps(props: Partial<HTMLKulCodeElement>): void;
  setValue(value: Record<string, unknown> | string): Promise<void>;
}
