const Header = ({ title }: { title: string }) => {
  return (
    <div className="relative h-9! mb-5 flex items-center overflow-hidden">
      <h1 className="text-text text-3xl font-black slideTop">{title}</h1>
    </div>
  );
};

export default Header;