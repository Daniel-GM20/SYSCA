import { Sparkles, Trophy, Shield, Zap } from 'lucide-react';

interface LandingProps {
  onNavigate: (section: 'games' | 'pricing') => void;
}

export default function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="relative">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/20 to-black"></div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-600 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="flex justify-center mb-6">
            <Sparkles className="h-16 w-16 text-yellow-500 animate-pulse" />
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-500 bg-clip-text text-transparent animate-fade-in">
            Bienvenido a Royal Casino
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Experimenta la emoción del casino desde la comodidad de tu hogar.
            Ruleta, tragamonedas, bingo y más te esperan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('games')}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg text-lg font-semibold hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all shadow-lg shadow-red-600/50"
            >
              Jugar Ahora
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="px-8 py-4 bg-transparent border-2 border-yellow-500 text-yellow-500 rounded-lg text-lg font-semibold hover:bg-yellow-500 hover:text-black transform hover:scale-105 transition-all"
            >
              Ver Planes
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-red-950/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-yellow-500">
            ¿Por qué elegirnos?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 p-8 rounded-xl hover:border-red-600 transition-all transform hover:scale-105">
              <Trophy className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-white">Premios Increíbles</h3>
              <p className="text-gray-400">
                Gana grandes premios con nuestras promociones exclusivas y jackpots progresivos.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 p-8 rounded-xl hover:border-red-600 transition-all transform hover:scale-105">
              <Shield className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-white">100% Seguro</h3>
              <p className="text-gray-400">
                Tu información y transacciones están protegidas con la mejor tecnología de seguridad.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 p-8 rounded-xl hover:border-red-600 transition-all transform hover:scale-105">
              <Zap className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-white">Retiros Rápidos</h3>
              <p className="text-gray-400">
                Retira tus ganancias de forma rápida y sencilla. Sin complicaciones ni esperas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
