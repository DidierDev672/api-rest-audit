-- =====================================================
-- MIGRATION: Add status column to patient_tinnitus_assignments
-- Replaces is_active boolean with status enum
-- =====================================================

ALTER TABLE public.patient_tinnitus_assignments
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active'
  CHECK (status IN ('active', 'inactive', 'discontinued'));

-- Migrate existing data: is_active = true -> active, is_active = false -> inactive
UPDATE public.patient_tinnitus_assignments
  SET status = CASE WHEN is_active THEN 'active' ELSE 'inactive' END
  WHERE status IS NULL OR status = '';

-- Drop old column and index
DROP INDEX IF EXISTS public.idx_patient_tinnitus_active;
ALTER TABLE public.patient_tinnitus_assignments DROP COLUMN IF EXISTS is_active;

-- Create new index on status
CREATE INDEX IF NOT EXISTS idx_patient_tinnitus_status ON public.patient_tinnitus_assignments(status);
