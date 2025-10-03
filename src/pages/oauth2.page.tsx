import { H1 } from "@/components/custom/H1";
import { MainLayout } from "@/components/templates/LayoutTemplate";
import { pb } from "@/config/pocketbaseConfig";
import {
  type TUsersCollection,
  getUsersCollection,
} from "@/usersCollectionModel/dbUsersCollectionModelHelpers";
import { EnableOAuth2Toggle } from "@/usersCollectionModel/forms/EnableUsersCollectionOAuth2Toggle";
import { OAuth2ProvidersFormCards } from "@/usersCollectionModel/forms/OAuth2ProviderFormCards";
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
  );
}
