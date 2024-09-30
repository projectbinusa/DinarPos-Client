import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Typography } from "@material-tailwind/react";
import axios from "axios";
import { API_KUNJUNGAN } from "../../../utils/BaseUrl";

function DetailKunjungan() {
  const [datas, setDatas] = useState(null);
  const param = useParams();


  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  useEffect(() => {
    if (param.id) {
      axios
        .get(`${API_KUNJUNGAN}/${param.id}`, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          setDatas(res.data.data);
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
            <a href="/kunjungan">
              <span>Kunjungan</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Column 1 */}
            <div>
              <div className="my-8 grid grid-cols-3 gap-3">
                <span className="font-semibold text-right">Tanggal</span>
                <span className="col-span-2">{formatDate(datas?.tanggalKunjungan)}</span>
              </div>
              <div className="my-8 grid grid-cols-3 gap-3">
                <span className="font-semibold text-right">Jenis Instansi</span>
                <span className="col-span-2">{datas?.customer?.jenis}</span>
              </div>
              <div className="my-8 grid grid-cols-3 gap-3">
                <span className="font-semibold text-right">Daerah</span>
                <span className="col-span-2">{datas?.customer?.kabKot?.nama_kabkot} / {datas?.customer?.kec?.nama_kec}</span>
              </div>
              <div className="my-8 grid grid-cols-3 gap-3">
                <span className="font-semibold text-right">Action</span>
                <span className="col-span-2">{datas?.action}</span>
              </div>
              <div className="my-8 grid grid-cols-3 gap-3">
                <span className="font-semibold text-right">CP</span>
                <span className="col-span-2">{datas?.cp}</span>
              </div>
              <div className="my-8 grid grid-cols-3 gap-3">
                <span className="font-semibold text-right">Deal</span>
                <span className="col-span-2">{datas?.deal}</span>
              </div>
              <div className="my-8 grid grid-cols-3 gap-3">
                <span className="font-semibold text-right">Waktu Pengadaan</span>
                <span className="col-span-2">{datas?.waktuPengadaan}</span>
              </div>
              <div className="my-8 grid grid-cols-3 gap-3">
                <span className="font-semibold text-right">Tanggal Deal</span>
                <span className="col-span-2">{formatDate(datas?.tanggalDeal)}</span>
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <div className="my-8 grid grid-cols-3 gap-3">
                <span className="font-semibold text-right">Instansi</span>
                <span className="col-span-2">{datas?.customer?.nama_customer}</span>
              </div>
              <div className="my-8 grid grid-cols-3 gap-3">
                <span className="font-semibold text-right">Tujuan</span>
                <span className="col-span-2">{datas?.tujuan}</span>
              </div>
              <div className="my-8 grid grid-cols-3 gap-3">
                <span className="font-semibold text-right">Peluang</span>
                <span className="col-span-2">{datas?.peluang}</span>
              </div>
              <div className="my-8 grid grid-cols-3 gap-3">
                <span className="font-semibold text-right">Info yang didapat</span>
                <span className="col-span-2">{datas?.infoDpt}</span>
              </div>
              <div className="my-8 grid grid-cols-3 gap-3">
                <span className="font-semibold text-right">Kunjungan Ke-</span>
                <span className="col-span-2">{datas?.nVisit}</span>
              </div>
              <div className="my-8 grid grid-cols-3 gap-3">
                <span className="font-semibold text-right">Pembayaran</span>
                <span className="col-span-2">{datas?.pembayaran}</span>
              </div>
              <div className="my-8 grid grid-cols-3 gap-3">
                <span className="font-semibold text-right">Tipe</span>
                <span className="col-span-2">{datas?.visit}</span>
              </div>

              {/* Lokasi Reporting */}
              <div className="my-8">
                <p className="font-semibold mb-4">Lokasi Reporting</p>
                <div>
                  {/* <iframe
                    src={`https://maps.google.com/maps?q=${datas?.lokasiLat},${datas?.lokasiLon}&z=15&output=embed`}
                    width="300"
                    height="200"
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe> */}
                  <iframe src={`http://maps.google.com/maps?q=${datas?.lokasiLat},${datas?.lokasiLon}&t=k&z=13&ie=UTF8&iwloc=&output=embed`}></iframe>
                </div>
              </div>

              {/* Foto Section */}
              <div className="my-8">
                <p className="font-semibold mb-4">Foto</p>
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
