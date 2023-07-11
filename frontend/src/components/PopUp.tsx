import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik } from "formik";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createEmployeeAction, editEmployeeAction } from "../redux/features/EmployeesSlice";
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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      console.log('value', values)
      const payload = {
        FullName: values.fullName,
        Email: values.email,
        Country: values.country,
        DOB: values.DOB,
        Profile_Picture: filePreview || ""
      };

      if (type === "edit") {
        payload.id = data?.id;
        await dispatch(editEmployeeAction(payload));
      } else {
        await dispatch(createEmployeeAction(payload));
      }

      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

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
            country: data?.Country || "",
            DOB: data?.DOB || ""
          }}
          onSubmit={handleSubmit}
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
                <Form.Select
                  aria-label="Select country"
                  name="country"
                  value={values.country || 'India'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {countryList.map((country: any) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </Form.Select>
              </div>

              <div className="form-group">
                <label>Profile Picture</label>
                <input
                  type="file"
                  name="Profile_Picture"
                  onChange={(event) => {
                    handleChange(event);
                    handleFileChange(event);
                  }}
                  onBlur={handleBlur}
                  className="form-control"
                />
              </div>

              {/* {filePreview && (
                <div className="form-group">
                  <img src={filePreview} alt="Preview" className="preview-image" />
                </div>
              )} */}

              <div className="userFormModel__action">
                <Button type="submit" disabled={isSubmitting} className="button">
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
