const orderReceivedReducer = (state, action) => {
  switch (action.type) {
    case 'order':
      return {
        ...state,
        order: action.payload
      }
    case 'isLoading':
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      console.error('Field not supported: ' + action.type)
      return null
  }
}

export default orderReceivedReducer
