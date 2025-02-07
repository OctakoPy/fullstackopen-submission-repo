const Notification = ({ message, type }) => {
    if (!message) return null;
  
    const style = {
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
      border: "1px solid",
      color: type === "error" ? "#a94442" : "#3c763d",
      background: type === "error" ? "#f2dede" : "#dff0d8",
      borderColor: type === "error" ? "#ebccd1" : "#d6e9c6",
    };
  
    return <div style={style}>{message}</div>;
  };
  
  export default Notification;
  