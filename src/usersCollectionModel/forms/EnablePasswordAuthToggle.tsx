import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { PocketBase } from "@/modules/auth/pocketbaseTypeHelpers";
import { useEffect, useState } from "react";
import {
  disablePasswordAuth,
  enablePasswordAuth,
} from "../dbUsersCollectionModelEnableFunctionalityHelpers";
import type { TUsersCollection } from "../dbUsersCollectionModelHelpers";
import { toastMultiMessages } from "@/lib/pbUtils";

export const EnablePasswordAuthToggle = (p: {
  pb: PocketBase;
  usersCollection: TUsersCollection;
  onUsersCollectionUpdate: (x: TUsersCollection) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(p.usersCollection);
  const isChecked = value.passwordAuth.enabled;

  useEffect(() => setValue(p.usersCollection), [p.usersCollection.passwordAuth.enabled]);
  useEffect(() => p.onUsersCollectionUpdate(value), [value]);

  return (
    <span className="flex items-center gap-2">
      <Switch
        id="enable-users-collection-passwordAuth-switch"
        disabled={isLoading}
        checked={value.passwordAuth.enabled}
        onCheckedChange={async () => {
          if (isLoading) return;
          setIsLoading(true);

          await (async () => {
            const resp = await (isChecked
              ? disablePasswordAuth({ pb: p.pb })
              : enablePasswordAuth({ pb: p.pb }));
            if (resp.success) setValue(resp.data);

            toastMultiMessages(resp.messages);
          })();

          setIsLoading(false);
        }}
      />
      <Label htmlFor="enable-users-collection-passwordAuth-switch">Enable Password Auth</Label>
    </span>
  );
};
