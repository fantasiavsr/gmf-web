export const productEntitySchema = {
  type: "product",
  label: "Product",
  pluralLabel: "Products",
  listTitle: "Product List",
  listDescription: "Example: Inventory view — full-width rows with product details.",
  fields: [
    { key: "name", label: "Name", type: "text", required: true },
    { key: "type", label: "Type", type: "text" },
    { key: "sku", label: "SKU", type: "text", required: true },
    { key: "price", label: "Price", type: "text", format: (value) => value || "—" },
    { key: "status", label: "Status", type: "select", defaultValue: "active", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }], variant: "status" },
    { key: "available", label: "Available", type: "number", min: 0, defaultValue: 0, format: (value) => `${Number(value) || 0}` },
    { key: "description", label: "Description", type: "textarea" },
  ],
  card: { desktopKeys: ["name", "type", "sku", "price", "status", "available"], mobileKeys: ["name", "type", "sku", "price", "status", "available"] },
};

export const serviceEntitySchema = {
  type: "service",
  label: "Service",
  pluralLabel: "Services",
  listTitle: "Service List",
  listDescription: "Manage service offerings, pricing, and delivery details.",
  fields: [
    { key: "name", label: "Name", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea" },
    { key: "included", label: "Included", type: "array", placeholder: "One item per line", defaultValue: [] },
    { key: "price", label: "Price", type: "text" },
    { key: "billingPeriod", label: "Billing Period", type: "select", options: ["year", "month", "day", "usage"], defaultValue: "usage" },
    { key: "duration", label: "Duration", type: "text" },
    { key: "members", label: "Members", type: "number", min: 0, defaultValue: 0 },
  ],
  card: { desktopKeys: ["name", "price", "billingPeriod", "duration", "members"], mobileKeys: ["name", "price", "billingPeriod", "duration", "members"] },
};

export const pricingEntitySchema = {
  type: "pricing",
  label: "Pricing Plan",
  pluralLabel: "Pricing Plans",
  listTitle: "Pricing Plans",
  listDescription: "Configure pricing plans, benefits, and billing details.",
  fields: [
    { key: "name", label: "Name", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea" },
    { key: "price", label: "Price", type: "text" },
    { key: "billingPeriod", label: "Billing Period", type: "select", options: ["year", "month", "day", "usage"], defaultValue: "month" },
    { key: "benefits", label: "Benefits", type: "array", placeholder: "One benefit per line", defaultValue: [] },
    { key: "duration", label: "Duration", type: "text" },
  ],
  card: { desktopKeys: ["name", "price", "billingPeriod", "duration"], mobileKeys: ["name", "price", "billingPeriod", "duration"] },
};

export const entitySchemas = { product: productEntitySchema, service: serviceEntitySchema, pricing: pricingEntitySchema };

export function getField(schema, key) { return schema?.fields?.find((field) => field.key === key); }
export function getFieldValue(entity, field) { return entity?.[field.key]; }
export function formatFieldValue(entity, field) {
  const value = getFieldValue(entity, field);
  if (field.format) return field.format(value, entity);
  if (field.type === "array") return Array.isArray(value) ? value.join(", ") : value || "—";
  if (field.type === "boolean") return value ? "Yes" : "No";
  if (field.type === "date" && value) return new Date(value).toLocaleDateString();
  return value ?? "—";
}
