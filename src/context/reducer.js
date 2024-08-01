const reducer = (state, action) => {
    switch (action.type) {
        case "SUCCESS":
            console.log(action.type)
          return { ...state, success: action.payload };
        default:
          return state;
      }
    };
  
  export default reducer