import Fallback from "@/components/Loadings/Fallback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center overflow-auto py-8">
      {/* <Background /> */}
      <Card className="bg-base-100 z-10 my-auto w-full max-w-lg shadow-2xl">
        <CardHeader className=" flex flex-col items-center justify-center gap-2">
          <img src="/logo.png" alt="logo" className="w-32" />
          <CardTitle className="text-2xl font-bold">
            Library Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Fallback />}>
            <Outlet />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}
