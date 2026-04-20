import { useCallback, useEffect, useMemo, useState } from 'react';

function getDisplayValue(value) {
  if (value === null || value === undefined) {
    return 'N/A';
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
}

function ApiResourceView({ title, endpoint, primaryFields = [] }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const columns = useMemo(() => {
    if (items.length === 0) {
      return primaryFields;
    }
    const keys = Object.keys(items[0] || {});
    if (keys.length === 0) {
      return primaryFields;
    }
    return keys.slice(0, 4);
  }, [items, primaryFields]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return items;
    }
    return items.filter((item) => {
      return columns.some((column) => {
        const rawValue = item?.[column];
        return getDisplayValue(rawValue).toLowerCase().includes(normalizedQuery);
      });
    });
  }, [columns, items, query]);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      console.log(`${title} endpoint:`, endpoint);
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      console.log(`${title} fetched data:`, data);
      const normalized = Array.isArray(data) ? data : Array.isArray(data.results) ? data.results : [];
      setItems(normalized);
    } catch (fetchError) {
      console.error(`${title} fetch error:`, fetchError);
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, title]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <section className="mb-4">
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <h2 className="h3 text-primary-emphasis fw-bold mb-0">{title}</h2>
            <button type="button" className="btn btn-primary" onClick={fetchItems}>
              Refresh Data
            </button>
          </div>

          <form className="row g-2 align-items-end mb-3" onSubmit={(event) => event.preventDefault()}>
            <div className="col-md-8 col-lg-6">
              <label htmlFor={`${title}-search`} className="form-label">
                Search {title}
              </label>
              <input
                id={`${title}-search`}
                type="text"
                className="form-control"
                placeholder={`Filter ${title.toLowerCase()} by visible columns`}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-outline-secondary" onClick={() => setQuery('')}>
                Clear
              </button>
            </div>
          </form>

          <div className="small text-muted mb-2">
            Endpoint:{' '}
            <a className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href={endpoint} target="_blank" rel="noreferrer">
              {endpoint}
            </a>
          </div>

          {error && <div className="alert alert-danger">Failed to fetch {title.toLowerCase()}: {error}</div>}
          {loading && <div className="alert alert-info">Loading {title.toLowerCase()}...</div>}

          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  {columns.map((column) => (
                    <th scope="col" key={column}>{column}</th>
                  ))}
                  <th scope="col" className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {!loading && filteredItems.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-center py-4 text-muted">
                      No records found.
                    </td>
                  </tr>
                )}
                {filteredItems.map((item, index) => (
                  <tr key={item.id || item._id || index}>
                    {columns.map((column) => (
                      <td key={`${item.id || item._id || index}-${column}`}>
                        {getDisplayValue(item?.[column])}
                      </td>
                    ))}
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        data-bs-toggle="modal"
                        data-bs-target={`#${title.toLowerCase()}-detail-modal`}
                        onClick={() => setSelectedItem(item)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id={`${title.toLowerCase()}-detail-modal`}
        tabIndex="-1"
        aria-labelledby={`${title.toLowerCase()}-detail-modal-label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title fs-5" id={`${title.toLowerCase()}-detail-modal-label`}>
                {title} Details
              </h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedItem ? (
                <pre className="mb-0"><code>{JSON.stringify(selectedItem, null, 2)}</code></pre>
              ) : (
                <p className="text-muted mb-0">Select a row to view details.</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ApiResourceView;