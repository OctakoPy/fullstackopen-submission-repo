const Notification = ({ message }) => {
    if (!message) return null;
  
    return (
      <div style={{
        background: "#dff0d8",
        color: "#3c763d",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #3c763d"
      }}>
        {message}
      </div>
    );
  };
  
  export default Notification;
  