import ApiResourceView from './ApiResourceView';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

function Users() {
  return <ApiResourceView title="Users" endpoint={endpoint} primaryFields={['id', 'username', 'email', 'team']} />;
}

export default Users;