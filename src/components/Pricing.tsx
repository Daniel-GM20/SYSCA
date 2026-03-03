import { Check, Star } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Básico',
      price: '9.99',
      features: [
        '100 fichas diarias',
        'Acceso a tragamonedas',
        'Soporte por email',
        'Bonos mensuales',
      ],
      popular: false,
    },
    {
      name: 'Premium',
      price: '24.99',
      features: [
        '500 fichas diarias',
        'Acceso a todos los juegos',
        'Soporte prioritario 24/7',
        'Bonos semanales',
        'Cashback 5%',
        'Torneos exclusivos',
      ],
      popular: true,
    },
    {
      name: 'VIP',
      price: '49.99',
      features: [
        'Fichas ilimitadas',
        'Acceso VIP a todos los juegos',
        'Gerente de cuenta personal',
        'Bonos diarios',
        'Cashback 10%',
        'Eventos exclusivos',
        'Retiros prioritarios',
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-black via-red-950/20 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
            Elige tu Plan
          </h1>
          <p className="text-xl text-gray-400">
            Selecciona el plan perfecto para tu estilo de juego
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden transition-all transform hover:scale-105 ${
                plan.popular
                  ? 'border-2 border-yellow-500 shadow-2xl shadow-yellow-500/20'
                  : 'border border-red-600/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-red-600 text-black px-4 py-1 rounded-bl-lg font-bold flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-yellow-500">${plan.price}</span>
                  <span className="text-gray-400">/mes</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-yellow-500 to-red-600 text-black hover:from-yellow-600 hover:to-red-700 shadow-lg shadow-yellow-500/30'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  Comenzar Ahora
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">¿Necesitas un plan empresarial?</p>
          <button className="px-8 py-3 border-2 border-yellow-500 text-yellow-500 rounded-lg font-semibold hover:bg-yellow-500 hover:text-black transition-all">
            Contactar Ventas
          </button>
        </div>
      </div>
    </div>
  );
}
