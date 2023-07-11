import { useState,useEffect } from "react";
import "./App.css";
import TableComponent from "./components/TableComponent";
import { Button } from "react-bootstrap";
import PopUp from "./components/PopUp";
import "./app.scss";
import { useDispatch } from "react-redux";
import { getEmployeeAction } from "./redux/features/EmployeesSlice";

function App() {
  const dispatch: any = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getEmployeeAction());
  }, []);

  return (
    <>
      <div className="pageTemplate">
        <div className="pageHeading">
          <div className="container">
            <div className="pageHeading__inner">
              <p className="pageHeading__title">Employee List</p>
              <Button onClick={handleShow} className="button">
                Add New Employee
              </Button>
            </div>
          </div>
        </div>
        <div className="container">
          <PopUp show={show} handleClose={handleClose} />
          <TableComponent />
        </div>
      </div>
    </>
  );
}

export default App;
