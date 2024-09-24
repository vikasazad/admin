"use client";
import { useEffect, useState, useTransition } from "react";

// material-ui
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import AnimateButton from "../../components/@extended/AnimateButton";
import {
  strengthColor,
  strengthIndicator,
} from "../../utils/password-strength";
import EyeOutlined from "@ant-design/icons/EyeOutlined";
import EyeInvisibleOutlined from "@ant-design/icons/EyeInvisibleOutlined";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authEmailOtp, saveUser } from "../../../actions/registerAuth";
import { countriesList } from "../../assets/countriesData";
import toast, { Toaster } from "react-hot-toast";
import { authPhoneOtp, resendOtp, verifyOtp } from "../../../actions/handleOtp";
import { findUserByEmail } from "../../DB/dbFunctions";

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {
  const phoneRegExp = /^[0-9]{10}$/;
  const router = useRouter();
  const [level, setLevel] = useState();
  const [validationFlag, setValidationFlag] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [createdEmailOtp, setCreatedEmailOtp] = useState("");
  const [error, setError] = useState({
    phoneOtp: "",
    emailOtp: "",
  });
  const [timeLeft, setTimeLeft] = useState(90);
  const [user, setUser] = useState();
  const [disableVerifyButton, setDisableVerifyButton] = useState(true);
  const [verificationProcess, setVerificationProcess] = useState(null);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);
  useEffect(() => {
    if (phoneOtp.length === 6 && emailOtp.length === 6) {
      const error = validateOtpInput();
      if (error) {
        return setDisableVerifyButton(true);
      }
      setDisableVerifyButton(false);
    } else {
      setDisableVerifyButton(true);
    }
  }, [phoneOtp, emailOtp]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  const handleAuth = async (values, formattedNumber) => {
    setUser({
      ...values,
      formattedNumber,
    });
    setPhoneNumber(formattedNumber);
    const isUserRegistered = await findUserByEmail(values.email);
    if (isUserRegistered) {
      toast.error("User already registered with this email!");
      return false;
    }
    const EmailOtp = await authEmailOtp(values.email);
    const PhoneOtp = await authPhoneOtp(formattedNumber);
    console.log(EmailOtp, PhoneOtp);
    if (EmailOtp && PhoneOtp) {
      setVerificationId(PhoneOtp.verificationId);
      setValidationFlag(true);
      setCreatedEmailOtp(EmailOtp);
      setTimeLeft(90); // need to fix it
    } else {
      setValidationFlag(false);
      setVerificationProcess(false);
      console.log(EmailOtp, PhoneOtp);
    }
  };

  const otpVerification = async () => {
    const error = validateOtpInput();
    let validationError = false;
    if (!error) {
      try {
        const otp = await verifyOtp(error, verificationId, phoneOtp);
        setVerificationProcess(otp);
      } catch (error) {
        console.log(error);
        if (!error) {
          validationError = true;
          toast.error("Please enter valid phone otp");
          setError((prev) => ({
            ...prev,
            phoneOtp: "Please enter valid phone otp",
          }));
        }
      }
    }
    if (!error) {
      const hasExpired = new Date(createdEmailOtp.expires) < new Date();
      if (!hasExpired) {
        if (createdEmailOtp.otp !== emailOtp) {
          validationError = true;
          toast.error("Please enter valid email otp");
          setError((prev) => ({
            ...prev,
            emailOtp: "Please enter valid email otp",
          }));
        }
      } else {
        validationError = true;
        toast.error("Otp has expired!");
        setError((prev) => ({
          ...prev,
          emailOtp: "Otp has expired!",
        }));
        return false;
      }
    }

    if (!validationError) {
      const registerUser = await saveUser(user);
      if (registerUser.error) {
        toast.error(registerUser.message);
        return;
      }
      toast.success(registerUser.message);
      router.push("/login");
    }
  };

  const validateOtpInput = () => {
    let error = false;
    if (!phoneOtp) {
      error = true;
      setError((prev) => ({
        ...prev,
        phoneOtp: "Phone number OTP is required",
      }));
      toast.error("Phone number OTP is required");
    } else if (!/^\d{6}$/.test(phoneOtp)) {
      error = true;
      setError((prev) => ({
        ...prev,
        phoneOtp: "Phone number OTP must be exactly 6 digits",
      }));
      toast.error("Phone number OTP must be exactly 6 digits");
    } else {
      setError((prev) => ({
        ...prev,
        phoneOtp: "",
      }));
    }
    if (!emailOtp) {
      error = true;
      setError((prev) => ({
        ...prev,
        emailOtp: "Email OTP is required",
      }));
    } else if (!/^\d{6}$/.test(emailOtp)) {
      error = true;
      setError((prev) => ({
        ...prev,
        emailOtp: "Email OTP must be exactly 6 digits",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        emailOtp: "",
      }));
    }
    return error;
  };

  const resend = async () => {
    const EmailOtp = await authEmailOtp(user.email);
    const PhoneOtp = await resendOtp(phoneNumber);
    console.log(EmailOtp, PhoneOtp);
    if (EmailOtp || PhoneOtp) {
      console.log("here");
      setVerificationId(PhoneOtp.verificationId);
      setCreatedEmailOtp(EmailOtp);
      setVerificationProcess(true);
      setTimeLeft(90);
    } else {
      setValidationFlag(false);
    }
  };
  useEffect(() => {
    changePassword("");
  }, []);

  return (
    <>
      <Toaster />
      <div id="recaptcha-container" />

      {!validationFlag && (
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            countryCode: "91",
            phone: "",
            businessName: "",
            password: "",
            businessType: "", // Add businessType to initialValues
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            firstname: Yup.string().max(255).required("First Name is required"),
            lastname: Yup.string().max(255).required("Last Name is required"),
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            countryCode: Yup.string()
              .max(255)
              .required("Country Code is required"),
            phone: Yup.string()
              .matches(phoneRegExp, "Phone number is not valid")
              .required("Phone number is required"),
            password: Yup.string().max(255).required("Password is required"),
            businessName: Yup.string()
              .max(255)
              .required("Business Name is required"),
            businessType: Yup.string().required(
              "Please select a business type"
            ),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            const formattedNumber = `+${values.countryCode}${values.phone}`;
            try {
              await handleAuth(values, formattedNumber);
              setSubmitting(true);
            } catch (error) {
              setSubmitting(true);
              setErrors({ submit: "Something went wrong" });
              console.error("OTP request error:", error.message);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="firstname-signup">
                      First Name*
                    </InputLabel>
                    <OutlinedInput
                      id="firstname-login"
                      type="text"
                      value={values.firstname}
                      name="firstname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="First"
                      fullWidth
                      error={Boolean(touched.firstname && errors.firstname)}
                    />
                  </Stack>
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="lastname-signup">
                      Last Name*
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.lastname && errors.lastname)}
                      id="lastname-signup"
                      type="text"
                      value={values.lastname}
                      name="lastname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Last"
                    />
                  </Stack>
                  {touched.lastname && errors.lastname && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.lastname}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="businessName-signup">
                      Business Name
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(
                        touched.businessName && errors.businessName
                      )}
                      id="businessName-signup"
                      value={values.businessName}
                      name="businessName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Business Name"
                    />
                  </Stack>
                  {touched.businessName && errors.businessName && (
                    <FormHelperText error id="helper-text-businessName-signup">
                      {errors.businessName}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-signup">
                      Email Address*
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      id="email-signup"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="email@company.com"
                    />
                  </Stack>
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-signup">
                      Phone number*
                    </InputLabel>
                    <Stack direction="row" spacing={2}>
                      <FormControl
                        sx={{ width: { xs: "30%", lg: "25%", md: "25%" } }}
                      >
                        <Select
                          labelId="demo-multiple-name-label"
                          id="countryCode-signup"
                          value={values.countryCode}
                          type="countryCode"
                          name="countryCode"
                          onChange={handleChange}
                          input={<OutlinedInput />}
                          error={Boolean(
                            touched.countryCode && errors.countryCode
                          )}
                        >
                          {countriesList.map((name) => (
                            <MenuItem key={name.code} value={name.phone}>
                              +{name.phone}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.countryCode && errors.countryCode && (
                          <FormHelperText
                            error
                            id="helper-text-countryCode-signup"
                          >
                            {errors.countryCode}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.phone && errors.phone)}
                        id="phone-signup"
                        type="phone"
                        value={values.phone}
                        name="phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="10 Digits"
                      />
                    </Stack>
                  </Stack>
                  {touched.phone && errors.phone && (
                    <FormHelperText error id="helper-text-phone-signup">
                      {errors.phone}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="business-type">
                      Which type describes your business*
                    </InputLabel>
                    <Field
                      as={RadioGroup}
                      aria-label="businessType"
                      name="businessType"
                      row
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Accommodation"
                        control={<Radio />}
                        label="Accommodation"
                      />
                      <FormControlLabel
                        value="Dining"
                        control={<Radio />}
                        label="Dining"
                      />
                      <FormControlLabel
                        value="Both"
                        control={<Radio />}
                        label="Both"
                      />
                    </Field>
                  </Stack>
                  {touched.businessType && errors.businessType && (
                    <FormHelperText error id="helper-text-businessType-signup">
                      {errors.businessType}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="password-signup">Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="password-signup"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            color="secondary"
                          >
                            {showPassword ? (
                              <EyeOutlined />
                            ) : (
                              <EyeInvisibleOutlined />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="******"
                    />
                  </Stack>
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Box
                          sx={{
                            bgcolor: level?.color,
                            width: 85,
                            height: 8,
                            borderRadius: "7px",
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" fontSize="0.75rem">
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    By Signing up, you agree to our &nbsp;
                    <Link variant="subtitle2" href="#">
                      Terms of Service
                    </Link>
                    &nbsp; and &nbsp;
                    <Link variant="subtitle2" href="#">
                      Privacy Policy
                    </Link>
                  </Typography>
                </Grid>
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                {verificationId && (
                  <Grid item xs={12}>
                    <FormHelperText sx={{ color: "#16be16" }}>
                      Otp's sent successfully.
                    </FormHelperText>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Create Account
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      )}

      {validationFlag && (
        <>
          <Typography variant="h5" mb={1}>
            Please verify your email and phone no.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="phoneOtp-auth">Phone Otp*</InputLabel>
                <OutlinedInput
                  id="phoneOtp-auth"
                  type="text"
                  value={phoneOtp}
                  onChange={(e) => setPhoneOtp(e.target.value)}
                  placeholder="Phone"
                  fullWidth
                  error={error.phoneOtp}
                />
              </Stack>
              {error.phoneOtp && (
                <FormHelperText error>{error.phoneOtp}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="emailOtp-auth">Email Otp*</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={error.emailOtp}
                  id="emailOtp-auth"
                  type="text"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  placeholder="Last"
                />
              </Stack>
              {error.emailOtp && (
                <FormHelperText error>{error.emailOtp}</FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <Stack
                spacing={1}
                direction="row"
                justifyContent={timeLeft === 0 ? "flex-end" : "space-between"}
                alignItems="center"
              >
                {timeLeft !== 0 && (
                  <Typography variant="subtitle1">
                    {formatTime(timeLeft)}
                  </Typography>
                )}

                <Button
                  variant="text"
                  size="small"
                  sx={{
                    textDecoration: "underline",
                    letterSpacing: "0.5px",
                  }}
                  disabled={timeLeft !== 0}
                  onClick={() => resend()}
                >
                  Resend
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <AnimateButton>
                <Button
                  id="recaptcha-container"
                  disableElevation
                  fullWidth
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={otpVerification}
                  disabled={disableVerifyButton}
                >
                  Authenticate
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </>
      )}
      <div id="recaptcha-container"></div>
    </>
  );
}
