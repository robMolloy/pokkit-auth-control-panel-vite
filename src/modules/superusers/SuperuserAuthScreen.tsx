import { MainLayout } from "@/components/templates/LayoutTemplate";
import { SuperUserAuthForm } from "./SuperuserAuthSigninForm";
import type { PocketBase } from "@/modules/auth/pocketbaseTypeHelpers";

export const SuperuserAuthScreen = (p: { pb: PocketBase }) => {
  return (
    <MainLayout>
      <div className="mt-16 flex justify-center">
        <div className="w-[400px]">
          <SuperUserAuthForm pb={p.pb} />
        </div>
      </div>
    </MainLayout>
  );
};
