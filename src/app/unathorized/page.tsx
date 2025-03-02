"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UnathorizedPage() {
  const router = useRouter();
  return (
    <section className="flex items-center h-full p-16 mt-10 dark:bg-gray-50 dark:text-gray-800">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
            <span className="sr-only">Error</span>401
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">Unathorized</p>
          <p className="mt-4 mb-8 dark:text-gray-600">
            You don't have permission to access the page.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="px-8 py-3 font-semibold rounded bg-orange-600 hover:bg-orange-200 border-orange-800"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
}
