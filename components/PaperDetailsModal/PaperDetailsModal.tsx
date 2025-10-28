'use client';

import { useEffect } from 'react';
import { X, ExternalLink, CheckCircle, Circle, Building2, User, Calendar, BookOpen } from 'lucide-react';
import { ResearchPaper } from '@/types/paper';
import styles from './PaperDetailsModal.module.scss';

interface PaperDetailsModalProps {
  paper: ResearchPaper;
  onClose: () => void;
}

export default function PaperDetailsModal({ paper, onClose }: PaperDetailsModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const year = paper.created_at ? new Date(paper.created_at).getFullYear() : 'N/A';
  const authorName = paper.coauthors ||
    `${paper.client?.firstname || ''} ${paper.client?.lastname || ''}`.trim() || 'N/A';
  const impactFactor = paper.journal?.impactfactor || paper.journalaltimpactfactor;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Paper Details</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <BookOpen size={20} />
              Publication Information
            </h3>
            <div className={styles.grid}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Paper Title</span>
                <span className={styles.fieldValue}>{paper.papertitle}</span>
              </div>

              <div className={styles.field}>
                <span className={styles.fieldLabel}>Authors</span>
                <span className={styles.fieldValue}>{authorName}</span>
              </div>

              <div className={styles.field}>
                <span className={styles.fieldLabel}>Publication Year</span>
                <span className={styles.fieldValue}>{year}</span>
              </div>

              <div className={styles.field}>
                <span className={styles.fieldLabel}>Status</span>
                <span className={`${styles.status} ${paper.status ? styles.published : styles.draft}`}>
                  {paper.status ? <CheckCircle /> : <Circle />}
                  {paper.status ? 'Published' : 'Draft'}
                </span>
              </div>

              {paper.assignmentno && (
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Assignment Number</span>
                  <span className={styles.fieldValue}>{paper.assignmentno}</span>
                </div>
              )}
            </div>
          </div>

          {paper.journal && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <BookOpen size={20} />
                Journal Details
              </h3>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Journal Name</span>
                  <span className={styles.fieldValue}>{paper.journal.title}</span>
                </div>

                {paper.journal.journalabbreviation && (
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Journal Abbreviation</span>
                    <span className={styles.fieldValue}>{paper.journal.journalabbreviation}</span>
                  </div>
                )}

                {impactFactor && (
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Impact Factor</span>
                    <div className={styles.badge}>IF {impactFactor}</div>
                  </div>
                )}

                {paper.journal.articleinfluence && (
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Article Influence</span>
                    <span className={styles.fieldValue}>{paper.journal.articleinfluence}</span>
                  </div>
                )}

                {paper.journal.hirschindex && (
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>H-Index</span>
                    <span className={styles.fieldValue}>{paper.journal.hirschindex}</span>
                  </div>
                )}

                {paper.journal.issn && (
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>ISSN</span>
                    <span className={styles.fieldValue}>{paper.journal.issn}</span>
                  </div>
                )}

                {paper.journal.journalreach && (
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Journal Reach</span>
                    <span className={styles.fieldValue}>{paper.journal.journalreach}</span>
                  </div>
                )}

                {paper.journal.mediumofpublication && (
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Medium of Publication</span>
                    <span className={styles.fieldValue}>{paper.journal.mediumofpublication}</span>
                  </div>
                )}
              </div>

              {paper.journal.statementofscope && (
                <div className={styles.field} style={{ marginTop: '1rem' }}>
                  <span className={styles.fieldLabel}>Statement of Scope</span>
                  <p className={styles.fieldValue} style={{ textAlign: 'justify', lineHeight: '1.6' }}>
                    {paper.journal.statementofscope}
                  </p>
                </div>
              )}

              {paper.journal.journalwebsiteurl && (
                <div style={{ marginTop: '1rem' }}>
                  <a
                    href={paper.journal.journalwebsiteurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkButton}
                  >
                    <ExternalLink size={16} />
                    Visit Journal Website
                  </a>
                </div>
              )}
            </div>
          )}

          {(paper.journal?.publishingcompany || paper.publishername || paper.publisher) && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <Building2 size={20} />
                Publisher Information
              </h3>
              <div className={styles.grid}>
                {paper.journal?.publishingcompany && (
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Publishing Company</span>
                    <span className={styles.fieldValue}>{paper.journal.publishingcompany}</span>
                  </div>
                )}

                {paper.publishername && (
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Publisher Name</span>
                    <span className={styles.fieldValue}>{paper.publishername}</span>
                  </div>
                )}

                {paper.publisher?.publishername && (
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Publisher</span>
                    <span className={styles.fieldValue}>{paper.publisher.publishername}</span>
                  </div>
                )}

                {paper.journaldetails && (
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Journal Details</span>
                    <span className={styles.fieldValue}>{paper.journaldetails}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {(paper.salevelone || paper.saleveltwo || paper.salevelthree) && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Subject Areas & Categories</h3>
              <div className={styles.tags}>
                {paper.salevelone?.name && (
                  <span className={styles.tag} style={{ backgroundColor: '#e3f2fd' }}>
                    {paper.salevelone.name}
                  </span>
                )}
                {paper.saleveltwo?.name && (
                  <span className={styles.tag} style={{ backgroundColor: '#f3e5f5' }}>
                    {paper.saleveltwo.name}
                  </span>
                )}
                {paper.salevelthree?.name && (
                  <span className={styles.tag} style={{ backgroundColor: '#fff3e0' }}>
                    {paper.salevelthree.name}
                  </span>
                )}
              </div>

              {paper.journal?.journalsubjectarea && (
                <div className={styles.field} style={{ marginTop: '1rem' }}>
                  <span className={styles.fieldLabel}>Journal Subject Area</span>
                  <span className={styles.fieldValue}>{paper.journal.journalsubjectarea}</span>
                </div>
              )}
            </div>
          )}

          {(paper.servicetype || paper.client) && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <User size={20} />
                Additional Information
              </h3>
              <div className={styles.grid}>
                {paper.servicetype?.servicename && (
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Service Type</span>
                    <span className={styles.fieldValue}>{paper.servicetype.servicename}</span>
                  </div>
                )}

                {paper.servicetype?.servicetype && (
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Service Category</span>
                    <span className={styles.fieldValue}>{paper.servicetype.servicetype}</span>
                  </div>
                )}

                {paper.client?.organization && (
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Organization</span>
                    <span className={styles.fieldValue}>{paper.client.organization}</span>
                  </div>
                )}

                {paper.client?.memid && (
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Member ID</span>
                    <span className={styles.fieldValue}>{paper.client.memid}</span>
                  </div>
                )}

                {paper.identityconfidentiality && (
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Confidentiality</span>
                    <span className={styles.badge} style={{ backgroundColor: '#ffeb3b', color: '#000' }}>
                      Identity Confidential
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <Calendar size={20} />
              Timestamps
            </h3>
            <div className={styles.grid}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Created At</span>
                <span className={styles.fieldValue}>
                  {new Date(paper.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              <div className={styles.field}>
                <span className={styles.fieldLabel}>Updated At</span>
                <span className={styles.fieldValue}>
                  {new Date(paper.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              {paper.published_at && (
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Published At</span>
                  <span className={styles.fieldValue}>
                    {new Date(paper.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>

          {paper.articlelink && (
            <div className={styles.section}>
              <a
                href={paper.articlelink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkButton}
              >
                <ExternalLink />
                View Full Article
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}