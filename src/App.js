/* To keep this component as uncluttered as possible we
import components minimally */
import "./App.css";
import Board from "./components/Board";

const App = () => {
  return (
    <div
      /* This inline styling is to set the background for the app. */
      style={{
        /* The image is saved in the public folder to enable direct access. */
        backgroundImage: `url(/retro_space.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* We only have the title and the Board UI component. */}
      <h1>Minesweeper</h1>
      <Board />
    </div>
  );
};

/* The component is exported to be rendered in index.js */
export default App;
