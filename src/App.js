import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  message,
} from "antd";
import { useState } from "react";
import APIdata from "./API.json";

function App() {
  const [data, setData] = useState(APIdata);
  const [form] = Form.useForm();
  const [isDisabled, setIsDisabled] = useState(true);

  // console.log(data);

  const handleSubmitForm = (formValue) => {
    console.log(JSON.stringify(formValue, null, 2));
    setIsDisabled(!isDisabled);
    form.resetFields();
    message.success("Заявка отправлена!");
  };

  const handleResetForm = () => {
    setIsDisabled(!isDisabled);
    form.resetFields();
  };

  return (
    <Card
      style={{
        maxWidth: 400,
        margin: "150px auto",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        style={{
          maxWidth: 300,
        }}
        onFinish={handleSubmitForm}
        form={form}
      >
        <Form.Item
          name="tower"
          rules={[{ required: true, message: "Пожалуйста, выберите башню!" }]}
        >
          <Select
            allowClear
            title="Башня"
            onSelect={() => setIsDisabled(false)}
            options={data?.towers}
            placeholder="Выбрать башню"
          />
        </Form.Item>
        <Form.Item
          name={"floor"}
          rules={[{ required: true, message: "Пожалуйста, выберите этаж!" }]}
        >
          <Select
            allowClear
            title="Этаж"
            onSelect={() => setIsDisabled(false)}
            options={data?.floors}
            placeholder="Выбрать этаж"
          />
        </Form.Item>
        <Form.Item
          name={"room"}
          rules={[
            { required: true, message: "Пожалуйста, выберите переговорку!" },
          ]}
        >
          <Select
            allowClear
            title="Комната"
            onSelect={() => setIsDisabled(false)}
            options={data?.rooms}
            placeholder="Выбрать переговорку"
          />
        </Form.Item>
        <Form.Item
          name="time"
          rules={[{ required: true, message: "Пожалуйста выберите время!" }]}
        >
          <DatePicker.RangePicker
            showTime
            placeholder={["Начало", "Конец"]}
            onChange={() => setIsDisabled(false)}
          />
        </Form.Item>
        <Form.Item name="comment">
          <Input.TextArea onChange={() => setIsDisabled(false)} />
        </Form.Item>

        <Space
          style={{
            marginTop: "30px",
          }}
        >
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Зарезервировать
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              danger
              disabled={isDisabled}
              htmlType="reset"
              onClick={handleResetForm}
            >
              Очистить
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Card>
  );
}

export default App;
