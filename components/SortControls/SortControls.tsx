"use client";

import { SortField, SortOrder } from "@/types/paper";
import { ArrowDown, ArrowUp } from "lucide-react";
import styles from "./SortControls.module.scss";

interface SortControlsProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSortFieldChange: (field: SortField) => void;
  onSortOrderToggle: () => void;
}

export default function SortControls({
  sortField,
  sortOrder,
  onSortFieldChange,
  onSortOrderToggle,
}: SortControlsProps) {
  return (
    <div className={styles.sortContainer}>
      <span className={styles.label}>Sort by:</span>

      <div className={styles.controls}>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.sortButton} ${
              sortField === "papertitle" ? styles.active : ""
            }`}
            onClick={() => onSortFieldChange("papertitle")}
          >
            Title
          </button>
          <button
            className={`${styles.sortButton} ${
              sortField === "created_at" ? styles.active : ""
            }`}
            onClick={() => onSortFieldChange("created_at")}
          >
            Year
          </button>
          <button
            className={`${styles.sortButton} ${
              sortField === "impactfactor" ? styles.active : ""
            }`}
            onClick={() => onSortFieldChange("impactfactor")}
          >
            Impact Factor
          </button>
        </div>

        <button
          className={`${styles.orderButton} ${
            sortOrder === "desc" ? styles.desc : ""
          }`}
          onClick={onSortOrderToggle}
          title={sortOrder === "asc" ? "Ascending" : "Descending"}
        >
          {sortOrder === "asc" ? <ArrowUp /> : <ArrowDown />}
        </button>
      </div>
    </div>
  );
}
