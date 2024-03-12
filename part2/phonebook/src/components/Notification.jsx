function Notification({ message, style }) {
  if (!message) return;

  return (
    <div className={style}>
      <strong>{message}</strong>
    </div>
  );
}

export default Notification;
