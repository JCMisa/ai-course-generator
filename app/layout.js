import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { dark } from "@clerk/themes";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Pensieve",
  description: "Your thoughts, your words",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#14919B", fontSize: "16px" },
      }}
    >
      <html lang="en">
        {/*add the new feature of clerk which is one tap auth */}
        <GoogleOneTap />
        <head>
          <link rel="icon" type="image/svg+xml" href="/images/pensieve-logo.png" />
        </head>
        <body className={outfit.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
