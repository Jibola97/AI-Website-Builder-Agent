// Each menu item has a name, price, and short description

type Theme = { 
  primary: string; 
  background: string; 
  text: string; 
};

type MenuItem = {
  name: string; 
  price: string; 
  description: string;
};

type MenuProps = {
  items: MenuItem[]; theme: Theme
};

export default function Menu({ items, theme }: MenuProps) {
  return (
    <section className="py-20 px-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: theme.text }}>
        Our Menu
      </h2>
      <div className="flex flex-col gap-6">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-start border-b border-zinc-200 pb-4">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">{item.name}</h3>
              <p className="text-zinc-500 text-sm">{item.description}</p>
            </div>
            <span className="font-medium whitespace-nowrap ml-4" style={{ color: theme.primary }}>
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}