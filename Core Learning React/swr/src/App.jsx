import { SWRProvider } from "./providers/SWRProvider";
import { Home } from "./Home";

const App = () => {
  return (
    <SWRProvider>
      <Home />
    </SWRProvider>
  );
};

export default App;