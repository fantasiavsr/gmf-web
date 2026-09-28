import { Check, Edit, Trash2, X } from "lucide-react";
import { useState } from "react";
import EntityFormModal from "./EntityFormModal";
import EntityDeleteDialog from "./EntityDeleteDialog";
import { formatFieldValue, getField } from "../data-management/entitySchemas";
import { productEntitySchema } from "../data-management/entitySchemas";

function renderValue(entity, schema, key) {
  const field = getField(schema, key);
  if (!field) return "—";
  return formatFieldValue(entity, field);
}

function FieldBadge({ value }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${value === "active" || value === true ? "bg-primary-sage-strong/20 text-primary-sage-strong" : "bg-primary-black/10 dark:bg-primary-white/10 text-primary-black/60 dark:text-primary-white/60"}`}
    >
      {String(value)}
    </span>
  );
}

export default function EntityCard({
  entity,
  schema = productEntitySchema,
  onEdit,
  onDelete,
  onSave,
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const columns =
    schema.card?.desktopKeys ||
    schema.fields.slice(0, 6).map((field) => field.key);
  const mobileKeys = schema.card?.mobileKeys || columns;
  const title = schema.card?.titleKey || schema.fields[0]?.key;
  const fieldFor = (key) => getField(schema, key);
  const edit = () => setIsFormOpen(true);
  const remove = () => setIsDeleteOpen(true);
  const actions = (
    <div className="flex items-center gap-1">
      <button
        onClick={edit}
        className="p-1.5 rounded-lg text-primary-black/60 dark:text-primary-white/60 hover:text-primary-orange transition-colors"
        aria-label={`Edit ${renderValue(entity, schema, title)}`}
      >
        <Edit size={16} />
      </button>
      <button
        onClick={remove}
        className="p-1.5 rounded-lg text-primary-black/60 dark:text-primary-white/60 hover:text-red-600 transition-colors"
        aria-label={`Delete ${renderValue(entity, schema, title)}`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );

  return (
    <>
      <div className="group block p-6 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card hover:border-primary-orange transition-smooth">
        <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
          {columns.map((key, index) => {
            const field = fieldFor(key);
            const value = renderValue(entity, schema, key);
            const span = field?.span || (index === 0 ? 4 : 1);
            return (
              <div
                key={key}
                className={`col-span-${span} ${index === columns.length - 1 ? "flex items-center justify-end" : ""}`}
              >
                {field?.variant === "status" || field?.type === "boolean" ? (
                  <FieldBadge value={entity[key]} />
                ) : (
                  <span
                    className={`${index === 0 ? "font-bold " : "text-sm "}${field?.key === "price" ? "text-primary-orange" : "text-primary-black/70 dark:text-primary-white/70"}`}
                  >
                    {value}
                  </span>
                )}
                {key === "available" && Number(entity[key]) > 0 && (
                  <Check size={16} className="text-primary-orange ml-2" />
                )}
                {key === "available" && Number(entity[key]) <= 0 && (
                  <X
                    size={16}
                    className="text-primary-black/30 dark:text-primary-white/30 ml-2"
                  />
                )}
              </div>
            );
          })}
          <div className="col-span-1 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
            {actions}
          </div>
        </div>
        <div className="md:hidden space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-bold text-primary-black dark:text-primary-white">
                {renderValue(entity, schema, title)}
              </h4>
              {mobileKeys
                .slice(1)
                .filter(
                  (key) =>
                    key !== "price" && key !== "status" && key !== "available",
                )
                .map((key) => (
                  <p
                    key={key}
                    className="text-xs text-primary-black/60 dark:text-primary-white/60 mt-1"
                  >
                    {fieldFor(key)?.label}: {renderValue(entity, schema, key)}
                  </p>
                ))}
            </div>
            <div className="flex items-center gap-2">
              {mobileKeys.includes("price") && (
                <span className="font-bold text-primary-orange">
                  {renderValue(entity, schema, "price")}
                </span>
              )}
              {mobileKeys.includes("status") && (
                <FieldBadge value={entity.status} />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-primary-black/5 dark:border-primary-white/5">
            <span className="text-sm text-primary-black/70 dark:text-primary-white/70">
              {mobileKeys.includes("available")
                ? `${renderValue(entity, schema, "available")} available`
                : ""}
            </span>
            {actions}
          </div>
        </div>
      </div>
      {isFormOpen && (
        <EntityFormModal
          entity={entity}
          entityType={schema.type}
          schema={schema}
          onClose={() => setIsFormOpen(false)}
          onSubmit={(data, context) => {
            onSave?.(data, context);
            setIsFormOpen(false);
          }}
        />
      )}
      {isDeleteOpen && (
        <EntityDeleteDialog
          entity={entity}
          entityType={schema.type}
          schema={schema}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={(item, context) => {
            onDelete?.(item, context);
            setIsDeleteOpen(false);
          }}
        />
      )}
    </>
  );
}

export { EntityCard };
