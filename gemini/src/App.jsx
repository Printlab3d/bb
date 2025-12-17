import './App.css'
import Pages from "@/pages/index.jsx"
// DODAJEMY IMPORT
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <>
      <Pages />
      {/* DODAJEMY TOASTER TUTAJ - TYLKO RAZ */}
      <Toaster />
    </>
  )
}

export default App