import { H1 } from "@/components/custom/H1";
import { MainLayout } from "@/components/templates/LayoutTemplate";
import { pb } from "@/config/pocketbaseConfig";
import { LoggedInUserOnlyRoute } from "@/modules/auth/routeProtector/LoggedInUserOnlyRoute";
import {
  type TUsersCollection,
  getUsersCollection,
} from "@/modules/usersCollectionModel/dbUsersCollectionModelHelpers";
import { EnableOAuth2Toggle } from "@/modules/usersCollectionModel/forms/EnableUsersCollectionOAuth2Toggle";
import { OAuth2ProvidersFormCards } from "@/modules/usersCollectionModel/forms/OAuth2ProviderFormCards";
import { useEffect, useState } from "react";

export default function Home() {
  const [usersCollection, setUsersCollection] = useState<TUsersCollection>();

  useEffect(() => {
    (async () => {
      const resp = await getUsersCollection({ pb });
      if (resp.success) setUsersCollection(resp.data);
    })();
  }, []);

  return (
    <LoggedInUserOnlyRoute>
      <MainLayout>
        <H1>oAuth2</H1>
        <br />
        {usersCollection && (
          <>
            <EnableOAuth2Toggle
              pb={pb}
              usersCollection={usersCollection}
              onUsersCollectionUpdate={(x) => setUsersCollection(x)}
            />
            <br />
            <OAuth2ProvidersFormCards
              pb={pb}
              usersCollection={usersCollection}
              onUsersCollectionUpdate={(x) => setUsersCollection(x)}
            />
          </>
        )}
      </MainLayout>
    </LoggedInUserOnlyRoute>
  );
}
