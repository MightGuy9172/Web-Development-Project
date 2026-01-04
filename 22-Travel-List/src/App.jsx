import { useState } from "react";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";
import PackingList from "./components/PackingList";

function App() {
  const [items, setItems] = useState([]);
  return (
    <div className="app">
      <Header />
      <Form setItems={setItems} />
      <PackingList items={items} setItems={setItems} />
      <Footer items={items} />
    </div>
  );
}

export default App;
