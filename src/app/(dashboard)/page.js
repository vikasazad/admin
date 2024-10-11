import DashboardDefault from "../pages/dashboard/index";
import { auth } from "../../auth";
import { cookies } from "next/headers";
import { decode, encode } from "next-auth/jwt";
import { get7daysDataFromAll, getLiveData } from "../DB/dbFunctions";
export default async function Home() {
  const session = await auth();
  const user = session?.user?.personalInfo.contactInfo;
  const data = await get7daysDataFromAll(user.email, "analytics");
  const table = await getLiveData(user.email);
  // console.log("user", user);
  // console.log("data", data);

  return (
    <div>
      <DashboardDefault user={user} data={data} table={table} />
    </div>
  );
}
