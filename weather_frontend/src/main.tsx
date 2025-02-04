// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { NotifyProvider } from './Context/NotifyContext.tsx'
import { AuthProvider } from './Context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
    //   <StrictMode>

    //   </StrictMode>
    <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
            <NotifyProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </NotifyProvider>
        </SnackbarProvider>
    </BrowserRouter>

)
