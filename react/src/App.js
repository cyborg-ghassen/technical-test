import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./routes";


function App() {
    return (
        <div>
            <Router basename={process.env.PUBLIC_URL}>
                <AppRoutes />
            </Router>
        </div>
    );
}

export default App;
