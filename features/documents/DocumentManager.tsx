"use client";

import { useRef, useState } from "react";
import { useDocuments } from "@/store/useDocuments";
import { putBlob, deleteBlob } from "@/lib/blobStore";
import {
  DOCUMENT_KINDS,
  DOCUMENT_KIND_LABELS,
  type DocumentKind,
  type NewDocumentInput,
} from "@/types";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

function uid() {
  return globalThis.crypto?.randomUUID?.() ?? `blob-${Date.now()}`;
}

export function DocumentForm({
  tripId,
  onAdded,
}: {
  tripId: string;
  onAdded?: () => void;
}) {
  const addDocument = useDocuments((s) => s.addDocument);
  const fileRef = useRef<HTMLInputElement>(null);
  const [kind, setKind] = useState<DocumentKind>("passport");
  const [title, setTitle] = useState("");
  const [expiry, setExpiry] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [hasFile, setHasFile] = useState(false);

  async function handleFile() {
    const file = fileRef.current?.files?.[0];
    if (!file || !title) return;
    setSaving(true);
    const blobKey = uid();
    await putBlob(blobKey, file);
    const input: NewDocumentInput = {
      tripId,
      kind,
      title,
      blobKey,
      mimeType: file.type || undefined,
      fileName: file.name,
      expiryDate: expiry || undefined,
      notes: notes || undefined,
    };
    addDocument(input);
    setTitle("");
    setExpiry("");
    setNotes("");
    setHasFile(false);
    if (fileRef.current) fileRef.current.value = "";
    setSaving(false);
    onAdded?.();
  }

  return (
    <Card size="sm">
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-slate-400">
            Type
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value as DocumentKind)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
            >
              {DOCUMENT_KINDS.map((k) => (
                <option key={k} value={k}>
                  {DOCUMENT_KIND_LABELS[k]}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs text-slate-400">
            Expiry (optional)
            <Input
              type="date"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="mt-1"
            />
          </label>
        </div>
        <Input
          placeholder="Title (e.g. Singapore Visa)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <input
          ref={fileRef}
          type="file"
          className="text-sm text-slate-400"
          onChange={(e) => setHasFile(Boolean(e.target.files?.length))}
        />
        <Button
          size="sm"
          disabled={!title || !hasFile || saving}
          onClick={handleFile}
        >
          {saving ? "Saving…" : "Add Document"}
        </Button>
      </CardContent>
    </Card>
  );
}

export function DocumentList({
  tripId,
  onDeleted,
}: {
  tripId: string;
  onDeleted?: () => void;
}) {
  const documents = useDocuments((s) => s.documents);
  const removeDocument = useDocuments((s) => s.removeDocument);
  const tripDocs = documents.filter((d) => d.tripId === tripId);

  if (tripDocs.length === 0) {
    return <p className="text-sm text-slate-500">No documents saved yet.</p>;
  }

  return (
    <div className="space-y-2">
      {tripDocs.map((d) => (
        <div
          key={d.id}
          className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3"
        >
          <div>
            <p className="text-sm font-medium text-white">
              {DOCUMENT_KIND_LABELS[d.kind]} · {d.title}
            </p>
            <p className="text-xs text-slate-500">
              {d.fileName ?? d.mimeType ?? "file"}
              {d.expiryDate ? ` · expires ${d.expiryDate}` : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`#doc-${d.id}`}
              onClick={async (e) => {
                e.preventDefault();
                const blob = await getBlobSafe(d.blobKey);
                if (blob) window.open(URL.createObjectURL(blob), "_blank");
              }}
              className="text-xs font-medium text-emerald-400"
            >
              View
            </a>
            <Button
              size="sm"
              variant="ghost"
              className="text-destructive hover:bg-destructive/10"
              onClick={async () => {
                await deleteBlob(d.blobKey).catch(() => {});
                removeDocument(d.id);
                onDeleted?.();
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

async function getBlobSafe(key: string) {
  try {
    const { getBlob } = await import("@/lib/blobStore");
    return await getBlob(key);
  } catch {
    return undefined;
  }
}
