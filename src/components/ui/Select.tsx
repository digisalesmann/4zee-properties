'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
}

interface DropdownRect { top: number; left: number; width: number; }

function useDropdownRect(ref: React.RefObject<HTMLDivElement | null>, open: boolean) {
  const [rect, setRect] = useState<DropdownRect | null>(null);

  const update = useCallback(() => {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      setRect({ top: r.bottom + window.scrollY + 6, left: r.left + window.scrollX, width: r.width });
    }
  }, [ref]);

  useEffect(() => {
    if (open) {
      update();
      window.addEventListener('scroll', update, true);
      window.addEventListener('resize', update);
      return () => {
        window.removeEventListener('scroll', update, true);
        window.removeEventListener('resize', update);
      };
    }
  }, [open, update]);

  return rect;
}

export function Select({ value, onChange, options, placeholder = 'Select...', className = '' }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);
  const rect = useDropdownRect(ref, open);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium hover:border-purple-400 focus:outline-none focus:border-purple-500 transition-colors"
      >
        <span className={selected ? 'text-gray-800' : 'text-gray-400'}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && rect && createPortal(
        <div
          style={{ position: 'absolute', top: rect.top, left: rect.left, width: rect.width, zIndex: 9999 }}
          className="bg-white border border-gray-100 rounded-xl shadow-xl shadow-gray-900/10 max-h-60 overflow-y-auto scrollbar-hide"
        >
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                opt.value === value
                  ? 'bg-purple-50 text-purple-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {opt.label}
              {opt.value === value && <Check className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}

/* Dark variant — for dark backgrounds (hero search, dark panels) */
export function DarkSelect({ value, onChange, options, placeholder = 'Select...', className = '' }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);
  const rect = useDropdownRect(ref, open);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl bg-white/8 border border-white/8 text-sm text-white font-medium hover:bg-white/12 hover:border-purple-500/60 focus:outline-none focus:border-purple-500/60 transition-all"
      >
        <span className={selected?.value ? 'text-white' : 'text-white/40'}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-white/40 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && rect && createPortal(
        <div
          style={{ position: 'absolute', top: rect.top, left: rect.left, width: rect.width, zIndex: 9999 }}
          className="bg-[#1e1a3a] border border-white/10 rounded-xl shadow-2xl shadow-black/40 max-h-60 overflow-y-auto scrollbar-hide"
        >
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                opt.value === value
                  ? 'bg-purple-700/50 text-white font-semibold'
                  : 'text-white/70 hover:bg-white/8 hover:text-white'
              }`}
            >
              {opt.label}
              {opt.value === value && <Check className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}
