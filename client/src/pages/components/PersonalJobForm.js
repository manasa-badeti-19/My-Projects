import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  FormHelperText,
} from "@mui/material";

const PersonalJobForm = ({ formik, view, edit }) => {
  const [gender, setGender] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [manager, setManager] = useState([]);
  const [roles, setRoles] = useState([]);
  const getGender = async () => {
    try {
      axios
        .get(`${process.env.REACT_APP_MASTER_API_URL}/gender`)
        .then((response) => {
          console.log("response", response);
          setGender(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  };
  const getRoles = async () => {
    try {
      axios
        .get(`${process.env.REACT_APP_MASTER_API_URL}/roles`)
        .then((response) => {
          console.log("response", response);
          setRoles(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getDepartments = async () => {
    try {
      axios
        .get(`${process.env.REACT_APP_MASTER_API_URL}/departments`)
        .then((response) => {
          console.log("response", response);
          setDepartments(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getEmploymentTypes = async () => {
    try {
      axios
        .get(`${process.env.REACT_APP_MASTER_API_URL}/employment-types`)
        .then((response) => {
          console.log("response", response);
          setEmploymentTypes(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getLocations = async () => {
    try {
      axios
        .get(`${process.env.REACT_APP_MASTER_API_URL}/locations`)
        .then((response) => {
          console.log("response", response);
          setLocations(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getShifts = async () => {
    try {
      axios
        .get(`${process.env.REACT_APP_MASTER_API_URL}/shifts`)
        .then((response) => {
          console.log("response", response);
          setShifts(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getManager = async () => {
    try {
      axios
        .get(`${process.env.REACT_APP_MASTER_API_URL}/reporting-manager`, {
          params: { department: formik.values.department },
        })
        .then((response) => {
          console.log("response", response);
          setManager(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getGender();
    getDepartments();
    getEmploymentTypes();
    getLocations();
    getShifts();
    getRoles();
  }, []);

  useEffect(() => {
    if (formik.values.department !== null) {
      const params = { department: formik.values.department };
      try {
        axios
          .get(`${process.env.REACT_APP_MASTER_API_URL}/designations`, {
            params: params,
          })
          .then((response) => {
            console.log("response", response);
            setDesignations(response.data.data);
          })
          .catch((err) => {
            console.log(err);
          });

        getManager();
      } catch (err) {
        console.log(err.message);
      }
    }
  }, [formik.values?.department]);
  console.log("formik", formik.values, formik.errors, view);
  return (
    <div>
      <h4 style={{ color: "blue", marginBottom: "15px" }}>Personal Details</h4>
      <Divider sx={{ mb: 3, mt: 0 }} />
      <Grid container spacing={2} direction="row">
        <Grid item xs={3}>
          <TextField
            name="firstName"
            label="First Name"
            fullWidth
            value={formik.values.firstName}
            onChange={formik.handleChange}
            sx={{ minWidth: "150px" }}
            required
            InputLabelProps={{ shrink: true }}
            disabled={view === true ? true : false}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="lastName"
            label="Last Name"
            fullWidth
            value={formik.values.lastName}
            onChange={formik.handleChange}
            sx={{ minWidth: "150px" }}
            required
            InputLabelProps={{ shrink: true }}
            disabled={view === true ? true : false}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="dob"
            label="Dob"
            fullWidth
            value={formik.values.dob === null ? "" : formik.values.dob}
            type="date"
            onChange={formik.handleChange}
            InputLabelProps={{ shrink: "true" }}
            sx={{ minWidth: "210px" }}
            required
            disabled={view === true ? true : false}
            error={formik.touched.dob && Boolean(formik.errors.dob)}
            helperText={formik.touched.dob && formik.errors.dob}
          />
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth required sx={{ minWidth: "210px" }}>
            <InputLabel
              id="gender-label"
              sx={{
                color:
                  formik.touched.gender && formik.errors.gender
                    ? "#d42d2f"
                    : "inherit",
              }}
              shrink
            >
              Gender
            </InputLabel>
            <Select
              name="gender"
              value={formik.values.gender}
              label="Gender"
              onChange={formik.handleChange}
              disabled={view === true ? true : false}
              sx={{
                border:
                  formik.touched.gender && formik.errors.gender
                    ? "1px solid #de5938"
                    : "inherit",
              }}
            >
              {gender.map((gender) => (
                <MenuItem key={gender.id} value={gender.id}>
                  {gender.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "#d42d2f" }}>
              {formik.touched.gender && formik.errors.gender}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <TextField
            name="email"
            label="Email"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            required
            InputLabelProps={{ shrink: true }}
            disabled={view === true ? true : false}
            sx={{ minWidth: "150px" }}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>

        <Grid item xs={3} md={3} lg={3}>
          <TextField
            name="mobNo"
            label="Mobile Number"
            fullWidth
            value={formik.values.mobNo === null ? "" : formik.values.mobNo}
            onChange={formik.handleChange}
            required
            InputLabelProps={{ shrink: true }}
            disabled={view === true ? true : false}
            sx={{ minWidth: "150px" }}
            error={formik.touched.mobNo && Boolean(formik.errors.mobNo)}
            helperText={formik.touched.mobNo && formik.errors.mobNo}
          />
        </Grid>
      </Grid>
      <h4 style={{ color: "blue", marginBottom: "15px" }}>Job Details</h4>
      <Divider sx={{ mb: 3, mt: 0 }} />
      <Grid container spacing={2} direction="row">
        <Grid item xs={3}>
          <FormControl fullWidth required sx={{ minWidth: "210px" }}>
            <InputLabel
              sx={{
                color:
                  formik.touched.department && formik.errors.department
                    ? "#d42d2f"
                    : "inherit",
              }}
              shrink
            >
              Department
            </InputLabel>
            <Select
              name="department"
              value={formik.values?.department}
              label="Department"
              onChange={formik.handleChange}
              disabled={view === true ? true : false}
              sx={{
                border:
                  formik.touched.department && formik.errors.department
                    ? "1px solid #de5938"
                    : "inherit",
              }}
            >
              {departments.map((department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "#d42d2f" }}>
              {formik.touched.department && formik.errors.department}
            </FormHelperText>
          </FormControl>
        </Grid>
        {formik.values.department !== null && (
          <Grid item xs={3}>
            <FormControl fullWidth required sx={{ minWidth: "210px" }}>
              <InputLabel
                sx={{
                  color:
                    formik.touched.designation && formik.errors.designation
                      ? "#d42d2f"
                      : "inherit",
                }}
                shrink
              >
                Designation
              </InputLabel>
              <Select
                name="designation"
                value={formik.values.designation}
                label="Designation"
                onChange={formik.handleChange}
                disabled={view === true ? true : false}
                sx={{
                  border:
                    formik.touched.designation && formik.errors.designation
                      ? "1px solid #de5938"
                      : "inherit",
                }}
              >
                {designations.map((designation) => (
                  <MenuItem key={designation.id} value={designation.id}>
                    {designation.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: "#d42d2f" }}>
                {formik.touched.designation && formik.errors.designation}
              </FormHelperText>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={3}>
          <FormControl fullWidth required sx={{ minWidth: "210px" }}>
            <InputLabel
              sx={{
                color:
                  formik.touched.employmentType && formik.errors.employmentType
                    ? "#d42d2f"
                    : "inherit",
              }}
              shrink
            >
              Employment Type
            </InputLabel>
            <Select
              name="employmentType"
              value={formik.values.employmentType}
              label="Employment Type"
              onChange={formik.handleChange}
              disabled={view === true ? true : false}
              sx={{
                border:
                  formik.touched.employmentType && formik.errors.employmentType
                    ? "1px solid #de5938"
                    : "inherit",
              }}
            >
              {employmentTypes.map((et) => (
                <MenuItem key={et.id} value={et.id}>
                  {et.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "#d42d2f" }}>
              {formik.touched.employmentType && formik.errors.employmentType}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <TextField
            name="joiningDate"
            label="Joining Date"
            fullWidth
            value={
              formik.values.joiningDate === null
                ? ""
                : formik.values.joiningDate
            }
            type="date"
            onChange={formik.handleChange}
            InputLabelProps={{ shrink: "true" }}
            disabled={view === true ? true : false}
            required
            sx={{ minWidth: "210px" }}
            error={
              formik.touched.joiningDate && Boolean(formik.errors.joiningDate)
            }
            helperText={formik.touched.joiningDate && formik.errors.joiningDate}
          />
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth required sx={{ minWidth: "210px" }}>
            <InputLabel
              sx={{
                color:
                  formik.touched.workLocation && formik.errors.workLocation
                    ? "#d42d2f"
                    : "inherit",
              }}
              shrink
            >
              Work Location
            </InputLabel>
            <Select
              name="workLocation"
              value={formik.values.workLocation}
              label="Work Location"
              onChange={formik.handleChange}
              disabled={view === true ? true : false}
              sx={{
                border:
                  formik.touched.workLocation && formik.errors.workLocation
                    ? "1px solid #de5938"
                    : "inherit",
              }}
            >
              {locations.map((loc) => (
                <MenuItem key={loc.id} value={loc.id}>
                  {loc.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "#d42d2f" }}>
              {formik.touched.workLocation && formik.errors.workLocation}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth sx={{ minWidth: "210px" }}>
            <InputLabel shrink>Preffered Shift</InputLabel>
            <Select
              name="shift"
              value={formik.values.shift}
              label="Preffered Shift"
              onChange={formik.handleChange}
              disabled={view === true ? true : false}
            >
              {shifts.map((shift) => (
                <MenuItem key={shift.id} value={shift.id}>
                  {shift.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {formik.touched.shift && formik.errors.shift}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth sx={{ minWidth: "210px" }}>
            <InputLabel shrink>Reporting Manager</InputLabel>
            <Select
              name="manager"
              value={formik.values.manager}
              label="Reporting Manager"
              onChange={formik.handleChange}
              disabled={view === true ? true : false}
            >
              {manager.map((m) => (
                <MenuItem key={m.id} value={m.id}>
                  {m.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {formik.touched.manager && formik.errors.manager}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth sx={{ minWidth: "210px" }}>
            <InputLabel
              shrink
              sx={{
                color:
                  formik.touched.role && formik.errors.role
                    ? "#d42d2f"
                    : "inherit",
              }}
            >
              Role
            </InputLabel>
            <Select
              name="role"
              value={formik.values.role}
              label="Role"
              onChange={formik.handleChange}
              disabled={view === true ? true : false}
              sx={{
                border:
                  formik.touched.role && formik.errors.role
                    ? "1px solid #de5938"
                    : "inherit",
              }}
            >
              {roles.map((m) => (
                <MenuItem key={m.id} value={m.id}>
                  {m.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "#d42d2f" }}>
              {formik.touched.role && formik.errors.role}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default PersonalJobForm;
