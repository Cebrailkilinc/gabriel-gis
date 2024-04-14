import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { DrawerProvider } from './context/drawer-context.jsx'
import { MessageProvider } from './context/message-context.jsx'
import { LayerProvider } from './context/layer-context.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LayerProvider>
      <DrawerProvider>
        <MessageProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </MessageProvider>
      </DrawerProvider>
    </LayerProvider>
  </React.StrictMode>,
)
