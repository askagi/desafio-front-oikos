import { Suspense } from "react"
import { ToastContainer } from "react-toastify"
import { Load } from "../components/Load"
import { AssetsProvider } from "../contexts/AssetsContext"
import { MyRoutes } from "./router"
// import '../styles/main.scss'

export function App() {


  return (
    <Suspense fallback={<Load />}>
      <AssetsProvider>
        <MyRoutes />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AssetsProvider>
    </Suspense>
  )
}

export default App
