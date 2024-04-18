import React, { useState } from 'react';
import DetailsComponent from './detailsComponent';
import QuestionsComponent from './questionsComponent';

const QuizEditor: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('details');

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === 'details' ? 'active' : ''}`} onClick={() => handleTabChange('details')}>Details</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === 'questions' ? 'active' : ''}`} onClick={() => handleTabChange('questions')}>Questions</a>
                </li>
            </ul>

            {/* Render content based on activeTab */}
            <div className="tab-content" style={{ width: "80%" }}>
                {activeTab === 'details' && <DetailsComponent />}
                {activeTab === 'questions' && <QuestionsComponent />}
            </div>
        </div>
    );
};

export default QuizEditor;
