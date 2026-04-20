import ApiResourceView from './ApiResourceView';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  return <ApiResourceView title="Teams" endpoint={endpoint} primaryFields={['id', 'name', 'members', 'captain']} />;
}

export default Teams;