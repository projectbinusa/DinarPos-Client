import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Card,
  Input,
  Typography,
} from "@material-tailwind/react";
import { API_TRANSAKSI_INDENT } from "../../../../utils/BaseUrl";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import $ from "jquery";
import Swal from "sweetalert2";

function AddTransaksiFromIndentDinarpos() {
  const [datas, setdatas] = useState(null);
  const [produk, setproduk] = useState([]);
  const [pembayaran, setpembayaran] = useState("");
  const param = useParams();

  useEffect(() => {
    axios
      .get(`${API_TRANSAKSI_INDENT}/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setdatas(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getAllProduk = async () => {
    try {
      const response = await axios.get(
        `${API_TRANSAKSI_INDENT}/barang?id=` + param.id,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setproduk(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllProduk();
  }, []);

  const formatRupiah = (value) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(value);
  };

  const totalBayar = () => {
    var dp = $("#dp").val();
    var pembayaran = $("#pembayaran").val();
    var ttl_pembayaran = parseInt(dp) + parseInt(pembayaran);

    $("#ttl_pembayaran").html(formatRupiah(ttl_pembayaran));

    if (ttl_pembayaran < datas?.totalBelanja && datas?.cashKredit != "Kredit") {
      $("#bayar").attr("disabled", "disabled");
    } else {
      $("#bayar").removeAttr("disabled");
    }
  };

  const add = () => {
    const request = {
      prembayaran: pembayaran,
    };
    axios
      .post(`${API_TRANSAKSI_INDENT}/checklist/` + param.id, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.data.code === 200) {
          Swal.fire({
            title: "Transaksi Penjualan Berhasil. Cetak Struk?",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya",
            cancelButtonText: "Batal",
          }).then((result) => {
            if (result.isConfirmed) {
              window.open(
                "/cetak_struk_transaksi_penjualan_dinarpos/" +
                  res.data.data.idTransaksi
              );
              window.location.href = "/transaksi_indent_dinarpos";
            } else {
              window.location.href = "/transaksi_indent_dinarpos";
            }
          });
        } else {
          alert("gagal");
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Transaksi Dinarpos Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(err);
      });
  };

  const dp = $("#dp").val();
  const ttl_pembayaran = parseInt(dp) + parseInt(pembayaran);

  return (
    <section className="lg:flex font-poppins bg-gray-50 ">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            TRANSAKSI Penjualan dinarpos
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
            <a href="/transaksi_indent_dinarpos">
              <span>Indent Dinarpos</span>
            </a>
          </Breadcrumbs>
        </div>
        {/* FORM */}
        <div className="my-10">
          <div className="my-8">
            <div className="flex gap-2 items-end">
              <Input
                label="Customer"
                variant="static"
                color="blue"
                id="customer"
                name="customer"
                readOnly
                value={datas?.customer?.id || ""}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-5">
            <div className="col-span-2 mt-3">
              <Card className="overflow-auto my-5">
                <table id="example_data" className="rounded table-auto w-full">
                  <thead className="border-b-2 ">
                    <tr>
                      <th className="py-3 px-2">Barcode</th>
                      <th className="py-3 px-2">Harga (Rp)</th>
                      <th className="py-3 px-2">Disc (%)</th>
                      <th className="py-3 px-2">Harga Diskon (Rp)</th>
                      <th className="py-3 px-2">Jumlah</th>
                      <th className="py-3 px-2">Total Harga (Rp)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produk.length > 0 ? (
                      produk.map((down, index) => {
                        const jmlDiskon = down.hargaBrng * (down.diskon / 100);

                        return (
                          <tr key={index}>
                            <td className="py-3 px-2 text-center border">
                              {down.barcodeBarang}
                            </td>
                            <td className="py-3 px-2 text-center border">
                              {down.hargaBrng}
                            </td>
                            <td className="py-3 px-2 text-center border">
                              {down.diskon}
                            </td>
                            <td className="py-3 px-2 text-center border">
                              {jmlDiskon}
                            </td>
                            <td className="py-3 px-2 text-center border">
                              {down.qty}
                            </td>
                            <td className="py-3 px-2 text-center border">
                              {down.totalHarga}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <>
                        <tr>
                          <td colSpan={6} className="text-center py-3">
                            Tidak ada data
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </Card>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 mb-12">
                <div className="mt-6">
                  <Input
                    color="blue"
                    variant="static"
                    label="Keterangan"
                    placeholder="Masukkan Keterangan"
                    readOnly
                    value={datas?.keterangan || ""}
                  />
                </div>
                <div className="mt-6">
                  <Input
                    color="blue"
                    variant="static"
                    label="Salesman"
                    placeholder="Masukkan Salesman"
                    readOnly
                    value={datas?.salesman?.id || ""}
                  />
                </div>
                <div className="bg-white shadow rounded px-3 py-2">
                  <Typography variant="paragraph">Anda Hemat</Typography>
                  <Typography variant="h6" id="ttl_bayar_hemat">
                    Rp {datas?.ttlBayarHemat}
                  </Typography>
                </div>
                <div className="bg-white shadow rounded px-3 py-2">
                  <Typography variant="paragraph" className="capitalize">
                    total Belanja Tanpa diskon
                  </Typography>
                  <Typography variant="h6" id="total2">
                    Rp {datas?.totalBelanja}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 shadow-lg px-4 py-6 ">
              <Input
                color="blue"
                variant="static"
                label="Cash / Kredit"
                placeholder="Masukkan Cash / Kredit"
                readOnly
                value={datas?.cashKredit || ""}
              />
              <div className="flex flex-col gap-y-6 my-6">
                <Input
                  color="blue"
                  variant="static"
                  label="DP"
                  type="number"
                  placeholder="DP"
                  id="dp"
                  readOnly
                  value={datas?.pembayaran || ""}
                />
                <Input
                  color="blue"
                  variant="static"
                  label="Pembayaran"
                  type="number"
                  placeholder="Pembayaran"
                  id="pembayaran"
                  onChange={(e) => setpembayaran(e.target.value)}
                  onInput={() => totalBayar()}
                />
                <Input
                  color="blue"
                  variant="static"
                  label="Potongan"
                  type="number"
                  placeholder="Potongan"
                  id="potongan"
                  readOnly
                  value={datas?.potongan || ""}
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <div className="bg-white shadow rounded px-3 py-2">
                  <Typography variant="paragraph">Total Belanja</Typography>
                  <Typography variant="h6" id="total">
                    Rp {datas?.totalBelanja}
                  </Typography>
                </div>
                <div className="bg-white shadow rounded px-3 py-2">
                  {datas?.sisa === "null" && datas?.kekurangan !== "0" ? (
                    <>
                      <Typography variant="paragraph" id="title">
                        Kekurangan
                      </Typography>
                      <Typography variant="h6" id="kembalian">
                        {formatRupiah(datas?.kekurangan)}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="paragraph" id="title">
                        Kembalian
                      </Typography>
                      <Typography variant="h6" id="kembalian">
                        {formatRupiah(datas?.sisa)}
                      </Typography>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-white shadow rounded px-3 py-2 mt-5">
                <Typography variant="paragraph">Total Pembayaran</Typography>
                <Typography variant="h6" id="ttl_pembayaran">
                  Rp 0,00
                </Typography>
              </div>
              <div className="bg-white shadow rounded px-3 py-2 mt-5">
                <p className="text-base my-2">
                  <b>Nota :</b> <span>{datas?.noFaktur}</span>
                </p>
                <hr />
                <h1 className="text-3xl my-3 font-medium" id="ttl_bayar">
                  Rp {datas?.totalBelanja}
                </h1>
              </div>
              {ttl_pembayaran < datas?.totalBelanja && datas?.cashKredit != "Kredit" ? (
                <>
                  <Button
                    variant="gradient"
                    color="blue"
                    className="mt-5 font-poppins font-medium"
                    type="button"
                    id="bayar"
                    disabled
                  >
                    <span>Lanjut</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="gradient"
                    color="blue"
                    className="mt-5 font-poppins font-medium"
                    type="submit"
                    id="bayar"
                    onClick={() => add()}
                  >
                    <span>Lanjut</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddTransaksiFromIndentDinarpos;
