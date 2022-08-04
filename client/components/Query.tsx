import React from 'react';

interface QueryProps {
    query: ProjectQuery;
}

export function QueryHeader() {
    return (
        // <div className="queryHeader">
        <>
            <div className="individualQuery">
                <div className="label">ID</div>
            </div>
            <div className="individualQuery">
                <div className="label">Tokens</div>
            </div>
            <div className="individualQuery">
                <div className="label">Depth</div>
            </div>
            <div className="individualQuery">
                <div className="label">Complexity</div>
            </div>
            <div className="individualQuery">
                <div className="label">Blocked</div>
            </div>
        </>
        // </div>
    );
}
export default function Query({ query }: QueryProps) {
    const blocked = !query.success ? 'blocked' : '';
    return (
        // <div className="queryProps">
        <>
            <div className="individualQuery">
                <div className={`value ${blocked}`}>{query.number}</div>
            </div>
            <div className="individualQuery">
                <div className={`value ${blocked}`}>{query.tokens}</div>
            </div>
            <div className="individualQuery">
                <div className={`value ${blocked}`}>{query.depth}</div>
            </div>
            <div className="individualQuery">
                <div className={`value ${blocked}`}>{query.complexity}</div>
            </div>
            <div className="individualQuery">
                <div className={`value ${blocked}`}>{(!query.success).toString()}</div>
            </div>
        </>
        // </div>
    );
}
