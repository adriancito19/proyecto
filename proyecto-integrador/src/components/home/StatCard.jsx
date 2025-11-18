const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "slate" }) => {
  const colorClasses = {
    slate: "bg-slate-50 text-slate-900 border-slate-200",
    blue: "bg-blue-50 text-blue-900 border-blue-200",
    green: "bg-green-50 text-green-900 border-green-200",
    red: "bg-red-50 text-red-900 border-red-200",
    yellow: "bg-yellow-50 text-yellow-900 border-yellow-200"
  };

  return (
    <div className={`${colorClasses[color]} border rounded-lg p-6 hover-elevate transition-colors duration-200`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-white shadow-sm`}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;
