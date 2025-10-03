import { LoadingScreen } from "@/screens/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { LoggedInUserOnlyRouteTemplate } from "../routeProtectorTemplates/LoggedInUserOnlyRouteTemplate";

export const LoggedInUserOnlyRoute = (p: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <LoggedInUserOnlyRouteTemplate
      children={p.children}
      LoadingComponent={<LoadingScreen />}
      onIsFailure={() => navigate("/auth")}
    />
  );
};
