import PropTypes from "prop-types";
import Link from "next/link";

// material-ui
import { ButtonBase } from "@mui/material";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

// project import
import Logo from "./LogoMain";
import config from "../../(dashboard)/config";
import StatusChip from "../../utils/StatusChip";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => {
  return (
    <Link href={to || config.defaultPath} passHref>
      <Stack direction="row" spacing={1} alignItems="center">
        <Logo />
        <StatusChip value="hj" />
      </Stack>
    </Link>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string,
};

export default LogoSection;
