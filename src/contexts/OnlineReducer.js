const OnlineReducer = (state, action) => {
  switch (action.type) {
    case "SET_ONLINE":
      return {
        isOnline: true,
      };
    case "SET_OFFLINE":
      return {
        isOnline: false,
      };
    case "TRY_AGAIN":
      return {
        isOnline: action.payload.online,
      };
    default:
  }
};

export default OnlineReducer;
