export default function App() {

  const renderSafe = () => {
    document.getElementById("content").innerText =
      "Safe Content";
  };

  const renderUnsafe = () => {
    const userInput = `
      <img
        src="/src/moe-ok.jpg"
        onerror="alert('XSS Executado!')"
      >
    `;

    document.getElementById("content").innerHTML =
      userInput;
  };

  return (
    <div>
      <h1>Content Security Policy</h1>

      <button onClick={renderSafe}>
        Render Safe Content
      </button>

      <button onClick={renderUnsafe}>
        Render User Content
      </button>

      <div id="content"></div>
    </div>
  );
}