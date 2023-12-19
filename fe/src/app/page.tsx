'use client';
import { useUserContext } from '@/context/userProvider';
import { API_URI } from '@/utils/env';
import { Button, Col, Input, Layout, Row, message } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Home = () => {
  const [name, setName] = useState('');
  const router = useRouter();
  const { setUserData } = useUserContext();
  console.log(`${API_URI}api/users`);
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${API_URI}api/users`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const user = await response.json();

      console.log('User created or retrieved:', user);
      setUserData(user);

      router.push('/surveys');
    } catch (error) {
      console.error('Failed to submit:', error);
      message.error('Failed to submit user data');
    }
  };

  return (
    <Layout>
      <Content>
        <Row justify='center' align='middle' style={{ minHeight: '80vh' }}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Input
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginBottom: 20 }}
            />
            <Button type='primary' onClick={handleSubmit} block>
              Submit
            </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Home;
