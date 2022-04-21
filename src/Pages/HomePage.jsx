import React from 'react'
import { useUserAuth } from '../Context/UserAuthContext'

function HomePage() {
  const { user } = useUserAuth();
  return (
    <div>HomePage</div>
  )
}

export default HomePage