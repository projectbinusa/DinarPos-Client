import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React from "react";
import brand from "../assets/brand.png";

function Login() {
  return (
    <section className="h-screen flex items-center justify-center bg-gray-50 font-helvetica">
      <Card className="p-8">
        <img src={brand} alt="brand" className="h-20 mx-auto mb-12" />
        <form className="flex md:w-80 w-64 flex-col items-end gap-8">
          <Input
            color="blue"
            size="lg"
            variant="standard"
            label="Username"
            placeholder="Username"
            id="username"
          />
          <Input
            color="blue"
            size="lg"
            variant="standard"
            label="Password"
            placeholder="Password"
            type="password"
            id="password"
          />
          <Button color="blue" className="w-full" type="submit">
            <Typography variant="h6">Login</Typography>
          </Button>
        </form>
      </Card>
    </section>
  );
}

export default Login;
