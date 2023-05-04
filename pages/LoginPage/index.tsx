import styles from "./loginpage.module.css";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = () => {
  //remaining
  };
  
  return (
    <>
      <div className={styles.LoginPage_mainDiv}>
        <div className={styles.LoginPage_imageDiv}>
          <img
            src="/loginpageimage.png"
            alt="App Store"
            width="781"
            height="805"
          />
        </div>
        <div className={styles.LoginPage_inputDiv}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h1>Log in to Exclusive</h1>
            <h5>Enter Your Details Below</h5>
            <TextField
              className={styles.LoginPage_inputDivEmail}
              label="Email or Username"
              variant="standard"
            />
            <br />
            <br />
            <TextField
            className={styles.LoginPage_inputDivPassword}
              label="Password"
              variant="standard"
              type="password"
            />
            <br />
            <br />
            <Button variant="contained" type="submit" color="success">
              Log In
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
