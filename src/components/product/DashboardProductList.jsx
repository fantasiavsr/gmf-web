import EntityCard from "../data-management/EntityCard";
import { productEntitySchema } from "../data-management/entitySchemas";

export default function DataList({
  items,
  products,
  schema = productEntitySchema,
  onEdit,
  onDelete,
  onSave,
}) {
  const records = items || products || [];
  const columns =
    schema.card?.desktopKeys ||
    schema.fields.slice(0, 6).map((field) => field.key);
  return (
    <section className="mx-auto md:max-w-7xl">
      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">
          {schema.listTitle || `${schema.pluralLabel || schema.label} List`}
        </h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
          {schema.listDescription || "Manage records and details."}
        </p>
      </div>
      <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 text-xs uppercase tracking-widest text-primary-black/50 dark:text-primary-white/50 border-b border-primary-black/10 dark:border-primary-white/10 mb-2">
        {columns.map((key) => (
          <div
            key={key}
            className={key === "name" ? "col-span-4" : "col-span-1"}
          >
            {schema.fields.find((field) => field.key === key)?.label || key}
          </div>
        ))}
        <div className="col-span-1" />
      </div>
      <div className="space-y-2">
        {records.map((item, index) => (
          <EntityCard
            key={item.id || item.name || index}
            entity={item}
            schema={schema}
            onEdit={onEdit}
            onDelete={onDelete}
            onSave={onSave}
          />
        ))}
      </div>
    </section>
  );
}

export { DataList };
