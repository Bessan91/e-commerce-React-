import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'outlet'
import Footer from '../Footer/Footer'

export default function Root() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
