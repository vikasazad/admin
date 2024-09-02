import PropTypes from "prop-types";
import Link from "next/link";

// material-ui
import { ButtonBase } from "@mui/material";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

// project import
import Logo from "./LogoMain";
import config from "../../(dashboard)/config";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => {
  return (
    <Link href={to || config.defaultPath} passHref>
      <Stack direction="row" spacing={1} alignItems="center">
        <Logo />
        <Chip
          label="hj"
          variant="outlined"
          size="small"
          color="secondary"
          sx={{
            mt: 0.5,
            ml: 1,
            fontSize: "0.725rem",
            height: 20,
            "& .MuiChip-label": { px: 0.5 },
          }}
        />
      </Stack>
    </Link>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string,
};

export default LogoSection;
