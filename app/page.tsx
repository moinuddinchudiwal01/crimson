"use client";

import Pagination from "@/components/Pagination/Pagination";
import PaperCard from "@/components/PaperCard/PaperCard";
import PaperDetailsModal from "@/components/PaperDetailsModal/PaperDetailsModal";
import SearchBar from "@/components/SearchBar/SearchBar";
import SkeletonCard from "@/components/SkeletonCard/SkeletonCard";
import SortControls from "@/components/SortControls/SortControls";
import { buildSortString, fetchResearchPapers } from "@/lib/api";
import { debounce } from "@/lib/debounce";
import {
  filterPapers,
  getTotalPages,
  paginatePapers,
  sortPapers,
} from "@/lib/paperUtils";
import {
  ResearchPaper,
  SearchCategory,
  SortField,
  SortOrder,
} from "@/types/paper";
import { AlertCircle, FileX } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.scss";

export default function Home() {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState<SearchCategory>("all");

  const [sortField, setSortField] = useState<SortField>("papertitle");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(
    null
  );

  useEffect(() => {
    loadAllPapers();
  }, []);

  useEffect(() => {
    const debouncedUpdate = debounce((term: string) => {
      setDebouncedSearchTerm(term);
      setCurrentPage(1);
    }, 300);

    debouncedUpdate(searchTerm);
  }, [searchTerm]);

  const loadAllPapers = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchResearchPapers({ _limit: -1 });
      setPapers(result.data);
    } catch (err) {
      setError("Failed to load research papers. Please try again.");
      console.error("Error loading papers:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPapers = useMemo(() => {
    return filterPapers(papers, debouncedSearchTerm, searchCategory);
  }, [papers, debouncedSearchTerm, searchCategory]);

  const sortedPapers = useMemo(() => {
    return sortPapers(filteredPapers, sortField, sortOrder);
  }, [filteredPapers, sortField, sortOrder, papers]);

  const paginatedPapers = useMemo(() => {
    return paginatePapers(sortedPapers, currentPage, itemsPerPage);
  }, [sortedPapers, currentPage, itemsPerPage, papers]);

  const totalPages = getTotalPages(sortedPapers.length, itemsPerPage);

  const displayedItemsCount = sortedPapers.length;

  const handleSortOrderToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleSortFieldChange = (field: SortField) => {
    setSortField(field);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewDetails = (paper: ResearchPaper) => {
    setSelectedPaper(paper);
  };

  if (loading && papers.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Enago Research Papers</h1>
        </div>

        <div className={styles.skeletonGrid}>
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error && papers.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Enago Research Papers</h1>
        </div>

        <div className={styles.errorContainer}>
          <AlertCircle className={styles.errorIcon} />
          <h2>Error Loading Papers</h2>
          <p>{error}</p>
          <button onClick={loadAllPapers}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Enago Research Papers</h1>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchCategory={searchCategory}
        onCategoryChange={setSearchCategory}
        resultsCount={displayedItemsCount}
        isLoading={loading}
      />

      <SortControls
        sortField={sortField}
        sortOrder={sortOrder}
        onSortFieldChange={handleSortFieldChange}
        onSortOrderToggle={handleSortOrderToggle}
      />

      {paginatedPapers.length === 0 && !loading ? (
        <div className={styles.emptyState}>
          <FileX />
          <h3>No Papers Found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {loading
              ? Array.from({ length: itemsPerPage }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : paginatedPapers.map((paper) => (
                  <PaperCard
                    key={paper.id}
                    paper={paper}
                    onViewDetails={handleViewDetails}
                  />
                ))}
          </div>

          {!loading && paginatedPapers.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={displayedItemsCount}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          )}
        </>
      )}

      {selectedPaper && (
        <PaperDetailsModal
          paper={selectedPaper}
          onClose={() => setSelectedPaper(null)}
        />
      )}
    </div>
  );
}
