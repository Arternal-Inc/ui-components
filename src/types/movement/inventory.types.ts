/**
 * Inventory number assignment mode
 */
export type InventoryNumberMode = 'auto' | 'manual'

/**
 * Gallery inventory configuration
 */
export interface InventoryConfig {
  /** Default mode for new records */
  defaultMode: InventoryNumberMode
  /** Prefix for inventory numbers (e.g., "ART-2026-") */
  prefix: string
  /** Whether manual entry is allowed */
  allowManual: boolean
  /** Whether auto-assign is allowed */
  allowAuto: boolean
}

/**
 * Inventory number validation result
 */
export interface InventoryValidationResult {
  /** Whether the inventory number is valid */
  valid: boolean
  /** Error message if invalid */
  error?: string
  /** Whether a duplicate was found */
  isDuplicate?: boolean
}

/**
 * Inventory number input for commit
 */
export interface InventoryNumberInput {
  /** Assignment mode */
  mode: InventoryNumberMode
  /** Manual inventory number (required if mode is 'manual') */
  manualNumber?: string
}
