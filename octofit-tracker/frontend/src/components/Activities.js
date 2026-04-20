import ApiResourceView from './ApiResourceView';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

function Activities() {
  return <ApiResourceView title="Activities" endpoint={endpoint} primaryFields={['id', 'name', 'type', 'duration']} />;
}

export default Activities;