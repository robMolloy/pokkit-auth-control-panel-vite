import { AccordionCard } from "@/components/custom/AccordionCard";
import { H1 } from "@/components/custom/H1";
import { MainLayout } from "@/components/templates/LayoutTemplate";
import { pb } from "@/config/pocketbaseConfig";
import {
  type TUsersCollection,
  getUsersCollection,
} from "@/usersCollectionModel/dbUsersCollectionModelHelpers";
import { AuthAlertEmailTemplateForm } from "@/usersCollectionModel/forms/AuthAlertEmailTemplateForm";
import { ConfirmEmailChangeTemplateForm } from "@/usersCollectionModel/forms/ConfirmEmailChangeTemplateForm";
import { EmailVerificationTemplateForm } from "@/usersCollectionModel/forms/EmailVerificationTemplateForm";
import { OtpEmailTemplateForm } from "@/usersCollectionModel/forms/OtpEmailTemplateForm";
import { ResetPasswordTemplateForm } from "@/usersCollectionModel/forms/ResetPasswordTemplateForm";
import { useEffect, useState } from "react";

const Page = () => {
  const [usersCollection, setUsersCollection] = useState<TUsersCollection>();

  useEffect(() => {
    (async () => {
      const resp = await getUsersCollection({ pb });
      if (resp.success) setUsersCollection(resp.data);
    })();
  }, []);

  return (
    <MainLayout>
      <H1>Email Templates</H1>
      <br />
      {usersCollection && (
        <div className="flex flex-col gap-4">
          <AccordionCard title="Email Verification Template" value="email-verification-template">
            <EmailVerificationTemplateForm
              pb={pb}
              subject={usersCollection.verificationTemplate.subject}
              body={usersCollection.verificationTemplate.body}
              onUsersCollectionUpdate={(x) => setUsersCollection(x)}
            />
          </AccordionCard>

          <AccordionCard title="Reset Password Template" value="reset-password-template">
            <ResetPasswordTemplateForm
              pb={pb}
              subject={usersCollection.resetPasswordTemplate.subject}
              body={usersCollection.resetPasswordTemplate.body}
              onUsersCollectionUpdate={(x) => setUsersCollection(x)}
            />
          </AccordionCard>

          <AccordionCard
            title="Confirm Email Change Template"
            value="confirm-email-change-template"
          >
            <ConfirmEmailChangeTemplateForm
              pb={pb}
              subject={usersCollection.confirmEmailChangeTemplate.subject}
              body={usersCollection.confirmEmailChangeTemplate.body}
              onUsersCollectionUpdate={(x) => setUsersCollection(x)}
            />
          </AccordionCard>

          <AccordionCard title="Otp Email Template" value="otp-email-template">
            <OtpEmailTemplateForm
              pb={pb}
              subject={usersCollection.otp.emailTemplate.subject}
              body={usersCollection.otp.emailTemplate.body}
              onUsersCollectionUpdate={(x) => setUsersCollection(x)}
            />
          </AccordionCard>

          <AccordionCard title="Auth Alert Email Template" value="auth-alert-email-template">
            <AuthAlertEmailTemplateForm
              pb={pb}
              subject={usersCollection.authAlert.emailTemplate.subject}
              body={usersCollection.authAlert.emailTemplate.body}
              onUsersCollectionUpdate={(x) => setUsersCollection(x)}
            />
          </AccordionCard>
        </div>
      )}
    </MainLayout>
  );
};

export default Page;
