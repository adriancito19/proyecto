import { ClipboardListIcon, LightningBoltIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/outline';

const About = () => {
  const features = [
    {
      icon: ClipboardListIcon,
      title: 'Gestión Completa',
      description: 'Organiza todas tus tareas en un solo lugar con categorías y fechas límite.'
    },
    {
      icon: LightningBoltIcon,
      title: 'Rápido y Eficiente',
      description: 'Interfaz intuitiva diseñada para maximizar tu productividad sin complicaciones.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Seguro y Confiable',
      description: 'Tus datos están protegidos con las mejores prácticas de seguridad.'
    },
    {
      icon: UsersIcon,
      title: 'Colaborativo',
      description: 'Diseñado para equipos que necesitan coordinación y seguimiento de tareas.'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center shadow-sm">
        <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center mx-auto mb-4">
          <ClipboardListIcon className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          TaskManager
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Sistema profesional de gestión de tareas diseñado para empresas modernas 
          que buscan optimizar su productividad y organización.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-6 hover-elevate"
          >
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
              <feature.icon className="h-6 w-6 text-slate-900" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Diseñado para la Productividad
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">100%</div>
            <div className="text-sm text-gray-300">Gratuito</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-sm text-gray-300">Disponibilidad</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">∞</div>
            <div className="text-sm text-gray-300">Tareas Ilimitadas</div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Tecnologías Utilizadas
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {['React', 'Tailwind CSS', 'Supabase', 'Vite'].map((tech) => (
            <div
              key={tech}
              className="bg-slate-50 rounded-lg p-4 text-center border border-gray-200"
            >
              <p className="font-medium text-slate-900">{tech}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">
          ¿Necesitas Ayuda?
        </h2>
        <p className="text-gray-600 mb-4">
          Estamos aquí para ayudarte a aprovechar al máximo TaskManager
        </p>
        <a
          href="mailto:soporte@taskmanager.com"
          className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          Contactar Soporte
        </a>
      </div>
    </div>
  );
};

export default About;
