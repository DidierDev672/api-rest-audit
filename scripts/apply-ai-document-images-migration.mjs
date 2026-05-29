/**
 * Aplica la migración que permite file_type = 'image' en ai_document_uploads.
 *
 * Uso (necesitas la contraseña de Postgres del proyecto Supabase):
 *   set DATABASE_URL=postgresql://postgres.[ref]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
 *   node scripts/apply-ai-document-images-migration.mjs
 *
 * También puedes pegar el SQL en Supabase Dashboard → SQL Editor:
 *   supabase/migrations/20260527220000_ai_document_images_support.sql
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sqlPath = join(
  __dirname,
  "..",
  "supabase",
  "migrations",
  "20260527220000_ai_document_images_support.sql",
);

const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;

if (!databaseUrl) {
  console.error(
    "Define DATABASE_URL o SUPABASE_DB_URL (connection string de Postgres en Supabase → Project Settings → Database).",
  );
  console.error("\nSQL a ejecutar manualmente:\n");
  console.error(readFileSync(sqlPath, "utf8"));
  process.exit(1);
}

const { default: pg } = await import("pg");
const client = new pg.Client({ connectionString: databaseUrl });

try {
  await client.connect();
  const sql = readFileSync(sqlPath, "utf8");
  await client.query(sql);
  console.log("Migración aplicada: file_type 'image' habilitado en ai_document_uploads.");
} catch (err) {
  console.error("Error al aplicar migración:", err.message);
  process.exit(1);
} finally {
  await client.end();
}
