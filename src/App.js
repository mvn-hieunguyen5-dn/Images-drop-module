import ImagesDrop from "./ImagesDrop";
import './App.css';

function App({ size = 3 ,onChange = ()=>{}}) {
  return (
    <ImagesDrop size={size} onChange={onChange} / >


  );
}

export default App;
