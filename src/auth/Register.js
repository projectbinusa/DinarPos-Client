import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button, Card, Input, Typography } from "@material-tailwind/react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setnama] = useState("");
  const history = useHistory();
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
                  className="text-black h-5 w-5 cursor-pointer"
                  onClick={togglePassword}
                />
              ) : (
                <EyeSlashIcon
                  className="text-black h-5 w-5 cursor-pointer"
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

export default Register;
