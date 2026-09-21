import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import clsx from 'clsx';
import {
  readinessFromIssues,
  type DesignValidationIssue,
  type ProductionReadiness,
} from '@cpd/shared';
import { Modal, Spinner } from '../../components/ui';
import { useDesignerStore } from '../../stores/designerStore';

const READINESS_STYLES: Record<ProductionReadiness, { label: string; cls: string }> = {
  READY: { label: 'Ready for print', cls: 'border-emerald-200 bg-emerald-50 text-emerald-800' },
  WARNING: { label: 'Review warnings', cls: 'border-amber-200 bg-amber-50 text-amber-800' },
  NOT_READY: { label: 'Not ready', cls: 'border-red-200 bg-red-50 text-red-800' },
};

/**
 * Pre-cart production validation (§45): shows every issue found by the
 * shared validation engine. Only genuinely critical errors block checkout;
 * warnings can be acknowledged.
 */
export function ValidationModal({
  open,
  issues,
  onClose,
  onProceed,
  busy,
}: {
  open: boolean;
  issues: DesignValidationIssue[];
  onClose: () => void;
  onProceed: () => void;
  busy: boolean;
}) {
  const readiness = readinessFromIssues(issues);
  const style = READINESS_STYLES[readiness];

  function jumpTo(issue: DesignValidationIssue) {
    const store = useDesignerStore.getState();
    if (issue.areaKey) store.setActiveArea(issue.areaKey);
    if (issue.elementId) store.select(issue.elementId);
    store.setPreviewMode('2d');
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Print check" size="md">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className={clsx(
            'inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-2xs font-medium uppercase tracking-label',
            style.cls,
          )}>
          {style.label}
        </span>
        <span className="text-sm text-gray-600">
          {issues.length === 0
            ? 'Everything looks good for production.'
            : `${issues.length} item${issues.length === 1 ? '' : 's'} to review`}
        </span>
      </div>

      {issues.length > 0 && (
        <ul className="max-h-72 space-y-2 overflow-y-auto pr-1 scroll-thin">
          {issues.map((issue, i) => (
            <li
              key={`${issue.code}-${i}`}
              className={clsx(
                'flex items-start gap-2.5 rounded-lg border p-3 text-sm leading-relaxed',
                issue.level === 'error'
                  ? 'border-red-200 bg-red-50 text-red-800'
                  : 'border-amber-200 bg-amber-50 text-amber-800',
              )}
            >
              {issue.level === 'error' ? (
                <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              <div className="flex-1">
                <p>{issue.message}</p>
                {(issue.areaKey || issue.elementId) && (
                  <button
                    className="mt-1.5 text-xs font-medium underline decoration-current/40 underline-offset-2 transition-colors hover:decoration-current"
                    onClick={() => jumpTo(issue)}
                  >
                    Show me
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex justify-end gap-2 border-t border-gray-100 pt-5">
        <button className="btn-ghost" onClick={onClose} disabled={busy}>
          Keep editing
        </button>
        <button
          className="btn-primary"
          onClick={onProceed}
          disabled={busy || readiness === 'NOT_READY'}
          title={readiness === 'NOT_READY' ? 'Fix the errors above first' : undefined}
        >
          {busy ? <Spinner className="h-4 w-4 text-white" /> : <CheckCircle2 className="h-4 w-4" />}
          {readiness === 'WARNING' ? 'Add to cart anyway' : 'Add to cart'}
        </button>
      </div>
    </Modal>
  );
}
