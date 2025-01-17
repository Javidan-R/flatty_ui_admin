type FilterValue =
  | string
  | string[]
  | number
  | boolean
  | Record<string, number>;

interface FilterState {
  [key: string]: FilterValue;
}

interface HandleSelectParams {
  setFilter: (category: string, value: string | string[]) => void;
  selectedFilters: FilterState;
  setSelectedFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  category: string;
  option: string;
  isSingleSelect: boolean;
}

const handleSelect = ({
  setFilter,
  selectedFilters,
  setSelectedFilters,
  category,
  option,
  isSingleSelect,
}: HandleSelectParams) => {
  if (isSingleSelect) {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: option,
    }));
    setFilter(category, option);
    return;
  }

  // For multi-select
  const currentValues = Array.isArray(selectedFilters[category])
    ? (selectedFilters[category] as string[])
    : [];

  const newValues = currentValues.includes(option)
    ? currentValues.filter((item) => item !== option)
    : [...currentValues, option];

  setSelectedFilters((prev) => ({
    ...prev,
    [category]: newValues,
  }));
  setFilter(category, newValues);
};

interface HandleNumericChangeParams {
  setFilter: (key: string, value: number) => void;
  selectedFilters: FilterState;
  setSelectedFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  category: string;
  key: string;
  change: number;
  minValue?: number;
}

const handleNumericChange = ({
  setFilter,
  selectedFilters,
  setSelectedFilters,
  category,
  key,
  change,
  minValue = 0,
}: HandleNumericChangeParams) => {
  const currentValue =
    (selectedFilters[category] as Record<string, number>)?.[key] || 0;
  const newValue = Math.max(minValue, currentValue + change);

  setSelectedFilters((prev) => ({
    ...prev,
    [category]: {
      ...((prev[category] as Record<string, number>) || {}),
      [key]: newValue,
    },
  }));
  setFilter(`${category}.${key}`, newValue);
};

interface HandleToggleParams {
  toggleFilter: (key: string) => void;
  selectedFilters: FilterState;
  setSelectedFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  key: string;
}

const handleToggle = ({
  toggleFilter,
  selectedFilters,
  setSelectedFilters,
  key,
}: HandleToggleParams) => {
  toggleFilter(key);
  setSelectedFilters((prev) => ({
    ...prev,
    [key]: !prev[key],
  }));
};

interface IsSelectedParams {
  selectedFilters: FilterState;
  category: string;
  value: any;
  subKey?: string | null;
}

const isSelected = ({
  selectedFilters,
  category,
  value,
  subKey = null,
}: IsSelectedParams): boolean => {
  const currentValue = subKey
    ? (selectedFilters[category] as Record<string, any>)?.[subKey]
    : selectedFilters[category];

  if (Array.isArray(currentValue)) {
    return currentValue.includes(value);
  }
  return currentValue === value;
};

interface GetButtonStyleParams {
  selectedFilters: FilterState;
  category: string;
  value: any;
  subKey?: string | null;
}

const getButtonStyle = ({
  selectedFilters,
  category,
  value,
  subKey = null,
}: GetButtonStyleParams): string => {
  const currentCategory = subKey
    ? (selectedFilters[category] as Record<string, any>)?.[subKey] || []
    : selectedFilters[category] || [];
  const isValueSelected = Array.isArray(currentCategory)
    ? currentCategory.includes(value)
    : currentCategory === value;
  return `px-4 py-2 text-xs font-semibold border text-[#525C76] h-[40px] rounded-sm transition-all duration-300 ease-in-out transform ${
    isValueSelected
      ? "border-[#8247E5] outline outline-2 outline-[#DCD4FF] scale-105"
      : "border-[#E2E4E8] hover:border-[#8247E5] hover:bg-[#F5F6F7]"
  }`;
};

const isApplyDisabled = (filters: FilterState): boolean => {
  return Object.values(filters).every(
    (value) =>
      (Array.isArray(value) && value.length === 0) ||
      value === "" ||
      value === 0 ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "boolean" && !value)
  );
};

export {
  handleSelect,
  handleNumericChange,
  handleToggle,
  isSelected,
  getButtonStyle,
  isApplyDisabled,
};
