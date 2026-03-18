import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import IrregularVerbsTrainer from './IrregularVerbsTrainer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IrregularVerbsTrainer />
  </StrictMode>,
)
