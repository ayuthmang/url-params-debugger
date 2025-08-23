import Editor from '@/components/editor'

export const metadata = {
  title: 'URLSearchParams Visualizer',
  description: 'A simple tool to visualize URLSearchParams.',
}

export default function Home() {
  return (
    <div className="font-sans p-4 h-full">
      <Editor />
    </div>
  )
}
