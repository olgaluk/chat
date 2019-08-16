const initialState = {
  page: 'landing',
  username: '',
  active: false,
  messages: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATE':
      let { props } = action;
      return props;

    case 'CHANGE_USERNAME':
      return {
        ...state,
        username: action.username
      }

    case 'CHANGE_PAGE':
      return {
        ...state,
        page: action.pageName
      }

    case 'CHANGE_MESSAGES':
      return {
        ...state,
        messages: action.messages
      }

    default:
      return state
  }
}
