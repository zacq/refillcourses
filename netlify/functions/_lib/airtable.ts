const BASE_ID = process.env.AIRTABLE_BASE_ID ?? "";
const TOKEN = process.env.AIRTABLE_TOKEN ?? "";
const API = `https://api.airtable.com/v0/${BASE_ID}`;

async function airtableFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Airtable ${res.status}: ${text}`);
  }
  return res.json();
}

export interface AirtableRecord {
  id: string;
  fields: Record<string, any>;
}

export async function listAll(table: string): Promise<AirtableRecord[]> {
  let records: AirtableRecord[] = [];
  let offset: string | undefined;
  do {
    const qs = new URLSearchParams({ pageSize: "100" });
    if (offset) qs.set("offset", offset);
    const data = await airtableFetch(`/${encodeURIComponent(table)}?${qs}`);
    records = records.concat(data.records);
    offset = data.offset;
  } while (offset);
  return records;
}

export function escapeFormula(s: string): string {
  return s.replace(/"/g, '\\"');
}

export async function findByFormula(table: string, formula: string): Promise<AirtableRecord | null> {
  const qs = new URLSearchParams({ filterByFormula: formula, pageSize: "1" });
  const data = await airtableFetch(`/${encodeURIComponent(table)}?${qs}`);
  return data.records[0] ?? null;
}

export async function createRecord(table: string, fields: Record<string, unknown>): Promise<AirtableRecord> {
  const data = await airtableFetch(`/${encodeURIComponent(table)}`, {
    method: "POST",
    body: JSON.stringify({ records: [{ fields }] }),
  });
  return data.records[0];
}

export async function updateRecord(table: string, id: string, fields: Record<string, unknown>): Promise<AirtableRecord> {
  const data = await airtableFetch(`/${encodeURIComponent(table)}`, {
    method: "PATCH",
    body: JSON.stringify({ records: [{ id, fields }] }),
  });
  return data.records[0];
}
