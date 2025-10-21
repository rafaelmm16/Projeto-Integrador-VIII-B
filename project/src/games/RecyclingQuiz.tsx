import { useState, useEffect } from 'react';
import { RotateCcw, Trophy, CheckCircle, XCircle } from 'lucide-react';
import { saveGameScore, getLeaderboard } from '../lib/supabase';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Qual é a cor da lixeira para alumínio e metais?',
    options: ['Vermelho', 'Amarelo', 'Azul', 'Verde'],
    correctAnswer: 1,
    explanation: 'A lixeira amarela é destinada para metais, incluindo latinhas de alumínio.',
  },
  {
    id: 2,
    question: 'Embalagens de agrotóxico vazias devem passar por qual processo antes do descarte?',
    options: ['Queima', 'Tríplice lavagem', 'Enterramento', 'Compactação'],
    correctAnswer: 1,
    explanation: 'A tríplice lavagem remove resíduos químicos e torna as embalagens seguras para reciclagem.',
  },
  {
    id: 3,
    question: 'Qual destes materiais NÃO pode ser reciclado em Pontos de Entrega Voluntária?',
    options: ['Garrafa PET', 'Isopor', 'Pneus', 'Pilhas comuns'],
    correctAnswer: 3,
    explanation: 'Pilhas e baterias precisam de coleta especializada devido aos metais pesados.',
  },
  {
    id: 4,
    question: 'Qual a importância de separar tampinhas plásticas?',
    options: [
      'Não tem importância',
      'São de plástico diferente e mais valioso',
      'Facilitam a compactação',
      'Evitam contaminação',
    ],
    correctAnswer: 1,
    explanation: 'Tampinhas são feitas de plástico de alta qualidade e podem financiar projetos sociais.',
  },
  {
    id: 5,
    question: 'Por que o isopor é difícil de reciclar?',
    options: [
      'É tóxico',
      'Ocupa muito espaço e tem baixo valor',
      'Não existe tecnologia',
      'É biodegradável',
    ],
    correctAnswer: 1,
    explanation: 'O isopor é 98% ar, tornando transporte caro. Poucos locais aceitam devido ao custo.',
  },
  {
    id: 6,
    question: 'O que fazer com cerâmicas quebradas?',
    options: [
      'Lixo comum',
      'Reciclagem de vidro',
      'Ecoponto específico',
      'Entulho/construção civil',
    ],
    correctAnswer: 3,
    explanation: 'Cerâmicas devem ir para locais de coleta de entulho ou ecopontos específicos.',
  },
  {
    id: 7,
    question: 'Quantas vezes um pneu pode ser recauchutado?',
    options: ['1 vez', '2-3 vezes', '5-6 vezes', 'Infinitas vezes'],
    correctAnswer: 1,
    explanation: 'Um pneu pode ser recauchutado 2-3 vezes, prolongando sua vida útil significativamente.',
  },
  {
    id: 8,
    question: 'Qual o destino correto para sacolas plásticas?',
    options: [
      'Lixo comum',
      'Reciclagem de plástico',
      'Reutilização ou reciclagem',
      'Queima',
    ],
    correctAnswer: 2,
    explanation: 'Sacolas devem ser reutilizadas ao máximo e depois destinadas à reciclagem de plástico.',
  },
  {
    id: 9,
    question: 'O que é sucata de metais ferrosos?',
    options: [
      'Apenas ferro puro',
      'Metais que grudam em ímã',
      'Alumínio e cobre',
      'Metais preciosos',
    ],
    correctAnswer: 1,
    explanation: 'Metais ferrosos são aqueles que contêm ferro e são atraídos por ímãs.',
  },
  {
    id: 10,
    question: 'Qual o benefício de reciclar uma latinha de alumínio?',
    options: [
      'Economiza 5% de energia',
      'Economiza 30% de energia',
      'Economiza 50% de energia',
      'Economiza 95% de energia',
    ],
    correctAnswer: 3,
    explanation: 'Reciclar alumínio economiza 95% da energia necessária para produzir alumínio novo.',
  },
];

export default function RecyclingQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    const data = await getLeaderboard('recycling-quiz', 5);
    setLeaderboard(data);
  };

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    setAnswers([...answers, isCorrect]);

    if (isCorrect) {
      setScore(score + 10);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setGameOver(true);
      if (score > 0) {
        setShowNameInput(true);
      }
    }
  };

  const handleSaveScore = async () => {
    if (playerName.trim()) {
      await saveGameScore(playerName, 'recycling-quiz', score, undefined, true);
      setShowNameInput(false);
      await loadLeaderboard();
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameOver(false);
    setAnswers([]);
    setShowNameInput(false);
    setPlayerName('');
  };

  const question = questions[currentQuestion];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-600" size={20} />
              <span className="font-semibold">Pontos: {score}</span>
            </div>
            {!gameOver && (
              <span className="font-semibold">
                Pergunta {currentQuestion + 1} de {questions.length}
              </span>
            )}
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCcw size={18} />
            Reiniciar
          </button>
        </div>

        {!gameOver ? (
          <div>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{question.question}</h3>
            </div>

            <div className="space-y-3 mb-6">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const showResult = showExplanation;

                let buttonClass = 'bg-gray-50 hover:bg-gray-100 text-gray-800';

                if (showResult) {
                  if (isCorrect) {
                    buttonClass = 'bg-green-100 border-2 border-green-500 text-green-800';
                  } else if (isSelected && !isCorrect) {
                    buttonClass = 'bg-red-100 border-2 border-red-500 text-red-800';
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 rounded-lg text-left font-medium transition-all ${buttonClass} ${
                      selectedAnswer === null ? 'cursor-pointer' : 'cursor-default'
                    } flex items-center justify-between`}
                  >
                    <span>{option}</span>
                    {showResult && isCorrect && <CheckCircle className="text-green-600" size={24} />}
                    {showResult && isSelected && !isCorrect && <XCircle className="text-red-600" size={24} />}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="mb-6">
                <div className={`p-4 rounded-lg ${
                  selectedAnswer === question.correctAnswer
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  <p className="font-semibold mb-2">
                    {selectedAnswer === question.correctAnswer ? 'Correto!' : 'Incorreto!'}
                  </p>
                  <p>{question.explanation}</p>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  {currentQuestion + 1 < questions.length ? 'Próxima Pergunta' : 'Ver Resultado'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">
              {score >= 80 ? '🏆' : score >= 60 ? '🎉' : score >= 40 ? '👍' : '📚'}
            </div>
            <h3 className="text-3xl font-bold mb-2">Quiz Concluído!</h3>
            <p className="text-2xl text-gray-600 mb-6">
              Pontuação: {score} de {questions.length * 10} pontos
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Você acertou {answers.filter(a => a).length} de {questions.length} perguntas
            </p>

            {showNameInput && (
              <div className="max-w-md mx-auto mb-6">
                <p className="mb-3 font-semibold">Salvar sua pontuação:</p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Digite seu nome"
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={handleSaveScore}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {leaderboard.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="text-yellow-600" />
            Melhores Pontuações
          </h3>
          <div className="space-y-2">
            {leaderboard.map((entry, idx) => (
              <div key={entry.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg text-gray-600">#{idx + 1}</span>
                  <span className="font-semibold">{entry.players?.name || 'Anônimo'}</span>
                </div>
                <span className="font-bold text-blue-600">{entry.score} pts</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
