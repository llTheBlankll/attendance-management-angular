export interface RealTimeLineChartDTO {
  labels: string[];
  datasets: DataSet[];
}

export interface DataSet {
  label: string;
  data: string;
}
