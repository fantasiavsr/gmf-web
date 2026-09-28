export default function EntityDeleteDialog({ entity, entityType = "entity", schema, onClose, onConfirm }) {
  const label = schema?.label || entityType;
  const name = schema?.getDisplayName?.(entity) || entity?.name || label;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-primary-dark-card rounded-2xl p-6 md:p-8 w-full max-w-md mx-4 shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/20"><span className="text-xl text-red-600">!</span></div>
          <div>
            <h2 className="text-xl font-bold text-primary-black dark:text-primary-white">Delete {label}</h2>
            <p className="mt-1 text-sm text-primary-black/60 dark:text-primary-white/60">Are you sure you want to delete “{name}”? This action cannot be undone.</p>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-primary-black/10 dark:border-primary-white/10">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-primary-black/10 dark:border-primary-white/10 text-primary-black dark:text-primary-white hover:bg-primary-black/5 dark:hover:bg-primary-white/5">Cancel</button>
          <button onClick={() => onConfirm?.(entity, { entityType, schema })} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">Delete {label}</button>
        </div>
      </div>
    </div>
  );
}

export { EntityDeleteDialog };
