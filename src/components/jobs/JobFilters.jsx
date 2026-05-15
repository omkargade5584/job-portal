import React, { useState } from 'react';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';

const JobFilters = ({ onFilter }) => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ search, location, type });
  };

  const handleReset = () => {
    setSearch(''); setLocation(''); setType('');
    onFilter({ search: '', location: '', type: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center',
      padding: '1.25rem', background: 'var(--bg-tertiary)',
      borderRadius: 'var(--radius-md)', marginBottom: '1.5rem',
      border: '1px solid var(--border-color)',
    }}>
      <div style={{ position: 'relative', flex: '2 1 200px' }}>
        <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        <input
          className="input-field"
          style={{ paddingLeft: '2.25rem' }}
          placeholder="Search job title or keyword..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div style={{ position: 'relative', flex: '1 1 150px' }}>
        <MapPin size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        <input
          className="input-field"
          style={{ paddingLeft: '2.25rem' }}
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </div>
      <select className="input-field" style={{ flex: '1 1 130px' }} value={type} onChange={e => setType(e.target.value)}>
        <option value="">All Types</option>
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Contract">Contract</option>
      </select>
      <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <SlidersHorizontal size={16} /> Filter
      </button>
      <button type="button" className="btn btn-outline" onClick={handleReset}>Reset</button>
    </form>
  );
};

export default JobFilters;
