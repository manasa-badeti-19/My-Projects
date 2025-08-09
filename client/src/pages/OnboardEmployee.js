import React, { useEffect, useState } from "react";
import EmployeeFormStepper from "./components/EmployeeFormStepper";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
export default function OnboardEmployee() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const empId = params?.id;
  const view = location?.state?.view;
  const edit = location?.state?.edit;
  const [employeeData, setEmployeeData] = useState([]);

  const getEmployeeById = async () => {
    try {
      axios
        .get(`${process.env.REACT_APP_EMPLOYEE_API_URL}/${empId}`)
        .then((response) => {
          console.log("response", response);
          setEmployeeData(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (edit || view) {
      getEmployeeById();
    } else {
      setEmployeeData([]);
    }
  }, [view, edit]);
  console.log("view, edit", view, edit);
  const handleSubmit = () => {
    navigate("/employees");
  };
  return (
    <div>
      <EmployeeFormStepper
        onSubmit={handleSubmit}
        existingData={employeeData}
        view={view}
        edit={edit}
      />
    </div>
  );
}
