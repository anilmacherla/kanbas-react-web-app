import React from 'react';
import './Popup.css';

const Popup = ({ message, onNoClick, onDeleteClick }: ({
    message: string;
    onNoClick: () => void;
    onDeleteClick: () => void;
})) => {
    return (
        <div className="popup-overlay" onClick={onNoClick}>
            <div className="popup">
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <p>{message}</p>
                    <div className="popup-buttons">
                        <button className='btn btn-secondary' onClick={onNoClick}>No</button>
                        <button className='btn btn-danger' onClick={onDeleteClick}>Delete</button>
                    </div>
                </div>
            </div></div>
    );
};

export default Popup;
