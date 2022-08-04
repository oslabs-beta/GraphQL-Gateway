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

type ChartSelectionDays = 1 | 7 | 30 | 365;
interface ProjectPaneProps {
    projects: Project[] | undefined;
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
    projectLoading: boolean;
    getUserData: any;
}

interface SettingsPaneProps {
    rateLimiterConfig: RateLimiterConfig;
    rateLimiterLoading: boolean;
    setRateLimiterConfig: (config: RateLimiterConfig, saveConfig: boolean) => void;
}

type ToolbarProps = ProjePaneProps & SettingsPaneProps;
