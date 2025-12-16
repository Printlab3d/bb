import './App.css'
import Pages from "@/pages/index.jsx"
// USUNIĘTO: import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <>
      <Pages />
      {/* USUNIĘTO: <Toaster /> - już jest w Layout.jsx */}
    </>
  )
}

export default App