import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { pb } from "@/config/pocketbaseConfig";
import { useEffect, useState } from "react";
import { updateProtectedFileAccessTokenDuration } from "../dbUsersCollectionModelTokenDurationHelpers";
import { invalidateFileAccessTokens } from "../dbUsersCollectionModelInvalidateTokensHelpers";
import type { PocketBase } from "@/modules/auth/pocketbaseTypeHelpers";
import type { TUsersCollection } from "../dbUsersCollectionModelHelpers";
import { useModalStore } from "@/components/templates/modal/modalStore";
import { toastMultiMessages } from "@/lib/pbUtils";
import { NumberInput } from "@/components/custom/CustomInputs";
import { Link } from "react-router-dom";
import { ConfirmationModalContent } from "@/components/templates/modal/Modal";

export const ProtectedFileAccessTokenDurationInputForm = (p: {
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
          const resp = await updateProtectedFileAccessTokenDuration({ pb, duration: value });

          toastMultiMessages(resp.messages);
        })();

        setIsLoading(false);
      }}
    >
      <Label htmlFor="users-collection-protectedFileAccessTokenDuration-input">
        Protected File Access Token Duration
      </Label>
      <span className="flex items-baseline gap-2">
        <NumberInput
          id="users-collection-protectedFileAccessTokenDuration-input"
          disabled={isLoading}
          value={value}
          onInput={(e) => setValue(e)}
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
              onConfirm={async () => {
                const resp = await invalidateFileAccessTokens({ pb });
                toastMultiMessages(resp.messages);
              }}
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
