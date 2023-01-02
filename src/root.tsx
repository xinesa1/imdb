import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Topnav from "./features/topnav/Topnav";
import styles from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter&display=swap",
  },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "🇹🇷 Dizi & Film",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="tr">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <Topnav />
        </header>
        <main>
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
