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

type BucketType = 'TOKEN_BUCKET' | 'LEAKY_BUCKET';

type WindowType = 'FIXED_WINDOW' | 'SLIDING_WINDOW_LOG' | 'SLIDING_WINDOW_COUNTER';

type BucketRateLimiter = {
    type: BucketType;
    options: {
        refillRate: number;
        capacity: number;
    };
};

type WindowRateLimiter = {
    type: WindowType;
    options: {
        windowSize: number;
        capacity: number;
    };
};

type RateLimiterConfig = WindowRateLimiter | BucketRateLImiter;

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
