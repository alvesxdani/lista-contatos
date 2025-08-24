import { createRoot } from 'react-dom/client'
import App from './App'
const container = document.getElementById('root')
const root = createRoot(container!) // Forçando parâmetro container por conta do typescript
root.render(<App />)
