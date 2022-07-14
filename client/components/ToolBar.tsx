import React from 'react';

interface ToolbarProps {
    projects: Project[] | undefined;
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
    loading: boolean;
}
export default function ToolBar({ projects, setSelectedProject, loading }: ToolbarProps) {
    return <div>This will be a toolbar</div>;
}
