import { useEffect, useState } from 'react';
import { LayoutTemplate, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminFetchTemplates, adminTemplates } from '../../services/adminService';
import { apiErrorMessage } from '../../services/apiClient';
import type { DesignTemplate } from '../../types/catalog';
import { Badge, ConfirmDialog, EmptyState, PageHeader, Skeleton } from '../../components/ui';
import { TemplateThumbnail } from '../designer/TemplateThumbnail';

type AdminTemplate = DesignTemplate & { status: 'ACTIVE' | 'INACTIVE' };

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState<AdminTemplate[] | null>(null);
  const [deleting, setDeleting] = useState<AdminTemplate | null>(null);
  const [busy, setBusy] = useState(false);

  async function reload() {
    setTemplates(await adminFetchTemplates());
  }
  useEffect(() => {
    void reload().catch(() => setTemplates([]));
  }, []);

  async function toggle(template: AdminTemplate) {
    await adminTemplates
      .update(template.id, { status: template.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' })
      .catch((err) => toast.error(apiErrorMessage(err)));
    await reload();
  }

  async function remove() {
    if (!deleting) return;
    setBusy(true);
    try {
      await adminTemplates.remove(deleting.id);
      toast.success('Template deleted');
      setDeleting(null);
      await reload();
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Catalog"
        title="Design templates"
        description="Starter layouts offered inside the designer. Toggle one off to hide it from customers."
      />

      <div className="mt-5 flex gap-3 rounded-xl border border-gray-200 bg-gray-50/70 p-4">
        <LayoutTemplate className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" strokeWidth={1.8} />
        <p className="text-xs leading-relaxed text-gray-600">
          Templates ship with the seed data. New ones are created via{' '}
          <code className="rounded border border-gray-200 bg-white px-1.5 py-0.5 font-mono text-2xs text-gray-800">
            POST /api/templates
          </code>{' '}
          — see the seed script for the JSON shape.
        </p>
      </div>

      {templates === null ? (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4]" />
          ))}
        </div>
      ) : templates.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={<LayoutTemplate className="h-5 w-5" strokeWidth={1.8} />}
            title="No templates"
            description="Seed the database or POST a template to populate the designer gallery."
          />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
          {templates.map((template) => (
            <figure key={template.id} className="group">
              <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-surface-sunken transition-colors group-hover:border-gray-300">
                <TemplateThumbnail template={template} />
                <button
                  className="absolute right-2 top-2 rounded-md border border-gray-200 bg-white/95 p-1.5 text-gray-500 opacity-0 shadow-card backdrop-blur transition-all hover:text-red-700 focus-visible:opacity-100 group-hover:opacity-100"
                  onClick={() => setDeleting(template)}
                  aria-label={`Delete ${template.name}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <figcaption className="flex items-start justify-between gap-2 pt-2.5">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-gray-900">{template.name}</p>
                  <p className="truncate text-2xs text-gray-500">{template.category}</p>
                </div>
                <button
                  onClick={() => toggle(template)}
                  title={template.status === 'ACTIVE' ? 'Hide from designer' : 'Show in designer'}
                >
                  <Badge tone={template.status === 'ACTIVE' ? 'success' : 'neutral'} dot>
                    {template.status === 'ACTIVE' ? 'Live' : 'Off'}
                  </Badge>
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={remove}
        title="Delete template?"
        message={`“${deleting?.name}” will no longer be offered in the designer. Existing designs are unaffected.`}
        busy={busy}
      />
    </div>
  );
}
