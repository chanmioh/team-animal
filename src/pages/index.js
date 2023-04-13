import Image from 'next/image'
import { Inter } from 'next/font/google'
import Select from 'react-select'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const options = [
    { value: 'feline', label: '🐱 Cat' },
    { value: 'canine', label: '🐶 Dog' }
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
