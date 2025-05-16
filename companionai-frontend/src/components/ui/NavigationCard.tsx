import Link from "next/link";

interface NavigationCardProps {
  title: string;
  icon: string;
  description: string;
  link: string;
}

const NavigationCard = ({ title, icon, description, link }: NavigationCardProps) => {
  return (
    <Link href={link}>
      <div className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <div className="text-4xl mb-4 text-blue-600">{icon}</div>
        <h3 className="text-xl font-semibold text-blue-900 truncate">{title}</h3>
        <p className="text-gray-600 mt-2 text-sm line-clamp-2">{description}</p>
      </div>
    </Link>
  );
};

export default NavigationCard;