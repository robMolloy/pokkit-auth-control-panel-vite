import { H1 } from "@/components/custom/H1";
import { MainLayout } from "@/components/templates/LayoutTemplate";
import { pb } from "@/config/pocketbaseConfig";
import { LoggedInUserOnlyRoute } from "@/modules/auth/routeProtector/LoggedInUserOnlyRoute";
import { AppSettingsForm } from "@/modules/settings/AppSettingsForm";
import { getSettings, type TSettings } from "@/modules/settings/dbSettings";
import { EnableBatchRequestsToggle } from "@/modules/settings/forms/EnableBatchRequestsToggle";
import {
  type TUsersCollection,
  getUsersCollection,
} from "@/modules/usersCollectionModel/dbUsersCollectionModelHelpers";
import { EnableAuthAlertToggle } from "@/modules/usersCollectionModel/forms/EnableAuthAlertToggle";
import { useEffect, useState } from "react";

const Page = () => {
  const [settings, setSettings] = useState<TSettings>();
  const [usersCollection, setUsersCollection] = useState<TUsersCollection>();

  useEffect(() => {
    (async () => {
      const resp = await getSettings({ pb });
      if (resp.success) setSettings(resp.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const resp = await getUsersCollection({ pb });
      if (resp.success) setUsersCollection(resp.data);
    })();
  }, []);
  return (
    <LoggedInUserOnlyRoute>
      <MainLayout>
        <H1>App Settings</H1>
        <br />
        {settings && (
          <AppSettingsForm
            pb={pb}
            appName={settings.meta.appName}
            appUrl={settings.meta.appURL}
            onSettingsUpdate={(x) => setSettings(x)}
          />
        )}
        {usersCollection && (
          <EnableAuthAlertToggle
            pb={pb}
            usersCollection={usersCollection}
            onUsersCollectionUpdate={(x) => setUsersCollection(x)}
          />
        )}

        {settings && (
          <EnableBatchRequestsToggle
            pb={pb}
            settings={settings}
            onSettingsUpdate={(x) => setSettings(x)}
          />
        )}
      </MainLayout>
    </LoggedInUserOnlyRoute>
  );
};

export default Page;
