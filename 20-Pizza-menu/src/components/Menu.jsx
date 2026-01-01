import Pizza from "./Pizza";
import pizzaData from "../constants/data";

function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <ul className="pizzas">
        {pizzaData.map((pizza) => (
          <Pizza item={pizza} key={pizza.name} />
        ))}
      </ul>
    </main>
  );
}

export default Menu;
