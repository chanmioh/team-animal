import Image from 'next/image'
import { Inter } from 'next/font/google'
import Select from 'react-select'
import {useState} from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [whetherInsurance, setWhetherInsurance] = useState(false)
  const [whetherPracticeHub, setWhetherPracticeHub] = useState(false)
  const [whetherTelevet, setWhetherTelevet] = useState(false)
  const options = [
    { value: 'Canine and Feline', label: '🐱🐶 Cat & Dog' },
    { value: 'Avian', label: '🦜 Bird' },
    { value: 'Reptile and Amphibian', label: '🐍🐟🐸 Reptiles & Amphibians' },
    { value: 'Exotic', label: '🐯🐵 Exotic' },
    { value: 'Equine', label: '🐴 Horse' },
    { value: 'Beef Cattle', label: '🐄 Beef Cattle' },
    { value: 'Dairy', label: '🥛 Dairy Cattle' }
  ]
  return (
    <div className="min-h-screen min-w-fit max-w-[30vh] p-10 bg-white">
      <div className="flex flex-col space-y-4">

        {/* Animal selector */}
        <div>
          Animal Category <Select isMulti options={options} />
        </div>

        {/* Zip input */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">ZIP Code</span>
          </label>
          <input type="text" placeholder="e.g. 12345" className="input input-bordered w-full max-w-xs" />
        </div>

        {/* Insurance toggle  */}
        <label className="label cursor-pointer">
          <span className="label-text">Insurance</span> 
          <input type="checkbox" className="toggle" 
            checked={whetherInsurance} 
            onClick={() => setWhetherInsurance(!whetherInsurance)}/>
        </label>

        {/* Specialization selector */}
        <div>
          Specialization <Select isMulti options={options} />
        </div>

        {/* PracticeHub toggle */}
        <label className="label cursor-pointer">
          <span className="label-text">PracticeHub</span> 
          <input type="checkbox" className="toggle" 
            checked={whetherPracticeHub} 
            onClick={() => setWhetherPracticeHub(!whetherPracticeHub)}/>
        </label>

        {/* Televet toggle  */}
        <label className="label cursor-pointer">
          <span className="label-text">Televet</span> 
          <input type="checkbox" className="toggle" 
            checked={whetherTelevet} 
            onClick={() => setWhetherTelevet(!whetherTelevet)}/>
        </label>

      </div>
    </div>
  )
}
