import React, { FC } from 'react'
import { AppProps } from 'next/app'
import '@common/css/reset.scss'
import '@common/css/layout.scss'
import { Provider } from 'react-redux'
import { wrapper } from '@store/store'
import { ThemeProvider } from '@lib/providers/ThemeProvider'

/**
 * withRedux HOC
 * NextJS wrapper for Redux
 */

const CustomApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...props.pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default CustomApp
