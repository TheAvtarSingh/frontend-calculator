import "./Transaction.css";

import React, { useEffect, useState } from "react";

function Transaction() {
  const [user, setUser] = useState([]);
  const [showAlert, setshowAlert] = useState(false);

  useEffect(() => {
    return () => {
      loadData();
    };
  }, []);

  const loadData = async () => {
    let response = await fetch(
      "https:/backend-calculator.vercel.app/api/getData",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.length > 0) {
      setUser(data);
    } else {
      setUser([]);
    }
  };

  const refreshPage = () => loadData();

  const deleteData = async () => {
    const res = await fetch(
      "https:/backend-calculator.vercel.app/api/deleteData",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const deletedData = await res.json();
    if (!deletedData) {
      console.log("An Error Occured!");
    } else {
      setshowAlert(true);
      loadData();
    }
  };

  return (
    <>
      <div className="container h-90 w-100 m-5 d-flex justify-content-center align-items-center text-white bg-dark flex-column border-3 border shadow-lg icon-border-change">
        <h1 className="m-3 ">Your Saved History</h1>
        <div className="m-3 container calculator-color justify-content-end h-80  border-1 border shadow-sm shadow-light border-inner-box rounded">
          <div className="row mt-3">
            <div className="col text-center">
              <h1 className="heading">Sno.</h1>
            </div>
            <div className="col text-center">
              <h1 className="heading">Operation</h1>
            </div>
            <div className="col text-center">
              <h1 className="heading">Description</h1>
            </div>
            <div className="col text-center">
              <h1 className="heading">Result</h1>
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <h1 className="content">
                {user.map((user, index) => (
                  <p>{index + 1}</p>
                ))}
              </h1>
            </div>
            <div className="col text-center">
              <h1 className="content">
                {user.map((user) => (
                  <p>[{user.operation}]</p>
                ))}
              </h1>
            </div>
            <div className="col text-center">
              <h1 className="content">
                {user.map((user) => (
                  <p>[{user.description}]</p>
                ))}
              </h1>
            </div>
            <div className="col text-center">
              <h1 className="content">
                {user.map((user) => (
                  <p>[{user.resultString}]</p>
                ))}
              </h1>
            </div>
          </div>
        </div>
        <div className="col">
          <button
            className="btn btn-success btn-sm mb-3 mx-3"
            onClick={refreshPage}
          >
            Refresh History
          </button>
          <button className="btn btn-danger btn-sm mb-3" onClick={deleteData}>
            Delete History
          </button>
        </div>
        {showAlert && (
          <div
            className="mt-2 alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>History Cleared Successfully</strong>
            <button
              type="button"
              className="m-3 close btn btn-primary"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => setshowAlert(false)}
            >
              x
            </button>
          </div>
        )}
      </div>
    </>
  );
}
{
}
export default Transaction;
