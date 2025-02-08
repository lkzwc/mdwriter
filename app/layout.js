import './globals.css';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';

export const metadata = {
  title: 'MDWriter - 微信公众号 Markdown 编辑器',
  description: '一个专注于使用Markdown编写微信公众号文章的WEB应用，支持向公众号推送以及发布！',
  keywords: ['Markdown', '微信公众号', '编辑器', '排版工具'],
  authors: [{ name: 'MDWriter Team' }],
  openGraph: {
    title: 'MDWriter - 微信公众号 Markdown 编辑器',
    description: '一个专注于使用Markdown编写微信公众号文章的WEB应用，支持向公众号推送以及发布！',
    type: 'website',
    locale: 'zh_CN',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
     <body suppressHydrationWarning={true}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
