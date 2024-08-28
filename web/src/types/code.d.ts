declare interface CodeWidgetOptions {
  hideOnZoom: boolean;
  getComp(): HTMLKulCodeElement;
  getValue(): string;
  setProps(props: Partial<HTMLKulCodeElement>): void;
  setValue(value: Record<string, unknown> | string): void;
}
