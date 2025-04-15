import './globals.css'

export const metadata = {
  title: "Shennawy",
  description: "Find your home",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
        <body>
          {children}
        </body>
    </html>
  );
}
