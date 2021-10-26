import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactLoader from "./components/loader";
import * as Routes from "./constants/routes";
import userContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";
import "./styles/tailwind.css";
import ProtectedRoute from "./helpers/protected.route";
import IsUserLoggedIn from "./helpers/is-user-logged-in";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const Profile = lazy(() => import("./pages/Profile"));

const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const { user } = useAuthListener();
  return (
    <userContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<ReactLoader />}>
          <Switch>
            <IsUserLoggedIn
              user={user}
              loggedInPath={Routes.DASHBOARD}
              path={Routes.LOGIN}
            >
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn
              user={user}
              loggedInPath={Routes.DASHBOARD}
              path={Routes.SIGN_UP}
            >
              <SignUp />
            </IsUserLoggedIn>

            <Route path={Routes.PROFILE} component={Profile} />

            <ProtectedRoute path={Routes.DASHBOARD} user={user} exact>
              <Dashboard />
            </ProtectedRoute>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </userContext.Provider>
  );
}

export default App;
