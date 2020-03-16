import React from 'react'
import { graphql } from 'react-relay'
import PropTypes from 'prop-types'

import UserTypes from '@types/User.types'
import QueryWrapper from '@componentUtils/QueryWrapper'
import GlobalContext from './index'

export const userInfoQuery = graphql`
  query GlobalContextProviderQuery {
    user {
      id
      legacyId
      Email
      Type
    }
  }
`

export default function GlobalContextProvider({ children }) {
  return (
    <QueryWrapper
      query={userInfoQuery}
      component={node => <Provider node={node}>{children}</Provider>}
    />
  )
}

GlobalContextProvider.propTypes = {
  children: PropTypes.node
}

const initialState = {
  aModalIsOpen: false,
  loginModalIsOpen: false
}

const actions = {
  OPEN_LOGIN_MODAL: 'OPEN_LOGIN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL'
}

function reducer(state, action) {
  console.log('existing state', state)
  console.log('action', action)
  switch (action.type) {
    case action.OPEN_LOGIN_MODAL:
      return { ...state, loginModalIsOpen: true, aModalIsOpen: true }
    case action.CLOSE_MODAL:
      return { ...state, loginModalIsOpen: false, aModalIsOpen: false }
    default:
      return state
  }
}

export function Provider({ node, children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  // TODO: Rename these with a better convention, like "is____" and "set_____"
  console.log('provider')
  const value = {
    user: node.user,
    aModalIsOpen: state.aModalIsOpen,
    loginModalIsOpen: state.loginModalIsOpen,
    openLoginModal: () => {
      dispatch({ type: actions.OPEN_LOGIN_MODAL })
    },
    closeModal: () => {
      dispatch({ type: actions.CLOSE_MODAL })
    }
  }
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

Provider.propTypes = {
  node: PropTypes.shape({
    user: UserTypes
  }),
  children: PropTypes.node
}
