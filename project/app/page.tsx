'use client'

import { useState } from 'react'
import { Recycle, Trash2, Brain, HelpCircle } from 'lucide-react'
import RecyclingSorting from './games/RecyclingSorting'
import RecyclingQuiz from './games/RecyclingQuiz'
import RecyclingMemory from './games/RecyclingMemory'

type GameType = 'sorting' | 'quiz' | 'memory' | null

export default function Home() {
  const [selectedGame, setSelectedGame] = useState<GameType>(null)

  const games = [
    {
      id: 'sorting' as const,
      name: 'Separe os Resíduos',
      description: 'Classifique corretamente os materiais recicláveis',
      icon: Trash2,
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'quiz' as const,
      name: 'Quiz de Reciclagem',
      description: 'Teste seus conhecimentos sobre reciclagem',
      icon: HelpCircle,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'memory' as const,
      name: 'Memória Ecológica',
      description: 'Encontre os pares de materiais recicláveis',
      icon: Brain,
      color: 'from-orange-500 to-orange-600',
    },
  ]

  const renderGame = () => {
    switch (selectedGame) {
      case 'sorting':
        return <RecyclingSorting />
      case 'quiz':
        return <RecyclingQuiz />
      case 'memory':
        return <RecyclingMemory />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Recycle className="text-green-600" size={36} />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Recicla Capixaba</h1>
              <p className="text-green-700 font-medium">Jogos Educativos</p>
            </div>
          </div>
          <p className="text-gray-600 mt-3">
            Aprenda sobre reciclagem de forma divertida e interativa!
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!selectedGame ? (
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-green-600">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Sobre a Reciclagem Capixaba
              </h2>
              <p className="text-gray-700 mb-2">
                Os Pontos de Entrega Voluntária (Ecopontos) recebem diversos tipos de resíduos:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mt-4">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Embalagens de alumínio e metais ferrosos</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Plásticos (garrafas PET, sacolas)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Tampinhas plásticas e lacres</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Pneus e cerâmicas</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Isopor e embalagens de agrotóxicos</span>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Escolha um jogo para começar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {games.map((game) => {
                const Icon = game.icon
                return (
                  <button
                    key={game.id}
                    onClick={() => setSelectedGame(game.id)}
                    className="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 text-left border-2 border-transparent hover:border-green-500"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />
                    <div className="relative">
                      <div
                        className={`w-20 h-20 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="text-white" size={36} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {game.name}
                      </h3>
                      <p className="text-gray-600">{game.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedGame(null)}
              className="mb-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md"
            >
              ← Voltar aos Jogos
            </button>
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-green-600">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                {games.find((g) => g.id === selectedGame)?.name}
              </h2>
              {renderGame()}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-green-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Recycle className="text-green-600" size={24} />
              <p className="font-bold text-gray-800">Recicla Capixaba</p>
            </div>
            <p className="text-sm mb-2">Educação ambiental através de jogos interativos</p>
            <p className="text-xs text-gray-500">
              Contribua para um futuro mais sustentável separando corretamente seus resíduos
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
