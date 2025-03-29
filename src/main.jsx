import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './context/AppContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext.jsx'
import { CurrencyProvider } from './context/CurrencyContext.jsx'




createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      
      <UserProvider>
        <AppContextProvider>
          <CurrencyProvider>
            <App />
          </CurrencyProvider>
        </AppContextProvider>
      </UserProvider>
  </BrowserRouter>,
)
