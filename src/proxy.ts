import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

const isOrgSelectionRoute = createRouteMatcher(["/org-selection(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    const { userId, orgId } = await auth();

    // Allow public routes to be accessed without authentication
    if (isPublicRoute(req)) {
        return NextResponse.next();
    }

    // Protect non-public routes and redirect to sign-in if the user is not authenticated
    if (!userId) {
        await auth.protect();
    }

    // Allow org selection route to be accessed without an orgId
    if (isOrgSelectionRoute(req)) {
        return NextResponse.next();
    }

    // For all protected routes, ensure the user has an orgId and redirect to org selection if not
    if (userId && !orgId) {
        const orgSelectionUrl = new URL("/org-selection", req.url);
        return NextResponse.redirect(orgSelectionUrl);
    }

    return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Always run for Clerk-specific frontend API routes
    '/__clerk/(.*)',
  ],
}
