import React from "react";
import styles from "./FilterComponents.module.css";
import {
  isSelected,
  getButtonStyle,
  handleSelect,
  handleToggle,
} from "../utils/filterUtils";
import { ToggleTrue, ToggleFalse } from "../assets/icons";

interface FilterSelectProps {
  label: string;
  category: string;
  options: { value: string; label: string }[];
  setFilter: (category: string, value: string) => void;
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<{ [key: string]: any }>
  >;
  selectedFilters?: { [key: string]: any };
}

const FilterSelect: React.FC<FilterSelectProps> = React.memo(
  ({
    label,
    category,
    options,
    setFilter,
    setSelectedFilters,
    selectedFilters = {},
  }) => {
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        handleSelect(
          setFilter,
          selectedFilters,
          setSelectedFilters,
          category,
          e.target.value,
          true
        );
      },
      [category, setFilter, setSelectedFilters, selectedFilters]
    );

    return (
      <div className={styles.filterContainer}>
        <label className={styles.label}>{label}</label>
        <select
          value={selectedFilters[category] ?? ""}
          onChange={handleChange}
          className={styles.select}
        >
          {options.map(
            (option) =>
              selectedFilters[category] === option.value && (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )
          )}
        </select>
      </div>
    );
  }
);

interface FilterButtonGroupProps {
  label: string;
  options: string[];
  category: string;
  setFilter: (category: string, value: string) => void;
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<{ [key: string]: any }>
  >;
  selectedFilters?: { [key: string]: any };
}

const FilterButtonGroup: React.FC<FilterButtonGroupProps> = React.memo(
  ({
    label,
    options,
    category,
    setFilter,
    setSelectedFilters,
    selectedFilters = {},
  }) => {
    const handleSelectButton = React.useCallback(
      (option: string) => {
        handleSelect(
          setFilter,
          selectedFilters,
          setSelectedFilters,
          category,
          option
        );
      },
      [category, setFilter, setSelectedFilters, selectedFilters]
    );

    return (
      <div className={styles.filterContainer}>
        <label className={styles.label}>{label}</label>
        <div className={styles.buttonGroup}>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelectButton(option)}
              className={`${getButtonStyle(selectedFilters, category, option)} ${styles.button}`}
            >
              {isSelected(selectedFilters, category, option) ? (
                <span className={styles.selectedText}>{option}</span>
              ) : (
                option
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }
);

interface FilterNumberRangeProps {
  label: string;
  category: string;
  fromKey: string;
  toKey: string;
  setFilter: (category: string, key: string, value: number | string) => void;
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<{ [key: string]: any }>
  >;
  selectedFilters: { [key: string]: any };
  additionalOptions?: string[];
  unit?: string;
}

const FilterNumberRange: React.FC<FilterNumberRangeProps> = React.memo(
  ({
    label,
    category,
    fromKey,
    toKey,
    setFilter,
    setSelectedFilters,
    selectedFilters,
    additionalOptions = [],
    unit = "",
  }) => {
    const getInputProps = (key: string) => ({
      type: "number",
      value: (selectedFilters[category]?.[key] ?? "").toString(),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);
        setSelectedFilters((prev) => ({
          ...prev,
          [category]: { ...prev[category], [key]: value },
        }));
      },
      className: styles.numberInput,
    });

    const handleOptionClick = React.useCallback(
      (option: string) => {
        const newOptions = selectedFilters[category]?.options?.includes(option)
          ? selectedFilters[category].options.filter(
              (opt: string) => opt !== option
            )
          : [...(selectedFilters[category]?.options || []), option];
        setSelectedFilters((prev) => ({
          ...prev,
          [category]: { ...prev[category], options: newOptions },
        }));
      },
      [category, setSelectedFilters, selectedFilters]
    );

    return (
      <div className={styles.filterContainer}>
        <label className={styles.label}>{label}</label>
        <div className={styles.numberRange}>
          <div className={styles.inputWrapper}>
            <input {...getInputProps(fromKey)} placeholder="from" />
            {unit && <span className={styles.unit}>{unit}</span>}
          </div>
          <div className={styles.inputWrapper}>
            <input {...getInputProps(toKey)} placeholder="to" />
            {unit && <span className={styles.unit}>{unit}</span>}
          </div>
          {additionalOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`${getButtonStyle(selectedFilters, category, option, "options")} ${styles.button}`}
            >
              {isSelected(selectedFilters, category, option, "options") ? (
                <span className={styles.selectedText}>{option}</span>
              ) : (
                option
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }
);

interface FilterToggleProps {
  label: string;
  keyName: string;
  toggleFilter: (key: string) => void;
  selectedFilters: { [key: string]: any };
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<{ [key: string]: any }>
  >;
}

const FilterToggle: React.FC<FilterToggleProps> = React.memo(
  ({ label, keyName, toggleFilter, selectedFilters, setSelectedFilters }) => {
    const isToggled = selectedFilters[keyName] || false;
    const handleToggleClick = React.useCallback(() => {
      toggleFilter(keyName);
      setSelectedFilters((prev) => ({ ...prev, [keyName]: !prev[keyName] }));
    }, [keyName, toggleFilter, setSelectedFilters]);

    return (
      <div className={styles.filterContainer}>
        <label className={styles.label}>{label}</label>
        <button onClick={handleToggleClick} className={styles.toggleButton}>
          {isToggled ? <ToggleTrue /> : <ToggleFalse />}
        </button>
      </div>
    );
  }
);

export { FilterSelect, FilterButtonGroup, FilterNumberRange, FilterToggle };
