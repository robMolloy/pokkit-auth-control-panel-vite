import { pb } from "@/config/pocketbaseConfig";
import { LoggedOutUserOnlyRoute } from "@/modules/routeProtector/LoggedOutUserOnlyRoute";
import { LogScreen } from "@/screens/LogScreen";
import { SuperuserAuthScreen } from "@/modules/superusers/SuperuserAuthScreen";

export default function Page() {
  return (
    <LoggedOutUserOnlyRoute>
      <SuperuserAuthScreen pb={pb} />
      <LogScreen />
    </LoggedOutUserOnlyRoute>
  );
}
