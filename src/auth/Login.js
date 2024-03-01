import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import brand from "../assets/brand.png";
import { API_USER } from "../utils/BaseUrl";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  // AKSI LOGIN

  const login = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    try {
      const res = await axios.post(`${API_USER}/login`, data);
      const response = res.data;

      console.log(response);

      if (response.code === 200) {
        history.push("/dashboard_admin");
        setTimeout(() => {
          window.location.reload();
        }, 1000);

        // SET LOCAL STORAGE
        localStorage.setItem("id", response.data.data.id);
        localStorage.setItem("level", response.data.data.level);
        localStorage.setItem("token", response.data.token);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-50 font-helvetica">
      <Card className="p-8">
        <img src={brand} alt="brand" className="h-20 mx-auto mb-12" />
        <form className="flex lg:w-80 w-64 flex-col items-end gap-8" onSubmit={login}>
          <Input
            color="blue"
            size="lg"
            variant="standard"
            label="Username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            color="blue"
            size="lg"
            variant="standard"
            label="Password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button color="blue" className="w-full focus:outline-none" type="submit">
            <Typography variant="h6">Login</Typography>
          </Button>
        </form>
      </Card>
    </section>
  );
}

export default Login;
