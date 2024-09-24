import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

// project import
import AuthWrapper from "../AuthWrapper";
import AuthLogin from "../auth-forms/AuthLogin";
import Link from "next/link";
import SocialButton from "../../components/SocialButton/page";
// ================================|| LOGIN ||================================ //

export default async function Login() {
  // const session = await auth();

  // if (session?.user) redirect("/");
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
            <Typography variant="h3">Login</Typography>
            <Link href="/register">
              <Typography
                variant="body1"
                sx={{ textDecoration: "none" }}
                color="primary"
              >
                Don&apos;t have an account?
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
              Login with
            </Typography>
          </Divider>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
