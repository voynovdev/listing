import './App.css'
import Listing from './components/Listing';
import etsyJson from '../data/etsy.json';

function App() {
  return (
    <>
      <Listing items={etsyJson}/>
    </>
  )
}

export default App
