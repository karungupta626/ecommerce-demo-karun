import { useEffect, useState } from "react";
import styles from "./LoginPage.module.css";
import TextField from "@mui/material/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "@/store";
import { loginUserAsync } from "@/reducers/AuthSlice";
import Image from "next/image";
interface LoginForm {
  username: string;
  password: string;
}
export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    if (isAuthenticated) {
    router.push("/");
    }
    }, [isAuthenticated]);
    
    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const { username, password } = data;
    try {
    await dispatch(loginUserAsync({ username, password }));
    } catch (error) {
    setErrorMessage((error as Error).message || "Check Your Credentials");
    }
    };
  return (
    <>
      <div className={styles.LoginPage_container}>
        <div className={styles.LoginPage_imageDiv}>
          <Image
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
            <br/>
            <TextField
              {...register("password", { required: true })}
              className={styles.LoginPage_inputDivPassword}
              label="Password"
              variant="standard"
              type="password"
            />
            <br/>
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
