import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { RouterProvider } from 'react-router'
import { Router } from './Router/Router.jsx'
import Aos from 'aos'
import 'aos/dist/aos.css';
import AuthProvider from './context/AuthProvider.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient();

Aos.init()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={Router}>
      </RouterProvider>
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
