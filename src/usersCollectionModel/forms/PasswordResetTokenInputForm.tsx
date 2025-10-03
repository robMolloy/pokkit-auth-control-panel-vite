import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { pb } from "@/config/pocketbaseConfig";
import { useEffect, useState } from "react";
import { updatePasswordResetTokenDuration } from "../dbUsersCollectionModelTokenDurationHelpers";
import { invalidatePasswordResetTokens } from "../dbUsersCollectionModelInvalidateTokensHelpers";
import type { PocketBase } from "@/modules/auth/pocketbaseTypeHelpers";
import type { TUsersCollection } from "../dbUsersCollectionModelHelpers";
import { useModalStore } from "@/components/templates/modal/modalStore";
import { toastMultiMessages } from "@/lib/pbUtils";
import { NumberInput } from "@/components/custom/CustomInputs";
import { Link } from "react-router-dom";
import { ConfirmationModalContent } from "@/components/templates/modal/Modal";

export const PasswordResetTokenDurationInputForm = (p: {
  pb: PocketBase;
  value: number;
  onUsersCollectionUpdate: (x: TUsersCollection) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(p.value);

  const modalStore = useModalStore();

  useEffect(() => setValue(p.value), [p.value]);

  return (
    <form
      className="flex flex-col gap-1"
      onSubmit={async (e) => {
        e.preventDefault();
        if (isLoading) return;

        setIsLoading(true);
        await (async () => {
          const resp = await updatePasswordResetTokenDuration({ pb, duration: value });

          toastMultiMessages(resp.messages);
        })();

        setIsLoading(false);
      }}
    >
      <Label htmlFor="users-collection-passwordResetTokenDuration-input">
        Password Reset Token Duration
      </Label>
      <span className="flex items-baseline gap-2">
        <NumberInput
          id="users-collection-passwordResetTokenDuration-input"
          disabled={isLoading}
          value={value}
          onInput={async (e) => setValue(e)}
        />
        <Button type="submit">Submit</Button>
      </span>
      <Link
        to="#"
        onClick={() =>
          modalStore.setData(
            <ConfirmationModalContent
              title="Confirm token invalidation"
              description="This will invalidate all previously issued tokens"
              onConfirm={() => invalidatePasswordResetTokens({ pb })}
            />,
          )
        }
        className="text-xs hover:underline"
      >
        Invalidate all previously issued tokens
      </Link>
    </form>
  );
};
