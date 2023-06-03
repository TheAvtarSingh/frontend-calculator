import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {
  var [result, setResult] = useState("");
  var cssButtonPressed = "icon-border";

  const buttonPressed = (e) => setResult(result.concat(e.target.name));
  const clearAll = () => setResult("");
  const singleClear = () => setResult(result.slice(0, result.length - 1));

  const [showComponent, setshowComponent] = useState(false);
  const [operation, setoperation] = useState("");
  const [description, setdescription] = useState("");
  const [resultString, setresultString] = useState("");

  const changeDescription = (e) => {
    setdescription(e.target.value);
  };

  const calculate = (e) => {
    try {
      setoperation(result.toString());
      setResult(eval(result).toString());
      setdescription(e.target.description);
      setresultString(eval(result).toString());
    } catch (error) {
      setResult("Error");
    }
  };

  const AddTransaction = async (e) => {
    e.preventDefault();
    fetch("https:/backend-calculator.vercel.app/api/addData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operation: operation,
        description: description,
        resultString: resultString,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.errors === undefined) {
          setresultString("");
          setoperation("");
          setdescription("");
          setshowComponent(true);
        }
      });
  };

  return (
    <>
      <div className="container h-90 w-100 m-5 d-flex justify-content-center align-items-center text-white bg-dark flex-column border-3 border shadow-lg icon-border-change">
        <h1 className="m-3 ">Calculator</h1>
        <div className="m-3 container calculator-color justify-content-end h-80  border-1 border shadow-sm shadow-light border-inner-box rounded">
          <input
            className="container text-end m-2 calculator-color border-0 text-light font-size-height"
            type="text"
            value={result}
          />
          <div className="p-1 row text-center button-size-height">
            <button
              className={`pt-2 col text-center shadow upper-row-color font-size-height text-light shadow-icon ${cssButtonPressed}`}
              onClick={clearAll}
            >
              AC
            </button>
            <button
              className={`pt-2 col text-center upper-row-color font-size-height  text-light shadow-icon ${cssButtonPressed}`}
              onClick={singleClear}
            >
              C
            </button>
            <button
              className={`pt-2 col text-center upper-row-color font-size-height  text-light shadow-icon ${cssButtonPressed}`}
              name={"%"}
              onClick={buttonPressed}
            >
              %
            </button>
            <button
              className={`pt-2 col text-center row-color font-size-height  text-light shadow-icon ${cssButtonPressed}`}
              name={"/"}
              onClick={buttonPressed}
            >
              /
            </button>
          </div>
          <div className="p-1 row button-size-height">
            <button
              className={`pt-2 col text-center side-row-color font-size-height  text-light shadow-icon   ${cssButtonPressed}`}
              name="7"
              onClick={buttonPressed}
            >
              7
            </button>
            <button
              className={`pt-2 col text-center side-row-color font-size-height  text-light shadow-icon  ${cssButtonPressed}`}
              name="8"
              onClick={buttonPressed}
            >
              8
            </button>
            <button
              className={`pt-2 col text-center side-row-color font-size-height  text-light shadow-icon  ${cssButtonPressed}`}
              name="9"
              onClick={buttonPressed}
            >
              9
            </button>
            <button
              className={`pt-2 col text-center row-color font-size-height  text-light shadow-icon  ${cssButtonPressed}`}
              name={"*"}
              onClick={buttonPressed}
            >
              X
            </button>
          </div>
          <div className="p-1 row button-size-height">
            <button
              className={`pt-2 col text-center side-row-color font-size-height  text-light shadow-icon  ${cssButtonPressed}`}
              name="4"
              onClick={buttonPressed}
            >
              4
            </button>
            <button
              className={`pt-2 col text-center side-row-color font-size-height  text-light shadow-icon  ${cssButtonPressed}`}
              name="5"
              onClick={buttonPressed}
            >
              5
            </button>
            <button
              className={`pt-2 col text-center side-row-color font-size-height  text-light shadow-icon  ${cssButtonPressed}`}
              name="6"
              onClick={buttonPressed}
            >
              6
            </button>
            <button
              className={`pt-2 col text-center row-color font-size-height  text-light shadow-icon  ${cssButtonPressed}`}
              name={"-"}
              onClick={buttonPressed}
            >
              -
            </button>
          </div>
          <div className="p-1 row button-size-height">
            <button
              className={`pt-2 col text-center side-row-color font-size-height  text-light  shadow-icon ${cssButtonPressed}`}
              name="1"
              onClick={buttonPressed}
            >
              1
            </button>
            <button
              className={`pt-2 col text-center side-row-color font-size-height  text-light shadow-icon  ${cssButtonPressed}`}
              name="2"
              onClick={buttonPressed}
            >
              2
            </button>
            <button
              className={`pt-2 col text-center side-row-color font-size-height  text-light shadow-icon  ${cssButtonPressed}`}
              name="3"
              onClick={buttonPressed}
            >
              3
            </button>
            <button
              className={`pt-2 col text-center row-color font-size-height  text-light shadow-icon  ${cssButtonPressed}`}
              name={"+"}
              onClick={buttonPressed}
            >
              +
            </button>
          </div>
          <div className="p-1 mb-2 row button-size-height">
            <button
              className={`pt-2 col-6 text-center side-row-color font-size-height text-light  shadow-icon  ${cssButtonPressed}`}
              name="0"
              onClick={buttonPressed}
            >
              0
            </button>
            <button
              className={`pt-2 col text-center side-row-color font-size-height shadow-icon text-light  ${cssButtonPressed}`}
              name="."
              onClick={buttonPressed}
            >
              .
            </button>
            <button
              className={`pt-2 col text-center row-color font-size-height text-light  shadow-icon  ${cssButtonPressed}`}
              onClick={calculate}
            >
              =
            </button>
          </div>
        </div>
        <div className="m-3 container calculator-color justify-content-end h-80  border-1 border shadow-sm shadow-light border-inner-box rounded">
          <form method="post" onSubmit={AddTransaction}>
            <div className="row pt-2">
              <label htmlFor="name" className="form-label d-inline text-end">
                <i>Operation</i>
              </label>
              <input
                className="text-end  calculator-color border-0 text-light font-size-height"
                type="text"
                value={operation}
              />
            </div>
            <div className="row pt-2">
              <label htmlFor="name" className="form-label d-inline text-end">
                <i>Description</i>
              </label>
              <input
                className="text-end  calculator-color border-0 text-light font-size-height pt-2"
                type="text"
                required
                onChange={changeDescription}
                value={description}
              />
            </div>
            <div className="row">
              <label htmlFor="name" className="form-label d-inline text-end">
                <i>Result</i>
              </label>
              <input
                className="text-end  calculator-color border-0 text-light font-size-height pt-2"
                type="text"
                name="description"
                value={resultString}
              />
            </div>
            <div className="row">
              <button type="submit" className="btn btn-primary p-3">
                Add Entry
              </button>
            </div>
          </form>
          {showComponent && (
            <div
              className="mt-3 alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>Data Saved Successfully</strong>
              <button
                type="button"
                className="m-2 close btn btn-primary"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => setshowComponent(false)}
              >
                x
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Calculator;
