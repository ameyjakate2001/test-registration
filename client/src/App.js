import Header from './Header'
import AdminScreen from './screens/AdminScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<RegisterScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/adminPanel' element={<AdminScreen />} />

          {/* <Route
            path='/mySolvedDoubts'
            element={
              <AdminPrivateRoute>
                <SolvedDoubtScreen />
              </AdminPrivateRoute>
            }
          /> */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
