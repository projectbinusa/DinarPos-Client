import React, { useState, useEffect, useRef } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_ITC, API_KUNJUNGAN, API_PENGGUNA } from "../../../utils/BaseUrl";
import $ from "jquery"
import Decrypt from "../../../component/Decrypt";
import { PhotoIcon } from "@heroicons/react/24/outline";

function ModalFotoKunjungan({ handleOpen, foto }) {
  return (
    <>
      <DialogHeader className="font-poppins font-medium">Foto Kunjungan</DialogHeader>
      <DialogBody>
        <img src={foto} style={{ height: '20rem', width: '100%' }} />
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="gray"
          onClick={handleOpen}
          className="mr-1 font-poppins font-medium"
        >
          <span>Tutup</span>
        </Button>
      </DialogFooter>
    </>
  )
}

function DetailKunjunganHari() {
  const [kunjunganData, setKunjunganData] = useState([]);
  const [idSalesman, setIdSalesman] = useState(0);
  const [foto, setfoto] = useState("");
  const param = useParams();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const tableRef = useRef(null);
  const initializeDataTable = () => {
    if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable({});
    }
  };

  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = String(date.getDate()).padStart(2, "0");
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const formattedDate = `${day} ${months[month]} ${year}`;
    return formattedDate;
  };

  const id = Decrypt();
  useEffect(() => {
    axios
      .get(`${API_PENGGUNA}/` + id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const response = res.data.data.namaPengguna;
        try {
          axios.get(`${API_ITC}/nama?nama=` + response, {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          }).then((ress) => {
            setIdSalesman(ress.data.data.id);
          })
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (param.tgl) {
      axios
        .get(`${API_KUNJUNGAN}/date/salesman?id_salesman=${idSalesman}&tanggal=${param.tgl}`, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          const response = res.data.data;
          setKunjunganData(response);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("ID parameter is undefined. Check your route setup.");
    }
  }, [param.tgl, idSalesman]);

  useEffect(() => {
    if (kunjunganData && kunjunganData.length > 0) {
      initializeDataTable()
    }
  }, [kunjunganData])

  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase font-poppins">
            Detail Kunjungan
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/home" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/daily_report">
              <span>Daily Report</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <Typography variant="lead" className="capitalize">
            Detail Kunjungan {formatDate(param.tgl)}
          </Typography>
          <hr />
          <div className="rounded mt-10 mb-5 p-1 overflow-x-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full overflow-x-auto"
            >
              <thead className="bg-blue-500 text-white w-full">
                <tr>
                  <th className="text-sm py-2 px-2 font-semibold w-[4%]">No</th>
                  <th className="text-sm py-2 px-2 font-semibold">Instansi</th>
                  <th className="text-sm py-2 px-2 font-semibold">Jenis</th>
                  <th className="text-sm py-2 px-2 font-semibold">Daerah</th>
                  <th className="text-sm py-2 px-2 font-semibold">Tujuan</th>
                  <th className="text-sm py-2 px-2 font-semibold">Action</th>
                  <th className="text-sm py-2 px-2 font-semibold">
                    Info didapat
                  </th>
                  <th className="text-sm py-2 px-3.5 font-semibold">CP</th>
                  <th className="text-sm py-2 px-3.5 font-semibold">Visit</th>
                  <th className="text-sm py-2 px-2 font-semibold">Tipe</th>
                  <th className="text-sm py-2 px-2 font-semibold">Peluang</th>
                  <th className="text-sm py-2 px-2 font-semibold">Deal</th>
                  <th className="text-sm py-2 px-2 font-semibold">Byr_%</th>
                  <th className="text-sm py-2 px-2 font-semibold">Wkt_p</th>
                  <th className="text-sm py-2 px-2 font-semibold">Tgl_d</th>
                  <th className="text-sm py-2 px-2 font-semibold">Foto</th>
                </tr>
              </thead>
              <tbody>
                {kunjunganData.length > 0 ?
                  kunjunganData.map((item, index) => (
                    <tr key={item.id}>
                      <td className="text-sm py-2 px-2 font-medium">
                        {index + 1}
                      </td>
                      <td className="text-sm py-2 px-2.5">{item.customer.nama_customer}</td>
                      <td className="text-sm py-2 px-2.5">{item.customer.jenis}</td>
                      <td className="text-sm py-2 px-2.5">{item.customer.kabKot.nama_kabkot} / {item.customer.kec.nama_kec}</td>
                      <td className="text-sm py-2 px-2.5">{item.tujuan}</td>
                      <td className="text-sm py-2 px-2.5">{item.action}</td>
                      <td className="text-sm py-2 px-2.5">{item.infoDpt}</td>
                      <td className="text-sm py-2 px-3.5">{item.cp}</td>
                      <td className="text-sm py-2 px-3.5">{item.nVisit}</td>
                      <td className="text-sm py-2 px-2.5">{item.visit}</td>
                      <td className="text-sm py-2 px-2.5">{item.peluang}</td>
                      <td className="text-sm py-2 px-2.5">{item.deal}</td>
                      <td className="text-sm py-2 px-2.5">{item.pembayaran}</td>
                      <td className="text-sm py-2 px-2.5">{item.waktuPengadaan}</td>
                      <td className="text-sm py-2 px-2.5">{item.tanggalDeal}</td>
                      <td className="text-sm py-2 px-2.5">
                        <IconButton size="md" color="green" onClick={() => {
                          handleOpen(); setfoto(item.foto)
                        }}>
                          <PhotoIcon className="w-6 h-6 white" />
                        </IconButton>
                      </td>
                    </tr>
                  )) : (<tr>
                    <td
                      colSpan="16"
                      className="text-sm text-center capitalize py-2 bg-gray-100 ">
                      Tidak ada data
                    </td>
                  </tr>
                  )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* MODAL */}
      <Dialog open={open} handler={handleOpen} size="md">
        <ModalFotoKunjungan handleOpen={handleOpen} foto={foto} />
      </Dialog>
      {/* END MODAL */}
    </section >
  );
}

export default DetailKunjunganHari;
