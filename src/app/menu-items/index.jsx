// project import
import dashboard from "./dashboard";
import pages from "./page";
import utilities from "./utilities";
import support from "./support";
import hotel from "./hotel";
import restaurant from "./restaurant";
import concierge from "./concierge";
import payment from "./payment";
import member from "./members";
import staff from "./staff";
import account from "./account";
import { useSession } from "next-auth/react";

// ==============================|| MENU ITEMS ||============================== //

export default function menuItems() {
  const { data: session } = useSession();
  const allMenuItems = [
    dashboard,
    staff,
    hotel,
    restaurant,
    concierge,
    payment,
    member,
    account,
    utilities,
    support,
  ];

  // If the user role is 'staff', allow only staff and account in the menu
  const staffMenuItems = [staff, account];

  // Check user role from the session
  const userRole = session?.user?.role;

  const items = userRole === "staff" ? staffMenuItems : allMenuItems;

  return items;
}
