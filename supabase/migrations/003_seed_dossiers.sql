-- SEED DOSSIERS
INSERT INTO dossiers (id, tracking_code, process_type, owner_name, property_address, current_phase, current_phase_idx, status, deadline_date) VALUES
(gen_random_uuid(), 'EXP-2024-0001', 'expropriation', 'Artan Koci', 'Rruga Myslym Shyri Nr.45, Tiranë', 'application_received', 0, 'active', NOW() + INTERVAL '5 days'),
(gen_random_uuid(), 'EXP-2024-0002', 'expropriation', 'Mirela Duka', 'Bulevardi Bajram Curri Nr.12, Tiranë', 'technical_evaluation', 1, 'blocked', NOW() + INTERVAL '20 days'),
(gen_random_uuid(), 'EXP-2024-0003', 'expropriation', 'Genci Hoxha', 'Rruga e Kavajës, Durrës', 'commission_review', 2, 'active', NOW() + INTERVAL '10 days'),
(gen_random_uuid(), 'EXP-2024-0004', 'expropriation', 'Blerina Muça', 'Lagja Pavarësia, Vlorë', 'owner_notification', 3, 'active', NOW() + INTERVAL '3 days'),
(gen_random_uuid(), 'EXP-2024-0005', 'expropriation', 'Sokol Gjata', 'Rruga e Durrësit, Tiranë', 'compensation_negotiation', 4, 'blocked', NOW() - INTERVAL '35 days'),
(gen_random_uuid(), 'EXP-2024-0006', 'expropriation', 'Elvira Hasa', 'Bulevardi Vlorë', 'final_decision', 5, 'completed', NOW() - INTERVAL '10 days'),
(gen_random_uuid(), 'EXP-2024-0007', 'expropriation', 'Bujar Leka', 'Lagja 1, Korçë', 'execution', 6, 'active', NOW() + INTERVAL '6 days'),
(gen_random_uuid(), 'EXP-2024-0008', 'expropriation', 'Zamira Prifti', 'Rruga e Barrikadave, Tiranë', 'application_received', 0, 'active', NOW() + INTERVAL '25 days'),
(gen_random_uuid(), 'EXP-2024-0009', 'expropriation', 'Agron Meta', 'Lagja 4, Shkodër', 'technical_evaluation', 1, 'blocked', NOW() - INTERVAL '40 days'),
(gen_random_uuid(), 'EXP-2024-0010', 'expropriation', 'Klodian Shehu', 'Rruga Skënderbej, Elbasan', 'commission_review', 2, 'completed', NOW() - INTERVAL '2 days'),

(gen_random_uuid(), 'EKB-2024-0001', 'ekb_privatization', 'Luan Qerimi', 'Kombinat, Tiranë', 'application_received', 0, 'active', NOW() + INTERVAL '12 days'),
(gen_random_uuid(), 'EKB-2024-0002', 'ekb_privatization', 'Teuta Basha', 'Laprakë, Tiranë', 'financial_evaluation', 1, 'active', NOW() + INTERVAL '15 days'),
(gen_random_uuid(), 'EKB-2024-0003', 'ekb_privatization', 'Ermal Zefi', 'Ali Demi, Tiranë', 'director_approval', 2, 'active', NOW() + INTERVAL '1 days'),
(gen_random_uuid(), 'EKB-2024-0004', 'ekb_privatization', 'Anila Leka', 'Kinostudio, Tiranë', 'payment_execution', 3, 'active', NOW() + INTERVAL '20 days'),
(gen_random_uuid(), 'EKB-2024-0005', 'ekb_privatization', 'Gazmend Rama', 'Bregu i Lumit, Tiranë', 'contract_signing', 4, 'active', NOW() + INTERVAL '8 days');

-- SEED PHASE LOGS (One per dossier)
INSERT INTO phase_logs (dossier_id, phase_name, phase_index, institution)
SELECT id, current_phase, current_phase_idx, 'Responsible Institution' FROM dossiers;

-- SEED DOCUMENTS (2 per dossier)
INSERT INTO documents (dossier_id, file_name, file_type, document_type, ocr_raw_text)
SELECT id, 'document_1.pdf', 'application/pdf', 'application_form', 'Request for expropriation/privatization from ' || owner_name FROM dossiers;

INSERT INTO documents (dossier_id, file_name, file_type, document_type, ocr_raw_text)
SELECT id, 'document_2.pdf', 'application/pdf', 'property_certificate', 'Property certificate for address: ' || property_address FROM dossiers;

-- SEED ALERTS (5 active alerts)
INSERT INTO alerts (dossier_id, alert_type, severity, message, message_sq, phase_name, is_active)
SELECT id, 'deadline', 'high', 'Deadline in 5 days', 'Phase 30-day deadline expiring — 5 days left', current_phase, TRUE FROM dossiers WHERE tracking_code = 'EXP-2024-0001';

INSERT INTO alerts (dossier_id, alert_type, severity, message, message_sq, phase_name, is_active)
SELECT id, 'deadline', 'high', 'Deadline in 3 days', 'Phase deadline expiring — 3 days left', current_phase, TRUE FROM dossiers WHERE tracking_code = 'EXP-2024-0004';

INSERT INTO alerts (dossier_id, alert_type, severity, message, message_sq, phase_name, is_active)
SELECT id, 'blockage', 'critical', 'Blocked for >30 days', 'Dossier blocked for more than 30 days', current_phase, TRUE FROM dossiers WHERE tracking_code = 'EXP-2024-0005';

INSERT INTO alerts (dossier_id, alert_type, severity, message, message_sq, phase_name, is_active)
SELECT id, 'blockage', 'critical', 'Blocked for >40 days', 'Dossier blocked for more than 40 days', current_phase, TRUE FROM dossiers WHERE tracking_code = 'EXP-2024-0009';

INSERT INTO alerts (dossier_id, alert_type, severity, message, message_sq, phase_name, is_active)
SELECT id, 'deadline', 'high', 'Deadline in 1 day', 'Phase deadline expires tomorrow!', current_phase, TRUE FROM dossiers WHERE tracking_code = 'EKB-2024-0003';
