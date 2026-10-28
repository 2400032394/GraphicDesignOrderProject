function Message({ type = "info", children, onDismiss }) {
  if (!children) return null;

  return (
    <div className={`alert alert-${type} message-alert`} role="alert">
      <span>{children}</span>
      {onDismiss && (
        <button
          className="message-dismiss"
          type="button"
          aria-label="Dismiss message"
          onClick={onDismiss}
        >
          &times;
        </button>
      )}
    </div>
  );
}

export default Message;
