import { BrowserRouter as Router, Routes, Navigate } from "react-router-dom";

export const AppRouter = ({ contexts, children }) => {
  /* Invert to seem more logical with order of definition in array */
  const revContexts = [...contexts].reverse();
  return (
    <Router>
      {revContexts.reduce((current, Next) => {
        return (<Next>
          {current}
        </Next>)
      }, <Routes children={children} />)}
    </Router>
  );
}

export const Restrict = ({ children, guards }) => {
  for (const guard of guards) {
    const result = guard();
    if (result !== true) {
      console.log(result)
      return (<Navigate to={result} replace />);
    }
  }

  return (<>{children}</>);
}
