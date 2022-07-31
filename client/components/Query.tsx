import React from 'react';

interface QueryProps {
    query: ProjectQuery;
}

export default function Query({ query }: QueryProps) {
    return (
        <div className="queryProps">
            <div className="individualQuery">
                <div className="label">Num: </div>
                <div className="value">{query.number}</div>
            </div>
            <div className="individualQuery">
                <div className="label">Tok: </div>
                <div className="value">{query.tokens}</div>
            </div>
            <div className="individualQuery">
                <div className="label">Dep: </div>
                <div className="value">{query.depth}</div>
            </div>
            <div className="individualQuery">
                <div className="label">Com: </div>
                <div className="value">{query.complexity}</div>
            </div>
            {/* <div className="individualQuery">
                <div className="label">Latency: </div>
                <div className="value">{query.latency}</div>
            </div> */}
            <div className="individualQuery">
                <div className="label">Blo: </div>
                <div className="value">{(!query.success).toString()}</div>
            </div>
        </div>
    );
}
