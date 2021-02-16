import React, {Component, createContext} from 'react'

const RootContext = createContext()

//Provider
const Provider = RootContext.Provider
const GlobalProvider = (Children) => {
    return (
        class ParentComp extends Component {
          state = {
            totalOrder: 0
          }
        
          dispatch = (action) => {
            if (action.type === 'ADD_VALUE') {
              return this.setState ({
                totalOrder: this.state.totalOrder + 1
              })
            }
            if (action.type === 'REMOVE_VALUE') {
                return this.setState ({
                  totalOrder: this.state.totalOrder - 1
                })
            }
          }
          render () {
            return (
                <Provider value = {
                  {
                    state: this.state,
                    dispatch: this.dispatch
                  }
                }>
                    <Children {...this.dispatch}/>
                </Provider>
            )
          }
        }
  )
}

export default GlobalProvider

//Consumer
const Consumer = RootContext.Consumer
export const GlobalConsumer = (Children) => {
  return (
    class ConsumerP extends Component {
      render () {
        return (
          <Consumer>
          {
            value => {
              return (
                <Children {...this.props} {...value}/>
              )
            }
          }
        </Consumer>
        )
      }
    }
    )
}
