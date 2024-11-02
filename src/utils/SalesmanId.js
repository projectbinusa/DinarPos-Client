import React, { useEffect, useState } from "react";
import Decrypt from "../component/Decrypt";
import axios from "axios";
import { API_ITC, API_PENGGUNA } from "./BaseUrl";

function SalesmanId() {
    const id = Decrypt();
    const [salesmanId, setsalesmanId] = useState(0);
    useEffect(() => {
        axios
            .get(`${API_PENGGUNA}/` + id, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            })
            .then((res) => {
                const response = res.data.data.namaPengguna;
                try {
                    axios
                        .get(`${API_ITC}/nama?nama=` + response, {
                            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                        })
                        .then((ress) => {
                            setsalesmanId(ress.data.data.id || 0);
                        });
                } catch (err) {
                    console.log(err);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    return salesmanId;
}

export default SalesmanId;