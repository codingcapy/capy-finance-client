
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: app jsx for capy finance client
 */

import { RouterProvider } from 'react-router-dom'
import Router from './router'

function App() {

  const router = Router()

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
