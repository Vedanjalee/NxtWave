// 'use client';

// import React, { useState } from 'react';
// import styles from './filterSidebar.module.css';

// export type Filters = {
//   categories: string[];
//   priceRange: [number, number];
//   color: string | null;
// };

// type FilterSidebarProps = {
//   filters: Filters;
//   onFilterChange: (filters: Filters) => void;
//   allCategories: string[];
// };

// const FilterSidebar = ({ filters, onFilterChange, allCategories }: FilterSidebarProps) => {
//   const [isCategoryOpen, setIsCategoryOpen] = useState(true);
//   const [isPriceOpen, setIsPriceOpen] = useState(true);
//   const [isColorOpen, setIsColorOpen] = useState(true);

//   const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
//   const togglePrice = () => setIsPriceOpen(!isPriceOpen);
//   const toggleColor = () => setIsColorOpen(!isColorOpen);

//   const handleCategoryChange = (category: string) => {
//     const updatedCategories = filters.categories.includes(category)
//       ? filters.categories.filter((c) => c !== category)
//       : [...filters.categories, category];
//     onFilterChange({ ...filters, categories: updatedCategories });
//   };

//   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     const updatedPriceRange = [...filters.priceRange] as [number, number];
//     updatedPriceRange[index] = Number(e.target.value);
//     onFilterChange({ ...filters, priceRange: updatedPriceRange });
//   };

//   const handleColorChange = (color: string) => {
//     onFilterChange({ ...filters, color: filters.color === color ? null : color });
//   };

//   return (
//     <div className={styles.sidebar}>
//       {/* Categories */}
//       <div className={styles.filterSection}>
//         <div className={styles.filterHeader} onClick={toggleCategory}>
//           Categories {isCategoryOpen ? '▲' : '▼'}
//         </div>
//         {isCategoryOpen && (
//           <div className={styles.filterOptions}>
//             {allCategories.map((category) => (
//               <label key={category} className={styles.filterOption}>
//                 <input
//                   type="checkbox"
//                   checked={filters.categories.includes(category)}
//                   onChange={() => handleCategoryChange(category)}
//                 />
//                 {category}
//               </label>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Price Range */}
//       <div className={styles.filterSection}>
//         <div className={styles.filterHeader} onClick={togglePrice}>
//           Price Range
//         </div>
//         {isPriceOpen && (
//           <div className={styles.filterOptions}>
//             <label className={styles.filterOption}>
//               Min: 
//               <input
//                 type="number"
//                 value={filters.priceRange[0]}
//                 onChange={(e) => handlePriceChange(e, 0)}
//               />
//             </label>
//             <label className={styles.filterOption}>
//               Max: 
//               <input
//                 type="number"
//                 value={filters.priceRange[1]}
//                 onChange={(e) => handlePriceChange(e, 1)}
//               />
//             </label>
//           </div>
//         )}
//       </div>

//       {/* Colors */}
//       <div className={styles.filterSection}>
//         <div className={styles.filterHeader} onClick={toggleColor}>
//           Colors {isColorOpen ? '▲' : '▼'}
//         </div>
//         {isColorOpen && (
//           <div className={styles.filterOptions}>
//             {['Red', 'Blue', 'Green', 'Black', 'White'].map((color) => (
//               <label key={color} className={styles.filterOption}>
//                 <input
//                   type="checkbox"
//                   name="color"
//                   checked={filters.color === color}
//                   onChange={() => handleColorChange(color)}
//                 />
//                 {color}
//               </label>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;

'use client';

import React, { useState } from 'react';
import styles from './filterSidebar.module.css';

const FILTERS = {
  idealFor: ['Men', 'Women', 'Baby & Kids'],
  occasion: ['Casual', 'Party', 'Wedding'],
  work: ['Office', 'Remote', 'Outdoor'],
  fabric: ['Cotton', 'Silk', 'Linen'],
  segment: ['Premium', 'Budget'],
  suitableFor: ['Summer', 'Winter'],
};

export type Filters = {
    categories: string[];
    priceRange: [number, number];
    color: string | null;
  };
  
  type FilterSidebarProps = {
    filters: Filters;
    onFilterChange: (filters: Filters) => void;
    allCategories: string[];
  };

type FilterSectionProps = {
  title: string;
  options: string[];
  selected: string[];
  onChange: (option: string) => void;
};

const FilterSection = ({ title, options, selected, onChange }: FilterSectionProps) => {
  const [open, setOpen] = useState(true);
  return (
    <div className={styles.filterSection}>
      <div className={styles.filterHeader} onClick={() => setOpen(!open)}>
        {title.toUpperCase()} <span>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div className={styles.filterOptions}>
          <p className={styles.subLabel}>All</p>
          <p className={styles.unselect} onClick={() => selected.forEach(opt => onChange(opt))}>
            Unselect all
          </p>
          {options.map((option) => (
            <label key={option} className={styles.filterOption}>
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterSidebar = () => {
  const [customizable, setCustomizable] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    idealFor: [],
    occasion: [],
    work: [],
    fabric: [],
    segment: [],
    suitableFor: [],
  });

  const handleCheckboxChange = (section: string, option: string) => {
    const updated = selectedFilters[section].includes(option)
      ? selectedFilters[section].filter((o) => o !== option)
      : [...selectedFilters[section], option];

    setSelectedFilters((prev) => ({
      ...prev,
      [section]: updated,
    }));
  };

  return (
    <div className={styles.sidebar}>
      {/* Customizable */}
      <div className={styles.filterSection}>
        <label className={styles.filterOption}>
          <input
            type="checkbox"
            checked={customizable}
            onChange={() => setCustomizable(!customizable)}
          />
          CUSTOMIZABLE
        </label>
      </div>

      {/* Ideal For */}
      <FilterSection
        title="Ideal For"
        options={FILTERS.idealFor}
        selected={selectedFilters.idealFor}
        onChange={(opt) => handleCheckboxChange('idealFor', opt)}
      />

      {/* Occasion */}
      <FilterSection
        title="Occasion"
        options={FILTERS.occasion}
        selected={selectedFilters.occasion}
        onChange={(opt) => handleCheckboxChange('occasion', opt)}
      />

      {/* Work */}
      <FilterSection
        title="Work"
        options={FILTERS.work}
        selected={selectedFilters.work}
        onChange={(opt) => handleCheckboxChange('work', opt)}
      />

      {/* Fabric */}
      <FilterSection
        title="Fabric"
        options={FILTERS.fabric}
        selected={selectedFilters.fabric}
        onChange={(opt) => handleCheckboxChange('fabric', opt)}
      />

      {/* Segment */}
      <FilterSection
        title="Segment"
        options={FILTERS.segment}
        selected={selectedFilters.segment}
        onChange={(opt) => handleCheckboxChange('segment', opt)}
      />

      {/* Suitable For */}
      <FilterSection
        title="Suitable For"
        options={FILTERS.suitableFor}
        selected={selectedFilters.suitableFor}
        onChange={(opt) => handleCheckboxChange('suitableFor', opt)}
      />

      {/* Raw Materials */}
<FilterSection
  title="Raw Materials"
  options={['Cotton', 'Wool', 'Polyester']}
  selected={selectedFilters.rawMaterials || []}
  onChange={(opt) => handleCheckboxChange('rawMaterials', opt)}
/>

{/* Pattern */}
<FilterSection
  title="Pattern"
  options={['Solid', 'Striped', 'Printed']}
  selected={selectedFilters.pattern || []}
  onChange={(opt) => handleCheckboxChange('pattern', opt)}
/>
    </div>
  );
};

export default FilterSidebar;
