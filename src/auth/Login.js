import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import brand from "../assets/brand.png";
import { API_PENGGUNA } from "../utils/BaseUrl";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import CryptoJS from 'crypto-js';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const encryptData = (data, secretKey) => {
    const ciphertext = CryptoJS.AES.encrypt(data, secretKey).toString();
    return ciphertext;
  };

  const generateRandomKey = (length) => {
    const randomBytes = CryptoJS.lib.WordArray.random(length);
    return randomBytes.toString();
  };

  const secretKey = generateRandomKey(16);

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
          const level = response.data.data.levelPengguna;

          if (
            level === "Superadmin" ||
            level === "Admin" ||
            level === "Kasir" ||
            level === "Gudang" ||
            level === "Accounting"
          ) {
            history.push("/dashboard");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else if (level === "Pimpinan") {
            history.push("/dashboard_pimpinan");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else if (level === "Teknisi") {
            history.push("/dashboard_teknisi");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else if (level === "AdminService") {
            history.push("/dashboard_service");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else if (level === "AdminItc" || level === "Marketting" || level === "Keuangan" || level === "GudangItc" || level === "PimpinanItc") {
            history.push("/home");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }


          // SET LOCAL STORAGE
          localStorage.setItem("token", response.data.token);

          const id = response.data.data.idPengguna;
          const encrypt = encryptData(id.toString(), secretKey);
          localStorage.setItem("encrypt", encrypt);
          localStorage.setItem("secret", secretKey);
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
            <div className="absolute bottom-2 right-3 ">
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
            <Typography variant="h6" className="font-poppins font-medium">Login</Typography>
          </Button>
        </form>
      </Card>
    </section>
  );
}

export default Login;
