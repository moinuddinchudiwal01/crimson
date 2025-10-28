import { ResearchPaper, SearchCategory, SortField, SortOrder } from '@/types/paper';

export function filterPapers(
  papers: ResearchPaper[],
  searchTerm: string,
  category: SearchCategory
): ResearchPaper[] {
  if (!searchTerm.trim()) return papers;

  const term = searchTerm.toLowerCase();

  return papers.filter((paper) => {
    switch (category) {
      case 'papertitle':
        return paper.papertitle?.toLowerCase().includes(term);

      case 'coauthors':
        const authorName = paper.coauthors ||
          `${paper.client?.firstname || ''} ${paper.client?.lastname || ''}`.trim();
        return authorName.toLowerCase().includes(term);

      case 'journal':
        return paper.journal?.title?.toLowerCase().includes(term);

      case 'category':
        return (
          paper.salevelone?.name?.toLowerCase().includes(term) ||
          paper.saleveltwo?.name?.toLowerCase().includes(term) ||
          paper.salevelthree?.name?.toLowerCase().includes(term)
        );

      case 'all':
      default:
        const authorNameAll = paper.coauthors ||
          `${paper.client?.firstname || ''} ${paper.client?.lastname || ''}`.trim();

        return (
          paper.papertitle?.toLowerCase().includes(term) ||
          authorNameAll.toLowerCase().includes(term) ||
          paper.journal?.title?.toLowerCase().includes(term) ||
          paper.salevelone?.name?.toLowerCase().includes(term) ||
          paper.saleveltwo?.name?.toLowerCase().includes(term) ||
          paper.salevelthree?.name?.toLowerCase().includes(term) ||
          paper.publishername?.toLowerCase().includes(term) ||
          paper.assignmentno?.toLowerCase().includes(term)
        );
    }
  });
}

export function sortPapers(
  papers: ResearchPaper[],
  sortField: SortField,
  sortOrder: SortOrder
): ResearchPaper[] {
  const sorted = [...papers].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortField) {
      case 'papertitle':
        aValue = a.papertitle?.toLowerCase() || '';
        bValue = b.papertitle?.toLowerCase() || '';
        break;

      case 'created_at':
        aValue = new Date(a.created_at).getTime();
        bValue = new Date(b.created_at).getTime();
        break;

      case 'impactfactor':
        aValue = a.journal?.impactfactor || a.journalaltimpactfactor || 0;
        bValue = b.journal?.impactfactor || b.journalaltimpactfactor || 0;
        break;

      default:
        return 0;
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
}

export function paginatePapers(
  papers: ResearchPaper[],
  page: number,
  itemsPerPage: number
): ResearchPaper[] {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return papers.slice(startIndex, endIndex);
}

export function getTotalPages(totalItems: number, itemsPerPage: number): number {
  return Math.ceil(totalItems / itemsPerPage);
}