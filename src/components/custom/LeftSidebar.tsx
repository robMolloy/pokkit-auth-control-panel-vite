import { pb } from "@/config/pocketbaseConfig";
import { logout } from "@/modules/auth/dbAuthUtils";
import { useCurrentUserStore } from "@/stores/authDataStore";
import { useLocation } from "react-router-dom";
import { PreserveScrollAbility } from "../templates/LayoutTemplate";
import { LeftSidebarTemplate, SidebarButton } from "../templates/LeftSidebarTemplate";

export function LeftSidebar() {
  const currentUserStore = useCurrentUserStore();

  const isApproved = currentUserStore.data.authStatus === "loggedIn";

  const location = useLocation();

  return (
    <PreserveScrollAbility className="w-64">
      <LeftSidebarTemplate
        top={
          isApproved && (
            <>
              <SidebarButton href="/" iconName="Home" isHighlighted={location.pathname === "/"}>
                Home
              </SidebarButton>
              <SidebarButton
                href="/app-settings"
                iconName="Settings"
                isHighlighted={location.pathname === "/app-settings"}
              >
                App Settings
              </SidebarButton>
              <SidebarButton
                href="/users"
                iconName="Users"
                isHighlighted={location.pathname === "/users"}
              >
                Users
              </SidebarButton>
              <SidebarButton
                href="/auth-methods"
                iconName="Shield"
                isHighlighted={location.pathname === "/auth-methods"}
              >
                Auth Methods
              </SidebarButton>
              <SidebarButton
                href="/oauth2"
                iconName="Link"
                isHighlighted={location.pathname === "/oauth2"}
              >
                oAuth2
              </SidebarButton>
              <SidebarButton
                href="/email-settings"
                iconName="Mail"
                isHighlighted={location.pathname === "/email-settings"}
              >
                Email Settings
              </SidebarButton>
              <SidebarButton
                href="/email-templates"
                iconName="FileText"
                isHighlighted={location.pathname === "/email-templates"}
              >
                Email Templates
              </SidebarButton>
              <SidebarButton
                href="/tokens"
                iconName="Key"
                isHighlighted={location.pathname === "/tokens"}
              >
                Tokens
              </SidebarButton>
            </>
          )
        }
        bottom={
          currentUserStore.data.authStatus === "loggedIn" && (
            <>
              <SidebarButton iconName="LogOut" isHighlighted={false} onClick={() => logout({ pb })}>
                Log Out
              </SidebarButton>
            </>
          )
        }
      />
    </PreserveScrollAbility>
  );
}
