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
import FormLabel from "@mui/material/FormLabel";
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
import { countriesList } from "../../assets/countriesData";
import { authPhoneOtp, resendOtp, verifyOtp } from "../../../actions/handleOtp";
import toast from "react-hot-toast";
import { SignOut } from "../../../actions/socialLogin";
import { registerSocialUser } from "../../../actions/registerAuth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AuthOnBoarding({ user }) {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [onboardingProcess, setOnboardingProcess] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState(91);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("Accommodation");
  const [businessNameTouched, setBusinessNameTouched] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [disableVerifyButton, setDisableVerifyButton] = useState(true);
  const [error, setError] = useState({
    phoneNumber: "",
    countryCode: "",
    phoneOtp: "",
    businessName: "",
    businessType: "",
  });

  useEffect(() => {
    if (timeLeft === 0) return;
    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  useEffect(() => {
    if (onboardingProcess === "") {
      if (phoneNumber.length === 10) {
        const error = validateInput();
        if (error) {
          return setDisableVerifyButton(true);
        }
        setDisableVerifyButton(false);
      } else {
        setDisableVerifyButton(true);
      }
    } else if (onboardingProcess === "otp") {
      if (phoneOtp.length === 6) {
        const error = validateInput();
        if (error) {
          return setDisableVerifyButton(true);
        }
        setDisableVerifyButton(false);
      } else {
        setDisableVerifyButton(true);
      }
    } else {
      if (!businessName && businessNameTouched) {
        const error = validateInput();
        if (error) {
          return setDisableVerifyButton(true);
        }
        setDisableVerifyButton(false);
      }
      if (businessName.length > 6) {
        const error = validateInput();
        if (error) {
          return setDisableVerifyButton(true);
        }
        setDisableVerifyButton(false);
      }
    }
  }, [phoneNumber, phoneOtp, businessName, businessType]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const otpVerification = async () => {
    console.log("+", countryCode, phoneNumber);
    const formattedNumber = `+${countryCode}${phoneNumber}`;
    const phoneOtp = await authPhoneOtp(formattedNumber);
    if (phoneOtp) {
      setVerificationId(phoneOtp.verificationId);
      setOnboardingProcess("otp");
      setTimeLeft(90);
    } else {
      setOnboardingProcess("");
      console.log(phoneOtp);
    }
  };

  const resend = async () => {
    const formattedNumber = `+${countryCode}${phoneNumber}`;
    const PhoneOtp = await resendOtp(formattedNumber);
    console.log(PhoneOtp);
    if (PhoneOtp) {
      console.log("here");
      setVerificationId(PhoneOtp.verificationId);
      setTimeLeft(90);
    } else {
      setOnboardingProcess("otp");
    }
  };

  const verify = async () => {
    const error = validateInput();
    let validationError = false;
    if (!error) {
      try {
        const otp = await verifyOtp(error, verificationId, phoneOtp);
        console.log(otp);
        setOnboardingProcess("businessName");
      } catch (error) {
        setOnboardingProcess("otp");
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
  };

  const submit = async () => {
    try {
      if (businessName && businessType) {
        const formattedNumber = `+${countryCode}${phoneNumber}`;
        const newUser = {
          ...user,
          countryCode: countryCode,
          phone: phoneNumber,
          businessName: businessName,
          businessType: businessType,
          role: "admin",
          isverified: JSON.stringify(new Date()),
          canForgotPassword: true,
          formattedNumber: formattedNumber,
        };
        const registerUser = await registerSocialUser(newUser);
        if (registerUser?.error) {
          toast.error(registerUser.message);
        }
        // toast.success("Welcome to world of buildbility");
        const updateUser = await update({
          ...session,
          user: {
            ...newUser,
            newUser: false,
          },
        });
        console.log(updateUser);
        router.push("/");
      }
    } catch (error) {
      toast.success("Something went wrong!");
      console.log(error);
    }
  };

  const validateInput = () => {
    let error = false;
    if (onboardingProcess === "") {
      if (!phoneNumber) {
        error = true;
        setError((prev) => ({
          ...prev,
          phoneNumber: "Phone number is required",
        }));
      } else if (!/^\d{10}$/.test(phoneNumber)) {
        error = true;
        setError((prev) => ({
          ...prev,
          phoneNumber: "Phone number must be exactly 10 digits",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          phoneNumber: "",
        }));
      }
    } else if (onboardingProcess === "otp") {
      if (!phoneOtp) {
        error = true;
        setError((prev) => ({
          ...prev,
          phoneOtp: "Phone number OTP is required",
        }));
      } else if (!/^\d{6}$/.test(phoneOtp)) {
        error = true;
        setError((prev) => ({
          ...prev,
          phoneOtp: "Phone number OTP must be exactly 6 digits",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          phoneOtp: "",
        }));
      }
    } else {
      if (!businessName) {
        error = true;
        setError((prev) => ({
          ...prev,
          businessName: "Business name is required",
        }));
      } else if (businessName.length < 6) {
        error = true;
        setError((prev) => ({
          ...prev,
          businessName: "Business must be greater",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          businessName: "",
        }));
      }
      if (!businessType) {
        error = true;
        setError((prev) => ({
          ...prev,
          businessName: "Business type is required",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          businessType: "",
        }));
      }
    }

    return error;
  };
  return (
    <>
      <div id="recaptcha-container" />
      <Grid container>
        <Grid item xs={12} sx={{ margin: "15px 0" }}>
          {onboardingProcess === "" && (
            <>
              <InputLabel
                htmlFor="email-signup"
                sx={{ textAlign: "left", mb: 1 }}
              >
                Verify your phone number*
              </InputLabel>
              <Stack direction="row" spacing={2}>
                <FormControl
                  sx={{ width: { xs: "30%", lg: "25%", md: "25%" } }}
                >
                  <Select
                    labelId="demo-multiple-name-label"
                    id="countryCode-signup"
                    value={countryCode}
                    type="countryCode"
                    name="countryCode"
                    onChange={(e) => setCountryCode(e.target.value)}
                    input={<OutlinedInput />}
                    error={error.countryCode}
                  >
                    {countriesList.map((name) => (
                      <MenuItem key={name.code} value={name.phone}>
                        +{name.phone}
                      </MenuItem>
                    ))}
                  </Select>
                  {error.countryCode && (
                    <FormHelperText error id="helper-text-countryCode-signup">
                      {error.countryCode}
                    </FormHelperText>
                  )}
                </FormControl>
                <OutlinedInput
                  fullWidth
                  error={error.phoneNumber}
                  id="phone-signup"
                  type="phone"
                  value={phoneNumber}
                  name="phone"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="10 Digits"
                />
              </Stack>
              {error.phoneNumber && (
                <FormHelperText error id="helper-text-phone-signup">
                  {error.phoneNumber}
                </FormHelperText>
              )}
            </>
          )}
          {onboardingProcess === "otp" && (
            <>
              <InputLabel
                htmlFor="email-signup"
                sx={{ textAlign: "left", mb: 1 }}
              >
                Verify your verification code*
              </InputLabel>
              <Stack direction="row" spacing={2}>
                <OutlinedInput
                  fullWidth
                  error={error.phoneOtp}
                  id="phone-signup"
                  type="phone"
                  value={phoneOtp}
                  name="phone"
                  onChange={(e) => setPhoneOtp(e.target.value)}
                  placeholder="6 Digits"
                />
              </Stack>
              {error.phoneOtp && (
                <FormHelperText error id="helper-text-phone-signup">
                  {error.phoneOtp}
                </FormHelperText>
              )}
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
            </>
          )}

          {onboardingProcess === "businessName" && (
            <Grid container>
              <Grid item xs={12} mb={1}>
                <InputLabel
                  htmlFor="businessName-signup"
                  sx={{ textAlign: "left", mb: 1 }}
                >
                  Business Name
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  error={error.businessName}
                  id="businessName-signup"
                  value={businessName}
                  name="businessName"
                  onChange={(e) => setBusinessName(e.target.value)}
                  onBlur={() => setBusinessNameTouched(true)}
                  placeholder="Business Name"
                />

                {error.businessName && (
                  <FormHelperText error id="helper-text-businessName-signup">
                    {error.businessName}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <FormControl>
                    <FormLabel
                      id="demo-controlled-radio-buttons-group"
                      sx={{ textAlign: "left", color: "black" }}
                    >
                      Which type describes your business*
                    </FormLabel>

                    <RadioGroup
                      aria-label="Accommodation"
                      name="businessType"
                      row
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      error={error.businessType}
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
                    </RadioGroup>
                  </FormControl>
                </Stack>
                {error.businessType && (
                  <FormHelperText error id="helper-text-businessType-signup">
                    {error.businessType}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
          )}

          <AnimateButton>
            <Button
              id="recaptcha-container"
              disableElevation
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              onClick={
                onboardingProcess === ""
                  ? otpVerification
                  : onboardingProcess === "otp"
                  ? verify
                  : onboardingProcess === "businessName"
                  ? submit
                  : otpVerification
              }
              disabled={disableVerifyButton}
              sx={{ mt: 2, mb: 1 }}
            >
              {onboardingProcess === ""
                ? "Send Verification Code"
                : onboardingProcess === "otp"
                ? "Verify"
                : onboardingProcess === "businessName"
                ? "Submit"
                : "Send Verification Code"}
            </Button>
          </AnimateButton>

          {onboardingProcess === "" && (
            <Typography variant="caption">
              You must have a valid phone number to use Buildbility’s services.
              SMS and data charges may apply.
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sx={{ mt: 4 }}>
          <Typography variant="h6">
            Email verified as <b>{user?.email}</b>
          </Typography>

          <Button
            variant="text"
            sx={{ textDecoration: "underline" }}
            onClick={() => SignOut()}
          >
            Use a different Email
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
