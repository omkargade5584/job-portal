import { useState, useEffect } from 'react';
import { getMyApplications } from '../api/applicationApi';

export const useApplications = (seekerId) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!seekerId) return;
    setLoading(true);
    getMyApplications(seekerId)
      .then(res => { setApplications(res.data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [seekerId]);

  return { applications, loading, error };
};
