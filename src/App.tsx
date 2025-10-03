import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from "~react-pages";
import { LayoutTemplate } from "./components/templates/LayoutTemplate";
import { Header } from "./components/custom/Header";
import { useThemeStore } from "./modules/themeToggle/themeStore";
import { LeftSidebar } from "./components/custom/LeftSidebar";
import { pb } from "./config/pocketbaseConfig";
import { useUsersStore } from "@/modules/users/usersStore";
import { useInitAuth } from "./modules/superusers/useInitAuth";
import { useCurrentUserStore } from "./stores/authDataStore";
import { smartSubscribeToUsers } from "./modules/users/dbUsersUtils";

function App() {
  return useRoutes(routes);
}

function AppWrapper() {
  const themeStore = useThemeStore();
  const usersStore = useUsersStore();
  const currentUserStore = useCurrentUserStore();
  themeStore.useThemeStoreSideEffect();

  useInitAuth({
    pb,
    onIsLoading: () => {
      usersStore.setData(undefined);
    },
    onIsLoggedIn: () => {
      smartSubscribeToUsers({ pb: pb, onChange: (x) => usersStore.setData(x) });
    },
    onIsLoggedOut: () => {
      usersStore.setData(null);
    },
  });

  return (
    <BrowserRouter basename={import.meta.env.VITE_APP_BASE_URL}>
      <LayoutTemplate
        Header={<Header />}
        LeftSidebar={currentUserStore.data.authStatus === "loggedIn" && <LeftSidebar />}
      >
        <App />
      </LayoutTemplate>
    </BrowserRouter>
  );
}

export default AppWrapper;
