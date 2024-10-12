import { auth } from "./auth";
import {
  publicRoutes,
  apiauthPrefix,
  authRoutes,
  staffRoutes,
  managerRoutes, // Assuming manager routes exist=
  DEFAULT_LOGIN_REDIRECT,
  onboardingRoutes,
} from "../routes";

export default auth((req) => {
  console.log("=============", req.auth);
  const { nextUrl } = req;
  const user = req.auth?.user;
  const isLoggedIn = !!req.auth;
  const newUser = user?.business.newUser;
  const role = user?.business.role;
  console.log("ROLEROLE", newUser, role);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiauthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isOnboardingRoute = onboardingRoutes.includes(nextUrl.pathname);
  const isStaffRoute = staffRoutes.includes(nextUrl.pathname);
  const isManagerRoute = managerRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return null; //checked

  if (isAuthRoute) {
    if (isLoggedIn && newUser) {
      return Response.redirect(new URL("/onboarding", nextUrl)); //checked
    }
    if (isLoggedIn) {
      // console.log("here1");
      if (role === "admin") {
        // console.log("here2");
        return Response.redirect(new URL("/", nextUrl)); // Admins can access the full app   // checked
      } else if (role === "staff") {
        // console.log("here3");
        if (!isStaffRoute) {
          return Response.redirect(new URL("/staff", nextUrl)); // Staff restricted to staff routes //checked
        }
      } else if (role === "manager") {
        // console.log("here4");
        if (!isManagerRoute) {
          return Response.redirect(new URL("/staff", nextUrl)); // Manager restricted to staff routes (same as staff in your case) //checked
        }
      }
    }
    return null;
  }

  if (isLoggedIn) {
    if (role === "staff") {
      if (!isStaffRoute) {
        return Response.redirect(new URL("/staff", nextUrl)); // Staff restricted to staff routes //checked
      }
    } else if (role === "manager") {
      if (!isManagerRoute) {
        return Response.redirect(new URL("/staff", nextUrl)); // Manager restricted to staff routes (same as staff in your case) //checked
      }
    }
  }

  if (isLoggedIn && newUser && !isOnboardingRoute) {
    //checked=
    return Response.redirect(new URL("/onboarding", nextUrl));
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl)); //checked
  }

  return null;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
