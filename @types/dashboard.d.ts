export type SortOrder = '↑' | '↓' | '';

export interface SeriesData {
    readonly name: string;
    data: number[];
}
export interface ChartData {
    options: {
        readonly chart: {
            id: string;
        };
        xaxis: {
            categories: string[];
        };
    };
    series: SeriesData[];
}
