import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AuthWrapper from "../AuthWrapper";
import AuthOnboarding from "../auth-forms/AuthOnboarding";
import { FormHelperText } from "@mui/material";
import Link from "next/link";
import { auth } from "../../../auth";

export default async function NewVerificationPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            justifyContent="space-between"
            sx={{ mb: { xs: -0.5, sm: 0.5 }, textAlign: "center" }}
          >
            <Typography variant="h2">
              First, let's Create your account
            </Typography>
            <AuthOnboarding user={user} />
          </Stack>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
