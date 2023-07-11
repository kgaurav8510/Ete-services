import { useState } from "react";
import { Button } from "react-bootstrap";
import PopUp from "./PopUp";
import editIcon from "../assets/images/pen-solid.svg";
import deleteIcon from "../assets/images/trash-solid.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployeeAction } from "../redux/features/EmployeesSlice";


interface SingleEmployeeTypes {
  index: number;
  id: string;
  FullName: string;
  Email: string;
  Age: string;
  DOB: string;
  Country: string;
  Profile_Picture: string;
}


const SingleRow = ({
  id,
  FullName,
  Email,
  Age,
  DOB,
  Country,
  Profile_Picture,
}: SingleEmployeeTypes) => {
  const dispatch: any = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <tr>
        <td>
          <div className="profileBlock">
            <span className="profileBlock__img">
              <img src={Profile_Picture} alt="userImage" className="img-fluid" />
            </span>
            <h6 className="profileBlock__name">{FullName}</h6>
          </div>
        </td>
        <td>{Email}</td>
        <td>{DOB}</td>
        <td>{Country || "India"}</td>
        <th>
          <div className="actionBtn">
            <Button onClick={handleShow}>
              <img src={editIcon} alt="icon" className="img-fluid" />
            </Button>
            <Button
              size="sm"
              style={{ backgroundColor: "red", border: "none" }}
              onClick={() => dispatch(deleteEmployeeAction(id))}
            >
              <img src={deleteIcon} alt="icon" className="img-fluid" />
            </Button>
          </div>
        </th>
      </tr>
      <PopUp
        show={show}
        handleClose={handleClose}
        type={"edit"}
        data={{ id, FullName, Email, Country, Age, DOB, Profile_Picture }}
      />
    </>
  );
};

function TableComponent() {
  const employeesData = useSelector((store: any) => store.employees.employees);

  return (
    <div className="table-responsive dataTable">
      <table className="table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {employeesData?.map((el: any, index: number) => {
            return <SingleRow key={el.id} index={index} {...el} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;
