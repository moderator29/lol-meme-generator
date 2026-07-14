"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { unlockAdmin, type LoginState } from "@/app/admin-login/actions";

export function AdminLoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    unlockAdmin,
    {},
  );

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Admin password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter admin password"
          autoFocus
          required
        />
        {state.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={pending}>
        <Lock className="h-4 w-4" />
        {pending ? "Checking…" : "Unlock admin"}
      </Button>
    </form>
  );
}
