'use client';
import { useUserContext } from '@/context/userProvider';
import { API_URI } from '@/utils/env';
import { Divider, List, Typography } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const { Title } = Typography;

const UserPage = () => {
  const [userResponses, setUserResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useUserContext();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const responsesResponse = await fetch(
          `${API_URI}api/responses/user/${userData._id}`
        );
        if (!responsesResponse.ok) {
          // throw new Error('Failed to fetch user responses');
          setLoading(false);
          return;
        }
        const responsesData = await responsesResponse.json();
        setUserResponses(responsesData);

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      {userData &&  <Title>{userData.name}</Title> }
      <Divider orientation='left'>My Responses</Divider>
      <List
        itemLayout='horizontal'
        dataSource={userResponses}
        renderItem={(response: any, index) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link href={`/surveys/${response.survey._id}`}>
                  {response.survey.title}
                </Link>
              }
              description={`Response ID: ${response._id}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default UserPage;
