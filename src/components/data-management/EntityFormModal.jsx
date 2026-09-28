import { useMemo, useState } from "react";
import { X } from "lucide-react";

const inputClass = "w-full px-3.5 py-2.5 rounded-lg border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card text-primary-black dark:text-primary-white text-sm focus:outline-none focus:border-primary-orange focus:ring-1 focus:ring-primary-orange/20 transition-all";

function initialValues(entity, fields) {
  return fields.reduce((values, field) => {
    values[field.key] = entity?.[field.key] ?? field.defaultValue ?? (field.type === "array" ? [] : field.type === "boolean" ? false : "");
    return values;
  }, {});
}

export default function EntityFormModal({ entity, entityType = "entity", schema, fields: providedFields, onClose, onSubmit }) {
  const fields = providedFields || schema?.fields || [];
  const [formData, setFormData] = useState(() => initialValues(entity, fields));
  const [errors, setErrors] = useState({});
  const title = entity ? `Edit ${schema?.label || entityType}` : `Add ${schema?.label || entityType}`;
  const visibleFields = useMemo(() => fields.filter((field) => field.form !== false), [fields]);

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field.key]: value }));
    setErrors((current) => ({ ...current, [field.key]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    visibleFields.forEach((field) => {
      const value = formData[field.key];
      if (field.required && (value === "" || value === null || value === undefined || (Array.isArray(value) && value.length === 0))) nextErrors[field.key] = `${field.label} is required`;
      if (field.min !== undefined && field.type === "number" && Number(value) < field.min) nextErrors[field.key] = `${field.label} must be at least ${field.min}`;
      if (field.validate) {
        const result = field.validate(value, formData);
        if (result) nextErrors[field.key] = result;
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit?.(formData, { entity, entityType, schema });
    if (!onSubmit) onClose?.();
  };

  const renderField = (field) => {
    const value = formData[field.key];
    const common = {
      name: field.key,
      value: field.type === "array" ? value.join("\n") : value,
      onChange: (event) => updateField(field, field.type === "number" ? event.target.value : field.type === "boolean" ? event.target.checked : field.type === "array" ? event.target.value.split("\n") : event.target.value),
      className: inputClass,
    };
    if (field.type === "select") return <select {...common}>{field.options?.map((option) => { const item = typeof option === "string" ? { value: option, label: option } : option; return <option key={item.value} value={item.value}>{item.label}</option>; })}</select>;
    if (field.type === "textarea" || field.type === "array") return <textarea {...common} rows={field.type === "array" ? 4 : 3} placeholder={field.placeholder} />;
    if (field.type === "boolean") return <label className="flex items-center gap-3 text-sm text-primary-black dark:text-primary-white"><input type="checkbox" name={field.key} checked={Boolean(value)} onChange={common.onChange} className="h-4 w-4 accent-primary-orange" />{field.placeholder || field.label}</label>;
    return <input {...common} type={field.type === "image" ? "file" : field.type} min={field.min} max={field.max} accept={field.type === "image" ? "image/*" : undefined} placeholder={field.placeholder} />;
  };

  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white dark:bg-primary-dark-card rounded-2xl p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl"><div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-bold text-primary-black dark:text-primary-white">{title}</h2><button onClick={onClose} className="p-2 rounded-lg hover:bg-primary-black/5 dark:hover:bg-primary-white/5" aria-label="Close"><X size={20} /></button></div><form onSubmit={handleSubmit} className="space-y-5">{visibleFields.map((field) => <div key={field.key}><label className="block text-xs font-medium text-primary-black/60 dark:text-primary-white/60 mb-1.5">{field.label}{field.required ? " *" : ""}</label>{renderField(field)}{errors[field.key] && <p className="text-xs text-red-600 mt-1">{errors[field.key]}</p>}</div>)}<div className="flex justify-end gap-2 pt-2"><button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-primary-black/10 dark:border-primary-white/10 text-primary-black dark:text-primary-white">Cancel</button><button type="submit" className="px-4 py-2 rounded-lg bg-primary-orange text-white hover:bg-primary-orange-strong">{entity ? "Save Changes" : `Add ${schema?.label || entityType}`}</button></div></form></div></div>;
}

export { EntityFormModal };
