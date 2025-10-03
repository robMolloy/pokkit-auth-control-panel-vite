import { H1 } from "@/components/custom/H1";
import { MainLayout } from "@/components/templates/LayoutTemplate";
import { pb } from "@/config/pocketbaseConfig";
import { AppSettingsForm } from "@/settings/AppSettingsForm";
import { getSettings, type TSettings } from "@/settings/dbSettings";
import {
  type TUsersCollection,
  getUsersCollection,
} from "@/usersCollectionModel/dbUsersCollectionModelHelpers";
import { EnableAuthAlertToggle } from "@/usersCollectionModel/forms/EnableAuthAlertToggle";
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
    </MainLayout>
  );
};

export default Page;
