-- Permite file_type = 'image' en ai_document_uploads y MIME de imagen en Storage.

ALTER TABLE ai_document_uploads
  DROP CONSTRAINT IF EXISTS ai_document_uploads_file_type_check;

ALTER TABLE ai_document_uploads
  ADD CONSTRAINT ai_document_uploads_file_type_check
  CHECK (file_type IN ('pdf', 'word', 'image'));

UPDATE storage.buckets
SET allowed_mime_types = ARRAY[
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/bmp'
]::text[]
WHERE id = 'ai-documents';
