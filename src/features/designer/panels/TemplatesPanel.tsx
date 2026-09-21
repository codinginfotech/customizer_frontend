import { useEffect, useState } from 'react';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { fetchTemplateCategories, fetchTemplates } from '../../../services/catalogService';
import type { DesignTemplate } from '../../../types/catalog';
import { useDesignerStore } from '../../../stores/designerStore';
import { Spinner } from '../../../components/ui';
import { TemplateThumbnail } from '../TemplateThumbnail';

export function TemplatesPanel() {
  const applyTemplate = useDesignerStore((s) => s.applyTemplate);
  const [templates, setTemplates] = useState<DesignTemplate[] | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    fetchTemplateCategories()
      .then((rows) => setCategories(rows.map((r) => r.category)))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    setTemplates(null);
    fetchTemplates(category || undefined)
      .then(setTemplates)
      .catch(() => setTemplates([]));
  }, [category]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setCategory('')}
          className={clsx(
            'rounded-md px-2 py-1 text-2xs font-medium transition-colors',
            !category ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          )}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={clsx(
              'rounded-md px-2 py-1 text-2xs font-medium transition-colors',
              category === c ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {templates === null ? (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      ) : templates.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 bg-gray-50/60 px-3 py-6 text-center text-2xs text-gray-500">No templates in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                applyTemplate(t);
                toast.success(`Applied "${t.name}"`);
              }}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-colors hover:border-gray-400"
              title={`Apply ${t.name}`}
            >
              <TemplateThumbnail template={t} />
              <span className="block truncate border-t border-gray-100 px-2 py-1.5 text-left text-2xs font-medium text-gray-700">
                {t.name}
              </span>
            </button>
          ))}
        </div>
      )}
      <p className="text-2xs leading-relaxed text-gray-500">
        Templates are added to the current print area — move and restyle everything afterwards.
      </p>
    </div>
  );
}
