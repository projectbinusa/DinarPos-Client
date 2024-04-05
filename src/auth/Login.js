import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import brand from "../assets/brand.png";
import { API_PENGGUNA } from "../utils/BaseUrl";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

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
      await axios.post(`${API_PENGGUNA}/login`, data).then((res) => {
        const response = res.data;

        if (response.code === 200) {
          history.push("/dashboard_admin");
          setTimeout(() => {
            window.location.reload();
          }, 1000);

          // SET LOCAL STORAGE
          localStorage.setItem("id", response.data.data.idPengguna);
          localStorage.setItem("level", response.data.data.levelPengguna);
          localStorage.setItem("roleToko", response.data.data.roleToko);
          localStorage.setItem("token", response.data.token);
        }
      });
    } catch (err) {
      if (err.response.data.code === 404) {
        Swal.fire({
          icon: "error",
          title: "Username atau Password Salah!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Tidak Bisa Login!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("Error");
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <section className="h-screen flex items-center justify-center bg-gray-50 font-helvetica">
      <Card className="p-8">
        <img src={brand} alt="brand" className="h-20 mx-auto mb-12" />
        <form className="lg:w-80 w-64" onSubmit={login}>
          <Input
            color="blue"
            size="lg"
            variant="standard"
            label="Username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="relative my-8">
            <div>
              <Input
                color="blue"
                size="lg"
                variant="standard"
                label="Password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="absolute bottom-2 right-3 ">
              {showPassword ? (
                <EyeIcon
                  className="text-blue-500 h-5 w-5 cursor-pointer"
                  onClick={togglePassword}
                />
              ) : (
                <EyeSlashIcon
                  className="text-blue-500 h-5 w-5 cursor-pointer"
                  onClick={togglePassword}
                />
              )}
            </div>
          </div>
          <Button
            color="blue"
            className="w-full focus:outline-none"
            type="submit"
          >
            <Typography variant="h6">Login</Typography>
          </Button>
        </form>
      </Card>
    </section>
  );
}

export default Login;
