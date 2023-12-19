'use client';

import { UserProvider } from '@/context/userProvider';
import { Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import StyledComponentsRegistry from '../lib/AntdRegistry';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuKeys: any = {
    '/': '0',
    '/surveys': '1',
    '/surveys/create': '2',
    '/user': '3',
  };

  const selectedKey = menuKeys[pathname] || '0';

  return (
    <html lang='en'>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <UserProvider>
            <Layout className='layout' style={{ minHeight: '100vh' }}>
              <Header style={{ backgroundColor: 'white' }}>
                <Menu mode='horizontal' selectedKeys={[selectedKey]}>
                  <Menu.Item key='1'>
                    <Link href='/surveys'>List of Surveys</Link>
                  </Menu.Item>
                  <Menu.Item key='2'>
                    <Link href='/surveys/create'>Create Survey</Link>
                  </Menu.Item>
                  <Menu.Item key='3'>
                    <Link href='/user'>Profile</Link>
                  </Menu.Item>
                </Menu>
              </Header>
              <Content>
                <div className={inter.className} style={{ padding: 24 }}>
                  {children}
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                My Survey App ©{new Date().getFullYear()} Created with Next.js
                and Ant Design by Oleh Pashchenko
              </Footer>
            </Layout>
          </UserProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
