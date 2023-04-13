import Image from 'next/image'
import { Inter } from 'next/font/google'
import Select from 'react-select'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        Animals <Select isMulti options={options} />
      </div>
      <div>
        Zip: 
        <input></input>
      </div>
    </main>
  )
}
