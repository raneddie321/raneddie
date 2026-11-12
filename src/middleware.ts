import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
const INTERNAL_ADMIN = "/re-admin-internal";

function adminHost(req: NextRequest) {
  const h = (req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "").split(":")[0].toLowerCase();
  return h.endsWith(".vercel.app") || h === "localhost" || h === "127.0.0.1";
}

/**
 * The admin panel only exists at /<ADMIN_PATH> on *.vercel.app hosts. Everything else that
 * touches it (the internal route, the admin API on raneddie.com, a wrong path) looks like a 404.
 */
function routeAdmin(req: NextRequest): NextResponse | null {
  const { pathname } = req.nextUrl;
  // One official address for search engines: www.raneddie.com → raneddie.com
  if ((req.headers.get('host') ?? '').toLowerCase().startsWith('www.raneddie.com')) {
    const url = req.nextUrl.clone();
    url.host = 'raneddie.com';
    url.port = '';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }
  const secret = process.env.ADMIN_PATH;
  const notFound = () => NextResponse.rewrite(new URL("/__not-found", req.url), { status: 404 });

  if (pathname === INTERNAL_ADMIN || pathname.startsWith(INTERNAL_ADMIN + "/")) return notFound();
  if (pathname.startsWith("/api/admin")) return secret && adminHost(req) ? null : notFound();

  if (secret && (pathname === "/" + secret || pathname.startsWith("/" + secret + "/"))) {
    if (!adminHost(req)) return notFound();
    const url = req.nextUrl.clone();
    url.pathname = INTERNAL_ADMIN + pathname.slice(secret.length + 1);
    const res = NextResponse.rewrite(url);
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    res.headers.set("Cache-Control", "no-store");
    return res;
  }
  return null;
}

const handler = clerkEnabled
  ? clerkMiddleware(
      (_auth, req) => routeAdmin(req) ?? NextResponse.next(),
      {
        authorizedParties: [
          "https://raneddie.com",
          "https://www.raneddie.com",
          "https://raneddie-xisa.vercel.app",
        ],
      },
    )
  : (req: NextRequest) => routeAdmin(req) ?? NextResponse.next();

export default handler;

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
