import { FormEvent, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminPrintAreas } from '../../../services/adminService';
import { apiErrorMessage } from '../../../services/apiClient';
import type { PrintArea, Product } from '../../../types/catalog';
import { Modal, Spinner } from '../../../components/ui';

interface AreaForm {
  key: string;
  name: string;
  width: string;
  height: string;
  safeX: string;
  safeY: string;
  safeW: string;
  safeH: string;
  physicalWidthIn: string;
  physicalHeightIn: string;
  templateImage: string;
  modelMeshName: string;
  mockupLeft: string;
  mockupTop: string;
  mockupWidth: string;
  mockupHeight: string;
  sortOrder: string;
}

const EMPTY: AreaForm = {
  key: '',
  name: '',
  width: '450',
  height: '550',
  safeX: '40',
  safeY: '50',
  safeW: '370',
  safeH: '450',
  physicalWidthIn: '',
  physicalHeightIn: '',
  templateImage: '',
  modelMeshName: '',
  mockupLeft: '',
  mockupTop: '',
  mockupWidth: '',
  mockupHeight: '',
  sortOrder: '0',
};

function toForm(area: PrintArea): AreaForm {
  return {
    key: area.key,
    name: area.name,
    width: String(area.width),
    height: String(area.height),
    safeX: String(area.safeArea.x),
    safeY: String(area.safeArea.y),
    safeW: String(area.safeArea.width),
    safeH: String(area.safeArea.height),
    physicalWidthIn: area.physicalWidthIn ? String(area.physicalWidthIn) : '',
    physicalHeightIn: area.physicalHeightIn ? String(area.physicalHeightIn) : '',
    templateImage: area.templateImage ?? '',
    modelMeshName: area.modelMeshName ?? '',
    mockupLeft: area.mockup ? String(area.mockup.left) : '',
    mockupTop: area.mockup ? String(area.mockup.top) : '',
    mockupWidth: area.mockup ? String(area.mockup.width) : '',
    mockupHeight: area.mockup ? String(area.mockup.height) : '',
    sortOrder: String(area.sortOrder),
  };
}

export function PrintAreasTab({ product, onChanged }: { product: Product; onChanged: () => Promise<void> }) {
  const [editing, setEditing] = useState<PrintArea | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<AreaForm>(EMPTY);
  const [busy, setBusy] = useState(false);

  const openCreate = () => {
    setForm(EMPTY);
    setEditing(null);
    setCreating(true);
  };
  const openEdit = (area: PrintArea) => {
    setForm(toForm(area));
    setEditing(area);
    setCreating(true);
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    const hasMockup = form.mockupLeft !== '' && form.mockupTop !== '' && form.mockupWidth !== '' && form.mockupHeight !== '';
    const payload = {
      key: form.key,
      name: form.name,
      width: Number(form.width),
      height: Number(form.height),
      safeArea: {
        x: Number(form.safeX),
        y: Number(form.safeY),
        width: Number(form.safeW),
        height: Number(form.safeH),
      },
      physicalWidthIn: form.physicalWidthIn ? Number(form.physicalWidthIn) : null,
      physicalHeightIn: form.physicalHeightIn ? Number(form.physicalHeightIn) : null,
      templateImage: form.templateImage || null,
      modelMeshName: form.modelMeshName || null,
      mockup: hasMockup
        ? {
            left: Number(form.mockupLeft),
            top: Number(form.mockupTop),
            width: Number(form.mockupWidth),
            height: Number(form.mockupHeight),
            rotate: 0,
          }
        : null,
      sortOrder: Number(form.sortOrder) || 0,
    };
    try {
      if (editing) {
        await adminPrintAreas.update(product.id, editing.id, payload);
        toast.success('Print area updated');
      } else {
        await adminPrintAreas.create(product.id, payload);
        toast.success('Print area added');
      }
      setCreating(false);
      await onChanged();
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function remove(area: PrintArea) {
    await adminPrintAreas.remove(product.id, area.id).catch((err) => toast.error(apiErrorMessage(err)));
    await onChanged();
  }

  const num = (key: keyof AreaForm, label: string, required = false) => (
    <div>
      <label className="label">{label}</label>
      <input
        className="input"
        type="number"
        step="0.1"
        required={required}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
      />
    </div>
  );

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
        <div>
          <p className="font-semibold text-gray-900">Print areas</p>
          <p className="text-xs text-gray-400">
            Canvas size, safe zone, physical print size, mockup placement and 3D mesh binding.
          </p>
        </div>
        <button className="btn-primary btn-sm" onClick={openCreate}>
          <Plus className="h-3.5 w-3.5" /> Add area
        </button>
      </div>
      <ul className="divide-y divide-gray-50">
        {product.printAreas.map((area) => (
          <li key={area.id} className="flex items-center justify-between gap-3 px-5 py-3">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {area.name} <span className="ml-1 font-mono text-xs text-gray-400">({area.key})</span>
              </p>
              <p className="text-xs text-gray-400">
                {area.width}×{area.height}px · safe {area.safeArea.width}×{area.safeArea.height}
                {area.physicalWidthIn ? ` · ${area.physicalWidthIn}″×${area.physicalHeightIn}″` : ''}
                {area.modelMeshName ? ` · mesh: ${area.modelMeshName}` : ''}
              </p>
            </div>
            <div className="flex gap-1">
              <button className="btn-ghost p-1.5" onClick={() => openEdit(area)}>
                <Pencil className="h-4 w-4" />
              </button>
              <button className="btn-ghost p-1.5 text-red-500" onClick={() => remove(area)}>
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
        {product.printAreas.length === 0 && (
          <li className="px-5 py-8 text-center text-sm text-gray-400">
            No print areas — the designer needs at least one.
          </li>
        )}
      </ul>

      <Modal
        open={creating}
        onClose={() => setCreating(false)}
        title={editing ? `Edit ${editing.name}` : 'Add print area'}
        size="lg"
      >
        <form onSubmit={submit} className="grid gap-3 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <label className="label">Key (stable id)</label>
            <input
              className="input font-mono"
              required
              pattern="[a-z0-9_-]+"
              placeholder="front"
              value={form.key}
              onChange={(e) => setForm((f) => ({ ...f, key: e.target.value }))}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Display name</label>
            <input
              className="input"
              required
              placeholder="Front"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          {num('width', 'Canvas width (px)', true)}
          {num('height', 'Canvas height (px)', true)}
          {num('physicalWidthIn', 'Physical width (in)')}
          {num('physicalHeightIn', 'Physical height (in)')}
          {num('safeX', 'Safe area X', true)}
          {num('safeY', 'Safe area Y', true)}
          {num('safeW', 'Safe width', true)}
          {num('safeH', 'Safe height', true)}
          <div className="sm:col-span-2">
            <label className="label">Mockup image URL</label>
            <input
              className="input"
              placeholder="/images/products/tshirt.svg"
              value={form.templateImage}
              onChange={(e) => setForm((f) => ({ ...f, templateImage: e.target.value }))}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label">3D mesh name</label>
            <input
              className="input font-mono"
              placeholder="front"
              value={form.modelMeshName}
              onChange={(e) => setForm((f) => ({ ...f, modelMeshName: e.target.value }))}
            />
          </div>
          {num('mockupLeft', 'Mockup left %')}
          {num('mockupTop', 'Mockup top %')}
          {num('mockupWidth', 'Mockup width %')}
          {num('mockupHeight', 'Mockup height %')}
          {num('sortOrder', 'Sort order')}
          <div className="sm:col-span-4">
            <button className="btn-primary w-full" disabled={busy}>
              {busy && <Spinner className="h-4 w-4 text-white" />}
              {editing ? 'Save area' : 'Add area'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
