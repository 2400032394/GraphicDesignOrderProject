import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import Message from "../components/Message.jsx";
import OrderForm from "../components/OrderForm.jsx";
import {
  deleteOrder as removeOrder,
  fetchOrderById,
  fetchOrders,
  getApiErrorMessage,
  updateOrder,
} from "../services/orderService.js";

function DisplayOrders() {
  const [orders, setOrders] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingOrder, setEditingOrder] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [details, setDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");
  const requestInProgress = useRef(false);

  const loadOrders = useCallback(async () => {
    if (requestInProgress.current) return;
    requestInProgress.current = true;
    setIsLoading(true);
    setLoadError("");
    try {
      setOrders(await fetchOrders());
    } catch (requestError) {
      setLoadError(getApiErrorMessage(requestError, "Unable to load orders."));
    } finally {
      requestInProgress.current = false;
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadOrders);
  }, [loadOrders]);

  function startEdit(order) {
    setEditingOrder(order);
    setStatusMessage(null);
  }

  async function saveOrder(order) {
    setStatusMessage(null);
    setIsSaving(true);
    try {
      await updateOrder(order);
      setEditingOrder(null);
      setStatusMessage({ type: "success", text: "Order updated successfully." });
      await loadOrders();
    } catch (requestError) {
      setStatusMessage({
        type: "danger",
        text: getApiErrorMessage(requestError, "Unable to update this order."),
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteOrder(id) {
    if (!window.confirm(`Delete order #${id}? This action cannot be undone.`)) return;

    setStatusMessage(null);
    setDeletingId(id);
    try {
      await removeOrder(id);
      setStatusMessage({ type: "success", text: `Order #${id} deleted successfully.` });
      if (editingOrder?.id === id) setEditingOrder(null);
      await loadOrders();
    } catch (requestError) {
      setStatusMessage({
        type: "danger",
        text: getApiErrorMessage(requestError, "Unable to delete this order."),
      });
    } finally {
      setDeletingId(null);
    }
  }

  async function showDetails(id) {
    setDetails(null);
    setDetailsError("");
    setDetailsLoading(true);
    try {
      const order = await fetchOrderById(id);
      if (!order || typeof order !== "object" || Array.isArray(order)) {
        throw new Error("The server returned an unexpected order response.");
      }
      setDetails(order);
    } catch (requestError) {
      setDetailsError(getApiErrorMessage(requestError, "Unable to load order details."));
    } finally {
      setDetailsLoading(false);
    }
  }

  const filteredOrders = orders.filter((order) => {
    const query = search.trim().toLowerCase();
    return (
      !query ||
      String(order.id).toLowerCase().includes(query) ||
      String(order.clientName ?? "").toLowerCase().includes(query) ||
      String(order.designType ?? "").toLowerCase().includes(query)
    );
  });

  return (
    <section className="container content-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Order management</p>
          <h1>All orders</h1>
          <p className="form-description">A clear view of every brief moving through your studio.</p>
        </div>
        <Link className="btn btn-primary" to="/add">Add new order</Link>
      </div>

      {statusMessage && (
        <Message type={statusMessage.type} onDismiss={() => setStatusMessage(null)}>
          {statusMessage.text}
        </Message>
      )}
      {loadError && (
        <Message type="danger" onDismiss={() => setLoadError("")}>
          {loadError}
        </Message>
      )}

      {editingOrder && (
        <section className="edit-panel" aria-labelledby="edit-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Make a change</p>
              <h2 id="edit-heading">Update order <span className="text-muted">#{editingOrder.id}</span></h2>
            </div>
          </div>
          <OrderForm
            key={editingOrder.id}
            initialOrder={editingOrder}
            onSubmit={saveOrder}
            submitLabel="Save changes"
            onCancel={() => setEditingOrder(null)}
            isSubmitting={isSaving}
          />
        </section>
      )}

      <div className="orders-toolbar">
        <div className="search-field">
          <label className="visually-hidden" htmlFor="orderSearch">Search orders</label>
          <span aria-hidden="true">⌕</span>
          <input
            id="orderSearch"
            className="form-control"
            type="search"
            placeholder="Search by client, design, or ID"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => void loadOrders()}
          disabled={isLoading}
        >
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {isLoading ? (
        <Loading label="Loading orders..." />
      ) : orders.length === 0 ? (
        <div className="empty-panel">
          <p className="empty-title">{loadError ? "Orders are unavailable right now." : "No orders just yet."}</p>
          <p>{loadError ? "Check that the backend is running, then refresh to try again." : "Add a client request and it will appear here."}</p>
          {!loadError && <Link className="text-link" to="/add">Add your first order <span aria-hidden="true">→</span></Link>}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="empty-panel">
          <p className="empty-title">No matching orders.</p>
          <p>Try a different client name, design type, or order ID.</p>
        </div>
      ) : (
        <div className="table-card">
          <div className="table-responsive">
            <table className="table orders-table align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Client</th>
                  <th scope="col">Design type</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="order-id">#{order.id}</td>
                    <td className="client-cell">{order.clientName}</td>
                    <td>{order.designType}</td>
                    <td>₹{Number(order.price).toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${order.approved ? "status-approved" : "status-pending"}`}>
                        <span className="status-dot" aria-hidden="true" />
                        {order.approved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => startEdit(order)}>
                          Update
                        </button>
                        <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => void showDetails(order.id)}>
                          Details
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          type="button"
                          onClick={() => void handleDeleteOrder(order.id)}
                          disabled={deletingId === order.id}
                        >
                          {deletingId === order.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            Showing {filteredOrders.length} of {orders.length} {orders.length === 1 ? "order" : "orders"}
          </div>
        </div>
      )}

      {(detailsLoading || detailsError || details) && (
        <div className="modal-backdrop-custom" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget && !detailsLoading) {
            setDetails(null);
            setDetailsError("");
          }
        }}>
          <section className="details-dialog" role="dialog" aria-modal="true" aria-labelledby="details-heading">
            <button
              className="dialog-close"
              type="button"
              aria-label="Close order details"
              disabled={detailsLoading}
              onClick={() => { setDetails(null); setDetailsError(""); }}
            >
              &times;
            </button>
            <p className="eyebrow">Order details</p>
            <h2 id="details-heading">{details ? `Order #${details.id}` : "Loading order"}</h2>
            {detailsLoading && <Loading label="Fetching order details..." />}
            {detailsError && <Message type="danger">{detailsError}</Message>}
            {details && (
              <dl className="details-list">
                <div><dt>Client</dt><dd>{details.clientName}</dd></div>
                <div><dt>Design type</dt><dd>{details.designType}</dd></div>
                <div><dt>Price</dt><dd>₹{Number(details.price).toFixed(2)}</dd></div>
                <div><dt>Status</dt><dd>{details.approved ? "Approved" : "Pending"}</dd></div>
              </dl>
            )}
          </section>
        </div>
      )}
    </section>
  );
}

export default DisplayOrders;
