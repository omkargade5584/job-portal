import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';

const SavedJobButton = ({ jobId }) => {
  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = () => {
    // In a real app, dispatch to Redux or API here
    setIsSaved(!isSaved);
  };

  return (
    <button 
      onClick={toggleSave}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: isSaved ? 'var(--accent-primary)' : 'var(--text-secondary)',
        transition: 'var(--transition)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.4rem'
      }}
      title={isSaved ? "Saved Job" : "Save this Job"}
    >
      <Bookmark fill={isSaved ? "currentColor" : "none"} strokeWidth={2} size={20} />
    </button>
  );
};

export default SavedJobButton;
