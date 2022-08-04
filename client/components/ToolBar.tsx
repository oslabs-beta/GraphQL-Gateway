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
    onRawQueriesClick,
}: ToolbarProps) {
    /** State for the component */
    const [showToolbar, setShowToolbar] = useState(false);
    const [toolbarContent, setToolbarContent] = useState('');

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
                    rateLimiterConfig={rateLimiterConfig}
                    rateLimiterLoading={rateLimiterLoading}
                    setRateLimiterConfig={setRateLimiterConfig}
                    onRawQueriesClick={onRawQueriesClick}
                />
            );
            break;
        }
        default: {
            selectedPane = null;
        }
    }

    return (
        <div id="toolBar" className={`toolBar ${!showToolbar ? 'closed' : ''}`}>
            <button
                className={`arrow ${showToolbar ? 'left' : 'right'}`}
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
            <div id="toolBarButtons">
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
            </div>
            <div id="toolBarMenu">{projectLoading ? <Loading /> : selectedPane}</div>
        </div>
    );
}
