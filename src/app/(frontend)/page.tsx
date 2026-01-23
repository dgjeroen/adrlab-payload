import '../globals.css'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ADR Lab - Topverhalen
        </h1>
        <p className="text-gray-600 mb-8">
          Content Management System
        </p>
        <a
          href="/admin"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Naar Admin Panel
        </a>
      </div>
    </div>
  )
}
