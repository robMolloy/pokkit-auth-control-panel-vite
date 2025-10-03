import { H1 } from "@/components/custom/H1";
import { MainLayout } from "@/components/templates/LayoutTemplate";
import { pb } from "@/config/pocketbaseConfig";
import { LoggedInUserOnlyRoute } from "@/modules/routeProtector/LoggedInUserOnlyRoute";
import {
  type TUsersCollection,
  getUsersCollection,
} from "@/modules/usersCollectionModel/dbUsersCollectionModelHelpers";
import { AuthTokenDurationInputForm } from "@/modules/usersCollectionModel/forms/AuthTokenDurationInputForm";
import { EmailChangeTokenDurationInputForm } from "@/modules/usersCollectionModel/forms/EmailChangeTokenDurationInputForm";
import { EmailVerificationTokenDurationInputForm } from "@/modules/usersCollectionModel/forms/EmailVerificationTokenInputForm";
import { PasswordResetTokenDurationInputForm } from "@/modules/usersCollectionModel/forms/PasswordResetTokenInputForm";
import { ProtectedFileAccessTokenDurationInputForm } from "@/modules/usersCollectionModel/forms/ProtectedFileAccessTokenInputForm";
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
        <H1>Tokens</H1>
        <br />
        {usersCollection && (
          <div className="flex flex-col gap-4">
            <AuthTokenDurationInputForm
              pb={pb}
              value={usersCollection.authToken.duration}
              onUsersCollectionUpdate={(x) => setUsersCollection(x)}
            />
            <EmailChangeTokenDurationInputForm
              pb={pb}
              value={usersCollection.emailChangeToken.duration}
              onUsersCollectionUpdate={(x) => setUsersCollection(x)}
            />
            <PasswordResetTokenDurationInputForm
              pb={pb}
              value={usersCollection.passwordResetToken.duration}
              onUsersCollectionUpdate={(x) => setUsersCollection(x)}
            />
            <EmailVerificationTokenDurationInputForm
              pb={pb}
              value={usersCollection.verificationToken.duration}
              onUsersCollectionUpdate={(x) => setUsersCollection(x)}
            />
            <ProtectedFileAccessTokenDurationInputForm
              pb={pb}
              value={usersCollection.fileToken.duration}
              onUsersCollectionUpdate={(x) => setUsersCollection(x)}
            />
          </div>
        )}
      </MainLayout>
    </LoggedInUserOnlyRoute>
  );
}
