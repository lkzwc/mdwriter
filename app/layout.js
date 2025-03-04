// app/layout.tsx

// globals.css includes @tailwind directives
// adjust the path if necessary
import {Providers} from "./providers";

export default function RootLayout({children}) {
  return (
    <html lang="en" className='dark'>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}