'use client';

import { Search, Loader2 } from 'lucide-react';
import { SearchCategory } from '@/types/paper';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  searchCategory: SearchCategory;
  onCategoryChange: (category: SearchCategory) => void;
  resultsCount: number;
  isLoading?: boolean;
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
  searchCategory,
  onCategoryChange,
  resultsCount,
  isLoading = false,
}: SearchBarProps) {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <div className={styles.inputGroup}>
          {isLoading ? (
            <Loader2 size={20} className={styles.spinner} />
          ) : (
            <Search size={20} />
          )}
          <input
            type="text"
            placeholder="Search research papers..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className={styles.selectGroup}>
          <select
            className={styles.select}
            value={searchCategory}
            onChange={(e) => onCategoryChange(e.target.value as SearchCategory)}
          >
            <option value="all">All Fields</option>
            <option value="papertitle">Paper Title</option>
            <option value="coauthors">Authors</option>
            <option value="journal">Journal</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>

      {searchTerm && (
        <div className={styles.resultsCount}>
          Found <strong>{resultsCount}</strong> result{resultsCount !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}