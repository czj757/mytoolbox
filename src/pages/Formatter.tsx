import React, { useState } from 'react';
import { Input, Button, message, Row, Col, Card, Space } from 'antd';
import { CopyOutlined, ClearOutlined } from '@ant-design/icons';
import { formatJson, compressJson, jsonToXml } from '../utils/jsonUtils';

const { TextArea } = Input;

const Formatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleFormat = () => {
    try {
      const formatted = formatJson(input);
      setOutput(formatted);
    } catch (error) {
      message.error('格式化失败: ' + error.message);
    }
  };

  const handleCompress = () => {
    try {
      const compressed = compressJson(input);
      setOutput(compressed);
    } catch (error) {
      message.error('压缩失败: ' + error.message);
    }
  };

  const handleToXml = () => {
    try {
      const xml = jsonToXml(input);
      setOutput(xml);
    } catch (error) {
      message.error('转换为XML失败: ' + error.message);
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
    <Card title="JSON 工具" style={{ width: '100%' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Space.Compact style={{ width: '100%', marginBottom: '10px' }}>
            <TextArea
              rows={10}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="请输入 JSON 数据"
            />
            <Button icon={<CopyOutlined />} onClick={() => handleCopy(input)} />
            <Button icon={<ClearOutlined />} onClick={() => handleClear(setInput)} />
          </Space.Compact>
        </Col>
        <Col span={12}>
          <Space.Compact style={{ width: '100%', marginBottom: '10px' }}>
            <TextArea rows={10} value={output} readOnly />
            <Button icon={<CopyOutlined />} onClick={() => handleCopy(output)} />
            <Button icon={<ClearOutlined />} onClick={() => handleClear(setOutput)} />
          </Space.Compact>
        </Col>
      </Row>
      <Space style={{ marginTop: '10px' }}>
        <Button onClick={handleFormat} type="primary">
          格式化
        </Button>
        <Button onClick={handleCompress} type="primary">
          压缩
        </Button>
        <Button onClick={handleToXml} type="primary">
          转XML
        </Button>
      </Space>
    </Card>
  );
};

export default Formatter;