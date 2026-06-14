import { useState } from 'react'

function App() {
  const [text, setText] = useState("")

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
  <input
    type="text"
    value={text}
    onChange={(e) => setText(e.target.value)}
    className="
      w-full
      max-w-md
      border
      p-3
      rounded
      text-base
      md:text-lg
    "
  />

  <h1
    className="
      text-xl
      md:text-3xl
      lg:text-5xl
      font-bold
      text-blue-600
      text-center
    "
  >
    {text}
  </h1>
</div>
  )
}

export default App