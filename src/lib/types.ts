export interface Dossier {
  id: string
  tracking_code: string
  process_type: 'expropriation' | 'ekb_privatization'
  owner_name: string
  owner_id_number?: string
  property_address?: string
  property_id?: string
  property_area_m2?: number
  current_phase: string
  current_phase_idx: number
  status: 'active' | 'blocked' | 'completed' | 'cancelled'
  assigned_to?: string
  institution?: string
  deadline_date?: string
  estimated_value?: number
  notes?: string
  metadata: Record<string, any>
  created_at: string
  updated_at: string
}

export interface PhaseLog {
  id: string
  dossier_id: string
  phase_name: string
  phase_index: number
  institution: string
  started_at: string
  completed_at?: string
  completed_by?: string
  notes?: string
  duration_days?: number
}

export interface Document {
  id: string
  dossier_id: string
  file_name: string
  storage_path?: string
  file_type?: string
  file_size_bytes?: number
  document_type?: string
  upload_date: string
  uploaded_by?: string
  ocr_raw_text?: string
  extracted_fields: Record<string, any>
  ai_confidence?: number
  verified: boolean
  verified_by?: string
  verified_at?: string
  phase_uploaded?: string
}

export interface Alert {
  id: string
  dossier_id: string
  alert_type: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  message_sq?: string
  phase_name?: string
  triggered_at: string
  resolved_at?: string
  resolved_by?: string
  is_active: boolean
}

export interface DossierWithRelations extends Dossier {
  phase_logs: PhaseLog[]
  documents: Document[]
  alerts: Alert[]
}

export interface RequiredDocument {
  id: string
  name_sq: string
  required: boolean
}

export interface AlertTrigger {
  condition: string
  severity: string
  message_sq: string
}

export interface PhaseDefinition {
  index: number
  id: string
  name_sq: string
  name_en: string
  institution: string
  responsible_role: string
  max_duration_days: number
  is_critical: boolean
  required_documents: RequiredDocument[]
  ai_extraction_fields: Record<string, string[]>
  next_phases: string[]
  critical_points: string[]
  alert_triggers: AlertTrigger[]
  description_sq: string
}

export interface DashboardStats {
  total: number
  active: number
  blocked: number
  due_this_week: number
}

export interface CreateDossierInput {
  process_type: string
  owner_name: string
  owner_id_number?: string
  property_address?: string
  property_area_m2?: number
  estimated_value?: number
}

export interface PhaseUpdate {
  phase: string
  idx: number
}

export interface CreateAlertInput {
  dossier_id: string
  alert_type: string
  severity: string
  message: string
  message_sq?: string
  phase_name?: string
}

export interface ExtractedFields {
  [key: string]: any
}

export interface GeneratedLetter {
  id?: string
  dossier_id: string
  letter_type: string
  content: string
  generated_by?: string
  generated_at?: string
  status?: string
}
