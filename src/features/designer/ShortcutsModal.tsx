import { Modal } from '../../components/ui';
import { useUiStore } from '../../stores/uiStore';

const GROUPS: Array<{ title: string; items: Array<[string, string]> }> = [
  {
    title: 'History',
    items: [
      ['Undo', 'Ctrl/Cmd + Z'],
      ['Redo', 'Ctrl/Cmd + Shift + Z'],
    ],
  },
  {
    title: 'Elements',
    items: [
      ['Copy', 'Ctrl/Cmd + C'],
      ['Paste', 'Ctrl/Cmd + V'],
      ['Duplicate', 'Ctrl/Cmd + D'],
      ['Delete', 'Delete / Backspace'],
      ['Deselect', 'Escape'],
      ['Edit text', 'Double-click'],
    ],
  },
  {
    title: 'Canvas',
    items: [
      ['Nudge 1 px', 'Arrow keys'],
      ['Nudge 10 px', 'Shift + Arrows'],
      ['Zoom', 'Mouse wheel'],
      ['Pan', 'Drag empty canvas'],
      ['Command palette', 'Ctrl/Cmd + K'],
    ],
  },
];

export function ShortcutsModal() {
  const open = useUiStore((s) => s.shortcutsOpen);
  const setOpen = useUiStore((s) => s.setShortcutsOpen);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      title="Keyboard shortcuts"
      description="Everything the studio responds to."
      size="md"
    >
      <div className="space-y-6">
        {GROUPS.map((group) => (
          <section key={group.title}>
            <h3 className="panel-title mb-2">{group.title}</h3>
            <ul className="overflow-hidden rounded-lg border border-gray-200">
              {group.items.map(([action, keys], i) => (
                <li
                  key={action}
                  className={`flex items-center justify-between gap-4 px-3 py-2 text-sm ${
                    i > 0 ? 'border-t border-gray-100' : ''
                  }`}
                >
                  <span className="text-gray-700">{action}</span>
                  <kbd className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-2xs text-gray-600">
                    {keys}
                  </kbd>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Modal>
  );
}
