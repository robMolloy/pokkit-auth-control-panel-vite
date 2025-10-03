import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { superuserLogin } from "./dbSuperusersUtils";
import type { PocketBase } from "@/modules/auth/pocketbaseTypeHelpers";
import { H1 } from "@/components/custom/H1";
import { TextInput } from "@/components/custom/CustomInputs";
import {
  FormFeedbackMessages,
  useFormFeedbackMessages,
} from "@/modules/auth/formTemplates/FormFeedbackMessages";

export const SuperUserAuthForm = (p: { pb: PocketBase }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formFeedback = useFormFeedbackMessages();

  return (
    <Card>
      <CardHeader>
        <H1>SuperUser Sign In</H1>
      </CardHeader>
      <CardContent>
        {formFeedback.messages && formFeedback.status && (
          <FormFeedbackMessages messages={formFeedback.messages} status={formFeedback.status} />
        )}
        <form
          className="flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();

            setIsLoading(true);

            const resp = await superuserLogin({ pb: p.pb, username, password });
            const feedbackFn = resp.success ? formFeedback.showSuccess : formFeedback.showError;
            feedbackFn(resp.messages);
            console.log(`SuperuserAuthSigninForm.tsx:${/*LL*/ 40}`, { resp });

            setIsLoading(false);
          }}
        >
          <div>
            <Label>SuperUser username</Label>
            <TextInput
              value={username}
              onInput={(x) => setUsername(x)}
              placeholder="admin@admin.com"
            />
          </div>
          <div>
            <Label>SuperUser password</Label>
            <TextInput
              type="password"
              value={password}
              onInput={(x) => setPassword(x)}
              placeholder="Password"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
