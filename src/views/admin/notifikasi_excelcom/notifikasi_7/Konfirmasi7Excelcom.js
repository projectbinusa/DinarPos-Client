import React, { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import {
  API_SALESMAN,
  GET_TRANSAKSI_JUAL,
  KONFIRMASI_7,
} from "../../../../utils/BaseUrl";
import Swal from "sweetalert2";
import axios from "axios";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";

function Konfirmasi7Excelcom() {
  const [salesmanId, setsalesmanId] = useState(0);
  const [ket, setket] = useState("");
  const [noFaktur, setnoFaktur] = useState("");

  const history = useHistory();
  const param = useParams();

  // ALL SALESMAN
  const [valuesSalesman, setvaluesSalesman] = useState("");
  const [optionsSalesman, setoptionsSalesman] = useState([]);
  const [currentPageSalesman, setCurrentPageSalesman] = useState(1);

  const handleSalesman = async () => {
    if (valuesSalesman.trim() !== "") {
      const response = await fetch(
        `${API_SALESMAN}/pagination?limit=10&page=${currentPageSalesman}&search=${valuesSalesman}&sort=1`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setoptionsSalesman(data.data);
    } else {
      return;
    }
  };

  useEffect(() => {
    handleSalesman();
  }, [currentPageSalesman, valuesSalesman]);

  const handleChangeSalesman = (event) => {
    setvaluesSalesman(event.target.value);
    setCurrentPageSalesman(1);
  };
  // END ALL SALESMAN

  useEffect(() => {
    axios
      .get(`${GET_TRANSAKSI_JUAL}/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const response = res.data.data;
        setnoFaktur(response.noFaktur);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // KONFIRMASI
  const konfirmasi = async (e) => {
    e.preventDefault();

    const request = {
      id_salesman: salesmanId,
      ket: ket,
    };

    await axios
      .put(`${KONFIRMASI_7}/` + param.id, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Konfirmasi!",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/notifikasi_7_excelcom");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        if (error.ressponse && error.response.status === 401) {
          localStorage.clear();
          history.push("/");
        } else {
          console.log(error);
        }
      });
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            konfirmasi 7 hari Excelcom
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/notifikasi_7_excelcom">
              <span>Notifikasi 7 Hari Excelcom</span>
            </a>
            <span className="cursor-default capitalize">Konfirmasi</span>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg px-5 py-8 my-5 rounded">
          <Typography variant="paragraph" className="capitalize">
            Konfirmasi 7 hari {noFaktur}
          </Typography>
          <br />
          <br />
          <form onSubmit={konfirmasi}>
            <div>
              <div className="flex gap-2 items-end">
                <Input
                  label="Salesman"
                  variant="static"
                  color="blue"
                  list="salesman-list"
                  id="salesman"
                  name="salesman"
                  onChange={(event) => {
                    handleChangeSalesman(event);
                    setsalesmanId(event.target.value);
                  }}
                  placeholder="Pilih Salesman"
                  required
                />
                <datalist id="salesman-list">
                  {optionsSalesman.length > 0 && (
                    <>
                      {optionsSalesman.map((option) => (
                        <option value={option.idSalesman}>
                          {option.namaSalesman}
                        </option>
                      ))}
                    </>
                  )}
                </datalist>

                <div className="flex gap-2">
                  <button
                    className="text-sm bg-gray-400 px-1"
                    onClick={() =>
                      setCurrentPageSalesman(currentPageSalesman - 1)
                    }
                    disabled={currentPageSalesman === 1}
                  >
                    Prev
                  </button>
                  <button
                    className="text-sm bg-gray-400 px-1"
                    onClick={() =>
                      setCurrentPageSalesman(currentPageSalesman + 1)
                    }
                    disabled={!optionsSalesman.length}
                  >
                    Next
                  </button>
                </div>
              </div>
              <br />
              <Textarea
                color="blue"
                variant="static"
                label="Keterangan"
                placeholder="Masukkan Keterangan"
                onChange={(e) => setket(e.target.value)}
                required
              />
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit">
                <span>Simpan</span>
              </Button>
              <a href="/notifikasi_7_excelcom">
                <Button variant="text" color="gray" className="mr-1">
                  <span>Kembali</span>
                </Button>
              </a>
            </div>
          </form>
        </main>
      </div>
    </section>
  );
}

export default Konfirmasi7Excelcom;
