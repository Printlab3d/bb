import './App.css'
import Pages from "@/pages/index.jsx"

// USUNIĘTO import Toastera, bo jest już w Layout.jsx

function App() {
  return (
    <>
      <Pages />
      {/* USUNIĘTO <Toaster /> - to likwiduje podwójne dymki */}
    </>
  )
}

export default App