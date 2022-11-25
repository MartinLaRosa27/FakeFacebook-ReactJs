import { Routing } from "./Routing";
import { UserProvider } from "./context/UserProvider";
import { PublicationProvider } from "./context/PublicationProvider";

function App() {
  return (
    <>
      <UserProvider>
        <PublicationProvider>
          <Routing />
        </PublicationProvider>
      </UserProvider>
    </>
  );
}

export default App;
