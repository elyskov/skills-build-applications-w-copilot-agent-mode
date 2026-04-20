import ApiResourceView from './ApiResourceView';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  return <ApiResourceView title="Workouts" endpoint={endpoint} primaryFields={['id', 'name', 'difficulty', 'duration']} />;
}

export default Workouts;