declare interface ChartWidgetOptions {
  hideOnZoom: boolean;
  getComp(): HTMLKulChartElement;
  getValue(): string;
  setProps(props: Partial<HTMLKulChartElement>): void;
  setValue(value: Record<string, unknown> | string): void;
}

declare type ChartWidgetsSetter = () => {
  KUL_CHART: WidgetCallback;
};
