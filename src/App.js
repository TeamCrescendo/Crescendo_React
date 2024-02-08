import logo from './logo.svg';
import './App.css';
import Crescendo_main from "./ component/Main/Crescendo_main";
import RecordBar from "./ component/UI/RecordBar/RecordBar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={
                    <div className="pageContainer">
                        <Crescendo_main/>
                    </div>

                }>
                </Route>

            </Routes>
        </BrowserRouter>

      </>
  );
}

export default App;