import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import AppErrorBoundary from './components/common/AppErrorBoundary'

export default function App() { return <AppErrorBoundary><AuthProvider><AppRoutes /></AuthProvider></AppErrorBoundary> }
