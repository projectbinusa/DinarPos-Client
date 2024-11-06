import React, { useEffect, useState } from "react";
import Decrypt from "../component/Decrypt";
import axios from "axios";
import { API_PENGGUNA } from "./BaseUrl";

function LevelPengguna() {
    const [level, setlevel] = useState("");
    const id = Decrypt();
    useEffect(() => {
        axios
            .get(`${API_PENGGUNA}/` + id, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            })
            .then((res) => {
                const response = res.data.data;
                setlevel(response.levelPengguna);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);
    return level
}

export default LevelPengguna;