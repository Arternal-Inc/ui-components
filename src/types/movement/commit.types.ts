/**
 * Commit types for Arternal record creation
 */

/**
 * Request to commit a draft to Arternal
 */
export interface CommitRequest {
  draftId: string
  inventoryNumber: string | null // null for auto-assign
}

/**
 * Result of committing a draft to Arternal
 */
export interface CommitResult {
  success: boolean
  inventoryId?: string
  arternalUrl?: string
  inventoryNumber?: string
  error?: string
}

/**
 * Committed draft data for success display
 */
export interface CommittedDraftData {
  artistName: string
  title: string | null
  inventoryNumber: string
  inventoryId: string
  arternalUrl: string
}
