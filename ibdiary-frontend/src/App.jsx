import { useState } from 'react'
import './App.css'
import Button from './components/Button'
import BannerProfile from './components/BannerProfile';
import Banner from './components/Banner';

function App() {

const [color, setColor] = useState(0);

const handleClick = () => {
  color === 6 ? setColor(0) : setColor(prev => prev + 1);
}

  return (

    // <Button size='small' color={color} name='submit' handleClick={handleClick} />
    <Banner />
  ) 
}

export default App
