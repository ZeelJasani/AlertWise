import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { Navbar } from "@/components/nav-bar";
import { NavbarProvider } from "@/components/nav-mobile";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { baseUrl, createMetadata } from "@/lib/metadata";
import "./globals.css";
import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export const metadata = createMetadata({
  title: {
    template: "%s | AlertWise",
    default: "AlertWise",
  },
  description:
    "The most comprehensive Emergency Preparedness Platform.",
  metadataBase: baseUrl,
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "hsl(0, 0%, 98%)",
        },
        elements: {
          card: "bg-card border border-border shadow-xl",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
          socialButtonsBlockButton: "bg-muted text-foreground border border-border hover:bg-accent hover:text-accent-foreground",
          socialButtonsBlockButtonText: "text-foreground font-medium",
          formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
          footerActionLink: "text-primary hover:text-primary/90",
          formFieldInput: "bg-background border-input text-foreground focus:ring-ring"
        }
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                    try {
                      if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                        document.querySelector('meta[name="theme-color"]').setAttribute('content')
                      }
                    } catch (_) {}
                  `,
            }}
          />
        </head>
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} bg-background font-sans relative `}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NavbarProvider>
              <Navbar />
              {children}
              <Toaster
                toastOptions={{
                  style: {
                    borderRadius: "0px",
                    fontSize: "11px",
                  },
                }}
              />
            </NavbarProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
