'use client';
import { useUserContext } from '@/context/userProvider';
import { API_URI } from '@/utils/env';
import { Button, Card, List, Radio, Typography, message } from 'antd';
import { useRouter } from 'next/navigation';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const { Title, Text } = Typography;

import { useEffect, useState } from 'react';

const SurveyDetails = ({ params }: any) => {
  const { surveyId } = params;
  const [survey, setSurvey]: any = useState(null);
  const [responses, setResponses]: any = useState([]);
  const [myResponses, setMyResponses]: any = useState(null);
  const [responseStats, setResponseStats] = useState<any>({});

  const [loading, setLoading] = useState(true);
  const { userData } = useUserContext();
  const router = useRouter();

  const handleSubmit = async () => {
    const response = {
      surveyId: survey._id,
      userId: userData._id,
      answers: responses,
    };

    try {
      const apiResponse = await fetch(`${API_URI}api/responses/${survey._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(response),
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! Status: ${apiResponse.status}`);
      }

      const result = await apiResponse.json();
      console.log('Survey submitted successfully:', result);
      router.push('/surveys');
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };

  const findSelectedOptionIndex = (questionId: number) => {
    let answers = responses;

    if (myResponses) {
      answers = myResponses.answers;
    }

    const response = answers.find(
      (answer: any) => answer.questionId === questionId
    );

    return response ? response.selectedOptionIndex : null;
  };

  const prepareChartData = (
    surveyQuestions: any[],
    responseStats: { [x: string]: {} }
  ) => {
    let chartData: { question: any; option: string; count: any }[] = [];

    surveyQuestions.forEach(
      (question: { _id: string | number; options: any[]; text: any }) => {
        const questionResponses: any = responseStats[question._id] || {};
        question.options.forEach(
          (optionText: any, optionIndex: string | number) => {
            const count = questionResponses[optionIndex] || 0;
            chartData.push({
              question: question.text,
              option: ` ${question.text}: ${optionText}`,
              count: count,
            });
          }
        );
      }
    );

    return chartData;
  };

  useEffect(() => {
    if (surveyId) {
      const fetchSurveyDetails = async () => {
        try {
          const response = await fetch(`${API_URI}api/surveys/${surveyId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setSurvey(data);
        } catch (error) {
          console.error('Error fetching survey details:', error);
          message.error('Failed to load survey details');
        } finally {
          setLoading(false);
        }
      };

      const fetchMyResponses = async () => {
        try {
          const response = await fetch(
            `${API_URI}api/responses/${surveyId}/user/${userData._id}`
          );
          if (!response.ok) {
            return;
          }

          const data = await response.json();
          setMyResponses(data);
        } catch (error) {
          console.error('Error fetching responses:', error);
          message.error('Failed to load survey responses');
        }
      };
      const fetchResponseStats = async () => {
        try {
          const response = await fetch(
            `${API_URI}api/surveys/${surveyId}/results`
          );
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          const stats = await response.json();
          setResponseStats(stats);
        } catch (error) {
          console.error('Error fetching response stats:', error);
          message.error('Failed to load response stats');
        }
      };
      fetchResponseStats();
      fetchMyResponses();
      fetchSurveyDetails();
    }
  }, [surveyId]);

  const handleResponseChange = (
    questionId: string,
    selectedOptionIndex: number
  ) => {
    setResponses((prev: any[]) => {
      const otherResponses = prev.filter(
        (res: { questionId: any }) => res.questionId !== questionId
      );
      return [...otherResponses, { questionId, selectedOptionIndex }];
    });
  };

  if (!surveyId) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      {loading ? (
        <p>Loading survey details...</p>
      ) : (
        <div className='survey-container'>
          <Card bordered={false} className='survey-card'>
            <Title level={2}>{survey?.title}</Title>
            <List
              dataSource={survey?.questions}
              renderItem={(question: any) => {
                const selectedOptionIndex = findSelectedOptionIndex(
                  question._id
                );
                console.log(
                  `Question ID: ${question._id}, Selected Index: ${selectedOptionIndex}`
                );

                return (
                  <List.Item key={question._id}>
                    <div className='question-section'>
                      <Text strong>{question.text}</Text>
                      <br />
                      <Radio.Group
                        onChange={(e) =>
                          handleResponseChange(
                            question._id,
                            question.options.indexOf(e.target.value)
                          )
                        }
                        value={
                          selectedOptionIndex !== null
                            ? question.options[selectedOptionIndex]
                            : undefined
                        }
                      >
                        {question.options.map((option: any, index: number) => {
                          const totalResponses: number = Object.values<number>(
                            responseStats[question._id] || {}
                          ).reduce(
                            (sum: number, count: number) => sum + count,
                            0
                          );
                          const count =
                            responseStats[question._id]?.[index] || 0;
                          const percentage =
                            totalResponses > 0
                              ? ((count / totalResponses) * 100).toFixed(2)
                              : 0;

                          return (
                            <>
                              <br />
                              <Radio key={index} value={option}>
                                {option}
                              </Radio>
                              {myResponses && (
                                <Text type='secondary'>
                                  - {count} responses ({percentage}%)
                                </Text>
                              )}
                            </>
                          );
                        })}
                      </Radio.Group>
                    </div>
                  </List.Item>
                );
              }}
            />
            <Button
              type='primary'
              onClick={handleSubmit}
              className='submit-button'
              disabled={myResponses !== null}
            >
              Submit Survey
            </Button>
            {survey && myResponses && responseStats && (
              <ResponsiveContainer width='100%' height={400}>
                <BarChart
                  data={prepareChartData(survey.questions, responseStats)}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  layout='vertical'
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis type='number' />
                  <YAxis dataKey='option' width={150} type='category' />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey='count' fill='#8884d8' name='Response Count' />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default SurveyDetails;
