"use client";

import { useState } from "react";
import { api } from "@/shared/api/base";
import { useSessionStore } from "@/entities/session/model/store";
import { useLogout } from "@/features/auth/model/use-logout";
import { Button } from "@/shared/ui";

export default function TestRefreshPage() {
  const [status, setStatus] = useState<string>("Ready");
  const { authStatus, setAccessToken } = useSessionStore();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const isAuthenticated = authStatus === "authenticated";

  const runTest = async () => {
    setStatus("Testing...");

    if (!isAuthenticated) {
      setStatus("Error: Please login first!");
      return;
    }

    console.log("Currently authenticated:", isAuthenticated);
    setAccessToken(null);
    console.log("Access token removed from store to test refresh");

    try {
      const response = await api.get("/api/test-protected");

      setStatus(`Success! Response: ${JSON.stringify(response)}`);
      console.log("Final Response:", response);
      console.log(
        "Auth status in store:",
        useSessionStore.getState().authStatus,
      );
    } catch (error: any) {
      console.error("Test Failed:", error);
      setStatus(`Failed: ${error.message}`);
    }
  };

  return (
    <div className="p-8 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Silent Refresh Test</h1>
        <Button variant="gray" onClick={() => logout()} disabled={isLoggingOut}>
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>

      <div className="p-4 bg-gray-100 rounded">
        <p className="font-mono text-sm break-all">
          Login Status: {isAuthenticated ? "Logged In" : "Logged Out"}
        </p>
      </div>

      <Button onClick={runTest}>Trigger 401 & Refresh</Button>

      <div
        className={`p-4 rounded border ${status.startsWith("Success") ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
      >
        <p className="font-bold">Result:</p>
        <p>{status}</p>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        * Open Browser Console for detailed logs.
      </p>
    </div>
  );
}
