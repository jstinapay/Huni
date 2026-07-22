import { HealthCheck } from "@/app/(dashboard)/test/health-check";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

export default function TestPage() {
  prefetch(trpc.health.queryOptions());
  return (
    <div>
      <HydrateClient>
        <div className="flex flex-col items-center justify center gap-4 p-8">
          <h1 className="text-2xl font-bold">tRPC Test Page</h1>
          <ErrorBoundary fallback={<div>Something went wrong.</div>}>
            <Suspense fallback={<p>Loading...</p>}>
              <HealthCheck />
            </Suspense>
          </ErrorBoundary>
        </div>
      </HydrateClient>
    </div>
  );
}
