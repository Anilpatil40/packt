import { routes } from "constants/routes";
import { AuthContext } from "contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <AuthContext>
            <BrowserRouter>
                <Routes>
                    {routes.map((AppRoute, index) => (
                        <Route
                            key={index}
                            path={AppRoute.path}
                            element={
                                <AppRoute.Layout>
                                    <AppRoute.Component />
                                </AppRoute.Layout>
                            }
                        />
                    ))}
                </Routes>
            </BrowserRouter>
        </AuthContext>
    );
}

export default App;
