import React from 'react';
import ToolBar from './ToolBar';
import ProjectView from './ProjectView';
import { useAuth } from '../auth/AuthProvider';

export default function newDashboard() {
    /** Bring the user context into this component */
    const { user } = useAuth();

    return (
        <div>
            <ToolBar />
            <ProjectView />
        </div>
    );
}
