import { pb } from "@/config/pocketbaseConfig";
import { LoggedOutUserOnlyRoute } from "@/modules/auth/routeProtector/LoggedOutUserOnlyRoute";
import { SuperuserAuthScreen } from "@/modules/superusers/SuperuserAuthScreen";

export default function Page() {
  return (
    <>
      <LoggedOutUserOnlyRoute>
        <SuperuserAuthScreen pb={pb} />
      </LoggedOutUserOnlyRoute>
    </>
  );
}
