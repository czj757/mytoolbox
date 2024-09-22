import React, { useState } from 'react';
import { Input, Button, message, Row, Col, Card, Space } from 'antd';
import { CopyOutlined, ClearOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;

const TimestampTool: React.FC = () => {
  const [timestamp, setTimestamp] = useState('');
  const [dateTime, setDateTime] = useState('');

  const handleTimestampToDateTime = () => {
    try {
      const date = moment(parseInt(timestamp));
      if (!date.isValid()) {
        throw new Error('无效的时间戳');
      }
      const formattedDate = date.format('YYYY年MM月DD日 HH时mm分ss秒');
      setDateTime(formattedDate);
    } catch (error) {
      message.error('转换失败: ' + error.message);
    }
  };

  const handleDateTimeToTimestamp = () => {
    try {
      const date = moment(dateTime, 'YYYY-MM-DD HH:mm:ss');
      if (!date.isValid()) {
        throw new Error('无效的日期时间格式');
      }
      setTimestamp(date.valueOf().toString());
    } catch (error) {
      message.error('转换失败: ' + error.message);
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
    <Card title="时间戳工具" style={{ width: '100%', marginTop: '20px' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Space.Compact style={{ width: '100%', marginBottom: '10px' }}>
            <Input
              placeholder="输入时间戳"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
            />
            <Button icon={<CopyOutlined />} onClick={() => handleCopy(timestamp)} />
            <Button icon={<ClearOutlined />} onClick={() => handleClear(setTimestamp)} />
          </Space.Compact>
          <Button onClick={handleTimestampToDateTime} type="primary">
            转换为日期时间
          </Button>
        </Col>
        <Col span={12}>
          <Space.Compact style={{ width: '100%', marginBottom: '10px' }}>
            <Input
              placeholder="输入日期时间 (YYYY-MM-DD HH:mm:ss)"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
            <Button icon={<CopyOutlined />} onClick={() => handleCopy(dateTime)} />
            <Button icon={<ClearOutlined />} onClick={() => handleClear(setDateTime)} />
          </Space.Compact>
          <Button onClick={handleDateTimeToTimestamp} type="primary">
            转换为时间戳
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default TimestampTool;