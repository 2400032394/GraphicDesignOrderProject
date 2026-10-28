import { useState } from "react";
import { Link } from "react-router-dom";
import Message from "../components/Message.jsx";
import OrderForm from "../components/OrderForm.jsx";
import { addOrder, getApiErrorMessage } from "../services/orderService.js";

function AddOrder() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(order) {
    setMessage("");
    setError("");
    setIsSubmitting(true);
    try {
      await addOrder(order);
      setMessage("Order added successfully.");
      return true;
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Unable to add this order."));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="container content-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">New design request</p>
          <h1>Add an order</h1>
          <p className="form-description">Capture the essentials and keep the creative work moving.</p>
        </div>
        <Link className="text-link" to="/display">View all orders <span aria-hidden="true">→</span></Link>
      </div>
      <div className="form-layout">
        <div className="form-card">
          <Message type="success">{message}</Message>
          <Message type="danger">{error}</Message>
          <OrderForm onSubmit={handleSubmit} submitLabel="Create order" isSubmitting={isSubmitting} />
        </div>
        <aside className="form-aside">
          <span className="aside-number">01</span>
          <h2>Every good design begins with the details.</h2>
          <p>Enter the client, the kind of work, and the agreed price. You can update approval as the project progresses.</p>
          <Link className="text-link" to="/display">Back to order list <span aria-hidden="true">→</span></Link>
        </aside>
      </div>
    </section>
  );
}

export default AddOrder;
