import React, { useState } from 'react';
import DetailsComponent from './detailsComponent';
import QuestionsComponent from './questionsComponent';
import { useSelector } from 'react-redux';
import { KanbasState } from '../../../store';

const QuizEditor: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('details');

    const handleTabChange = (tab: string, event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); // Prevent default behavior of anchor element
        setActiveTab(tab);
    };

    return (
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a href="#" className={`nav-link ${activeTab === 'details' ? 'active' : ''}`} onClick={(e) => handleTabChange('details', e)}>Details</a>
                </li>
                <li className="nav-item">
                    <a href="#" className={`nav-link ${activeTab === 'questions' ? 'active' : ''}`} onClick={(e) => handleTabChange('questions', e)}>Questions</a>
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
