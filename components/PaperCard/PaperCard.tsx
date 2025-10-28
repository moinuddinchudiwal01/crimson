'use client';

import { ResearchPaper } from '@/types/paper';
import styles from './PaperCard.module.scss';
import { ExternalLink, FileText } from 'lucide-react';

interface PaperCardProps {
  paper: ResearchPaper;
  onViewDetails: (paper: ResearchPaper) => void;
}

export default function PaperCard({ paper, onViewDetails }: PaperCardProps) {
  const year = paper.created_at ? new Date(paper.created_at).getFullYear() : 'N/A';

  // Extract nested data
  const journalTitle = paper.journal?.title || 'N/A';
  const impactFactor = paper.journal?.impactfactor || paper.journalaltimpactfactor;
  const authorName = paper.coauthors || `${paper.client?.firstname || ''} ${paper.client?.lastname || ''}`.trim() || 'N/A';

  return (
    <div className={styles.cardWrapper} onClick={() => onViewDetails(paper)}>
      <div className={styles.card}>
        {/* Left side - Book cover with IF badge */}
        <div className={styles.bookCover}>
          <div className={styles.coverPlaceholder}>
            <FileText size={48} strokeWidth={1.5} />
          </div>
          {impactFactor && (
            <div className={styles.impactBadge}>
              IF {impactFactor}
            </div>
          )}
        </div>

        {/* Right side - Paper details */}
        <div className={styles.details}>
          <div className={styles.detailRow}>
            <h4 className={styles.label}>Paper Title: <span className={styles.Title}>
              {paper.papertitle.length > 80 ? `${paper.papertitle.slice(0, 80)}...` : paper.papertitle}
            </span></h4>
            <span className={styles.value}></span>
          </div>

          <div className={styles.detailRow}>
            <p className={styles.label}>Author:             <span className={styles.value}>{authorName}</span></p>
          </div>

          <div className={styles.detailRow}>
            <h5 className={styles.label}>Publisher: <span className={styles.value}>{year} {paper.publishername || 'N/A'}</span> </h5>
          </div>

          <div className={styles.detailRow}>
            <h6 className={styles.label}>Journal:             <span className={styles.value}>{journalTitle}</span></h6>
          </div>
        </div>
      </div>
    </div>
  );
}