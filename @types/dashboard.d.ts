type SortOrder = '↑' | '↓' | '';

interface SeriesData {
    readonly name: string;
    data: number[];
}
interface ChartData {
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
interface ProjectPaneProps {
    projects: Project[] | undefined;
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
    projectLoading: boolean;
}

interface SettingsPaneProps {
    rateLimiterConfig: RateLimiterConfig;
    setRateLimiterConfig: React.Dispatch<RateLimiterConfig>;
}

type ToolbarProps = ProjePaneProps & SettingsPaneProps;
