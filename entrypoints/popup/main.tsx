import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './styles.css'
import { Toaster } from '@/components/ui/sonner.tsx'
import { ThemeProvider } from '@/integrations/theme/ThemeProvider.tsx'
import { ShadowProvider } from '@/integrations/shadow/ShadowProvider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ShadowProvider container={document.body}>
      <ThemeProvider>
        <Toaster richColors={true} closeButton={true} />
        <App />
      </ThemeProvider>
    </ShadowProvider>
  </React.StrictMode>,
)
