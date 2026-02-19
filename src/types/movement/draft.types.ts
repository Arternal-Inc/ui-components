/**
 * Draft-related types for the intake system
 * These types are used across frontend and backend
 */

// Extraction types
export type ExtractionStatus = 'extracted' | 'missing' | 'manual' | 'failed'
export type ExtractionMethod = 'llm' | 'user_edit' | 'manual' | 'ocr'

// Draft status enum (matching schema)
export type DraftStatus = 
  | 'processing'
  | 'extracted'
  | 'edited'
  | 'review'
  | 'pending_duplicate_review'
  | 'approved'
  | 'merged'
  | 'failed'
  | 'deleted'
  | 'expired'

// Document type enum (matching schema)
export type DocumentType = 'email' | 'pdf' | 'text' | 'image' | 'spreadsheet'

/**
 * Authenticated user context available in protected procedures
 */
export interface AuthenticatedUser {
  organizationId: number
  userId: number
  email?: string
  groupIds?: number[]
}

/**
 * Draft list item (for displaying in lists)
 */
export interface DraftListItem {
  id: string
  status: DraftStatus
  sourceDocumentCount: number
  extractionCount: number
  createdAt: Date
  updatedAt: Date
  batchId: string | null
  workIndex: number | null
  workLabel: string | null
}

/**
 * Field extraction with source info
 */
export interface FieldExtraction {
  id: string
  fieldName: string
  value: string | null
  status: ExtractionStatus
  extractionMethod: ExtractionMethod
  sourceDocumentId: string | null
  sourceSnippet: string | null
}

/**
 * Source document with extraction count
 */
export interface SourceDocumentSummary {
  id: string
  documentType: DocumentType
  filename: string | null
  receivedAt: Date
  extractionCount: number
}

/**
 * Complete draft view with all relations
 */
export interface DraftDetailView {
  id: string
  organizationId: number
  userId: number
  status: DraftStatus
  sourceDocuments: SourceDocumentSummary[]
  extractions: FieldExtraction[]
  createdAt: Date
  updatedAt: Date
  batchId: string | null
  workIndex: number | null
  workLabel: string | null
}
