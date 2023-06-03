import "./App.css";
import Calculator from "./Calculator/Calculator";
import Transaction from "./Transaction/Transaction";

function App() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <Calculator />
          </div>
          <div className="col">
            <Transaction />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
