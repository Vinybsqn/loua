import { Check } from 'lucide-react'

export default function ColorPicker({ colors, selected, onSelect, label, optional = false }) {
  return (
    <div>
      <p className="text-sm font-semibold text-[#1C1717] mb-3">
        {label}
        {!optional && <span className="text-[#C85888] ml-1">*</span>}
        {optional && <span className="text-[#1C1717]/40 ml-1 font-normal">(optionnel)</span>}
      </p>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const isSelected = selected?.id === color.id
          const isDark = ['#1C1717', '#181818', '#182040', '#1E6840', '#007878', '#5870A0', '#C01858', '#E01078'].includes(color.hex)
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => onSelect(isSelected && optional ? null : color)}
              title={color.name}
              className={`w-10 h-10 rounded-full border-2 cursor-pointer hover:scale-110 transition-transform relative flex-shrink-0 ${
                isSelected
                  ? 'ring-2 ring-offset-2 ring-[#C85888] border-transparent'
                  : 'border-white shadow-md'
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {isSelected && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check size={14} className={isDark ? 'text-white' : 'text-[#1C1717]/70'} strokeWidth={3} />
                </span>
              )}
            </button>
          )
        })}
      </div>
      {selected && (
        <p className="mt-2 text-xs text-[#1C1717]/50 flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-full border border-white shadow-sm flex-shrink-0"
            style={{ backgroundColor: selected.hex }}
          />
          {selected.name}
        </p>
      )}
    </div>
  )
}
