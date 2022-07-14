import React from 'react';
import { ProjectQuery } from '../../@types/Interfaces';

interface QueryProps {
    query: ProjectQuery;
}

export default function Query({ query }: QueryProps) {
    return (
        <div className="queryProps">
            {/* number still missing */}
            {/* <div>
                            <div className="label">Number: </div>
                            <div className="value">{query.number}</div>
                        </div> */}
            <div className="individualQuery">
                <div className="label">Time: </div>
                <div className="value">{query.timestamp}</div>
            </div>
            <div className="individualQuery">
                <div className="label">Depth: </div>
                <div className="value">{query.depth}</div>
            </div>
            <div className="individualQuery">
                <div className="label">Complexity: </div>
                <div className="value">{query.complexity}</div>
            </div>
        </div>
    );
}
