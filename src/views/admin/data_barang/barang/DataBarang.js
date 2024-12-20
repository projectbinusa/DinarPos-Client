import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import $ from "jquery";
import "datatables.net";
import "./../../../../assets/styles/datatables.css";
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { API_BARANG, API_PENGGUNA, API_POIN } from "../../../../utils/BaseUrl";
import axios from "axios";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Decrypt from "../../../../component/Decrypt";

function DataBarang() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => setOpen2(!open2);

  const tableRef = useRef(null);
  const [barangs, setBarang] = useState([]);
  const [excel, setExcel] = useState("");

  const [tglAwal, setTglAwal] = useState("");
  const [tglAkhir, setTglAkhir] = useState("");

  const history = useHistory();

  const initializeDataTable = () => {
    if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable({});
    }
  };

  // GET ALL
  const getAll = async () => {
    try {
      const response = await axios.get(`${API_BARANG}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setBarang(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (barangs && barangs.length > 0) {
      initializeDataTable();
    }
  }, [barangs]);

  // DELETE BARANG
  const deleteBarang = async (id) => {
    Swal.fire({
      title: "Apakah Anda Ingin Menghapus?",
      text: "Perubahan data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_BARANG}/` + id, {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Dihapus!",
              showConfirmButton: false,
              timer: 1500,
            });

            setTimeout(() => {
              history.push("/data_barang");
              window.location.reload();
            }, 1500);
          });
      }
    });
  };

  // DOWNLOAD FORMAT
  const downloadFormat = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_BARANG}/template`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Template_Barang.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error saat mengunduh file:", error);
    }
  };

  // EXPORT BARANG
  const exportDataBarang = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_BARANG}/export`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Data_Barang.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error saat mengunduh file:", error);
    }
  };

  // IMPORT BARANG
  const importFromExcel = async (e) => {
    e.preventDefault();
    if (excel === "") {
      Swal.fire({
        icon: "warning",
        title: "Isi Form Terlebih Dahulu!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const formData = new FormData();

    formData.append("file", excel);

    await axios
      .post(`${API_BARANG}/import`, formData, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        responseType: "blob",
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Sukses!",
          text: " Berhasil Ditambahkan",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Import Barang Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(err);
      });
  };

  // EXPORT PERSEDIAAN BARANG 
  const exportPersediaanBarang = async (e) => {
    e.preventDefault();
    if (tglAwal === "" || tglAkhir === "" || tglAwal === tglAkhir) {
      Swal.fire({
        icon: "warning",
        title: "Isi Form Terlebih Dahulu!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      const response = await axios.get(`${API_POIN}/export/excel?endDate=${tglAkhir}&startDate=${tglAwal}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Persediaan_Barang.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      Swal.fire({
        icon: "success",
        title: "Export Berhasil!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error saat mengunduh file",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error saat mengunduh file:", error);
    }
  };


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

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Data Barang
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
            <a href="/data_barang">
              <span>Barang</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded ">
          {level === "Superadmin" || level === "Gudang" || level === "Admin" ? (
            <>
              <div className="flex justify-between">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div>
                    <Button
                      onClick={handleOpen}
                      variant="gradient"
                      color="green"
                      className="font-poppins font-medium"
                    >
                      Import
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={handleOpen2}
                      variant="gradient"
                      color="light-blue"
                      className="font-poppins font-medium"
                    >
                      Export
                    </Button>
                  </div>
                </div>
                <a href="/add_barang">
                  <Button variant="gradient" color="blue" className="font-poppins font-medium">
                    Tambah
                  </Button>
                </a>
              </div>
              <br />
              <div >
                <div className="mt-8 w-full lg:w-[50%]">
                  <Input
                    variant="static"
                    color="blue"
                    type="date"
                    label="Tanggal Awal"
                    required
                    onChange={(e) => setTglAwal(e.target.value)}
                  />
                </div>
                <div className="mt-8 w-full lg:w-[50%]">
                  <Input
                    variant="static"
                    color="blue"
                    type="date"
                    label="Tanggal Akhir"
                    required
                    onChange={(e) => setTglAkhir(e.target.value)}
                  />
                </div>
                <Button className="mt-5 font-poppins font-medium" color="blue" type="button" onClick={exportPersediaanBarang}>
                  Export persediaan barang
                </Button>
              </div>
            </>
          ) : (
            <></>
          )}

          <div className="rounded my-5 p-2 w-full overflow-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Barcode Barang
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Nama Barang
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Unit Barang
                  </th>
                  {level === "Superadmin" || level === "Gudang" ? (
                    <>
                      <th className="text-sm py-2 px-3 font-semibold">
                        Harga Beli (Rp)
                      </th>
                    </>
                  ) : (
                    <></>
                  )}
                  <th className="text-sm py-2 px-3 font-semibold">
                    Harga Jual (Rp)
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Jumlah <span className="text-sm block">Stok</span>
                  </th>
                  {level === "Superadmin" || level === "Gudang" ? (
                    <>

                      <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                    </>
                  ) : (
                    <></>
                  )}
                </tr>
              </thead>
              <tbody>
                {barangs.length > 0 ? (
                  barangs.map((barang, index) => (
                    <tr key={index}>
                      <td className="text-sm w-[4%]">{index + 1}</td>
                      <td className="text-sm py-2 px-3">
                        {barang.barcodeBarang}
                      </td>
                      <td className="text-sm py-2 px-3">{barang.namaBarang}</td>
                      <td className="text-sm py-2 px-3">{barang.unit}</td>
                      {level === "Superadmin" || level === "Gudang" ? (
                        <>
                          <td className="text-sm py-2 px-3">
                            {barang.hargaBeli}
                          </td>
                        </>
                      ) : (
                        <></>
                      )}
                      <td className="text-sm py-2 px-3">
                        {barang.hargaBarang}
                      </td>
                      <td className="text-sm py-2 px-3">{barang.jumlahStok}</td>
                      {level === "Superadmin" || level === "Gudang" ? (
                        <>
                          <td className="text-sm py-2 px-3 flex items-center justify-center">
                            <div className="flex flex-row gap-3">
                              <a href={"/edit_barang/" + barang.id}>
                                <IconButton size="md" color="light-blue">
                                  <PencilIcon className="w-6 h-6 white" />
                                </IconButton>
                              </a>
                              <IconButton
                                size="md"
                                color="red"
                                type="button"
                                onClick={() => deleteBarang(barang.id)}
                              >
                                <TrashIcon className="w-6 h-6 white" />
                              </IconButton>
                            </div>
                          </td>
                        </>
                      ) : (
                        <></>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-sm text-center capitalize py-3 bg-gray-100"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      {/* MODAL IMPORT */}
      <Dialog open={open} handler={handleOpen} size="md">
        <DialogHeader className="font-poppins font-medium">Import Data Barang</DialogHeader>
        <DialogBody>
          <p className="text-black">Silahkan download format di bawah ini</p>
          <Button
            variant="gradient"
            color="blue"
            className="mt-2 mb-5 font-poppins font-medium"
            onClick={downloadFormat}
          >
            Download Format
          </Button>
          <hr />
        </DialogBody>
        <form onSubmit={importFromExcel}>
          <DialogBody>
            <Input
              label="Pilih File"
              variant="static"
              color="blue"
              type="file"
              required
              accept=".xlsx"
              onChange={(e) => setExcel(e.target.files[0])}
            />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="gray"
              onClick={handleOpen}
              className="mr-1 font-poppins font-medium"
            >
              <span>Kembali</span>
            </Button>
            <Button
              variant="gradient"
              color="blue"
              type="submit"
              className="font-poppins font-medium"
            >
              <span>Import</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      {/* END MODAL IMPORT */}

      {/* MODAL EXPORT */}
      <Dialog open={open2} handler={handleOpen2} size="md">
        <DialogHeader>Export Data Barang</DialogHeader>
        <DialogBody>
          <p className="text-black">Silahkan export di bawah ini</p>
          <Button
            variant="gradient"
            color="blue"
            className="mt-2 mb-5"
            onClick={exportDataBarang}
          >
            Export Data Barang
          </Button>
          <hr />
        </DialogBody>
        <form action="" className="">
          <DialogBody>
            <Input
              label="Tanggal Awal"
              variant="static"
              color="blue"
              type="date"
            />
            <div className="mt-8">
              <Input
                label="Tanggal Akhir"
                variant="static"
                color="blue"
                type="date"
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="gray"
              onClick={handleOpen2}
              className="mr-1"
            >
              <span>Kembali</span>
            </Button>
            <Button
              variant="gradient"
              color="blue"
              onClick={handleOpen2}
              type="submit"
            >
              <span>Export Barang</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      {/* END MODAL EXPORT */}
    </section>
  );
}

export default DataBarang;
