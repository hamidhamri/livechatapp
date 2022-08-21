export const themeReducer = (state = {}, action) => {
  switch (action.type) {
    case "THEME":
      return { theme: action.payload };
    default:
      return state;
  }
};
