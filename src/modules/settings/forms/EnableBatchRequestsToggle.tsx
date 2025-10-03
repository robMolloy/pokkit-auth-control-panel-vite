import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toastMultiMessages } from "@/lib/pbUtils";
import type { PocketBase } from "@/modules/auth/pocketbaseTypeHelpers";
import {
  disableBatchRequests,
  enableBatchRequests,
  type TSettings,
} from "@/modules/settings/dbSettings";
import { useEffect, useState } from "react";

export const EnableBatchRequestsToggle = (p: {
  pb: PocketBase;
  settings: TSettings;
  onSettingsUpdate: (x: TSettings) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(p.settings);
  const isChecked = value.batch.enabled;

  useEffect(() => setValue(p.settings), [p.settings.batch.enabled]);
  useEffect(() => p.onSettingsUpdate(value), [value]);

  return (
    <span className="flex items-center gap-2">
      <Switch
        id="enable-batch-requests-switch"
        disabled={isLoading}
        checked={value.batch.enabled}
        onCheckedChange={async () => {
          if (isLoading) return;
          setIsLoading(true);

          await (async () => {
            const resp = await (isChecked
              ? disableBatchRequests({ pb: p.pb })
              : enableBatchRequests({ pb: p.pb }));

            if (resp.success) setValue(resp.data);

            toastMultiMessages(resp.messages);
          })();

          setIsLoading(false);
        }}
      />
      <Label htmlFor="enable-batch-requests-switch">Enable Batch Requests</Label>
    </span>
  );
};
