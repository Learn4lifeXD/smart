import { createClient } from './client'
import type { Dossier, DossierWithRelations, Document, Alert, DashboardStats, CreateDossierInput, ExtractedFields, PhaseUpdate, CreateAlertInput, GeneratedLetter } from '../types'

// MOCK DATA for appealing UI when DB is down
const MOCK_DOSSIERS = [
  { id: '1', tracking_code: 'EXP-2024-0001', process_type: 'expropriation', owner_name: 'Artan Koci', property_address: 'Rruga Myslym Shyri Nr.45, Tiranë', current_phase: 'application_received', current_phase_idx: 0, status: 'active', deadline_date: new Date(Date.now() + 5 * 86400000).toISOString() },
  { id: '2', tracking_code: 'EXP-2024-0002', process_type: 'expropriation', owner_name: 'Mirela Duka', property_address: 'Bulevardi Bajram Curri Nr.12, Tiranë', current_phase: 'technical_evaluation', current_phase_idx: 1, status: 'blocked', deadline_date: new Date(Date.now() + 20 * 86400000).toISOString() },
  { id: '3', tracking_code: 'EXP-2024-0003', process_type: 'expropriation', owner_name: 'Genci Hoxha', property_address: 'Rruga e Kavajës, Durrës', current_phase: 'commission_review', current_phase_idx: 2, status: 'active', deadline_date: new Date(Date.now() + 10 * 86400000).toISOString() },
  { id: '4', tracking_code: 'EXP-2024-0004', process_type: 'expropriation', owner_name: 'Blerina Muça', property_address: 'Lagja Pavarësia, Vlorë', current_phase: 'owner_notification', current_phase_idx: 3, status: 'active', deadline_date: new Date(Date.now() + 3 * 86400000).toISOString() },
  { id: '5', tracking_code: 'EXP-2024-0005', process_type: 'expropriation', owner_name: 'Sokol Gjata', property_address: 'Rruga e Durrësit, Tiranë', current_phase: 'compensation_negotiation', current_phase_idx: 4, status: 'blocked', deadline_date: new Date(Date.now() - 35 * 86400000).toISOString() },
  { id: '6', tracking_code: 'EKB-2024-0001', process_type: 'ekb_privatization', owner_name: 'Luan Qerimi', property_address: 'Kombinat, Tiranë', current_phase: 'application_received', current_phase_idx: 0, status: 'active', deadline_date: new Date(Date.now() + 12 * 86400000).toISOString() },
  { id: '7', tracking_code: 'EKB-2024-0002', process_type: 'ekb_privatization', owner_name: 'Teuta Basha', property_address: 'Laprakë, Tiranë', current_phase: 'financial_evaluation', current_phase_idx: 1, status: 'active', deadline_date: new Date(Date.now() + 15 * 86400000).toISOString() },
  { id: '8', tracking_code: 'EKB-2024-0003', process_type: 'ekb_privatization', owner_name: 'Ermal Zefi', property_address: 'Ali Demi, Tiranë', current_phase: 'director_approval', current_phase_idx: 2, status: 'active', deadline_date: new Date(Date.now() + 1 * 86400000).toISOString() }
] as Dossier[];

const MOCK_ALERTS = [
  { id: '1', dossier_id: 'EXP-2024-0001', alert_type: 'deadline', severity: 'high', message: 'Phase 30-day deadline expiring — 5 days left', phase_name: 'application_received', is_active: true },
  { id: '2', dossier_id: 'EXP-2024-0004', alert_type: 'deadline', severity: 'high', message: 'Phase deadline expiring — 3 days left', phase_name: 'owner_notification', is_active: true },
  { id: '3', dossier_id: 'EXP-2024-0005', alert_type: 'blockage', severity: 'critical', message: 'Dossier blocked for more than 30 days', phase_name: 'compensation_negotiation', is_active: true },
  { id: '4', dossier_id: 'EKB-2024-0003', alert_type: 'deadline', severity: 'medium', message: 'Phase deadline expires tomorrow!', phase_name: 'director_approval', is_active: true }
] as Alert[];

export async function getDossiers(filters?: any): Promise<Dossier[]> {
  try {
    const supabase = createClient()
    let query = supabase.from('dossiers').select('*')
    if (filters?.status) query = query.eq('status', filters.status)
    if (filters?.process_type) query = query.eq('process_type', filters.process_type)
    const { data, error } = await query
    if (error || !data || data.length === 0) return MOCK_DOSSIERS
    return data as Dossier[]
  } catch (err) {
    return MOCK_DOSSIERS
  }
}

export async function getDossierById(id: string): Promise<DossierWithRelations> {
  try {
    const supabase = createClient()
    const { data: dossier, error } = await supabase.from('dossiers').select('*').eq('id', id).single()
    if (error || !dossier) throw error
    
    const [phase_logs, documents, alerts] = await Promise.all([
      supabase.from('phase_logs').select('*').eq('dossier_id', id),
      supabase.from('documents').select('*').eq('dossier_id', id),
      supabase.from('alerts').select('*').eq('dossier_id', id).eq('is_active', true)
    ])

    return {
      ...dossier,
      phase_logs: phase_logs.data || [],
      documents: documents.data || [],
      alerts: alerts.data || []
    } as DossierWithRelations
  } catch (err) {
    // Return mock dossier details
    const mockDossier = MOCK_DOSSIERS.find(d => d.id === id || d.tracking_code === id) || MOCK_DOSSIERS[0];
    return {
      ...mockDossier,
      owner_id_number: 'J12345678A',
      property_area_m2: 120.5,
      phase_logs: [],
      documents: [
        { id: 'doc1', dossier_id: id, file_name: 'document_1.pdf', document_type: 'application_form' } as any,
        { id: 'doc2', dossier_id: id, file_name: 'document_2.pdf', document_type: 'property_certificate' } as any
      ],
      alerts: MOCK_ALERTS.filter(a => a.dossier_id === mockDossier.tracking_code)
    } as DossierWithRelations
  }
}

export async function getDossierByTrackingCode(code: string): Promise<any> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from('dossiers').select('*').eq('tracking_code', code).single()
    if (error || !data) return MOCK_DOSSIERS.find(d => d.tracking_code === code)
    return data
  } catch(err) {
    return MOCK_DOSSIERS.find(d => d.tracking_code === code)
  }
}

export async function createDossier(data: CreateDossierInput): Promise<Dossier> {
  const supabase = createClient()
  const { data: res, error } = await supabase.from('dossiers').insert(data).select().single()
  if (error) throw error
  return res as Dossier
}

export async function updateDossierPhase(id: string, phaseData: PhaseUpdate): Promise<Dossier> {
  const supabase = createClient()
  const { data, error } = await supabase.from('dossiers').update({ current_phase: phaseData.phase, current_phase_idx: phaseData.idx }).eq('id', id).select().single()
  if (error) throw error
  return data as Dossier
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const supabase = createClient()
    const { data: active, error } = await supabase.from('dossiers').select('id', { count: 'exact' }).eq('status', 'active')
    if (error) throw error
    const { data: blocked } = await supabase.from('dossiers').select('id', { count: 'exact' }).eq('status', 'blocked')
    const { data: due } = await supabase.from('dossiers').select('id', { count: 'exact' }).lt('deadline_date', new Date(Date.now() + 7 * 86400000).toISOString()).gt('deadline_date', new Date().toISOString())
    return {
      total: (active?.length || 0) + (blocked?.length || 0),
      active: active?.length || 0,
      blocked: blocked?.length || 0,
      due_this_week: due?.length || 0
    }
  } catch (err) {
    return {
      total: MOCK_DOSSIERS.length,
      active: MOCK_DOSSIERS.filter(d => d.status === 'active').length,
      blocked: MOCK_DOSSIERS.filter(d => d.status === 'blocked').length,
      due_this_week: 3
    }
  }
}

export async function uploadDocument(dossierId: string, file: File, meta: any) {
  const supabase = createClient()
  const { data, error } = await supabase.from('documents').insert({
    dossier_id: dossierId,
    file_name: file.name,
    document_type: meta.document_type,
    file_size_bytes: file.size
  }).select().single()
  if (error) throw error
  return data as Document
}

export async function getDocumentsByDossier(dossierId: string): Promise<Document[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from('documents').select('*').eq('dossier_id', dossierId)
    if (error || !data) return []
    return data as Document[]
  } catch(err) {
    return []
  }
}

export async function updateExtractedFields(docId: string, fields: ExtractedFields) {
  const supabase = createClient()
  await supabase.from('documents').update({ extracted_fields: fields }).eq('id', docId)
}

export async function verifyDocument(docId: string, verifiedBy: string) {
  const supabase = createClient()
  await supabase.from('documents').update({ verified: true, verified_by: verifiedBy, verified_at: new Date().toISOString() }).eq('id', docId)
}

export async function getActiveAlerts(filters?: any): Promise<Alert[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from('alerts').select('*').eq('is_active', true)
    if (error || !data || data.length === 0) return MOCK_ALERTS
    return data as Alert[]
  } catch (err) {
    return MOCK_ALERTS
  }
}

export async function getAlertsByDossier(dossierId: string): Promise<Alert[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from('alerts').select('*').eq('dossier_id', dossierId).eq('is_active', true)
    if (error || !data) return MOCK_ALERTS.filter(a => a.dossier_id === dossierId)
    return data as Alert[]
  } catch(err) {
    return MOCK_ALERTS.filter(a => a.dossier_id === dossierId)
  }
}

export async function resolveAlert(alertId: string, resolvedBy: string) {
  const supabase = createClient()
  await supabase.from('alerts').update({ is_active: false, resolved_by: resolvedBy, resolved_at: new Date().toISOString() }).eq('id', alertId)
}

export async function createAlert(alert: CreateAlertInput) {
  const supabase = createClient()
  await supabase.from('alerts').insert(alert)
}

export async function saveGeneratedLetter(letter: GeneratedLetter) {
  const supabase = createClient()
  await supabase.from('generated_letters').insert(letter)
}

export async function getLettersByDossier(dossierId: string): Promise<GeneratedLetter[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from('generated_letters').select('*').eq('dossier_id', dossierId)
    if (error) return []
    return data as GeneratedLetter[]
  } catch(err) {
    return []
  }
}

export function subscribeToAlerts(callback: (alert: Alert) => void) {
  try {
    const supabase = createClient()
    return supabase.channel('alerts').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'alerts' }, payload => callback(payload.new as Alert)).subscribe()
  } catch (err) {
    return { unsubscribe: () => {} } as any;
  }
}

export function subscribeToDossierUpdates(id: string, callback: Function) {
  try {
    const supabase = createClient()
    return supabase.channel('dossier').on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'dossiers', filter: `id=eq.${id}` }, payload => callback(payload.new)).subscribe()
  } catch (err) {
    return { unsubscribe: () => {} } as any;
  }
}
