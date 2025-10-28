import { ResearchPaper, SortField, SortOrder } from "@/types/paper";

const API_BASE_URL = "https://easydash.enago.com";

export interface FetchPapersParams {
  _sort?: string;
  _limit?: number;
  _start?: number;
}

export async function fetchResearchPapers(
  params?: FetchPapersParams
): Promise<{ data: ResearchPaper[] }> {
  try {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, value.toString());
        }
      });
    }

    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/acceptedpapers${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      data: data,
    };
  } catch (error) {
    console.error("Error fetching research papers:", error);
    throw error;
  }
}

// Helper function to build sort string
export function buildSortString(
  sortField: SortField,
  sortOrder: SortOrder
): string {
  const fieldMap: Record<SortField, string> = {
    papertitle: "papertitle",
    created_at: "created_at",
    impactfactor: "journal.impactfactor",
    journalaltimpactfactor: "journalaltimpactfactor",
  };

  const field = fieldMap[sortField] || sortField;
  return `${field}:${sortOrder.toUpperCase()}`;
}
