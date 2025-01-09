import { useRoutes } from "react-router-dom";
import routes from "@routes/index";

function App() {
	const content = useRoutes(routes);
	return content;
}

export default App;
