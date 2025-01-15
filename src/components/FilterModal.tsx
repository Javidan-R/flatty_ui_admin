import React, { useState } from "react";
import {
  Modal,
  Button,
  Space,
  Row,
  Col,
  Upload,
  UploadProps,
  // UploadChangeParam,
  Select,
  InputNumber,
  Switch,
} from "antd";
import {
  UploadOutlined,
  InboxOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

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
    onSave(filters);
  };

  const handleChange = (field: keyof typeof filters, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: typeof value === "boolean" ? !prevFilters[field] : value,
      photos:
        field === "photos"
          ? [...prevFilters.photos, value as File]
          : prevFilters.photos,
    }));
  };

  // const handleUpload = (file: File | Blob | undefined) => {
  //   if (file instanceof File) {
  //     setFilters((prevFilters) => ({
  //       ...prevFilters,
  //       photos: [...prevFilters.photos, file],
  //     }));
  //   }
  // };

  const uploadProps: UploadProps = {
    customRequest: (options: any) => {
      const { onSuccess } = options;
      setTimeout(() => {
        if (onSuccess) onSuccess("ok");
      }, 0);
    },
    // onChange(info: UploadChangeParam) {
    //   if (info.file.status !== "uploading") {
    //     handleUpload(info.file.originFileObj);
    //   }
    // },
  };

  const buttonStyle = { margin: "5px" };

  return (
    <Modal
      title="Filter"
      visible={visible}
      onOk={handleSave}
      onCancel={onCancel}
      destroyOnClose
      width={800}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Row gutter={16}>
        <Col span={24}>
          <h3>Category</h3>
          <Select
            value={filters.category}
            onChange={(value) => handleChange("category", value)}
            placeholder="Choose Category"
            style={{ width: "100%" }}
          >
            <Select.Option value="">Choose Category</Select.Option>
            <Select.Option value="apartment">Apartment</Select.Option>
            <Select.Option value="house">House</Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <h3>Company</h3>
          <Select
            value={filters.company}
            onChange={(value) => handleChange("company", value)}
            placeholder="Choose Company"
            style={{ width: "100%" }}
          >
            <Select.Option value="">Choose Company</Select.Option>
            <Select.Option value="Tech Corp">Tech Corp</Select.Option>
            <Select.Option value="IT Solutions">IT Solutions</Select.Option>
          </Select>
        </Col>
        <Col span={12}>
          <h3>Residential Complex</h3>
          <Select
            value={filters.residentialComplex}
            onChange={(value) => handleChange("residentialComplex", value)}
            placeholder="Choose Residential Complex"
            style={{ width: "100%" }}
          >
            <Select.Option value="">Choose Residential Complex</Select.Option>
            <Select.Option value="Complex A">Complex A</Select.Option>
            <Select.Option value="Complex B">Complex B</Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <h3>Area</h3>
          <Space>
            from{" "}
            <InputNumber
              value={filters.areaFrom}
              onChange={(value) => handleChange("areaFrom", value)}
              min={0}
              addonAfter="m²"
            />
            to{" "}
            <InputNumber
              value={filters.areaTo}
              onChange={(value) => handleChange("areaTo", value)}
              min={0}
              addonAfter="m²"
            />
          </Space>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <h3>Renovation</h3>
          <Space wrap>
            {["Cosmetic", "Designer", "European style", "Needs renovation"].map(
              (option) => (
                <Button
                  key={option}
                  style={buttonStyle}
                  onClick={() => handleChange("renovation", option)}
                  type={filters.renovation === option ? "primary" : "default"}
                >
                  {option}
                </Button>
              )
            )}
          </Space>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <h3>Floor</h3>
          <Space>
            from{" "}
            <InputNumber
              value={filters.floorFrom}
              onChange={(value) => handleChange("floorFrom", value)}
              min={0}
            />
            to{" "}
            <InputNumber
              value={filters.floorTo}
              onChange={(value) => handleChange("floorTo", value)}
              min={0}
            />
          </Space>
        </Col>
        <Col span={12}>
          <h3>&nbsp;</h3> {/* Empty header for alignment */}
          <Space wrap>
            {["Not first", "Not last", "Last"].map((option) => {
              const key = option
                .replace(" ", "")
                .toLowerCase() as keyof typeof filters;
              return (
                <Button
                  key={option}
                  style={buttonStyle}
                  onClick={() => handleChange(key, !filters[key])}
                  type={filters[key] ? "primary" : "default"}
                >
                  {option}
                </Button>
              );
            })}
          </Space>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <h3>Ceiling Height</h3>
          <Space wrap>
            {["From 2.5m", "From 2.7m", "From 3m"].map((option) => (
              <Button
                key={option}
                style={buttonStyle}
                onClick={() => handleChange("ceilingHeight", option)}
                type={filters.ceilingHeight === option ? "primary" : "default"}
              >
                {option}
              </Button>
            ))}
          </Space>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <h3>Bathroom</h3>
          <Space wrap>
            {["Combined", "Separate", "Several"].map((option) => (
              <Button
                key={option}
                style={buttonStyle}
                onClick={() => handleChange("bathroomType", option)}
                type={filters.bathroomType === option ? "primary" : "default"}
              >
                {option}
              </Button>
            ))}
          </Space>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <h3>Furniture</h3>
          <Space wrap>
            {["Without furniture", "With furniture", "Kitchen furniture"].map(
              (option) => (
                <Button
                  key={option}
                  style={buttonStyle}
                  onClick={() => handleChange("furniture", option)}
                  type={filters.furniture === option ? "primary" : "default"}
                >
                  {option}
                </Button>
              )
            )}
          </Space>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <h3>Rooms</h3>
          <Space>
            <span>Rooms</span>
            <Button
              icon={<MinusCircleOutlined />}
              onClick={() =>
                handleChange("rooms", Math.max(0, filters.rooms - 1))
              }
            />
            <span>{filters.rooms}</span>
            <Button
              icon={<PlusCircleOutlined />}
              onClick={() => handleChange("rooms", filters.rooms + 1)}
            />
            <span>Bathroom</span>
            <Button
              icon={<MinusCircleOutlined />}
              onClick={() =>
                handleChange(
                  "bathroomCount",
                  Math.max(0, filters.bathroomCount - 1)
                )
              }
            />
            <span>{filters.bathroomCount}</span>
            <Button
              icon={<PlusCircleOutlined />}
              onClick={() =>
                handleChange("bathroomCount", filters.bathroomCount + 1)
              }
            />
            <span>Living room</span>
            <Button
              icon={<MinusCircleOutlined />}
              onClick={() =>
                handleChange(
                  "livingRoomCount",
                  Math.max(0, filters.livingRoomCount - 1)
                )
              }
            />
            <span>{filters.livingRoomCount}</span>
            <Button
              icon={<PlusCircleOutlined />}
              onClick={() =>
                handleChange("livingRoomCount", filters.livingRoomCount + 1)
              }
            />
            <span>Bedroom</span>
            <Button
              icon={<MinusCircleOutlined />}
              onClick={() =>
                handleChange(
                  "bedroomCount",
                  Math.max(0, filters.bedroomCount - 1)
                )
              }
            />
            <span>{filters.bedroomCount}</span>
            <Button
              icon={<PlusCircleOutlined />}
              onClick={() =>
                handleChange("bedroomCount", filters.bedroomCount + 1)
              }
            />
            <span>Balcony</span>
            <Button
              icon={<MinusCircleOutlined />}
              onClick={() =>
                handleChange(
                  "balconyCount",
                  Math.max(0, filters.balconyCount - 1)
                )
              }
            />
            <span>{filters.balconyCount}</span>
            <Button
              icon={<PlusCircleOutlined />}
              onClick={() =>
                handleChange("balconyCount", filters.balconyCount + 1)
              }
            />
          </Space>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <h3>Additional Features</h3>
          <Space direction="vertical">
            <Space>
              <span>Parking slot</span>
              <Switch
                checked={filters.parkingSlot}
                onChange={(checked) => handleChange("parkingSlot", checked)}
              />
            </Space>
            <Space>
              <span>Swimming pool</span>
              <Switch
                checked={filters.swimmingPool}
                onChange={(checked) => handleChange("swimmingPool", checked)}
              />
            </Space>
          </Space>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <h3>Photos</h3>
          <Upload.Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Drag photos here to start uploading
            </p>
            <Button icon={<UploadOutlined />}>Browse Files</Button>
          </Upload.Dragger>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {filters.photos.map((photo, index) => (
              <div key={index} style={{ position: "relative", margin: "5px" }}>
                <img
                  src={URL.createObjectURL(photo)}
                  alt="upload"
                  style={{ width: "60px", height: "60px" }}
                />
                <Button
                  type="text"
                  onClick={() =>
                    handleChange(
                      "photos",
                      filters.photos.filter((_, i) => i !== index)
                    )
                  }
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    padding: "0",
                    color: "red",
                  }}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default FilterModal;
