import CartProvider from "./contexts/CartContext";
import AuthProvider from "./contexts/AuthContext";
import Routes from "./routes/Routes";
import "./App.css";
import { Suspense } from "react";
import { SubHeading } from "./Components/Typo";
import Analytics from "./utilis/Analytics";

function App() {
  return (
    <Suspense
      fallback={
        <div className="bg-background w-full h-dvh flex justify-center items-center">
          <SubHeading className="text-primary!">انتظر من فضلك...</SubHeading>
        </div>
      }
    >
      <AuthProvider>
        <CartProvider>
          <Analytics>
            <Routes />
          </Analytics>
        </CartProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
