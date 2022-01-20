import { BrowserRouter as Router, Routes, Navigate } from "react-router-dom";

export const AppRouter = ({ children }) => {
    return (
        <Router>
            <Routes children={children} />
        </Router>
    );
}
export const Restrict = ({ children, guards }) => {
    for (const guard of guards) {
        const result = guard();
        if (result !== true) {
            return (<Navigate to={result} replace />);
        }
    }
    return (<>{children}</>);
}