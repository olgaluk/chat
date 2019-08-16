export const changeUsername = (username) => ({
  type: 'CHANGE_USERNAME',
  username
})

export const setSerializedState = (props) => ({
  type: 'SET_STATE',
  props
})

export const changePage = (pageName) => ({
  type: 'CHANGE_PAGE',
  pageName
})

export const changeMessages = (messages) => ({
  type: 'CHANGE_MESSAGES',
  messages
})
