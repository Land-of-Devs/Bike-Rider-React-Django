import { Button, TextField } from "@mui/material";
import { useState } from "react";
import * as coupons from "../../../services/coupons";
import { rules } from "../../../utils/validate";
import Form from "../../global/form";
import useToast from "/src/hooks/useToast";


const Coupon = ({close}) => {

  const [coupon, setCoupon] = useState('');
  const [error, setError] = useState('');
  const addToast = useToast();

  return (
    <Form>
      <div style={{color: 'red'}}>{error}</div>
      <div>
        <TextField getter={coupon} setter={setCoupon} rules={[rules.coupon]}></TextField>
      </div>
      <Button onSubmit={() => {
        coupons.use(coupon).then(() => (addToast({ msg: 'Coupon redeemed', type: 'success' }), close()))
        .catch(e => {
          if (e.response.data && e.response.data.detail) { 
            setError(e.response.data.detail);
          } else {
            setError('Unknown error :(');
          }
        });
      }}>Submit</Button>
    </Form>
  );
};


export default Coupon;