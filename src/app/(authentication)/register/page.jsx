// material-ui
"use client";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// project import
import AuthWrapper from "../AuthWrapper";
import AuthRegister from "../auth-forms/AuthRegister";
import Link from "next/link";
import SocialButton from "../../components/SocialButton/socialButton";
// ================================|| REGISTER ||================================ //

export default function Register() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">Sign up</Typography>
            <Link href="/login">
              <Typography
                variant="body1"
                sx={{ textDecoration: "none" }}
                color="primary"
              >
                Already have an account?
              </Typography>
            </Link>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <SocialButton />
        </Grid>
        <Grid item xs={12}>
          <Divider>
            <Typography
              variant="caption"
              sx={{
                backgroundColor: "#1677ff",
                color: "white",
                p: 0.5,
                borderRadius: "5px",
              }}
            >
              Sign up with
            </Typography>
          </Divider>
        </Grid>
        <Grid item xs={12}>
          <AuthRegister />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
