import ApiResourceView from './ApiResourceView';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  return <ApiResourceView title="Leaderboard" endpoint={endpoint} primaryFields={['id', 'name', 'score', 'rank']} />;
}

export default Leaderboard;