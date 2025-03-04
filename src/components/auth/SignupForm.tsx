"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAtom } from "jotai";
import { emailAtom, passwordAtom } from "@/stores/atoms";
import { useRouter } from "next/navigation";
import { useSignup } from "@/hooks/apis/useSignup";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);

  const router = useRouter();

  const { signup, isSignedup, errorMessages } = useSignup();

  if (isSignedup) {
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signup(email, password);
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            <p>Welcome!</p>
            <p>Create your account</p>
          </CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        {errorMessages && (
          <CardContent>
            <div className="  text-red-500 transition-all duration-200">
              <p className="text-wrap break-all">{errorMessages}</p>
            </div>
          </CardContent>
        )}

        <CardContent>
          <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full  bg-blue-700 text-white">
                Create account
              </Button>
              <div>
                <p className="mt-0 mb-1 p-0 text-center text-sm ">
                  Are you staff?
                </p>
                <Button
                  variant="outline"
                  className="w-full mt-0"
                  onClick={() => router.push("/auth/signup-admin")}
                >
                  Create admin account
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
