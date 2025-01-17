import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import {
  Button,
  Input,
  Select,
  InputNumber,
  Upload,
  message,
  Space,
  Row,
  Col,
} from "antd";
import styles from "../styles/UpdateInfo.module.css";
import { Complex, PostResponse } from "@/types/posts/PostResponse";
import { Add, Subtract, ToggleFalse, ToggleTrue } from "../assets/icons";
import { Close } from "@/assets/icons/Close";

const { Option } = Select;

const categories = ["Penthouse", "Villa", "Cottages"];
const conditions = [
  "Without finishing",
  "Pre-finish",
  "Move-in ready",
  "With furniture",
];
const renovations = [
  "Cosmetic",
  "Designer",
  "European style",
  "Needs renovation",
];

const getAddressFromLatLng = async (
  lat: number,
  lng: number
): Promise<string | null> => {
  const apiKey = "AIzaSyCmyl8QRHQp6LHWfTDJrCX84NM1TJAC1fM"; // Replace with your Google Maps API key
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.results[0].formatted_address;
    } else {
      throw new Error("Unable to fetch address");
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
};

interface UpdateInfoProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedData: Partial<PostResponse>) => void;
  initialData: PostResponse | null;
}

const UpdateInfo: React.FC<UpdateInfoProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<Partial<Complex>>({
    ...initialData?.complex,
    price: initialData?.complex?.price || 0,
    currency: initialData?.complex?.currency || "",
    condition: initialData?.complex?.condition || "",
    renovation: initialData?.complex?.renovation || "",
  });
  const [images, setImages] = useState<File[]>(initialData ? [] : []);
  const [documents, setDocuments] = useState<File[]>([]);
  const mapRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData.complex);
    }
  }, [initialData]);
  type ComplexKeys = keyof Complex;

  const handleChange = (value: any, name: ComplexKeys) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (field: ComplexKeys) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleCounterChange = (
    action: "increment" | "decrement",
    field: ComplexKeys
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]:
        action === "increment"
          ? (prev[field] as number) + 1
          : Math.max(0, (prev[field] as number) - 1),
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const counterFields: ComplexKeys[] = [
    "floor",
    "livingRoom",
    "bedroom",
    "bathroom",
    "balcony",
  ];
  const toggleFields: ComplexKeys[] = [
    "parkingSlot",
    "installment",
    "swimmingPool",
    "elevator",
  ];

  const handleImageUpload = (info: any) => {
    if (info.file.status !== "uploading") {
      setImages((prevImages) => [...prevImages, info.file.originFileObj]);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleDocumentUpload = (info: any) => {
    if (info.file.status !== "uploading") {
      setDocuments((prevDocuments) => [
        ...prevDocuments,
        info.file.originFileObj,
      ]);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} document uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} document upload failed.`);
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCmyl8QRHQp6LHWfTDJrCX84NM1TJAC1fM",
    libraries: ["places"],
  });

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const address = await getAddressFromLatLng(lat, lng);
      setFormData((prev) => ({
        ...prev,
        latitude: lat,
        longitude: lng,
        address: address || "",
      }));
    }
  };

  const clearLocation = () => {
    setFormData((prev) => ({
      ...prev,
      address: "",
      latitude: 0,
      longitude: 0,
    }));
  };

  const handleSubmit = async () => {
    const updatedData = { ...formData, files: images, documents: documents };
    onSubmit(updatedData as Partial<PostResponse>);
    onClose();
  };
  if (!isOpen) return null;

  // SVG icon setup...
  const svgString = encodeURIComponent(`
    <svg width="36" height="46" viewBox="0 0 48 61" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.04448 7.06866C11.5083 2.58932 17.5604 0.069705 23.8731 0.0625C30.1858 0.069705 36.238 2.58932 40.7018 7.06866C45.1656 11.548 47.6766 17.6213 47.6838 23.9562C47.6837 34.1838 42.269 43.1668 36.7319 49.6787C31.1983 56.1864 25.5495 60.218 25.0856 60.5466C24.7263 60.7864 24.3045 60.9143 23.8731 60.9143C23.4417 60.9143 23.0199 60.7864 22.6607 60.5466C22.1968 60.218 16.5479 56.1864 11.0143 49.6787C5.47726 43.1668 0.0625121 34.1838 0.0625 23.9562C0.0696711 17.6213 2.58064 11.548 7.04448 7.06866Z" fill="#6433C4" stroke="#220D6D" stroke-width="0.125"/>
    </svg>
  `);
  const svgIconUrl = `data:image/svg+xml,${svgString}`;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Update Info</h2>
          <Button type="text" onClick={onClose} className={styles.closeButton}>
            <Close />
          </Button>
        </div>
        <div className={styles.formContainer}>
          <Row gutter={16}>
            <Col span={12}>
              <Select
                placeholder="Category"
                value={formData.category}
                className={` ${styles.dropdownSelect}`}
                dropdownClassName={styles.dropdown}
              >
                <Option value="Appartment">Appartment</Option>
                {categories.map((category, index) => (
                  <Option key={index} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={12}>
              <Select
                placeholder="Name of residential complex"
                value={formData.residentialComplex}
                onChange={(value) => handleChange(value, "residentialComplex")}
                className={`${styles.select} ${styles.dropdownSelect}`}
                dropdownClassName={styles.dropdown}
              >
                <Option value="Complex A">Complex A</Option>
                <Option value="Complex B">Complex B</Option>
              </Select>
            </Col>
          </Row>
          <hr className="border-2 text-[#000]" />
          <div className={styles.inputRow}>
            <div>
              <span>Total area</span>
              <InputNumber
                addonAfter="m²"
                placeholder="Building area"
                value={formData.buildingArea}
                onChange={(value) => handleChange(value || 0, "buildingArea")}
                className={styles.inputNumber}
              />
            </div>
            <div>
              <span>Living area</span>
              <InputNumber
                addonAfter="m²"
                placeholder="Living area"
                value={formData.livingArea}
                onChange={(value) => handleChange(value || 0, "livingArea")}
                className={styles.inputNumber}
              />
            </div>
          </div>
          <hr className="border-2 text-[#000]" />
          <div className={styles.counterRow}>
            {counterFields.map((field: ComplexKeys) => (
              <div key={field} className={styles.counterButton}>
                <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                <Button
                  onClick={() => handleCounterChange("decrement", field)}
                  icon={<Subtract />}
                  className={styles.counterBtn}
                />
                <Input
                  value={
                    formData[field] !== undefined
                      ? formData[field].toString()
                      : ""
                  }
                  readOnly
                  className={styles.counterInput}
                />
                <Button
                  onClick={() => handleCounterChange("increment", field)}
                  icon={<Add />}
                  className={styles.counterBtn}
                />
              </div>
            ))}
          </div>

          <div className={styles.toggleRow}>
            {toggleFields.map((field: ComplexKeys) => (
              <div
                key={field}
                className={`${styles.toggleButton} `}
                onClick={() => handleToggle(field)}
              >
                <span>
                  {field === "parkingSlot"
                    ? "Parking slot"
                    : field === "installment"
                      ? "Installment"
                      : field === "swimmingPool"
                        ? "Swimming pool"
                        : "Elevator"}
                </span>
                {formData[field] ? <ToggleTrue /> : <ToggleFalse />}
              </div>
            ))}
          </div>
          <div className={styles.conditionRow}>
            {conditions.map((condition, index) => (
              <Button
                key={index}
                onClick={() => handleChange(condition, "condition")}
                className={`${styles.conditionButton} ${formData.condition === condition ? styles.active : ""}`}
              >
                {condition}
              </Button>
            ))}
          </div>

          <div className={styles.conditionRow}>
            {renovations.map((renovation, index) => (
              <Button
                key={index}
                onClick={() => handleChange(renovation, "renovation")}
                className={`${styles.conditionButton} ${formData.renovation === renovation ? styles.active : ""}`}
              >
                {renovation}
              </Button>
            ))}
          </div>

          <div className={styles.inputRow}>
            <Input
              placeholder="Year"
              value={formData.year}
              onChange={(e) => handleChange(e.target.value, "year")}
              className={styles.yearInput}
            />
            <Input
              placeholder="Price"
              value={formData.price}
              onChange={(e) => handleChange(e.target.value, "price")}
              type="number"
              className={styles.priceInput}
            />
            <Select
              placeholder="Currency"
              value={formData.currency}
              onChange={(value) => handleChange(value, "currency")}
              className={`${styles.select} ${styles.dropdownSelect}`}
              dropdownClassName={styles.dropdown}
            >
              <Option value="£">£</Option>
              <Option value="$">$</Option>
              <Option value="€">€</Option>
            </Select>
          </div>

          <Input.TextArea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => handleChange(e.target.value, "description")}
            className={styles.description}
          />

          <Upload.Dragger
            beforeUpload={() => false}
            onChange={handleImageUpload}
            multiple={true}
            className={styles.uploadArea}
          >
            <p className="ant-upload-text">
              Drag photos here to start uploading
            </p>
            <Button className={styles.uploadButton}>Browse Files</Button>
          </Upload.Dragger>

          <div className={styles.imagePreview}>
            {images.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className={styles.imagePreviewImg}
              />
            ))}
          </div>

          {isLoaded && (
            <div className={styles.mapContainer}>
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={{ lat: 35.198284, lng: 33.355869 }}
                zoom={12}
                onClick={handleMapClick}
                ref={mapRef}
              >
                {formData.latitude && formData.longitude && (
                  <Marker
                    position={{
                      lat: formData.latitude,
                      lng: formData.longitude,
                    }}
                    icon={svgIconUrl}
                  />
                )}
              </GoogleMap>
              <div className={styles.addressDisplay}>
                {formData.address || "Select a location on the map"}
                {formData.address && (
                  <Button
                    onClick={clearLocation}
                    className={styles.clearAddressButton}
                  >
                    ×
                  </Button>
                )}
              </div>
            </div>
          )}

          <div className={styles.pagination}>
            <Button onClick={onClose} className={styles.paginationButton}>
              Previous
            </Button>
            <Button
              onClick={handleSubmit}
              type="primary"
              className={styles.submitButton}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateInfo;
