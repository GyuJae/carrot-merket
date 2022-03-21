import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest, ev: NextFetchEvent) => {
  if (req.ua?.isBot) {
    return new Response("Please don't be a bot. Be human");
  }
  // if (!req.url.includes("/api")) {
  //   if (!req.url.includes("/enter") && !req.cookies.carrot_session) {
  //     return NextResponse.redirect("/enter");
  //   }
  // }
};
