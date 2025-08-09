import * as Yup from "yup";

//To check if age >= 18
const isAgeGreaterThanEq18 = (date) => {
  if (!date) return false;
  const today = new Date();
  const dob = new Date(date);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age >= 18;
};

export const validationSchemaStepOne = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  gender: Yup.string().required("Gender is required"),
  department: Yup.string().required("Department is required"),
  designation: Yup.string().required("Designation is required"),
  employmentType: Yup.string().required("Employment Type is required"),
  role: Yup.string().required("Role is required"),
  workLocation: Yup.string().required("Location is required"),

  email: Yup.string().email("Invalid email").required("Email is required"),
  dob: Yup.date()
    .required("Date of Birth is required")
    .nullable()
    .test("is-18", "You must be at least 18 years old", (value) =>
      isAgeGreaterThanEq18(value)
    ),
  mobNo: Yup.string()
    .matches(
      /^[6-9]\d{9}$/,
      "Mobile number must be 10 digits starting with 6-9"
    )
    .required("Mobile number is required"),
  joiningDate: Yup.date()
    .required("Joining Date is required")
    .nullable()
    .test("future-date", "joining date cannot be past date", (value) => {
      if (!value) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return value >= today;
    }),
  //.min(new Date().setHours(0, 0, 0, 0), "Joining Date cannot be past"),
});

export const validationSchemaStepTwo = Yup.object({
  addrs1: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  bank: Yup.string().required("Bank is required"),
  pincode: Yup.string()
    .matches(/^\d{6}$/, "Pincode must be 6 digits")
    .required("Pincode is required"),
  aadhaar: Yup.string()
    .matches(/^\d{12}$/, "Aadhar must be 12 digits")
    .required("Aadhaar is required"),
  pan: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN")
    .required("PAN is required"),
  accNo: Yup.string()
    .matches(/^\d{9,18}$/, "Account Number must be between 9 and 18 digits")
    .required("Account Number is required"),
  ifscCode: Yup.string()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code")
    .required("IFSC Code is required"),
});
