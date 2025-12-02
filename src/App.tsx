import { useState } from 'react'

interface Chunk {
  id: number
  text: string
  start: number
  end: number
}

function App() {
  const [text, setText] = useState(
    'This is a sample text to demonstrate how chunking works. You can adjust the chunk size and overlap to see how the text gets divided into smaller pieces. Chunking is useful for processing large documents, preparing data for language models, or organizing content into manageable sections.'
  )
  const [chunkSize, setChunkSize] = useState(50)
  const [overlap, setOverlap] = useState(10)
  const [chunkBy, setChunkBy] = useState<'character' | 'word'>('character')

  const chunkText = (): Chunk[] => {
    if (!text) return []
    
    const chunks: Chunk[] = []
    let id = 0

    if (chunkBy === 'character') {
      let start = 0
      while (start < text.length) {
        const end = Math.min(start + chunkSize, text.length)
        chunks.push({
          id: id++,
          text: text.slice(start, end),
          start,
          end
        })
        start += chunkSize - overlap
        if (start >= text.length) break
      }
    } else {
      const words = text.split(/(\s+)/)
      const actualWords = words.filter(w => w.trim().length > 0)
      let start = 0
      
      while (start < actualWords.length) {
        const end = Math.min(start + chunkSize, actualWords.length)
        const chunkWords = actualWords.slice(start, end)
        const chunkText = chunkWords.join(' ')
        
        // Find character positions
        const wordsBeforeChunk = actualWords.slice(0, start).join(' ')
        const charStart = start === 0 ? 0 : wordsBeforeChunk.length + 1
        const charEnd = charStart + chunkText.length
        
        chunks.push({
          id: id++,
          text: chunkText,
          start: charStart,
          end: charEnd
        })
        start += chunkSize - overlap
        if (start >= actualWords.length) break
      }
    }

    return chunks
  }

  const chunks = chunkText()

  const getCharacterColor = (index: number): string => {
    const colors = [
      'rgba(255, 99, 132, 0.3)',
      'rgba(54, 162, 235, 0.3)',
      'rgba(255, 206, 86, 0.3)',
      'rgba(75, 192, 192, 0.3)',
      'rgba(153, 102, 255, 0.3)',
      'rgba(255, 159, 64, 0.3)',
    ]
    
    const chunkIndices: number[] = []
    chunks.forEach((chunk, chunkIdx) => {
      if (index >= chunk.start && index < chunk.end) {
        chunkIndices.push(chunkIdx)
      }
    })

    if (chunkIndices.length === 0) return 'transparent'
    if (chunkIndices.length === 1) return colors[chunkIndices[0] % colors.length]
    
    // Overlapping chunks - darker color
    return colors[chunkIndices[0] % colors.length].replace('0.3', '0.6')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-7xl w-full">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Text Chunking Visualizer
          </h1>
          <p className="text-gray-400 text-lg">
            Explore how text is split into overlapping chunks for processing
          </p>
        </header>

      <div className="bg-white/5 rounded-xl p-6 mb-8 space-y-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="chunkSize" className="font-semibold text-gray-300 text-sm">
            Chunk Size: {chunkSize} {chunkBy === 'character' ? 'characters' : 'words'}
          </label>
          <input
            id="chunkSize"
            type="range"
            min="10"
            max="200"
            value={chunkSize}
            onChange={(e) => setChunkSize(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="overlap" className="font-semibold text-gray-300 text-sm">
            Overlap: {overlap} {chunkBy === 'character' ? 'characters' : 'words'}
          </label>
          <input
            id="overlap"
            type="range"
            min="0"
            max="200"
            value={overlap}
            onChange={(e) => setOverlap(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-300 text-sm">Chunk By:</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="character"
                checked={chunkBy === 'character'}
                onChange={() => setChunkBy('character')}
                className="w-4 h-4 cursor-pointer accent-purple-500"
              />
              <span className="text-gray-300">Characters</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="word"
                checked={chunkBy === 'word'}
                onChange={() => setChunkBy('word')}
                className="w-4 h-4 cursor-pointer accent-purple-500"
              />
              <span className="text-gray-300">Words</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <label htmlFor="textInput" className="block font-semibold mb-2 text-gray-300">
          Input Text:
        </label>
        <textarea
          id="textInput"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="Enter your text here..."
          className="w-full p-4 rounded-lg border-2 border-white/10 bg-white/5 text-white text-base resize-y focus:outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-300">
          Original Text with Color-Coded Chunks
        </h2>
        <div className="bg-white/5 p-6 rounded-lg leading-relaxed text-lg break-words border-2 border-white/10">
          {text.split('').map((char, index) => (
            <span
              key={index}
              style={{ backgroundColor: getCharacterColor(index) }}
              className="transition-colors"
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-300">
          Chunks ({chunks.length} total)
        </h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {chunks.map((chunk, index) => (
            <div
              key={chunk.id}
              className="bg-white/5 rounded-lg p-4 transition-all hover:-translate-y-0.5 hover:shadow-xl border border-white/10"
              style={{
                borderLeftWidth: '4px',
                borderLeftColor: getCharacterColor(chunk.start).replace('0.3', '1').replace('0.6', '1')
              }}
            >
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/10">
                <span className="font-bold text-purple-400 text-sm">
                  Chunk {index + 1}
                </span>
                <span className="text-xs text-gray-500 font-mono">
                  {chunkBy === 'character' 
                    ? `Chars ${chunk.start}-${chunk.end}`
                    : `Pos ${chunk.start}-${chunk.end}`}
                </span>
              </div>
              <div className="mb-3 leading-relaxed text-gray-300 break-words min-h-[3rem]">
                {chunk.text}
              </div>
              <div className="text-sm text-gray-500 italic">
                {chunkBy === 'character' 
                  ? `${chunk.text.length} characters`
                  : `${chunk.text.split(/\s+/).filter(w => w.length > 0).length} words`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default App
