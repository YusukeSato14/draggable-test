import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "React App",
  description: "Web site created with Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <UserProvider>
          <div id="root">{children}</div>
        </UserProvider>
      </body>
    </html>
  );
}
