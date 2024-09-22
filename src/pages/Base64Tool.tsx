import React, { useState } from 'react';
import { Input, Button, message, Row, Col, Card, Space } from 'antd';
import { CopyOutlined, ClearOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const Base64Tool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const isBase64 = (str: string) => {
    const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    return base64Regex.test(str);
  };

  const handleEncode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (error) {
      message.error('编码失败: ' + error.message);
    }
  };

  const handleDecode = () => {
    if (!isBase64(input)) {
      message.error('输入不是有效的 Base64 编码');
      return;
    }
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (error) {
      message.error('解码失败: ' + error.message);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success('内容已复制到剪贴板');
    }).catch(() => {
      message.error('复制失败');
    });
  };

  const handleClear = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter('');
  };

  return (
    <Card title="Base64 编/解码工具" style={{ width: '100%', marginTop: '20px' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Space.Compact style={{ width: '100%', marginBottom: '10px' }}>
            <TextArea
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="请输入要编码或解码的文本"
            />
            <Button icon={<CopyOutlined />} onClick={() => handleCopy(input)} />
            <Button icon={<ClearOutlined />} onClick={() => handleClear(setInput)} />
          </Space.Compact>
          <Space>
            <Button onClick={handleEncode} type="primary">
              编码
            </Button>
            <Button onClick={handleDecode} type="primary">
              解码
            </Button>
          </Space>
        </Col>
        <Col span={12}>
          <Space.Compact style={{ width: '100%', marginBottom: '10px' }}>
            <TextArea rows={4} value={output} readOnly />
            <Button icon={<CopyOutlined />} onClick={() => handleCopy(output)} />
            <Button icon={<ClearOutlined />} onClick={() => handleClear(setOutput)} />
          </Space.Compact>
        </Col>
      </Row>
    </Card>
  );
};

export default Base64Tool;