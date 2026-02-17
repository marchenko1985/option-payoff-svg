import { createRoot } from 'react-dom/client'
import { createElement } from 'react'
import { App } from './App'
import './index.css'

createRoot(document.getElementById('root') as HTMLDivElement).render(createElement(App))
