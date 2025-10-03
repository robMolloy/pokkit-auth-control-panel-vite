import { H1 } from "@/components/custom/H1";
import { MainLayout } from "@/components/templates/LayoutTemplate";
import { pb } from "@/config/pocketbaseConfig";
import {
  type TUsersCollection,
  getUsersCollection,
} from "@/usersCollectionModel/dbUsersCollectionModelHelpers";
import { AuthTokenDurationInputForm } from "@/usersCollectionModel/forms/AuthTokenDurationInputForm";
import { EmailChangeTokenDurationInputForm } from "@/usersCollectionModel/forms/EmailChangeTokenDurationInputForm";
import { EmailVerificationTokenDurationInputForm } from "@/usersCollectionModel/forms/EmailVerificationTokenInputForm";
import { PasswordResetTokenDurationInputForm } from "@/usersCollectionModel/forms/PasswordResetTokenInputForm";
import { ProtectedFileAccessTokenDurationInputForm } from "@/usersCollectionModel/forms/ProtectedFileAccessTokenInputForm";
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
  );
}
