# Text Chunking Visualizer

An interactive React application that visualizes how text chunking works. Perfect for understanding text preprocessing techniques used in natural language processing, RAG systems, and large language model applications.

## Features

- **Interactive Controls**: Adjust chunk size and overlap in real-time
- **Multiple Chunking Modes**: Switch between character-based and word-based chunking
- **Visual Representation**: Color-coded text display showing chunk boundaries and overlaps
- **Chunk Cards**: Detailed view of each chunk with statistics
- **Responsive Design**: Built with Tailwind CSS for a modern, mobile-friendly interface

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Shalin-N/chunking.git
cd chunking
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Input Text**: Enter or modify the text you want to chunk in the text area
2. **Adjust Chunk Size**: Use the slider to set how large each chunk should be (10-200 units)
3. **Set Overlap**: Control how much chunks overlap with each other (0-200 units)
4. **Choose Chunking Mode**: Select between character-based or word-based chunking
5. **Visualize**: See the color-coded text and individual chunk cards update in real-time

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool and dev server
- **Cloudflare Pages** - Deployment (via Wrangler)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to Cloudflare Pages
- `npm run lint` - Run ESLint

## How Chunking Works

Chunking is the process of dividing large text into smaller, manageable pieces. This is essential for:

- Processing documents that exceed token limits in LLMs
- Creating embeddings for semantic search
- Implementing Retrieval-Augmented Generation (RAG) systems
- Organizing content for better comprehension

The overlap feature ensures that context isn't lost at chunk boundaries, which is crucial for maintaining semantic coherence.

## License

MIT
