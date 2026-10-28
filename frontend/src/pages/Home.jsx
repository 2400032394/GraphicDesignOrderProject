import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import Message from "../components/Message.jsx";
import { fetchOrders, getApiErrorMessage } from "../services/orderService.js";

function Home() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;
    fetchOrders()
      .then((data) => {
        if (isActive) setOrders(data);
      })
      .catch((requestError) => {
        if (isActive) {
          setError(getApiErrorMessage(requestError, "Could not load order summary."));
        }
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const approvedCount = orders.filter((order) => order.approved === true).length;
  const pendingCount = orders.length - approvedCount;

  return (
    <div className="container home-page">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">A calmer way to run your studio</p>
          <h1>Great work starts with an organized brief.</h1>
          <p className="intro">
            Keep every client request, creative deliverable, and approval in one
            clear place.
          </p>
          <div className="home-actions">
            <Link className="btn btn-primary" to="/add">Add New Order</Link>
            <Link className="btn btn-outline-secondary" to="/display">View All Orders</Link>
          </div>
        </div>
        <div className="hero-note" aria-label="Studio workflow">
          <span className="note-kicker">Your studio, in sync</span>
          <strong>Brief it.<br />Make it.<br /><span>Make it matter.</span></strong>
          <span className="note-line" />
          <span className="note-caption">Creative work, thoughtfully managed.</span>
        </div>
      </section>

      <section className="summary-section" aria-labelledby="summary-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">At a glance</p>
            <h2 id="summary-heading">Your order overview</h2>
          </div>
          <Link className="text-link" to="/display">Go to orders <span aria-hidden="true">→</span></Link>
        </div>
        {isLoading ? (
          <Loading label="Loading your order summary..." />
        ) : error ? (
          <Message type="warning">{error}</Message>
        ) : orders.length === 0 ? (
          <div className="empty-panel">
            <p className="empty-title">Your next project starts here.</p>
            <p>No orders yet. Add your first client request to see your studio summary.</p>
            <Link className="text-link" to="/add">Create the first order <span aria-hidden="true">→</span></Link>
          </div>
        ) : (
          <div className="row g-3">
            <div className="col-12 col-md-4">
              <article className="summary-card">
                <span className="summary-label">Total orders</span>
                <strong>{orders.length}</strong>
                <span className="summary-footnote">Across all your design work</span>
              </article>
            </div>
            <div className="col-12 col-md-4">
              <article className="summary-card summary-card-approved">
                <span className="summary-label">Approved</span>
                <strong>{approvedCount}</strong>
                <span className="summary-footnote">Ready to move forward</span>
              </article>
            </div>
            <div className="col-12 col-md-4">
              <article className="summary-card summary-card-pending">
                <span className="summary-label">Pending</span>
                <strong>{pendingCount}</strong>
                <span className="summary-footnote">Awaiting a decision</span>
              </article>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
