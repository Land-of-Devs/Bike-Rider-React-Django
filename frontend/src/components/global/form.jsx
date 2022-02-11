import { useEffect, useState } from "react";

let onSubmit = () => {};

const Form = ({children}) => {

  const [count, setCount] = useState(0);

  function validate(c) {
    for (let rule of c.props.rules) {
      let r = rule(c.props.getter);
      r = r === true ? false : r;
      return r;
    }
  }

  const errList = [];

  useEffect(() => {
    if (count != 0) {
      if (errList.length == 0) {
        onSubmit();
      }
    }
  }, [count]);

  function errorWraper(componentArr, renderErr) {
    if (!Array.isArray(componentArr)) {
      componentArr = [componentArr];
    }

    componentArr = componentArr.map((c, v) => {
      if (c.props) {
        if (c.props.onSubmit) {
          return <c.type key={v} onClick={() => {
            setCount(count+1);
            onSubmit = c.props.onSubmit;
          }}>{c.props.children}</c.type>
        }
        if (c.props && c.props.getter != undefined && c.props.rules) {
          const err = renderErr ? validate(c) : false;
          if (err) errList.push(err);
          return <c.type  
                  { ...({ 
                      error: !!err, 
                      helperText: err,
                      value: c.props.getter,
                      key: v,
                      onChange: (event) => c.props.setter(event.target.value),
                    })} >
                        {c.props.children && errorWraper(c.props.children, renderErr)}
                </c.type>
        } else if (c.props.children) {
          return <c.type key={v}>{errorWraper(c.props.children, renderErr)}</c.type>
        }
      } 
      return c;
    })
    return componentArr
  }

  return (
    <div>
      {errorWraper(children, count != 0)}
    </div>
    
  );
};


export default Form;