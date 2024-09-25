import React, { useState,useEffect } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { API_OMZET,API_SALESMAN  } from "../../../utils/BaseUrl";
import {
   Button,
   Input,
   Typography,
   Breadcrumbs 
} from "@material-tailwind/react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function AddOmzet() {
  const history = useHistory();
  const [created_date, setCreatedDate] = useState("");
  const [omzet, setOmzet] = useState("");
  const [salesmanId, setsalesmanId] = useState(0);

  const addOmzet = async (e) => {
    e.preventDefault();

    // Pastikan omzet adalah angka
    const parsedOmzet = parseFloat(omzet);
    
    if (isNaN(parsedOmzet)) {
      Swal.fire({
        icon: "error",
        title: "Input Tidak Valid!",
        text: "Jumlah Omzet harus berupa angka.",
        showConfirmButton: false,
        timer: 1500,
      });
      return; // Hentikan eksekusi jika omzet tidak valid
    }

    const request = {
      created_date: created_date, // Pastikan format tanggal sesuai
      omzet: omzet,
      id_salesman: salesmanId,
    };

    try {
      const response = await axios.post(`${API_OMZET}/add`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });

      // Cek respon dari API
      console.log("Response dari server:", response.data);

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Data Berhasil Ditambahkan",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/omzet");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          localStorage.clear();
          history.push("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Tambah Data Gagal!",
            text: data.message || "Terjadi kesalahan saat menambahkan data.",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log("Error Response:", error.response); // Tampilkan respon kesalahan
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Tambah Data Gagal!",
          text: "Tidak dapat terhubung ke server.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

   // ALL SALESMAN
   const [values, setvalues] = useState("");
   const [options, setoptions] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
 
   const handle = async () => {
     if (values.trim() !== "") {
       const response = await fetch(
         `${API_SALESMAN}/pagination?limit=10&page=${currentPage}&search=${values}&sort=1`,
         {
           headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
         }
       );
       const data = await response.json();
       setoptions(data.data);
     } else {
       return;
     }
   };
 
   useEffect(() => {
     handle();
   }, [currentPage, values]);
 
   const handleChange = (event) => {
     setvalues(event.target.value);
     setCurrentPage(1);
   };

  const level = localStorage.getItem("userLevel"); // Pastikan level didefinisikan dengan benar
  let dashboard = "";

  if (level === "Superadmin") {
    dashboard = "dashboard";
  } else if (level === "AdminService") {
    dashboard = "dashboard_service";
  }


  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Tambah Omzet
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
            <a href="/data_customer">
              <span>Customer</span>
            </a>
            <span className="cursor-default capitalize">Tambah Omzet</span>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg px-5 py-8 my-5 rounded">
          <div> 
           <form onSubmit={addOmzet}>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="flex gap-2 items-end">
                  <Input
                      label="Tanggal"
                      variant="static"
                      color="blue"
                      size="lg"
                      placeholder="Masukkan Tanggal"
                      type="date"
                      name="tanggal"
                      value={created_date}
                      onChange={(e) => setCreatedDate(e.target.value)}
                      required
                    />
                </div>
                <div>
                  <Input
                    label="Omzet"
                    size="lg"
                    placeholder="Masukan Omzet"
                    variant="static"
                    color="blue"
                    name="Omzet"
                    value={omzet}
                    onChange={(e) => setOmzet(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Input
                      label="Salesman"
                      variant="static"
                      color="blue"
                      list="salesman-list"
                      id="salesman"
                      name="salesman"
                      onChange={(event) => {
                        handleChange(event);
                        setsalesmanId(event.target.value);
                      }}
                      placeholder="Pilih Salesman"
                    />
                    <datalist id="salesman-list">
                      {options.length > 0 && (
                        <>
                          {options.map((option) => (
                            <option value={option.id} key={option.id}>
                              {option.namaSalesman}
                            </option>
                          ))}
                        </>
                      )}
                    </datalist>

                  {/* <div className="flex gap-2">
                    <button
                      className="text-sm bg-gray-400 px-1"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Prev
                    </button>
                    <button
                      className="text-sm bg-gray-400 px-1"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={!options.length}
                    >
                      Next
                    </button>
                  </div> */}

                <div className="mt-10 flex gap-4">
                  <Button variant="gradient" color="blue" type="button" onClick={addOmzet} className="font-poppins font-medium">
                    <span>Simpan</span>
                  </Button>
                  <a href="/omzet">
                    <Button variant="text" color="gray" className="mr-1 font-poppins font-medium">
                      <span>Kembali</span>
                    </Button>
                 </a>
               </div>
               </div>
               </div>
            </form>
            </div>
          </main>
        </div>
    </section>
  );
}

export default AddOmzet;
