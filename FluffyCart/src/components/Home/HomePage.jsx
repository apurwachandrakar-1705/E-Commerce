import React from 'react'
import HeroSection from './HeroSection'
import iphone from "../../assets/iphone-14-pro.webp"
import mac from "../../assets/mac-system-cut.jfif"
import FeacturedProducts from './FeacturedProducts'
const HomePage = () => {
  return (
    <div>
     <HeroSection title="Buy iPhone 14 Pro" subtitle="iPhone 14: The latest innovation in sleek design, powerful performance, and unparalleled user experience." link="/product/671723d50d2c2446058fc98a" image={iphone}/> 
   <FeacturedProducts/>
   <HeroSection title="Build ultimate setup" subtitle= "Mac Mini: Compact powerhouse delivering seamless performance, ultimate flexibility, and incredible speed for all tasks" link="/product/671723d50d2c2446058fc992" image={mac}/> 
    </div>
  )
}

export default HomePage
