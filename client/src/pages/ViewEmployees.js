import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Card,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  tableCellClasses,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  FormHelperText,
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  whiteSpace: "noWrap",
  textAlign: "left",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: "left",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "left",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(id, name, email, department, designation, workLocation) {
  return { id, name, email, department, designation, workLocation };
}

export default function ViewEmployees() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [originalFetchedData, setOriginalFetchedData] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAllEmployees = async () => {
    try {
      axios
        .get(`${process.env.REACT_APP_EMPLOYEE_API_URL}`)
        .then((response) => {
          console.log("response", response);
          setEmployees(response.data.data);
          setOriginalFetchedData(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getEmployeeById = async () => {
    try {
      axios
        .get(`${process.env.REACT_APP_EMPLOYEE_API_URL}/${employeeId}`)
        .then((response) => {
          console.log("response", response);
          setEmployees(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      axios
        .delete(`${process.env.REACT_APP_EMPLOYEE_API_URL}/${deleteId}`)
        .then((response) => {
          console.log("response", response);
          setEmployees(response.data.data);
          alert(`${response.data.message}`);
          setOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <h4 style={{ color: "blue", marginBottom: "15px" }}>
            Search Employee
          </h4>
          <Divider sx={{ mb: 3, mt: 0 }} />
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent={"space-between"}
          >
            <Grid item xs={3}>
              <TextField
                name="employeeId"
                label="Employee ID"
                fullWidth
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                sx={{ minWidth: "150px" }}
              />
            </Grid>
            <Grid item xs={4} sx={{ display: "flex", gap: 3 }}>
              <Button
                variant="outlined"
                sx={{ minWidth: "150px" }}
                onClick={() => {
                  setEmployees(originalFetchedData);
                  setEmployeeId("");
                }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                sx={{ minWidth: "150px" }}
                onClick={() => {
                  if (employeeId !== "") {
                    getEmployeeById();
                  }
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h4 style={{ color: "blue", marginBottom: "15px" }}>
            View Employees
          </h4>
          <Divider sx={{ mb: 3, mt: 0 }} />
          <TableContainer sx={{ overflow: "auto", maxWidth: "100%" }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead sx={{ minWidth: 650 }}>
                <TableRow>
                  <StyledTableCell>Employee Id</StyledTableCell>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Email</StyledTableCell>
                  <StyledTableCell align="right">Department</StyledTableCell>
                  <StyledTableCell align="right">Designation</StyledTableCell>
                  <StyledTableCell align="right">Work Location</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((row) => (
                  <StyledTableRow key={row.employee_id}>
                    <StyledTableCell component="th" scope="row">
                      {row.employee_id}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.first_name + " " + row.last_name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.departmentname}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.designationname}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.worklocationname}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        variant="contained"
                        onClick={() =>
                          navigate(`/employee/${row.employee_id}`, {
                            state: { view: true, edit: false },
                          })
                        }
                      >
                        VIEW
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        variant="contained"
                        onClick={() =>
                          navigate(`/employee/${row.employee_id}`, {
                            state: { view: false, edit: true },
                          })
                        }
                      >
                        EDIT
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        variant="contained"
                        onClick={() => handleClickOpen(row.employee_id)}
                      >
                        DELETE
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are u sure you want to delete Employee data of id ${deleteId}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDelete}>
            YES
          </Button>
          <Button variant="outlined" onClick={handleClose} autoFocus>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
