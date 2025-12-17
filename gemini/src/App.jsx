import './App.css'
import Pages from "@/pages/index.jsx"
// UWAGA: Nie ma importu Toastera tutaj!

function App() {
  return (
    <>
      <Pages />
      {/* UWAGA: Nie ma komponentu <Toaster /> tutaj! Jest on w Layout.jsx */}
    </>
  )
}

export default App