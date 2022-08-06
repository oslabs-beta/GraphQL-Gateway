type ProjectQuery = {
    id: string;
    userID: string; // FIXME: Why do we need this? gql specific
    requestUuid: string;
    projectID: string;
    number: number;
    depth: number;
    complexity: number;
    tokens: number;
    success: boolean;
    timestamp: number;
    loggedOn: number; // gql specific
    latency?: number;
};

// interface ProjectQuery {
//     id: string;
//     number: number;
//     projectID: string;
//     depth: number;
//     complexity: number;
//     timestamp: number;
//     tokens: number;
//     // latency: number;
//     success: boolean;
//     requestId: string;
// }

type CreateProjectQueryArgs = {
    projectQuery: {
        projectID: string;
        number: string;
        complexity: number;
        depth: number;
        tokens: number;
        success: boolean;
        timestamp: number;
        loggedOn: number;
        latency?: number;
    };
};

type QueryByID = {
    id: string;
    minDate: number;
    maxDate: number;
};
