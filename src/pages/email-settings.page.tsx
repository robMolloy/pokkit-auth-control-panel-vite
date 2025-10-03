import { H1 } from "@/components/custom/H1";
import { MainLayout } from "@/components/templates/LayoutTemplate";
import { pb } from "@/config/pocketbaseConfig";
import { LoggedInUserOnlyRoute } from "@/modules/routeProtector/LoggedInUserOnlyRoute";
import { type TSettings, getSettings } from "@/modules/settings/dbSettings";
import { EmailSettingsForm } from "@/modules/settings/forms/EmailSettingsForm";
import { useEffect, useState } from "react";

const Page = () => {
  const [settings, setSettings] = useState<TSettings>();

  useEffect(() => {
    (async () => {
      const resp = await getSettings({ pb });
      if (resp.success) setSettings(resp.data);
    })();
  }, []);
  return (
    <LoggedInUserOnlyRoute>
      <MainLayout>
        <H1>Email Settings</H1>
        <br />
        {settings && (
          <div className="flex flex-col gap-4">
            <EmailSettingsForm
              pb={pb}
              settings={settings}
              onEmailSettingsUpdate={(x) => setSettings(x)}
            />
          </div>
        )}
      </MainLayout>
    </LoggedInUserOnlyRoute>
  );
};

export default Page;
