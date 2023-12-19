'use client';
import { API_URI } from '@/utils/env';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import { useRouter } from 'next/navigation';

const CreateSurvey = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: any) => {
    const formattedQuestions = values.questions.map((q: any) => ({
      text: q.text,
      options: q.options.split(',').map((option: any) => option.trim()),
    }));

    const surveyData = {
      title: values.title,
      questions: formattedQuestions,
    };

    try {
      const response = await fetch(`${API_URI}api/surveys`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Survey created:', result);
      router.push('/surveys');
    } catch (error) {
      console.error('Failed to create survey:', error);
    }
  };

  return (
    <Form
      form={form}
      name='dynamic_form_nest_item'
      onFinish={onFinish}
      autoComplete='off'
    >
      <Form.Item
        name='title'
        rules={[{ required: true, message: 'Missing survey title' }]}
      >
        <Input placeholder='Survey Title' />
      </Form.Item>
      <Form.List
        name='questions'
        rules={[
          {
            validator: async (_, questions) => {
              if (!questions || questions.length < 1) {
                return Promise.reject(new Error('At least one question'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8 }}
                align='baseline'
              >
                <Form.Item
                  {...restField}
                  name={[name, 'text']}
                  rules={[{ required: true, message: 'Missing question text' }]}
                >
                  <Input placeholder='Question Text' />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'options']}
                  rules={[{ required: true, message: 'Missing options' }]}
                >
                  <Input placeholder='Options (comma separated)' />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type='dashed'
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Question
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateSurvey;
