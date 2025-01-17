import React, { useState } from "react";
import {
  Modal,
  Button,
  Space,
  Row,
  Col,
  Upload,
  UploadProps,
  Select,
  InputNumber,
} from "antd";
import {
  UploadOutlined,
  InboxOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import styles from "../styles/FilterModal.module.css";
import { ToggleTrue, ToggleFalse } from "../assets/icons";

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
    setFilters((prev) => ({
      ...prev,
      [field]: typeof value === "boolean" ? !prev[field] : value,
      photos:
        field === "photos" ? [...prev.photos, value as File] : prev.photos,
    }));
  };

  const handleRemovePhoto = (index: number) => {
    setFilters((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const uploadProps: UploadProps = {
    customRequest: (options: any) => {
      const { onSuccess } = options;
      setTimeout(() => {
        if (onSuccess) onSuccess("ok");
      }, 0);
    },
  };

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
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Row gutter={16}>
              <Col span={8}>
                <h3 className={styles.label}>Category</h3>
              </Col>
              <Col span={16} style={{ textAlign: "right" }}>
                <Select
                  value={filters.category}
                  onChange={(value) => handleChange("category", value)}
                  placeholder="Choose Category"
                  className={styles.select}
                >
                  <Select.Option value="">Choose Category</Select.Option>
                  <Select.Option value="apartment">Apartment</Select.Option>
                  <Select.Option value="house">House</Select.Option>
                </Select>
              </Col>
            </Row>

            {/* Company */}
            <Row gutter={16}>
              <Col span={8}>
                <h3 className={styles.label}>Company</h3>
              </Col>
              <Col span={16} style={{ textAlign: "right" }}>
                <Select
                  value={filters.company}
                  onChange={(value) => handleChange("company", value)}
                  placeholder="Choose Company"
                  className={styles.select}
                >
                  <Select.Option value="">Choose Company</Select.Option>
                  <Select.Option value="Tech Corp">Tech Corp</Select.Option>
                  <Select.Option value="IT Solutions">
                    IT Solutions
                  </Select.Option>
                </Select>
              </Col>
            </Row>

            {/* Residential Complex */}
            <Row gutter={16}>
              <Col span={8}>
                <h3 className={styles.label}>Residential Complex</h3>
              </Col>
              <Col span={16} style={{ textAlign: "right" }}>
                <Select
                  value={filters.residentialComplex}
                  onChange={(value) =>
                    handleChange("residentialComplex", value)
                  }
                  placeholder="Choose Residential Complex"
                  className={styles.select}
                >
                  <Select.Option value="">
                    Choose Residential Complex
                  </Select.Option>
                  <Select.Option value="Complex A">Complex A</Select.Option>
                  <Select.Option value="Complex B">Complex B</Select.Option>
                </Select>
              </Col>
            </Row>

            {/* Area */}
            <Row gutter={16}>
              <Col span={8}>
                <h3 className={styles.label}>Area</h3>
              </Col>
              <Col span={16} style={{ textAlign: "right" }}>
                <Space>
                  <InputNumber
                    value={filters.areaFrom}
                    onChange={(value) => handleChange("areaFrom", value)}
                    min={0}
                    addonAfter="m²"
                    placeholder="from"
                    className={styles.numberInput}
                  />
                  <InputNumber
                    value={filters.areaTo}
                    onChange={(value) => handleChange("areaTo", value)}
                    min={0}
                    addonAfter="m²"
                    placeholder="to"
                    className={styles.numberInput}
                  />
                </Space>
              </Col>
            </Row>

            {/* Renovation */}
            <Row gutter={16}>
              <Col span={8}>
                <h3 className={styles.label}>Renovation</h3>
              </Col>
              <Col span={16} style={{ textAlign: "right" }}>
                <Space wrap>
                  {[
                    "Cosmetic",
                    "Designer",
                    "European style",
                    "Needs renovation",
                  ].map((option) => (
                    <Button
                      key={option}
                      className={`${styles.button} ${filters.renovation === option ? styles.selectedText : styles.unsselectedText}`}
                      onClick={() => handleChange("renovation", option)}
                    >
                      {option}
                    </Button>
                  ))}
                </Space>
              </Col>
            </Row>

            {/* Floor */}
            <Row gutter={16}>
              <Col span={8}>
                <h3 className={styles.label}>Floor</h3>
              </Col>
              <Col span={16} style={{ textAlign: "right" }}>
                <Space wrap>
                  <InputNumber
                    value={filters.floorFrom}
                    onChange={(value) => handleChange("floorFrom", value)}
                    min={0}
                    placeholder="from"
                    className={styles.numberInput}
                  />
                  <InputNumber
                    value={filters.floorTo}
                    onChange={(value) => handleChange("floorTo", value)}
                    min={0}
                    placeholder="to"
                    className={styles.numberInput}
                  />
                  {["Not first", "Not last", "Last"].map((option) => {
                    const key = option
                      .replace(" ", "")
                      .toLowerCase() as keyof typeof filters;
                    return (
                      <Button
                        key={option}
                        className={`${styles.button} ${filters[key] ? styles.selectedText : ""}`}
                        onClick={() => handleChange(key, !filters[key])}
                      >
                        {option}
                      </Button>
                    );
                  })}
                </Space>
              </Col>
            </Row>

            {/* Ceiling Height */}
            <Row gutter={16}>
              <Col span={8}>
                <h3 className={styles.label}>Ceiling Height</h3>
              </Col>
              <Col span={16} style={{ textAlign: "right" }}>
                <Space wrap>
                  {["From 2.5m", "From 2.7m", "From 3m"].map((option) => (
                    <Button
                      key={option}
                      className={`${styles.button} ${filters.ceilingHeight === option ? styles.selectedText : ""}`}
                      onClick={() => handleChange("ceilingHeight", option)}
                    >
                      {option}
                    </Button>
                  ))}
                </Space>
              </Col>
            </Row>

            {/* Bathroom */}
            <Row gutter={16}>
              <Col span={8}>
                <h3 className={styles.label}>Bathroom</h3>
              </Col>
              <Col span={16} style={{ textAlign: "right" }}>
                <Space wrap>
                  {["Combined", "Separate", "Several"].map((option) => (
                    <Button
                      key={option}
                      className={`${styles.button} ${filters.bathroomType === option ? styles.selectedText : ""}`}
                      onClick={() => handleChange("bathroomType", option)}
                    >
                      {option}
                    </Button>
                  ))}
                </Space>
              </Col>
            </Row>

            {/* Furniture */}
            <Row gutter={16}>
              <Col span={8}>
                <h3 className={styles.label}>Furniture</h3>
              </Col>
              <Col span={16} style={{ textAlign: "right" }}>
                <Space wrap>
                  {[
                    "Without furniture",
                    "With furniture",
                    "Kitchen furniture",
                  ].map((option) => (
                    <Button
                      key={option}
                      className={`${styles.button} ${filters.furniture === option ? styles.selectedText : ""}`}
                      onClick={() => handleChange("furniture", option)}
                    >
                      {option}
                    </Button>
                  ))}
                </Space>
              </Col>
            </Row>

            {/* Rooms */}
            <Row gutter={16}>
              <Col span={8}>
                <h3 className={styles.label}>Rooms</h3>
              </Col>
              <Col span={16} style={{ textAlign: "right" }}>
                <Space wrap>
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
                  </Space>
                  <Space>
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
                  </Space>
                  <Space>
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
                        handleChange(
                          "livingRoomCount",
                          filters.livingRoomCount + 1
                        )
                      }
                    />
                  </Space>
                  <Space>
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
                  </Space>
                  <Space>
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
                </Space>
              </Col>
            </Row>

            {/* Additional Features */}
            <Row gutter={16}>
              <Col span={8}>
                <h3 className={styles.label}>Additional Features</h3>
              </Col>
              <Col span={16} style={{ textAlign: "right" }}>
                <Space wrap>
                  <Space>
                    <span>Parking slot</span>
                    <Button
                      className={styles.toggleButton}
                      onClick={() =>
                        handleChange("parkingSlot", !filters.parkingSlot)
                      }
                    >
                      {filters.parkingSlot ? <ToggleTrue /> : <ToggleFalse />}
                    </Button>
                  </Space>
                  <Space>
                    <span>Swimming pool</span>
                    <Button
                      className={styles.toggleButton}
                      onClick={() =>
                        handleChange("swimmingPool", !filters.swimmingPool)
                      }
                    >
                      {filters.swimmingPool ? <ToggleTrue /> : <ToggleFalse />}
                    </Button>
                  </Space>
                </Space>
              </Col>
            </Row>

            {/* Photos */}
            <Row gutter={16}>
              <Col span={8}>
                <h3 className={styles.label}>Photos</h3>
              </Col>
              <Col span={16}>
                <Upload.Dragger {...uploadProps} className={styles.uploadArea}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Drag photos here to start uploading
                  </p>
                  <Button icon={<UploadOutlined />}>Browse Files</Button>
                </Upload.Dragger>
                <div className={styles.uploadedFiles}>
                  {filters.photos.map((photo, index) => (
                    <div key={index} className={styles.filePreview}>
                      <img src={URL.createObjectURL(photo)} alt="upload" />
                      <Button
                        type="text"
                        onClick={() => handleRemovePhoto(index)}
                        className={styles.removeButton}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default FilterModal;
