import { Modal } from "react-bootstrap";
import { Formik } from "formik";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  createEmployeeAction,
  editEmployeeAction,
} from "../redux/features/EmployeesSlice";
import { countryList } from "../constant/data";
import Form from 'react-bootstrap/Form';

interface PopupTypes {
  show: boolean;
  handleClose: () => void;
  type?: string;
  data?: any;
}

const PopUp = ({ show, handleClose, type, data }: PopupTypes) => {
  const dispatch: any = useDispatch();
  return (
    <Modal show={show} onHide={handleClose} className="userFormModel">
      <Modal.Header closeButton className="userFormModel__header">
        <Modal.Title className="userFormModel__title">
          Create Employee 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            fullName: data?.FullName || "",
            email: data?.Email || "",
            country: data?.Country ||  "",
            Profile_Picture: data?.Profile_Picture || "",
            DOB: data?.DOB || ""
          }}
          onSubmit={(values) => {
            setTimeout(() => {
              console.log(values, "THIS IS VALUES");
              if (type === "edit") {
                dispatch(editEmployeeAction({
                  id: data?.id,
                  FullName: values.fullName,
                  Email: values.email,
                  DOB: values.DOB,
                  Profile_Picture: values.Profile_Picture,
                }));
                handleClose();
              } else{
                dispatch(createEmployeeAction({
                  FullName: values.fullName,
                  Email: values.email,
                  DOB: values.DOB,
                  Profile_Picture: values.Profile_Picture,
                }));
                handleClose();
              }
            }, 400);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                  className="form-control"
                />
              </div>
                <div className="form-group">
                  <label>DOB</label>
                  <input
                    type="date"
                    name="DOB"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.DOB}
                    className="form-control"
                  />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="form-control"
                  />
              </div>
              <div className="form-group">
                <label>Country</label>
                <Form.Select aria-label="Select country" name='country' value={values.country || 'India'} onChange={handleChange} onBlur={handleBlur}>
                  {countryList.map((country: any) =>{
                    return <option key={country.name} value={country.name} onChange={handleChange} onBlur={handleBlur}>{country.name}</option>
                  })}
                </Form.Select>
              </div>

              <div className="form-group">
                <label>Profile Picture</label>
                <input
                type="url"
                name="Profile_Picture"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Profile_Picture}
                className="form-control"
                />
              </div>

              <div className="userFormModel__action">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="button"
                >
                  Submit
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default PopUp;
