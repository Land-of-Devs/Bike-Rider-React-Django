import { Button, Input, TextField } from "@mui/material";
import { useContext, useState } from "react";
import UserContext from "../../../context/user";
import * as coupons from "../../../services/coupons";
import { rules } from "../../../utils/validate";
import Form from "../../global/form";


const Coupon = () => {

  const [coupon, setCoupon] = useState('');
  const uctx = useContext(UserContext);
  const [error, setError] = useState('');

  return (
    <Form>
      <div>{error}</div>
      <div>
        <TextField getter={coupon} setter={setCoupon} rules={[rules.coupon]}></TextField>
      </div>
      <Button onSubmit={() => {
        coupons.use(coupon).catch(e => {
          console.log('aaaaaaa')
          console.log(e)
        });
      }}>Submit</Button>
    </Form>
  );
};


export default Coupon;