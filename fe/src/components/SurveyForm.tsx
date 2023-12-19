import { Button, Form, Input } from 'antd';

const SurveyForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // Use Fetch API to send data to '/api/surveys'
    // Handle response and errors
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
        <Input placeholder="Title" />
      </Form.Item>
      {/* Add more form items for survey questions and options */}
      <Form.Item>
        <Button type="primary" htmlType="submit">Save Survey</Button>
      </Form.Item>
    </Form>
  );
};

export default SurveyForm;
