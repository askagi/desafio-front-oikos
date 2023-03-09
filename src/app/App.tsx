import { Suspense } from "react"
import { ToastContainer } from "react-toastify"
import { AssetsProvider } from "../contexts/AssetsContext"
import { MyRoutes } from "./router"

export function App() {


  return (
    <Suspense fallback={<h1>Loading...</h1>}>
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
