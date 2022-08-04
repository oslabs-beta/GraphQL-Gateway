/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

export interface IProps {
    togglePopup: any;
    userID: any;
    createProjectMutation: any;
}
// eslint-disable-next-line react/function-component-definition
const Form: React.FC<IProps> = ({ togglePopup, userID, createProjectMutation }) => {
    const [name, setName] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        createProjectMutation({ variables: { project: { userID, name } } });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div id="box">
                <div id="boxInside">
                    <span className="close" onClick={togglePopup}>
                        x
                    </span>
                    <h3>New project name:</h3>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <button
                        style={{ marginTop: '20px', marginBottom: '20px' }}
                        className="selectProjectButton"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Form;