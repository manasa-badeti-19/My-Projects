import React, { act, useMemo, useState } from "react";
import axios from "axios";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  TextField,
  Grid,
  FormHelperText,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Formik, useFormik } from "formik";
import {
  validationSchemaStepOne,
  validationSchemaStepTwo,
} from "./validationSchema/validationSchema";
import PersonalJobForm from "./PersonalJobForm";
import AddressBankForm from "./AddressBankForm";
const steps = ["Personal & Job Info", "Address & Bank Info"];

const EmployeeFormStepper = ({ onSubmit, existingData, view, edit }) => {
  const [activeStep, setActiveStep] = useState(0);
  console.log("existingData", existingData);

  const initialData = useMemo(() => {
    if (existingData && existingData.length > 0) {
      return {
        id: existingData[0]?.id,
        firstName: existingData[0]?.first_name,
        lastName: existingData[0]?.last_name,
        dob: existingData[0]?.dob.split("T")?.[0] || null, //format to yyyt-mm-dd
        gender: existingData[0]?.gender_id,
        email: existingData[0]?.email,
        mobNo: existingData[0]?.mobile_number,
        department: existingData[0]?.department_id,
        designation: existingData[0]?.designation_id,
        employmentType: existingData[0]?.employment_id,
        joiningDate: existingData[0]?.joining_date.split("T")?.[0] || null,
        workLocation: existingData[0]?.work_location_id,
        shift: existingData[0]?.shift_id,
        manager: existingData[0]?.manager_id,
        role: existingData[0]?.role_id,
      };
    }
    return {
      id: uuidv4(),
      firstName: "",
      lastName: "",
      dob: null,
      gender: null,
      email: "",
      mobNo: null,
      department: null,
      designation: null,
      employmentType: null,
      joiningDate: null,
      workLocation: null,
      shift: null,
      manager: null,
      role: null,
    };
  }, [existingData]); // only recomputes when existingData changes

  const initialDataStepTwo = useMemo(() => {
    if (existingData && existingData.length > 0) {
      return {
        addrs1: existingData[0]?.address_line1,
        addrs2: existingData[0]?.address_line2 || "",
        country: existingData[0]?.country_id,
        state: existingData[0]?.state_id,
        city: existingData[0]?.city_id,
        pincode: existingData[0]?.pincode,
        pan: existingData[0]?.pan,
        aadhaar: existingData[0]?.aadhaar,
        bank: existingData[0]?.bank_id,
        accNo: existingData[0]?.account_no,
        ifscCode: existingData[0]?.ifsc,
      };
    }
    return {
      addrs1: "",
      addrs2: "",
      country: null,
      state: null,
      city: null,
      pincode: "",
      pan: "",
      aadhaar: "",
      bank: "",
      accNo: "",
      ifscCode: "",
    };
  }, [existingData]);

  const submitEmployeeData = async () => {
    try {
      const finalData = { ...formik.values, ...formikStepTwo.values };
      axios
        .post(`${process.env.REACT_APP_EMPLOYEE_API_URL}`, finalData)
        .then((response) => {
          console.log("response", response);

          alert("Employee Data saved successfully");
          onSubmit();
        })
        .catch((err) => {
          console.log(err);
          alert(err?.response?.data?.message);
        });
    } catch (err) {
      console.log(err.message);
    }
  };
  const updateEmployee = async () => {
    try {
      const finalChangedData = { ...formik.values, ...formikStepTwo.values };
      const changes = {};
      const finalInitialData = { ...initialData, ...initialDataStepTwo };
      //taking only changed fields in chnages{}
      Object.keys(finalChangedData).forEach((key) => {
        if (finalChangedData[key] !== finalInitialData[key]) {
          changes[key] = finalChangedData[key];
        }
      });
      if (Object.keys(changes).length === 0) {
        alert("No changes made to update");
        return;
      } else {
        axios
          .put(
            `${process.env.REACT_APP_EMPLOYEE_API_URL}/${existingData[0]?.employee_id}`,
            changes
          )
          .then((response) => {
            console.log("response", response);
            alert("Employee Data updated successfully");
            onSubmit();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleSubmit = async () => {
    if (edit === true) {
      updateEmployee();
    } else {
      const errors = await formikStepTwo.validateForm();
      formikStepTwo.setTouched(
        Object.keys(errors).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
      if (Object.keys(errors).length === 0) {
        console.log("All values", formik, formikStepTwo);
        submitEmployeeData();
      }
    }
  };
  const handleNext = async () => {
    // if (activeStep === steps.length - 1) {
    //   const errors = await formikStepTwo.validateForm();
    //   formikStepTwo.setTouched(
    //     Object.keys(errors).reduce((acc, key) => {
    //       acc[key] = true;
    //       return acc;
    //     }, {})
    //   );
    //   if (Object.keys(errors).length === 0) {
    //     console.log("All values", formik, formikStepTwo);
    //     submitEmployeeData();
    //   }
    // }
    // else {
    const errors = await formik.validateForm();
    formik.setTouched(
      Object.keys(errors).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );
    if (Object.keys(errors).length === 0) {
      setActiveStep((prev) => prev + 1);
    }
    //}
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  //   const handleChange = (e) => {
  //     setForm((prev) => ({
  //       ...prev,
  //       [e.target.name]: e.target.value,
  //     }));
  //   };

  const formik = useFormik({
    initialValues: initialData,
    validationSchema: validationSchemaStepOne,
    onSubmit: (values) => {
      console.log("values", values);
    },
    enableReinitialize: true, //this reinitializes when intialValue changes like it takes time to load existingDataObj.so we need this
  });

  const formikStepTwo = useFormik({
    initialValues: initialDataStepTwo,
    validationSchema: validationSchemaStepTwo,
    onSubmit: (values) => {
      console.log("values", values);
    },
    enableReinitialize: true,
  });

  return (
    <Box sx={{ mt: 4 }}>
      <Stepper
        activeStep={activeStep}
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          mr: "10%",
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                sx: {
                  color:
                    index === activeStep
                      ? "yellow"
                      : index < activeStep
                      ? "green"
                      : "grey.400",
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <PersonalJobForm formik={formik} view={view} edit={edit} />
      )}

      {activeStep === 1 && (
        <AddressBankForm formik={formikStepTwo} view={view} edit={edit} />
      )}

      <Box mt={3} sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        {activeStep === 0 ? null : (
          <Button
            variant="outlined"
            onClick={handleBack}
            sx={{ width: "150px" }}
          >
            Back
          </Button>
        )}
        {activeStep !== steps.length - 1 && (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ ml: 2, width: "150px" }}
          >
            Next
          </Button>
        )}

        {view !== true && activeStep === steps.length - 1 && (
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ ml: 2, width: "150px" }}
          >
            {edit === true ? "Update" : "Submit"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default EmployeeFormStepper;
