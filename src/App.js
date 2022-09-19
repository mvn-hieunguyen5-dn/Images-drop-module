import ImagesDrop from "./ImagesDrop-Backup";
import './App.css';

function App({ size = 3 ,onChange = ()=>{}}) {
  return (
    <ImagesDrop firstData={[]} size={size} onChange={onChange} />
  );
}

export default App;
