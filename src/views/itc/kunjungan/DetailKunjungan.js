import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Typography } from "@material-tailwind/react";
import axios from "axios";
import { API_KUNJUNGAN } from "../../../utils/BaseUrl";

function DetailKunjungan() {
  const [datas, setDatas] = useState(null);
  const param = useParams();

  useEffect(() => {
    if (param.id) {
      axios
        .get(`${API_KUNJUNGAN}/${param.id}`, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          setDatas(res.data.data);
          console.log(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [param.id]);

  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
          <Typography variant="lead" className="uppercase">
            Detail Kunjungan
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
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Column 1 */}
            <div>
              <div className="mb-4">
                <span className="font-bold">Tanggal: </span>
                <span>{datas?.tanggal}</span>
              </div>
              <div className="mb-4">
                <span className="font-bold">Jenis Instansi: </span>
                <span>{datas?.jenis_instansi}</span>
              </div>
              <div className="mb-4">
                <span className="font-bold">Daerah: </span>
                <span>{datas?.daerah}</span>
              </div>
              <div className="mb-4">
                <span className="font-bold">Action: </span>
                <span>{datas?.action}</span>
              </div>
              <div className="mb-4">
                <span className="font-bold">CP: </span>
                <span>{datas?.cp}</span>
              </div>
              <div className="mb-4">
                <span className="font-bold">Deal: </span>
                <span>{datas?.deal}</span>
              </div>
              <div className="mb-4">
                <span className="font-bold">Waktu Pengadaan: </span>
                <span>{datas?.waktu_pengadaan}</span>
              </div>
              <div className="mb-4">
                <span className="font-bold">Tanggal Deal: </span>
                <span>{datas?.tanggal_deal}</span>
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <div className="mb-4">
                <span className="font-bold">Instansi: </span>
                <span>{datas?.instansi}</span>
              </div>
              <div className="mb-4">
                <span className="font-bold">Tujuan: </span>
                <span>{datas?.tujuan}</span>
              </div>
              <div className="mb-4">
                <span className="font-bold">Peluang: </span>
                <span>{datas?.peluang}</span>
              </div>
              <div className="mb-4">
                <span className="font-bold">Info yang didapat: </span>
                <span>{datas?.info_didapat}</span>
              </div>
              <div className="mb-4">
                <span className="font-bold">Kunjungan Ke-: </span>
                <span>{datas?.kunjungan_ke}</span>
              </div>
              <div className="mb-4">
                <span className="font-bold">Pembayaran: </span>
                <span>{datas?.pembayaran}</span>
              </div>
              <div className="mb-4">
                <span className="font-bold">Tipe: </span>
                <span>{datas?.tipe}</span>
              </div>

              {/* Lokasi Reporting */}
              <div className="mb-4">
                <span className="font-bold">Lokasi Reporting: </span>
                <div>
                  <iframe
                    src={`https://maps.google.com/maps?q=${datas?.lokasi_lat},${datas?.lokasi_lng}&z=15&output=embed`}
                    width="300"
                    height="200"
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>

              {/* Foto Section */}
              <div className="mb-4">
                <span className="font-bold">Foto: </span>
                <img
                  src={datas?.foto}
                  alt="Foto Lokasi"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default DetailKunjungan;
