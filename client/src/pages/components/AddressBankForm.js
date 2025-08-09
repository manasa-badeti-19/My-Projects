import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
} from "@mui/material";
const AddressBankForm = ({ formik, view, edit }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [banks, setBanks] = useState([]);

  const getCountries = async () => {
    try {
      axios
        .get(`${process.env.REACT_APP_MASTER_API_URL}/countries`)
        .then((response) => {
          console.log("response", response);
          setCountries(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getStates = async () => {
    try {
      axios
        .get(`${process.env.REACT_APP_MASTER_API_URL}/states`, {
          params: { country: formik.values.country },
        })
        .then((response) => {
          console.log("response", response);
          setStates(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getCities = async () => {
    try {
      axios
        .get(`${process.env.REACT_APP_MASTER_API_URL}/cities`, {
          params: { state: formik.values.state },
        })
        .then((response) => {
          console.log("response", response);
          setCities(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getBanks = async () => {
    try {
      axios
        .get(`${process.env.REACT_APP_MASTER_API_URL}/banks`)
        .then((response) => {
          console.log("response", response);
          setBanks(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getCountries();
    getBanks();
  }, []);

  useEffect(() => {
    if (formik.values.country !== null) {
      getStates();
    }
  }, [formik.values.country]);

  useEffect(() => {
    if (formik.values.state !== null) {
      getCities();
    }
  }, [formik.values.state]);
  console.log("formik", formik.values, formik.errors);
  return (
    <div>
      <h4 style={{ color: "blue", marginBottom: "15px" }}>Address Details</h4>
      <Divider sx={{ mb: 3, mt: 0 }} />
      <Grid container spacing={2} direction="row">
        <Grid item xs={3}>
          <TextField
            name="addrs1"
            label="Adrress Line 1"
            fullWidth
            value={formik.values.addrs1}
            onChange={formik.handleChange}
            sx={{ minWidth: "150px" }}
            disabled={view === true ? true : false}
            required
            error={formik.touched.addrs1 && Boolean(formik.errors.addrs1)}
            helperText={formik.touched.addrs1 && formik.errors.addrs1}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            name="addrs2"
            label="Adrress Line 2"
            fullWidth
            value={formik.values.addrs2}
            onChange={formik.handleChange}
            sx={{ minWidth: "150px" }}
            disabled={view === true ? true : false}
          />
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth required sx={{ minWidth: "210px" }}>
            <InputLabel
              id="gender-label"
              sx={{
                color:
                  formik.touched.country && formik.errors.country
                    ? "#d42d2f"
                    : "inherit",
              }}
            >
              Country
            </InputLabel>
            <Select
              name="country"
              value={formik.values.country}
              label="Country"
              onChange={formik.handleChange}
              disabled={view === true ? true : false}
              sx={{
                border:
                  formik.touched.country && formik.errors.country
                    ? "1px solid #de5938"
                    : "inherit",
              }}
            >
              {countries.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "#d42d2f" }}>
              {formik.touched.country && formik.errors.country}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth required sx={{ minWidth: "210px" }}>
            <InputLabel
              sx={{
                color:
                  formik.touched.state && formik.errors.state
                    ? "#d42d2f"
                    : "inherit",
              }}
            >
              State
            </InputLabel>
            <Select
              name="state"
              value={formik.values.state}
              label="State"
              onChange={formik.handleChange}
              disabled={view === true ? true : false}
              sx={{
                border:
                  formik.touched.state && formik.errors.state
                    ? "1px solid #de5938"
                    : "inherit",
              }}
            >
              {states.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "#d42d2f" }}>
              {formik.touched.state && formik.errors.state}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth required sx={{ minWidth: "210px" }}>
            <InputLabel
              sx={{
                color:
                  formik.touched.city && formik.errors.city
                    ? "#d42d2f"
                    : "inherit",
              }}
            >
              City
            </InputLabel>
            <Select
              name="city"
              value={formik.values.city}
              label="City"
              onChange={formik.handleChange}
              disabled={view === true ? true : false}
              sx={{
                border:
                  formik.touched.city && formik.errors.city
                    ? "1px solid #de5938"
                    : "inherit",
              }}
            >
              {cities.map((ct) => (
                <MenuItem key={ct.id} value={ct.id}>
                  {ct.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "#d42d2f" }}>
              {formik.touched.city && formik.errors.city}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <TextField
            name="pincode"
            label="Pincode"
            fullWidth
            value={formik.values.pincode}
            onChange={formik.handleChange}
            sx={{ minWidth: "150px" }}
            disabled={view === true ? true : false}
            required
            error={formik.touched.pincode && Boolean(formik.errors.pincode)}
            helperText={formik.touched.pincode && formik.errors.pincode}
          />
        </Grid>
      </Grid>
      <h4 style={{ color: "blue", marginBottom: "15px" }}>Bank Details</h4>
      <Divider sx={{ mb: 3, mt: 0 }} />
      <Grid container spacing={2} direction="row">
        <Grid item xs={3}>
          <TextField
            name="pan"
            label="PAN"
            fullWidth
            value={formik.values.pan}
            onChange={formik.handleChange}
            sx={{ minWidth: "150px" }}
            disabled={view === true ? true : false}
            required
            error={formik.touched.pan && Boolean(formik.errors.pan)}
            helperText={formik.touched.pan && formik.errors.pan}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            name="aadhaar"
            label="Aadhaar"
            fullWidth
            value={formik.values.aadhaar}
            onChange={formik.handleChange}
            sx={{ minWidth: "150px" }}
            disabled={view === true ? true : false}
            required
            error={formik.touched.aadhaar && Boolean(formik.errors.aadhaar)}
            helperText={formik.touched.aadhaar && formik.errors.aadhaar}
          />
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth required sx={{ minWidth: "210px" }}>
            <InputLabel
              sx={{
                color:
                  formik.touched.bank && formik.errors.bank
                    ? "#d42d2f"
                    : "inherit",
              }}
            >
              Banks
            </InputLabel>
            <Select
              name="bank"
              value={formik.values.bank}
              label="City"
              onChange={formik.handleChange}
              disabled={view === true ? true : false}
              sx={{
                border:
                  formik.touched.bank && formik.errors.bank
                    ? "1px solid #de5938"
                    : "inherit",
              }}
            >
              {banks.map((b) => (
                <MenuItem key={b.id} value={b.id}>
                  {b.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "#d42d2f" }}>
              {formik.touched.bank && formik.errors.bank}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <TextField
            name="accNo"
            label="Account Number"
            fullWidth
            value={formik.values.accNo}
            onChange={formik.handleChange}
            sx={{ minWidth: "150px" }}
            disabled={view === true ? true : false}
            required
            error={formik.touched.accNo && Boolean(formik.errors.accNo)}
            helperText={formik.touched.accNo && formik.errors.accNo}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            name="ifscCode"
            label="IFSC Code"
            fullWidth
            value={formik.values.ifscCode}
            onChange={formik.handleChange}
            sx={{ minWidth: "150px" }}
            disabled={view === true ? true : false}
            required
            error={formik.touched.ifscCode && Boolean(formik.errors.ifscCode)}
            helperText={formik.touched.ifscCode && formik.errors.ifscCode}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default AddressBankForm;
