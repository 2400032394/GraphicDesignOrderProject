import { useState } from "react";

const EMPTY_ORDER = {
  clientName: "",
  designType: "",
  price: "",
  approved: "true",
};

function OrderForm({
  initialOrder,
  onSubmit,
  submitLabel,
  onCancel,
  isSubmitting = false,
}) {
  const [values, setValues] = useState(() =>
    initialOrder
      ? {
          clientName: initialOrder.clientName ?? "",
          designType: initialOrder.designType ?? "",
          price: String(initialOrder.price ?? ""),
          approved: String(Boolean(initialOrder.approved)),
        }
      : EMPTY_ORDER,
  );
  const [validationError, setValidationError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setValidationError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const clientName = values.clientName.trim();
    const designType = values.designType.trim();
    const price = Number(values.price);

    if (!clientName || !designType) {
      setValidationError("Client name and design type are required.");
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      setValidationError("Enter a price greater than zero.");
      return;
    }

    const succeeded = await onSubmit({
      ...(initialOrder ? { id: initialOrder.id } : {}),
      clientName,
      designType,
      price,
      approved: values.approved === "true",
    });

    if (!initialOrder && succeeded !== false) {
      setValues(EMPTY_ORDER);
    }
  }

  return (
    <form className="order-form" onSubmit={handleSubmit} noValidate>
      {validationError && (
        <div className="alert alert-danger mb-0" role="alert">
          {validationError}
        </div>
      )}

      <div>
        <label className="form-label" htmlFor="clientName">
          Client name
        </label>
        <input
          className="form-control"
          id="clientName"
          name="clientName"
          type="text"
          value={values.clientName}
          onChange={handleChange}
          maxLength={100}
          autoComplete="name"
          required
        />
      </div>

      <div>
        <label className="form-label" htmlFor="designType">
          Design type
        </label>
        <input
          className="form-control"
          id="designType"
          name="designType"
          type="text"
          value={values.designType}
          onChange={handleChange}
          maxLength={100}
          placeholder="Logo Design"
          required
        />
      </div>

      <div>
        <label className="form-label" htmlFor="price">
          Price
        </label>
        <input
          className="form-control"
          id="price"
          name="price"
          type="number"
          value={values.price}
          onChange={handleChange}
          min="0.01"
          step="0.01"
          inputMode="decimal"
          required
        />
      </div>

      <div>
        <label className="form-label" htmlFor="approved">
          Approval status
        </label>
        <select
          className="form-select"
          id="approved"
          name="approved"
          value={values.approved}
          onChange={handleChange}
          required
        >
          <option value="true">Approved</option>
          <option value="false">Pending</option>
        </select>
      </div>

      <div className="form-actions">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
          )}
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
        {onCancel && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default OrderForm;
