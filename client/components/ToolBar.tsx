import React from 'react';

interface ToolbarProps {
    projects: Project[] | undefined;
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
    projectLoading: boolean;
}
export default function ToolBar({ projects, setSelectedProject, projectLoading }: ToolbarProps) {
    return <div>This will be a toolbar</div>;
}
