import React, { useState } from 'react';
import Loading from './Loading';
import ProjectsPane from './ProjectsPane';
import SettingsPane from './SettingsPane';

export default function ToolBar({
    projects,
    setSelectedProject,
    projectLoading,
    rateLimiterConfig,
    rateLimiterLoading,
    setRateLimiterConfig,
}: ToolbarProps) {
    /** State for the component */
    const [showToolbar, setShowToolbar] = useState(false);
    const [toolbarContent, setToolbarContent] = useState('');
    /** Allow users to select a project from a list and have the data for that proejct dispaly in the project view */
    // const handleSelectProject = (e: any) => {
    //     setSelectedProject(projects![e.target.id]);
    // };

    /** render the toolbar
     * while the GET_PROJECT_DATA query is loading, render the loading component
     * instead of the project list */

    let selectedPane;

    switch (toolbarContent) {
        case 'PROJECTS': {
            selectedPane = (
                <ProjectsPane
                    projectLoading={projectLoading}
                    projects={projects}
                    setSelectedProject={(project) => {
                        setSelectedProject(project);
                        setShowToolbar(false);
                        setToolbarContent('');
                    }}
                />
            );
            break;
        }
        case 'SETTINGS': {
            selectedPane = (
                <SettingsPane
                    // TODO: Move this into state and get it from the db
                    rateLimiterConfig={rateLimiterConfig}
                    rateLimiterLoading={rateLimiterLoading}
                    setRateLimiterConfig={setRateLimiterConfig}
                />
            );
            break;
        }
        default: {
            selectedPane = null;
        }
    }

    return (
        <div id="toolBar" style={showToolbar ? { left: '0px' } : { left: '-340px' }}>
            {/** //TODO: make the tool bar look nice. 
                   -toggle in and out from the right hand side. 
                   - sylethe project buttons */}

            <button
                className="fa-solid fa-bars fa-2xl"
                type="button"
                aria-label="switch"
                onClick={() => {
                    if (showToolbar && toolbarContent === 'PROJECTS') {
                        // panel is open to projects. Close the panel
                        setShowToolbar(false);
                        setToolbarContent('');
                    } else {
                        // panel was either closed or on the settings view
                        setShowToolbar(true);
                        setToolbarContent('PROJECTS');
                    }
                }}
            />
            <button
                className="fa-solid fa-gear fa-2xl fa-bars"
                type="button"
                aria-label="switch"
                onClick={() => {
                    if (showToolbar && toolbarContent === 'SETTINGS') {
                        // panel is open to projects. Close the panel
                        setShowToolbar(false);
                        setToolbarContent('');
                    } else {
                        // panel was either closed or on the settings view
                        setShowToolbar(true);
                        setToolbarContent('SETTINGS');
                    }
                }}
            />
            <div id="toolBarMenu">{projectLoading ? <Loading /> : selectedPane}</div>
        </div>
    );
}
