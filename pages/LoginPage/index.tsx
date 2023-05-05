import { useState } from "react";
import styles from "./LoginPage.module.css";
import TextField from "@mui/material/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "@/store";
import { loginUserAsync } from "@/reducers/AuthSlice";
import { User } from "@/types/UserDetails";

interface LoginForm {
  username: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    const { username, password } = data;
  const user: User = { id: 0, username, password };
    dispatch(loginUserAsync(user)).then((resultAction) => {
      if (loginUserAsync.fulfilled.match(resultAction)) {
        router.push("/");
      } else {
        setErrorMessage("Error logging in");
      }
    });
  };
  return (
    <>
      <div className={styles.LoginPage_container}>
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
              {...register("username", { required: true })}
              className={styles.LoginPage_inputDivEmail}
              label="Username"
              variant="standard"
            />
            <br />
            <TextField
              {...register("password", { required: true })}
              className={styles.LoginPage_inputDivPassword}
              label="Password"
              variant="standard"
              type="password"
            />
            <br />
            <Button
              variant="contained"
              type="submit"
              disabled={authStatus === "loading"}
              sx={{ backgroundColor: "#db4444" }}
            >
              Log In
            </Button>
            {errorMessage && (
              <span className={styles.inputDivError}>{errorMessage}</span>
            )}
            <span className={styles.inputDivForget}>Forget Password?</span>
          </Form>
        </div>
      </div>
    </>
  );
}
