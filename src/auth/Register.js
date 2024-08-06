import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { API_PENGGUNA } from "../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import brand from "../assets/brand.png";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setnama] = useState("");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const register = async (e) => {
    e.preventDefault();

    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(
      password
    );

    if (isValidPassword === false) {
      Swal.fire({
        icon: "warning",
        title: "Password Tidak Sesuai!",
        text: "Password minimal 8 karakter dengan kombinasi angka, huruf kecil & besar ",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    const requestPengguna = {
      levelPengguna: "Superadmin",
      passwordPengguna: password,
      usernamePengguna: username,
      namaPengguna: nama,
      roleToko: "Superadmin",
    };

    try {
      await axios.post(`${API_PENGGUNA}/add`, requestPengguna);
      Swal.fire({
        icon: "success",
        title: "Berhasil Registrasi!",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      if (error.response.data.data === "Password not valid!") {
        Swal.fire({
          icon: "warning",
          title: "Password Tidak Sesuai!",
          text: "Password minimal 8 karakter dengan kombinasi angka, huruf kecil & besar ",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else if (
        error.response.data.data === "Username Pengguna sudah digunakan"
      ) {
        Swal.fire({
          icon: "warning",
          title: "Username Pengguna Sudah Digunakan!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-50 font-helvetica">
      <Card className="p-8">
        <img src={brand} alt="brand" className="h-20 mx-auto mb-12" />
        <form className="lg:w-80 w-64" onSubmit={register}>
          <Input
            color="blue"
            size="lg"
            variant="standard"
            label="Username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="mt-5">
            <Input
              color="blue"
              size="lg"
              variant="standard"
              label="Nama"
              placeholder="Nama"
              value={nama}
              onChange={(e) => setnama(e.target.value)}
            />
          </div>
          <div className="relative my-5">
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
          <Typography variant="small" className="mt-6 text-red-400 font-poppins">
            * Password minimal 8 karakter dengan kombinasi angka, huruf besar
            dan kecil
          </Typography>

          <Button
            color="blue"
            className="w-full focus:outline-none mt-3"
            type="submit"
          >
            <Typography variant="h6" className="font-poppins font-medium">Register</Typography>
          </Button>
        </form>
        <Typography variant="small" className="mt-6 text-center font-poppins">
          Sudah Punya Akun?
          <a href="/" className="text-blue-500 underline">
            Login
          </a>
        </Typography>
      </Card>
    </section>
  );
}

export default Register;
