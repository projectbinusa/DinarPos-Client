import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input, Option, Select, Typography } from "@material-tailwind/react";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_BON_BARANG, API_PENGGUNA } from "../../../utils/BaseUrl";
import Swal from "sweetalert2";
import { CalendarIcon, CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Decrypt from "../../../component/Decrypt";

function DataBon() {
  const tableRef = useRef(null);
  const [bonBarang, setBonBarang] = useState([]);

  // MODAL
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_BON_BARANG}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setBonBarang(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (bonBarang && bonBarang.length > 0) {
      initializeDataTable();
    }
  }, [bonBarang]);

  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  // HAPUS BON BARANG
  const hapusBonBarang = async (id) => {
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
          .delete(`${API_BON_BARANG}/` + id, {
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
              window.location.reload();
            }, 1500);
          }).catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Gagal!",
              text: "Hapus Bon Barang Gagal!",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(err);
          })
      }
    });
  };

  // UPDATE TGL KEMBALIKAN BON BARANG
  const [tglKembali, setTglKembali] = useState("");
  const [statusService, setStatusService] = useState("");
  const [selectId, setSelectId] = useState(0);

  const updateTglKembaliBonBarang = async () => {
    const request = {
      tgl_kembali: tglKembali,
      status_service: statusService
    };

    await axios
      .put(`${API_BON_BARANG}/` + selectId, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then(() => {
        handleOpen();
        Swal.fire({
          icon: "success",
          title: "Update Tanggal Kembali Berhasil!",
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
          title: "Update Tanggal Kembali Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });

        console.log(err);
      });
  };

  const handleSelectId = async (id) => {
    setSelectId(id)
  }

  // UPDATE TGL STATUS BARANG
  const updateStatusBarang = async (id) => {
    const request = {
      status_barang: "Barang ready"
    };

    await axios
      .put(`${API_BON_BARANG}/update_status_barang/` + id, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Update Status Barang Berhasil!",
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
          title: "Update Status Barang Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });

        console.log(err);
      });
  };

  const [level, setlevel] = useState("");

  const idPengguna = Decrypt()
  useEffect(() => {
    axios.get(`${API_PENGGUNA}/` + idPengguna, {
      headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
    }).then((res) => {
      const response = res.data.data;
      setlevel(response.levelPengguna)
    }).catch((err) => {
      console.log(err);
    })
  }, [idPengguna])

  let dashboard = "";

  if (level === "Superadmin") {
    dashboard = "dashboard";
  } else if (level === "AdminService") {
    dashboard = "dashboard_service"
  }

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Bon Barang
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href={"/" + dashboard} className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/data_bon_barang">
              <span>Bon Barang</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded ">
          <div className="flex justify-end">
            <a href="/add_bon_barang">
              <Button variant="gradient" color="blue" className="font-popins font-medium">
                Tambah
              </Button>
            </a>
          </div>
          <div className="rounded my-5 p-2 w-full overflow-x-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto min-w-full"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold w-[4%]">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">ID TT</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Nama Teknisi
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Barcode Barang
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Tanggal Ambil
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Status Barang                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Status Service                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Tanggal Kembalikan
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">Aksi </th>
                </tr>
              </thead>
              <tbody>
                {bonBarang.length > 0 ? (
                  bonBarang.map((bon, index) => (
                    <tr key={index}>
                      <td className="text-sm w-[4%]">{index + 1}</td>
                      <td className="text-sm py-2 px-3">
                        {bon.serviceBarang.idTT}
                      </td>
                      <td className="text-sm py-2 px-3">{bon.teknisi.nama}</td>
                      <td className="text-sm w-[15%] py-2 px-3">
                        {bon.barang.barcodeBarang}
                      </td>
                      <td className="text-sm py-2 px-3">
                        {formatDate(bon.tgl_ambil)}
                      </td>
                      <td className="text-sm py-2 px-3">
                        {bon.status_barang}
                      </td>
                      <td className="text-sm py-2 px-3">
                        {bon.status_service}
                      </td>
                      <td className="text-sm py-2 px-3">
                        {bon.tgl_kembalikan === null ? (
                          <></>
                        ) : (
                          <>{formatDate(bon.tgl_kembalikan)}</>
                        )}
                      </td>
                      <td className="text-sm py-2 px-3 flex items-center justify-center">
                        <div className="flex flex-wrap gap-3">
                          {bon.tgl_kembalikan != null ? (
                            <></>
                          ) : (
                            <>
                              <div>
                                <IconButton
                                  size="md"
                                  color="orange"
                                  onClick={() => { handleOpen(); handleSelectId(bon.id); }}
                                >
                                  <CalendarIcon className="w-6 h-6 white" />
                                </IconButton>
                              </div>
                            </>
                          )}
                          {bon.status_barang === "Barang belum ready" ? (
                            <>
                              <div>
                                <IconButton
                                  size="md"
                                  color="green"
                                  onClick={() => updateStatusBarang(bon.id)}
                                >
                                  <CheckIcon className="w-6 h-6 white" />
                                </IconButton>
                              </div>
                            </>
                          ) : (
                            <>
                            </>
                          )}
                          <a href={"/edit_bon_barang/" + bon.id}>
                            <IconButton size="md" color="light-blue">
                              <PencilIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                          <div>
                            <IconButton
                              size="md"
                              color="red"
                              onClick={() => hapusBonBarang(bon.id)}
                            >
                              <TrashIcon className="w-6 h-6 white" />
                            </IconButton>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
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
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Konfirmasi Status Service</DialogHeader>
        <hr />
        <DialogBody className="mt-4 ">
          <div className="grid grid-cols-1 gap-8">
            <Input
              label="Tanggal Kembalikan"
              variant="static"
              color="blue"
              size="lg"
              type="date"
              onChange={(e) => setTglKembali(e.target.value)}
              required
            />
            <Select label="Status" variant="static" color="blue" size="lg" onChange={(event) => setStatusService(event)} required>
              <Option value="Barang masuk gudang">Barang masuk gudang</Option>
              <Option value="Barang masuk konsumen">Barang masuk konsumen</Option>
            </Select>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="gray"
            onClick={handleOpen}
            className="mr-1 font-popins font-medium"
          >
            <span>Batal</span>
          </Button>
          <Button
            variant="gradient"
            color="blue"
            className="mr-1 font-popins font-medium"
            onClick={updateTglKembaliBonBarang}
          >
            <span>Konfirmasi</span>
          </Button>
        </DialogFooter>
      </Dialog>

    </section>
  );
}

export default DataBon;
