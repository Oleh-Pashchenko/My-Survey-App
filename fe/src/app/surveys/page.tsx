'use client';
import { API_URI } from '@/utils/env';
import { Card, List, message } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Surveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch(`${API_URI}api/surveys`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSurveys(data);
      } catch (error) {
        console.error('Error fetching surveys:', error);
        message.error('Failed to load surveys');
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={surveys}
        loading={loading}
        renderItem={(survey: any) => (
          <List.Item>
            <Link href={`/surveys/${survey._id}`}>
              <Card title={survey.title}></Card>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Surveys;
