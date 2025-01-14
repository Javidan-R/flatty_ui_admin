// src/components/FilterModal.tsx
import React, { useState } from "react";
import {
  Modal,
  Select,
  InputNumber,
  Radio,
  Checkbox,
  Button,
  Upload,
  Space,
  Row,
  Col,
  Form,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface FilterModalProps {
  visible: boolean;
  onSave: (filters: any) => void;
  onCancel: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onSave,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({
    category: "",
    company: "",
    residentialComplex: "",
    areaFrom: 0,
    areaTo: 0,
    renovation: "",
    floorFrom: 0,
    floorTo: 0,
    notFirstFloor: false,
    notLastFloor: false,
    lastFloor: false,
    ceilingHeight: "",
    bathroomType: "",
    furniture: "",
    rooms: 0,
    bathroomCount: 0,
    livingRoomCount: 0,
    bedroomCount: 0,
    balconyCount: 0,
    parkingSlot: false,
    swimmingPool: false,
    photos: [] as File[],
  });

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave({ ...filters, ...values });
    });
  };

  const handleChange = (field: keyof typeof filters, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
      photos:
        field === "photos"
          ? [...prevFilters.photos, value as File]
          : prevFilters.photos,
    }));
  };

  const handleUpload = (file: File) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      photos: [...prevFilters.photos, file],
    }));
  };

  const uploadProps = {
    customRequest: ({
      file,
      onSuccess,
    }: {
      file: File;
      onSuccess?: (res: string) => void;
    }) => {
      setTimeout(() => {
        if (onSuccess) onSuccess("ok");
      }, 0);
    },
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        handleUpload(info.file.originFileObj);
      }
    },
  };

  return (
    <Modal
      title="Filter"
      visible={visible}
      onOk={handleSave}
      onCancel={onCancel}
      destroyOnClose={true}
      width={800}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Category" name="category">
              <Select onChange={(value) => handleChange("category", value)}>
                <Select.Option value="apartment">Apartment</Select.Option>
                <Select.Option value="house">House</Select.Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Company" name="company">
              <Select onChange={(value) => handleChange("company", value)}>
                <Select.Option value="Tech Corp">Tech Corp</Select.Option>
                <Select.Option value="IT Solutions">IT Solutions</Select.Option>
                {/* Add more companies as needed */}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Residential Complex" name="residentialComplex">
              <Select
                onChange={(value) => handleChange("residentialComplex", value)}
              >
                <Select.Option value="Complex A">Complex A</Select.Option>
                <Select.Option value="Complex B">Complex B</Select.Option>
                {/* Add more complexes as needed */}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Area">
              <Space>
                from
                <Form.Item name="areaFrom" noStyle>
                  <InputNumber
                    min={0}
                    onChange={(value) => handleChange("areaFrom", value)}
                  />
                </Form.Item>
                м<sup>2</sup>
                to
                <Form.Item name="areaTo" noStyle>
                  <InputNumber
                    min={0}
                    onChange={(value) => handleChange("areaTo", value)}
                  />
                </Form.Item>
                м<sup>2</sup>
              </Space>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Renovation" name="renovation">
              <Radio.Group
                onChange={(e) => handleChange("renovation", e.target.value)}
              >
                <Radio value="Cosmetic">Cosmetic</Radio>
                <Radio value="Designer">Designer</Radio>
                <Radio value="European style">European style</Radio>
                <Radio value="Needs renovation">Needs renovation</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Floor">
              <Space>
                from
                <Form.Item name="floorFrom" noStyle>
                  <InputNumber
                    min={0}
                    onChange={(value) => handleChange("floorFrom", value)}
                  />
                </Form.Item>
                to
                <Form.Item name="floorTo" noStyle>
                  <InputNumber
                    min={0}
                    onChange={(value) => handleChange("floorTo", value)}
                  />
                </Form.Item>
              </Space>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Floor Options">
              <Space direction="vertical">
                <Checkbox
                  onChange={(e) =>
                    handleChange("notFirstFloor", e.target.checked)
                  }
                >
                  Not first
                </Checkbox>
                <Checkbox
                  onChange={(e) =>
                    handleChange("notLastFloor", e.target.checked)
                  }
                >
                  Not last
                </Checkbox>
                <Checkbox
                  onChange={(e) => handleChange("lastFloor", e.target.checked)}
                >
                  Last
                </Checkbox>
              </Space>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Ceiling height" name="ceilingHeight">
              <Radio.Group
                onChange={(e) => handleChange("ceilingHeight", e.target.value)}
              >
                <Radio value="From 2.5m">From 2.5m</Radio>
                <Radio value="From 2.7m">From 2.7m</Radio>
                <Radio value="From 3m">From 3m</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Bathroom" name="bathroomType">
              <Radio.Group
                onChange={(e) => handleChange("bathroomType", e.target.value)}
              >
                <Radio value="Combined">Combined</Radio>
                <Radio value="Separate">Separate</Radio>
                <Radio value="Several">Several</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Furniture" name="furniture">
              <Radio.Group
                onChange={(e) => handleChange("furniture", e.target.value)}
              >
                <Radio value="Without furniture">Without furniture</Radio>
                <Radio value="With furniture">With furniture</Radio>
                <Radio value="Kitchen furniture">Kitchen furniture</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Rooms">
              <Space>
                <Form.Item name="rooms" noStyle>
                  <InputNumber
                    min={0}
                    onChange={(value) => handleChange("rooms", value)}
                  />
                </Form.Item>
                <Form.Item name="bathroomCount" noStyle>
                  <InputNumber
                    min={0}
                    onChange={(value) => handleChange("bathroomCount", value)}
                  />
                </Form.Item>
                <Form.Item name="livingRoomCount" noStyle>
                  <InputNumber
                    min={0}
                    onChange={(value) => handleChange("livingRoomCount", value)}
                  />
                </Form.Item>
                <Form.Item name="bedroomCount" noStyle>
                  <InputNumber
                    min={0}
                    onChange={(value) => handleChange("bedroomCount", value)}
                  />
                </Form.Item>
                <Form.Item name="balconyCount" noStyle>
                  <InputNumber
                    min={0}
                    onChange={(value) => handleChange("balconyCount", value)}
                  />
                </Form.Item>
              </Space>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Additional Features">
              <Space direction="vertical">
                <Checkbox
                  onChange={(e) =>
                    handleChange("parkingSlot", e.target.checked)
                  }
                >
                  Parking slot
                </Checkbox>
                <Checkbox
                  onChange={(e) =>
                    handleChange("swimmingPool", e.target.checked)
                  }
                >
                  Swimming pool
                </Checkbox>
              </Space>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            {/* <Form.Item label="Photos">
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Browse Files</Button>
              </Upload>
            </Form.Item> */}
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FilterModal;
