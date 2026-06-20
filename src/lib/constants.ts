export const PROCESS_TYPES = {
  expropriation: 'Property Expropriation',
  ekb_privatization: 'EKB Privatization'
}

export const PHASE_COLORS: Record<string, string> = {
  application_received: 'bg-blue-100 text-blue-800',
  technical_evaluation: 'bg-yellow-100 text-yellow-800',
  commission_review: 'bg-purple-100 text-purple-800',
  owner_notification: 'bg-orange-100 text-orange-800',
  compensation_negotiation: 'bg-indigo-100 text-indigo-800',
  final_decision: 'bg-teal-100 text-teal-800',
  execution: 'bg-green-100 text-green-800',
  financial_evaluation: 'bg-yellow-100 text-yellow-800',
  director_approval: 'bg-purple-100 text-purple-800',
  payment_execution: 'bg-indigo-100 text-indigo-800',
  contract_signing: 'bg-green-100 text-green-800'
}

export const SEVERITY_COLORS: Record<string, string> = {
  critical: 'bg-red-100 text-red-800 border-red-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-blue-100 text-blue-800 border-blue-200'
}

export const STATUS_LABELS_EN: Record<string, string> = {
  active: 'Active',
  blocked: 'Blocked',
  completed: 'Completed',
  cancelled: 'Cancelled'
}

export const INSTITUTIONS = [
  'Municipality',
  'Ministry of Infrastructure',
  'ALUIZNI',
  'State Commission',
  'Ministry of Finance',
  'Council of Ministers',
  'State Bank',
  'Central EKB',
  'EKB Finance Sector',
  'EKB General Directorate',
  'Bank',
  'Notary / ASHK'
]
