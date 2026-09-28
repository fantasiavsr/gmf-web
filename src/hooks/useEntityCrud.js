import { useCallback, useEffect, useState } from "react";
import { safeApiMessage } from "../services/api/config";
import { lastCallUsedMockFallback } from "../services/data";

export default function useEntityCrud(dataSource, entityLabel) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mutationError, setMutationError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [usingMockData, setUsingMockData] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setItems(await dataSource.getAll());
      setUsingMockData(lastCallUsedMockFallback());
    } catch (err) {
      setError(safeApiMessage(err, `Failed to load ${entityLabel.toLowerCase()}`));
    } finally {
      setLoading(false);
    }
  }, [dataSource, entityLabel]);

  useEffect(() => { load(); }, [load]);

  const runMutation = async (operation) => {
    try {
      setIsSaving(true);
      setMutationError(null);
      return await operation();
    } catch (err) {
      const validation = Object.values(err.errors || {}).flat().join(" ");
      setMutationError(validation || safeApiMessage(err, `${entityLabel} operation failed`));
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const create = (data) => runMutation(async () => {
    const created = await dataSource.create(data);
    setItems((current) => [...current, created]);
    setIsCreateOpen(false);
    return created;
  });

  const save = (data, context) => runMutation(async () => {
    const updated = await dataSource.update(context.entity.id, data);
    setItems((current) => current.map((item) => item.id === updated.id ? updated : item));
    return updated;
  });

  const remove = (entity) => runMutation(async () => {
    await dataSource.delete(entity.id);
    setItems((current) => current.filter((item) => item.id !== entity.id));
  });

  return {
    items, loading, error, mutationError, isSaving, isCreateOpen, usingMockData,
    setIsCreateOpen, setMutationError, create, save, remove, reload: load,
  };
}
