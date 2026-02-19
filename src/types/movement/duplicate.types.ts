/**
 * Duplicate detection types for the intake system
 * These types are used across frontend and backend
 */

/**
 * Reason explaining why a field matched between draft and existing artwork
 */
export interface MatchReason {
  field: string
  score: number
  description: string
}

/**
 * A potential duplicate match found in the system
 */
export interface DuplicateMatch {
  /** ID of the existing artwork record in Arternal */
  existingRecordId: string
  /** Inventory number of the existing artwork (if available) */
  inventoryNumber: string | null
  /** Overall match score (0-100) */
  matchScore: number
  /** Detailed reasons explaining the match */
  matchReasons: MatchReason[]
  /** Preview data from the existing artwork */
  preview: {
    artistName: string | null
    title: string | null
    catalogNumber: string | null
    medium: string | null
    dimensions: string | null
    dimensionsMetric: string | null
    dateYear: string | null
    edition: string | null
    signed: string | null
    provenance: string | null
    literature: string | null
    exhibitionHistory: string | null
    price: string | null
    currency: string | null
    thumbnail: string | null
  }
}

/**
 * Result of checking a draft for duplicates
 */
export interface DuplicateCheckResult {
  /** ID of the draft that was checked */
  draftId: string
  /** Whether the check was successful */
  success: boolean
  /** Warning message if the check couldn't complete (e.g., API unavailable) */
  warning: string | null
  /** List of potential duplicate matches */
  matches: DuplicateMatch[]
  /** Timestamp of when the check was performed */
  checkedAt: string
}

/**
 * Possible decisions when handling a potential duplicate
 */
export type DuplicateDecision = 'proceed' | 'merge' | 'investigate'

/**
 * Input for recording a duplicate decision
 */
export interface DuplicateDecisionInput {
  /** ID of the draft the decision is for */
  draftId: string
  /** The decision made by the registrar */
  decision: DuplicateDecision
  /** Optional rationale explaining the decision */
  rationale?: string
  /** ID of the existing record (required for 'merge' decision) */
  existingRecordId?: string
}

/**
 * Result of recording a duplicate decision
 */
export interface DuplicateDecisionResult {
  /** Whether the decision was recorded successfully */
  success: boolean
  /** The new status of the draft after the decision */
  newStatus: string
  /** URL to open for existing record (for 'merge' decision) */
  existingRecordUrl?: string
  /** Fields that were updated during merge */
  mergedFields?: string[]
  /** Message describing what happened */
  message?: string
}
