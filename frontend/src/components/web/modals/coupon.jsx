import { Button, Input, TextField } from "@mui/material";
import { useState } from "react";
import { rules } from "../../../utils/validate";
import Form from "../../global/form";


const Coupon = () => {

  const [coupon, setCoupon] = useState('')
  const [email, setEmail] = useState('')

  return (
    <Form>
      <div>
        <TextField getter={coupon} setter={setCoupon} rules={[rules.email]}></TextField>
      </div>
      <div>
        <div>
          <TextField getter={email} setter={setEmail} rules={[rules.email]}></TextField>
        </div>
      </div>
      <Button onSubmit={() => {console.log('submit')}}>Submit</Button>
    </Form>
  );
};


export default Coupon;