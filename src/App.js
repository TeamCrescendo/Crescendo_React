import logo from './logo.svg';
import './App.css';
import Crescendo_main from "./ component/UI/Page/Crescendo_main";
import RecordBar from "./ component/UI/SideBar/RecordBar";

function App() {
  return (
      <>
          <div className="pageContainer">
              <RecordBar />
              <Crescendo_main />
          </div>
      </>
  );
}

export default App;