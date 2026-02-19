// Shared TypeScript types
// These types are used by both frontend and backend

export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// Draft-related types
export {
  type AuthenticatedUser,
  type ExtractionConfidenceSummary,
  type DraftListItem,
  type FieldExtraction,
  type SourceDocumentSummary,
  type DraftDetailView,
} from './draft.types'

// Extraction types - re-exported from schemas
// Note: These are imported from @Arternal-Inc/ui-components/src/types/movement but originally defined in schemas
export type ExtractionStatus = 'extracted' | 'missing' | 'manual' | 'failed'
export type ExtractionMethod = 'llm' | 'user_edit' | 'manual' | 'ocr'

// Duplicate detection types
export {
  type MatchReason,
  type DuplicateMatch,
  type DuplicateCheckResult,
  type DuplicateDecision,
  type DuplicateDecisionInput,
  type DuplicateDecisionResult,
} from './duplicate.types'

// Inventory types
export {
  type InventoryNumberMode,
  type InventoryConfig,
  type InventoryValidationResult,
  type InventoryNumberInput,
} from './inventory.types'

// Commit types
export { type CommitRequest, type CommitResult, type CommittedDraftData } from './commit.types'
