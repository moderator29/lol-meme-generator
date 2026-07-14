import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { authEnabled } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = { title: "Create account" };

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16">
      {authEnabled() ? (
        <SignUp />
      ) : (
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Authentication not configured</CardTitle>
            <CardDescription>
              Clerk keys are not set, so registration is disabled. The app is
              running in local demo mode with a signed-in admin user. Add your
              Clerk keys to enable sign up.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button asChild>
              <Link href="/dashboard">Continue to dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Back to home</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
