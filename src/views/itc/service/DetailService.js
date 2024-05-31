import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Card,
  IconButton,
  Option,
  Input,
  Select,
  Typography,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  ChatBubbleBottomCenterIcon,
  ChevronLeftIcon,
  CurrencyDollarIcon,
  PencilIcon,
  PlusIcon,
  PrinterIcon,
  ReceiptPercentIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import {
  API_BARANG,
  API_SALESMAN,
  API_SERVICE,
} from "../../../utils/BaseUrl";
import Swal from "sweetalert2";
import ReactSelect from "react-select";
import $ from "jquery";

function DetailService() {
  const [datas, setdatas] = useState(null);
  const param = useParams();
  const history = useHistory();

  // FORMAT RUPIAH
  const formatRupiah = (value) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(value);
  };

  // UPDATE CUSTOMER
  const [namaCustomer, setnamaCustomer] = useState(
    datas?.customer?.nama_customer || ""
  );
  const [alamatCustomer, setalamatCustomer] = useState("");
  const [cpCustomer, setcpCustomer] = useState("");
  const [ketCustomer, setketCustomer] = useState("");
  const [idCustomer, setidCustomer] = useState(0);

  const updateService = async (e) => {
    e.preventDefault();

    const request = {
      alamat: alamatCustomer,
      cp: cpCustomer,
      ket: ketCustomer,
      nama: namaCustomer,
    };

    await axios
      .put(`${API_SERVICE}/update_customer/` + datas?.idTT, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Update Customer Berhasil!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        if (error.ressponse && error.response.status === 401) {
          localStorage.clear();
          history.push("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Update Customer Gagal!",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(error);
        }
      });
  };

  // UPDATE NOTE
  const [note, setnote] = useState("");

  const updateNote = async (e) => {
    e.preventDefault();

    const request = {
      note: note,
    };

    await axios
      .put(`${API_SERVICE}/update_note/` + datas?.idTT, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Update Note Berhasil!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        if (error.ressponse && error.response.status === 401) {
          localStorage.clear();
          history.push("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Update Note Gagal!",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(error);
        }
      });
  };

  // UPDATE BIAYA SERVICE
  const [biayaService, setbiayaService] = useState("");
  const [biayaSparepart, setbiayaSparepart] = useState("");
  const [statusEnd, setstatusEnd] = useState("");
  const [total, settotal] = useState("");

  const updateTotal = () => {
    const sparepartValue = parseFloat(biayaSparepart) || 0;
    const serviceValue = parseFloat(biayaService) || 0;
    settotal(sparepartValue + serviceValue);
  };

  useEffect(() => {
    updateTotal();
  }, [biayaService, biayaSparepart]);

  const updateBiaya = async (e) => {
    e.preventDefault();

    const request = {
      biaya_service: biayaService,
      biaya_sparepart: biayaSparepart,
      status: statusEnd,
      total: total,
    };

    await axios
      .put(`${API_SERVICE}/service_admin/` + datas?.idTT, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Update Biaya Berhasil!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        if (error.ressponse && error.response.status === 401) {
          localStorage.clear();
          history.push("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Update Biaya Gagal!",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(error);
        }
      });
  };

  // TRANSAKSI
  const [barang, setbarang] = useState([]);
  const [produk, setproduk] = useState([]);
  const [addProduk, setaddProduk] = useState([]);

  const [open3, setOpen3] = useState(false);
  const handleOpen3 = () => setOpen3(!open3);

  // TRANSAKSI JUAL
  const [markettingId, setmarkettingId] = useState(0);
  const [cashCredit, setcashCredit] = useState("");
  const [keterangan, setketerangan] = useState("");
  const [pembayaran, setpembayaran] = useState("");
  const [potongan, setpotongan] = useState(0);
  const [sisa, setsisa] = useState(0);

  // PRODUK
  const [barcodeBarang, setbarcodeBarang] = useState("");
  const [diskonBarang, setdiskonBarang] = useState(0);
  const [hargaBrng, sethargaBrng] = useState("");
  const [qty, setqty] = useState(0);

  // EDIT PRODUK
  const [editBarcode, seteditBarcode] = useState("");
  const [editJumlah, seteditJumlah] = useState("");
  const [editNamaProduk, seteditNamaProduk] = useState("");
  const [editHargaBarang, seteditHargaBarang] = useState("");
  const [editHargaDiskon, seteditHargaDiskon] = useState("");
  const [editDiskon, seteditDiskon] = useState("");
  const [editTotalHarga, seteditTotalHarga] = useState("");

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "transparent",
      borderBottom: "1px solid #ccc",
      border: "none",
      outline: "none",
      fontSize: "14px",
      "&:hover": {
        outline: "none",
        boxShadow: "none",
      },
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
      "&:hover": {
        outline: "none",
        boxShadow: "none",
      },
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
    }),
  };

  // GET ALL BARANG
  const allBarang = async () => {
    try {
      const response = await axios.get(`${API_BARANG}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setbarang(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    allBarang();
  }, []);

  const [selectedBarang, setSelectedBarang] = useState(null);

  // PILIH BARANG
  const handleBarangChange = (selectedOption) => {
    setSelectedBarang(selectedOption);
    setbarcodeBarang(selectedOption.value);

    if (selectedOption) {
      axios
        .get(`${API_BARANG}/barcode?barcode=` + selectedOption.value, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          setsisa(res.data.data.jumlahStok);
          sethargaBrng(res.data.data.hargaBarang);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // CEK BARANG
  const checkEmpty = () => {
    const barcode = selectedBarang?.value || "";
    const jumlah = qty;
    if (jumlah > 0 && barcode !== "") {
      $("#tambah").removeAttr("disabled");
    } else {
      $("#tambah").attr("disabled", "disabled");
    }
  };

  // TOTAL HARGA
  const updateTotalHarga = (produk = []) => {
    var totale = 0;
    var totale2 = 0;

    for (var i in produk) {
      var total_harga = parseInt(produk[i].totalHarga);
      var jumlah_barang = parseInt(produk[i].jumlah);
      var harga_barang = parseInt(produk[i].harga);

      totale += parseInt(total_harga);
      totale2 += parseInt(harga_barang * jumlah_barang);
    }

    $("#total").html(formatRupiah(totale));
    $("#total2").html(formatRupiah(totale2));
    $("#total3").html(totale2);
    $("#ttl_bayar_hemat").html(formatRupiah(parseInt(totale2 - totale)));
  };

  // CEK BARANG YANG SUDAH DITAMBAHKAN
  const cekBarangDuplikat = (barcode) => {
    if (parseInt($("button#" + barcode).length) === 0) {
      return true;
    } else {
      return false;
    }
  };

  // CEK TRANSAKSI
  const checkEmptyTransaksi = () => {
    var pembayaran = $("#pembayaran").val();
    var sisa = $("#kembalian").html();
    if (pembayaran < 0 || pembayaran === "") {
      $("#bayar").attr("disabled", "disabled");
    } else if (sisa < 0) {
      $("#bayar").attr("disabled", "disabled");
    } else if (produk.length < 0) {
      $("#bayar").attr("disabled", "disabled");
    } else {
      $("#bayar").removeAttr("disabled");
    }
  };

  // CEK STOK BARANG & PUSH ARRAY
  const checkStok = () => {
    const barcodes = barcodeBarang;

    if (cekBarangDuplikat(barcodes)) {
      fetch(`${API_BARANG}/barcode?barcode=${barcodes}`, {
        method: "GET",
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          const jumlah = parseInt(qty);
          const diskon = parseInt(diskonBarang);
          const hargaBrngs = parseInt(hargaBrng);

          const jmlDiskon = hargaBrngs * (diskon / 100);
          const hargaDiskon = hargaBrngs - jmlDiskon;
          const totalHarga = hargaDiskon * jumlah;
          const totalHargaBarang = hargaBrngs * jumlah;

          const newData = {
            barcodeBarang: barcodes,
            diskon: diskon,
            hargaBrng: hargaBrngs,
            qty: jumlah,
            totalHarga: totalHarga,
            totalHargaBarang: totalHargaBarang,
          };

          const newData2 = {
            barcode: res.data.barcodeBarang,
            nama: res.data.namaBarang,
            harga: hargaBrngs,
            disc: diskon,
            hargaDiskon: jmlDiskon,
            jumlah: jumlah,
            totalHarga: totalHarga,
          };

          setproduk([...produk, newData2]);
          setaddProduk([...addProduk, newData]);

          updateTotalHarga(produk);

          setqty(0);
          setdiskonBarang(0);
          sethargaBrng(0);
          setsisa(sisa - jumlah);

          document
            .getElementById("tambah")
            .setAttribute("disabled", "disabled");

          checkEmptyTransaksi();
        })
        .catch((error) => console.error("Error:", error));
    } else {
      Swal.fire({
        icon: "warning",
        title: "Barang sudah ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // CONVERT RUPIAH TO ANGKA
  const convertToAngka = (rupiah) => {
    return parseInt(rupiah.replace(/,.*|[^0-9]/g, ""), 10);
  };

  // GET DISKON
  const getDiskon = () => {
    var total = convertToAngka($("#total").html());
    var pembayaran = $("#pembayaran").val();
    var cashKredit = $("#cashKredit").val();
    if (cashKredit === "Cash" && pembayaran < total) {
      $("#bayar").attr("disabled", "disabled");
    } else if (pembayaran < total) {
      $("#bayar").removeAttr("disabled");
      $("#title").html("Kekurangan");
      var kekurangan = parseInt(total - pembayaran);
      $("#kembalian").html(formatRupiah(kekurangan));
    } else {
      var kembalian = parseInt(pembayaran - total);
      $("#title").html("Kembalian");
      $("#kembalian").html(formatRupiah(kembalian));
      $("#bayar").removeAttr("disabled");
      checkEmptyTransaksi();
    }
  };

  // GET POTONGAN HARGA
  const getPotongan = () => {
    var pembayaran = parseInt($("#pembayaran").val());
    var potongan = parseInt($("#potongan").val());
    var total = convertToAngka($("#total").html());
    var total2 = convertToAngka($("#total2").html());
    var kembalian = pembayaran - total;
    var kekurangan = total - pembayaran;
    var cashKredit = $("#cashKredit").val();

    if (cashKredit === "Cash" && pembayaran < total) {
      $("#bayar").attr("disabled", "disabled");
    } else if (pembayaran < total) {
      $("#title").html("Kekurangan");
      $("#kembalian").html(formatRupiah(kekurangan - potongan));
      $("#bayar").removeAttr("disabled");
    } else {
      $("#title").html("Kembalian");
      $("#kembalian").html(formatRupiah(kembalian + potongan));
      $("#bayar").removeAttr("disabled");
    }

    // $("#kembalian").html(formatRupiah(kembalian + potongan));
    var ttl_bayar = total - potongan;
    var ttl_bayar_hemat = total2 - ttl_bayar;
    $("#ttl_bayar").html(formatRupiah(ttl_bayar));
    $("#ttl_bayar_hemat").html(formatRupiah(ttl_bayar_hemat));
    // checkEmptyTransaksi();
  };

  // BUTTON EDIT
  const edit = (
    barcode,
    nama_produk,
    harga_barang,
    diskon,
    harga_diskon,
    jumlah,
    total_harga
  ) => {
    seteditBarcode(barcode);
    seteditNamaProduk(nama_produk);
    seteditHargaBarang(harga_barang);
    seteditHargaDiskon(harga_diskon);
    seteditDiskon(diskon);
    seteditJumlah(jumlah);
    seteditTotalHarga(total_harga);

    handleOpen3();
  };

  const removeItemsById = (id) => {
    const newProduk = produk.filter((item) => item.barcode !== id);
    setproduk(newProduk);
    const newProduk2 = addProduk.filter((item) => item.barcodeBarang !== id);
    setaddProduk(newProduk2);
  };

  const remove = (barcode) => {
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
        removeItemsById(barcode);
        updateTotalHarga(produk);
        $("#tambah").attr("disabled", "disabled");
        if (parseInt(produk.length) === 0) {
          $("#bayar").attr("disabled", "disabled");
        }
      }
    });
  };

  // BUTTON EDIT BARANG
  const handleButtonClick = () => {
    let potongan = 0;
    if (parseInt(editDiskon) > 0) {
      potongan = parseInt(editHargaBarang * (editDiskon / 100));
    }

    const harga_diskon = parseInt(editHargaBarang - potongan);
    const total_harga = parseInt(harga_diskon * editJumlah);
    const total_harga_barang = parseInt(editHargaBarang * editJumlah);

    // removeItemsById(editBarcode);

    setproduk((prevState) => {
      const indexToUpdate = prevState.findIndex((item) => {
        return item.barcode === editBarcode;
      });
      if (indexToUpdate !== -1) {
        const updatedProduk = [...prevState];
        updatedProduk[indexToUpdate] = {
          barcode: editBarcode,
          disc: editDiskon,
          harga: editHargaBarang,
          hargaDiskon: harga_diskon,
          jumlah: editJumlah,
          nama: editNamaProduk,
          totalHarga: total_harga,
        };
        return updatedProduk;
      } else {
        console.log(
          "Item dengan barcode tersebut tidak ditemukan dalam array setproduk."
        );
        return prevState;
      }
    });

    setaddProduk((prevState) => {
      const indexToUpdate = prevState.findIndex((item) => {
        return item.barcodeBarang === editBarcode;
      });
      if (indexToUpdate !== -1) {
        const updatedProduk = [...prevState];
        updatedProduk[indexToUpdate] = {
          barcodeBarang: editBarcode,
          diskon: editDiskon,
          hargaBrng: editHargaBarang,
          qty: editJumlah,
          totalHarga: total_harga,
          totalHargaBarang: total_harga_barang,
        };
        return updatedProduk;
      } else {
        console.log(
          "Item dengan barcode tersebut tidak ditemukan dalam array setproduk."
        );
        return prevState;
      }
    });

    updateTotalHarga(produk);

    handleOpen3();
  };

  // BUTTON TRANSAKSI JUAL DINARPOS
  const add = () => {
    var totalBayarBarang = convertToAngka(
      document.getElementById("total2").innerHTML
    );
    var totalBelanja = convertToAngka(
      document.getElementById("total").innerHTML
    );
    var ttlBayarHemat = convertToAngka(
      document.getElementById("ttl_bayar_hemat").innerHTML
    );
    var title = document.getElementById("title").innerHTML;
    var kekurangans = convertToAngka(
      document.getElementById("kembalian").innerHTML
    );

    var diskons = 0;
    for (let index = 0; index < addProduk.length; index++) {
      const element = addProduk[index];
      diskons += element.diskon;
    }

    var kekurangan = 0;
    if (title === "Kekurangan") {
      kekurangan = kekurangans;
    } else {
      kekurangan = 0;
    }

    const request = {
      cashKredit: cashCredit,
      diskon: diskons,
      idCustomer: idCustomer,
      idSalesman: markettingId,
      keterangan: keterangan,
      kekurangan: kekurangan,
      pembayaran: pembayaran,
      potongan: potongan,
      produk: addProduk,
      sisa: sisa,
      totalBayarBarang: totalBayarBarang,
      totalBelanja: totalBelanja,
      ttlBayarHemat: ttlBayarHemat,
    };
    console.log(request);

    axios
      .put(`${API_SERVICE}/taken_service/` + param.id, request, {
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
            } else {
              window.location.reload();
            }
          });
        } else {
          alert("gagal");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    updateTotalHarga(produk);
  }, [produk]);

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
      console.log(data.data);
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
  // END TRANSAKSI

  // ADD TGL KONF
  const [tglKonf, settglKonf] = useState("");

  const addTglKonf = async (e) => {
    e.preventDefault();

    const request = {
      date: tglKonf,
      id_service: param.id,
    };

    await axios
      .post(`${API_SERVICE}/konfirm`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Tambah Tgl Konfirmasi Berhasil!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        console.log("Error : " + err);
        Swal.fire({
          icon: "error",
          title: "Tambah Tgl Konfirmasi Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      });
  };
  // END ADD TGL KONF

  // GET ALL TGL KONF
  const [tglKonfs, settglKonfs] = useState([]);

  // GET ALL BARANG
  const allTglKonf = async () => {
    try {
      const response = await axios.get(
        `${API_SERVICE}/tgl_konfirm?id=` + param.id,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      settglKonfs(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  // DELETE BARANG
  const deleteTglKonf = async (id) => {
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
          .delete(`${API_SERVICE}/tgl_konfirm/` + id, {
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
          });
      }
    });
  };

  useEffect(() => {
    allTglKonf();
  }, []);
  // END GET ALL TGL KONF

  // GET SERVICE
  useEffect(() => {
    axios
      .get(`${API_SERVICE}/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setdatas(res.data.data);
        setidCustomer(res.data.data.customer.id);
        setketCustomer(res.data.data.ket);
        setnamaCustomer(res.data.data.nama);
        setcpCustomer(res.data.data.cp);
        setalamatCustomer(res.data.data.alamat);
        setnote(res.data.data.catatan);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Data Service
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
            <a href="/data_service">
              <span>Service</span>
            </a>
            <span className="cursor-default capitalize">detail Service</span>
          </Breadcrumbs>
        </div>
        <main className="bg-blue-500 border-4 border-blue-500 shadow-lg my-5 rounded">
          <div className="flex justify-between items-center p-3">
            <a href="/data_service">
              <Typography
                variant="paragraph"
                className="capitalize font-semibold text-white flex"
              >
                <ChevronLeftIcon className="w-6 h-6 white" /> NO. {datas?.idTT}
              </Typography>
            </a>
            <div>
              <IconButton
                size="md"
                color="red"
                onClick={() => window.open("/print_service/" + datas?.idTT)}
              >
                <PrinterIcon className="w-6 h-6 white" />
              </IconButton>{" "}
              <IconButton size="md" color="green">
                <ChatBubbleBottomCenterIcon
                  className="w-6 h-6 white"
                  onClick={() => {
                    const phone = encodeURIComponent(datas?.customer?.telp);
                    const message = encodeURIComponent(
                      `Hallo kak ${datas?.customer?.nama_customer} Terima Kasih Telah Service di Excellent Computer Detail Produk No. TT : ${datas?.idTT} Jenis Produk : ${datas?.produk} Merk : ${datas?.merk} Type : ${datas?.type} SN : ${datas?.sn} Dengan Keluhan : ${datas?.keluhan}`
                    );
                    window.open(
                      `https://api.whatsapp.com/send?phone=${phone}&text=${message}`
                    );
                  }}
                />
              </IconButton>{" "}
            </div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start">
              <div className="border border-gray-400 rounded shadow p-2">
                <h1 className="text-lg">
                  <b>Data Pelanggan</b>
                </h1>
                <hr /> <br />
                <form onSubmit={updateService}>
                  <ol>
                    <li className="mb-3">
                      <div className="flex items-center">
                        <label htmlFor="" className="w-32 text-center text-sm">
                          Nama
                        </label>
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Nama"
                          value={namaCustomer}
                          onChange={(e) => setnamaCustomer(e.target.value)}
                        />
                      </div>
                    </li>
                    <li className="mb-3">
                      <div className="flex items-center">
                        <label htmlFor="" className="w-32 text-center text-sm">
                          Alamat{" "}
                        </label>
                        <textarea
                          name="alamat"
                          id="alamat"
                          cols="30"
                          rows="3"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={alamatCustomer}
                          onChange={(e) => setalamatCustomer(e.target.value)}
                        ></textarea>
                      </div>
                    </li>
                    <li className="mb-3">
                      <div className="flex items-center">
                        <label htmlFor="" className="w-32 text-center text-sm">
                          CP
                        </label>
                        <input
                          type="number"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="CP"
                          value={cpCustomer}
                          onChange={(e) => setcpCustomer(e.target.value)}
                        />
                      </div>
                    </li>
                    <li className="mb-3">
                      <div className="flex items-center">
                        <label htmlFor="" className="w-32 text-center text-sm">
                          Ket
                        </label>
                        <textarea
                          name="ket"
                          id="ket"
                          cols="30"
                          rows="3"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={ketCustomer}
                          onChange={(e) => setketCustomer(e.target.value)}
                        ></textarea>
                      </div>
                    </li>
                  </ol>
                  <br />
                  <Button
                    variant="gradient"
                    color="light-blue"
                    className="float-right"
                    type="submit"
                  >
                    Simpan
                  </Button>{" "}
                </form>
                <br /> <br /> <br />
                <h1 className="text-lg">
                  <b>Tanda Terima</b>
                </h1>
                <hr /> <br />
                <ol>
                  <li className="mb-3">
                    <div className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Tgl Masuk
                      </label>
                      <input
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Tanggal Masuk"
                        readOnly
                        value={datas?.tgl_masuk}
                      />
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Tgl Jadi
                      </label>
                      <input
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Tgl Jadi"
                        readOnly
                      />
                    </div>
                  </li>
                  <li className="mb-3">
                    <form onSubmit={addTglKonf} className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Tgl Konf
                      </label>
                      <div className="w-full">
                        {tglKonfs.length > 0 ? (
                          <>
                            <ol>
                              {tglKonfs.map((row) => (
                                <li className="mb-2 flex justify-between items-center">
                                  <span>
                                    {new Date(row.tglKonf).toLocaleDateString()}
                                  </span>
                                  <IconButton
                                    size="sm"
                                    color="red"
                                    type="button"
                                    onClick={() => deleteTglKonf(row.id)}
                                  >
                                    <TrashIcon className="w-6 h-6 white" />
                                  </IconButton>
                                </li>
                              ))}
                            </ol>
                          </>
                        ) : (
                          <></>
                        )}
                        <div className="flex gap-2 w-full">
                          <input
                            type="date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Tgl Konf"
                            onChange={(e) => settglKonf(e.target.value)}
                          />
                          <IconButton size="lg" color="blue" type="submit">
                            <PlusIcon className="w-6 h-6 white" />
                          </IconButton>
                        </div>
                      </div>
                    </form>
                  </li>
                  <li className="mb-3">
                    <div className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Tgl Ambil
                      </label>
                      <input
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Tgl Ambil"
                        readOnly
                      />
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Penerima
                      </label>
                      <p className="text-sm w-full">{datas?.penerima}</p>
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Checker
                      </label>
                      <p className="text-sm w-full">{datas?.checker}</p>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="border border-gray-400 rounded shadow lg:col-span-2 p-2">
                <h1 className="text-lg">
                  <b>Data Barang</b>
                </h1>
                <hr /> <br />
                <table className="w-full border-collapse my-3">
                  <thead>
                    <tr>
                      <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                        Produk
                      </th>
                      <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                        Merk
                      </th>
                      <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                        Type
                      </th>
                      <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                        No Seri
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-gray-300 border bg-white p-2">
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                          value={datas?.produk}
                        />
                      </td>
                      <td className="border-gray-300 border bg-white p-2">
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                          value={datas?.merk}
                        />
                      </td>
                      <td className="border-gray-300 border bg-white p-2">
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                          value={datas?.type}
                        />
                      </td>
                      <td className="border-gray-300 border bg-white p-2">
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                          value={datas?.sn}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="border-gray-300 border bg-gray-200 text-sm text-center py-2"
                        colSpan="2"
                      >
                        Perlengkapan
                      </td>
                      <td
                        className="border-gray-300 border bg-gray-200 text-sm text-center py-2"
                        colSpan="2"
                      >
                        Keluhan
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        className="border-gray-300 border bg-white p-2"
                      >
                        <textarea
                          cols="30"
                          rows="3"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                          value={datas?.perlengkapan}
                        ></textarea>
                      </td>
                      <td
                        colSpan="2"
                        className="border-gray-300 border bg-white p-2"
                      >
                        <textarea
                          cols="30"
                          rows="3"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                          value={datas?.keluhan}
                        ></textarea>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <form onSubmit={updateNote}>
                  <div className="mt-6">
                    <div className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Note
                      </label>
                      <textarea
                        id="note"
                        cols="30"
                        rows="3"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Catatan..."
                        value={note}
                        onChange={(e) => setnote(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button variant="gradient" color="light-blue" type="submit">
                      Simpan
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            {datas?.statusEnd === "PROSES" || datas?.statusEnd === "N_A" ? (
              <>
                {/* JIKA BELUM ADA DATA */}
                <div className="border-gray-400 shadow bg-white border rounded p-2 mt-5">
                  <h1 className="font-semibold mt-1">Perincian Biaya</h1>
                  <hr />
                  <form onSubmit={updateBiaya}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-2">
                      <div>
                        <ol className="mt-3">
                          <li className="mb-2">
                            <div className="flex items-center">
                              <label
                                htmlFor=""
                                className="w-32 text-center text-sm"
                              >
                                Sparepart
                              </label>
                              <input
                                type="number"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Biaya Sparepart"
                                id="sparepart"
                                onChange={(e) =>
                                  setbiayaSparepart(e.target.value)
                                }
                                required
                              />
                            </div>
                          </li>
                          <li className="mb-2">
                            <div className="flex items-center">
                              <label
                                htmlFor=""
                                className="w-32 text-center text-sm"
                              >
                                Service
                              </label>
                              <input
                                type="number"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Biaya Service"
                                id="service"
                                onChange={(e) =>
                                  setbiayaService(e.target.value)
                                }
                                required
                              />
                            </div>
                          </li>
                          <li className="mb-2">
                            <div className="flex items-center">
                              <label
                                htmlFor=""
                                className="w-32 text-center text-sm"
                              >
                                Total
                              </label>
                              <input
                                type="number"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Biaya Total"
                                id="total"
                                value={total}
                                onChange={(e) => settotal(e.target.value)}
                                readOnly
                              />
                            </div>
                          </li>
                        </ol>
                      </div>
                      <div>
                        <ol className="mt-3">
                          <li className="mb-2">
                            <div className="flex items-center">
                              <label
                                htmlFor=""
                                className="w-32 text-center text-sm"
                              >
                                Tgl Ready
                              </label>
                              <input
                                type="date"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                id="tgl_ready"
                                required
                              />
                            </div>
                          </li>
                          <li className="mb-2">
                            <div className="flex items-center">
                              <label
                                htmlFor=""
                                className="w-32 text-center text-sm"
                              >
                                Estimasi
                              </label>
                              <p className="w-full text-sm">
                                {formatRupiah(datas?.estimasi)}
                              </p>
                            </div>
                          </li>
                          <li className="mb-2">
                            <div className="flex items-center">
                              <label
                                htmlFor=""
                                className="w-32 text-center text-sm"
                              >
                                Status
                              </label>
                              <select
                                id="status"
                                value={statusEnd}
                                onChange={(e) => setstatusEnd(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 darkselect:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                              >
                                <option value="READY_S">
                                  Ready (Sparepart)
                                </option>
                                <option value="READY_T">Ready (Teknisi)</option>
                                <option value="CANCEL_S">
                                  Cancel (Sparepart)
                                </option>
                                <option value="CANCEL_T">
                                  Cancel (Teknisi)
                                </option>
                              </select>
                            </div>
                          </li>
                        </ol>
                        <div className="mt-3 flex justify-end">
                          <Button
                            variant="gradient"
                            color="green"
                            type="submit"
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <>
                {/* JIKA SUDAH ADA DATA */}
                <div className="border-gray-400 shadow bg-white border rounded p-2 mt-5">
                  <h1 className="font-semibold mt-1">Perincian Biaya</h1>
                  <hr /> <br />
                  <ol className="">
                    <li className="border border-t-gray-300 border-b-gray-300 p-2 bg-gray-50">
                      <div className="flex items-center">
                        <p className="w-36">Estimasi</p>
                        <p className="w-full">
                          {formatRupiah(datas?.estimasi)}
                        </p>
                      </div>
                    </li>
                    <li className="border border-t-gray-300 border-b-gray-300 p-2 bg-gray-50">
                      <div className="flex items-center">
                        <p className="w-36">Sparepart</p>
                        <p className="w-full">
                          {formatRupiah(datas?.biayaSparepart)}
                        </p>
                      </div>
                    </li>
                    <li className="border border-t-gray-300 border-b-gray-300 p-2 bg-gray-50">
                      <div className="flex items-center">
                        <p className="w-36">Service</p>
                        <p className="w-full">
                          {formatRupiah(datas?.biayaService)}
                        </p>
                      </div>
                    </li>
                    <li className="border border-t-gray-300 border-b-gray-300 p-2 bg-gray-50">
                      <div className="flex items-center">
                        <p className="w-36">Total</p>
                        <p className="w-full">{formatRupiah(datas?.total)}</p>
                      </div>
                    </li>
                  </ol>
                  <br />
                  <br />
                  <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-5">
                    <div className="col-span-2 mt-3">
                      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-y-8">
                        <div className="lg:col-span-2">
                          <label
                            htmlFor="barang"
                            className="text-[14px] text-blue-gray-400"
                          >
                            Barang
                          </label>
                          <ReactSelect
                            id="barang"
                            options={barang.map((down) => {
                              return {
                                value: down.barcodeBarang,
                                label:
                                  down.barcodeBarang + " / " + down.namaBarang,
                              };
                            })}
                            placeholder="Pilih Barang"
                            styles={customStyles}
                            value={selectedBarang}
                            onChange={handleBarangChange}
                          />
                          <hr className="mt-1 bg-gray-400 h-[0.1em]" />
                        </div>
                        <Input
                          color="blue"
                          variant="static"
                          label="Harga"
                          type="number"
                          placeholder="Masukkan Harga"
                          id="hargabarang"
                          value={hargaBrng}
                          onChange={(e) => sethargaBrng(e.target.value)}
                        />
                        <Input
                          color="blue"
                          variant="static"
                          label="Diskon (%)"
                          type="number"
                          placeholder="Masukkan Diskon"
                          value={diskonBarang}
                          onChange={(e) => setdiskonBarang(e.target.value)}
                        />
                        <Input
                          color="blue"
                          variant="static"
                          label="Stok Barang"
                          id="stokbarang"
                          type="number"
                          value={sisa}
                          onChange={(e) => setsisa(e.target.value)}
                          readOnly
                        />
                        <Input
                          color="blue"
                          variant="static"
                          label="Jumlah"
                          type="number"
                          placeholder="Masukkan jumlah"
                          id="jumlahBarang"
                          value={qty}
                          onKeyUp={checkEmpty()}
                          onChange={(e) => setqty(e.target.value)}
                        />
                      </div>
                      <Button
                        variant="gradient"
                        color="blue"
                        className="mt-5"
                        id="tambah"
                        onClick={checkStok}
                      >
                        <span>Tambah Barang</span>
                      </Button>

                      <Card className="overflow-auto my-5">
                        <table
                          id="example_data"
                          className="rounded table-auto w-full"
                        >
                          <thead className="border-b-2 ">
                            <tr>
                              <th className="py-3 px-2">Barcode</th>
                              <th className="py-3 px-2">Nama</th>
                              <th className="py-3 px-2">Harga (Rp)</th>
                              <th className="py-3 px-2">Disc</th>
                              <th className="py-3 px-2">Harga Diskon (Rp)</th>
                              <th className="py-3 px-2">Jumlah</th>
                              <th className="py-3 px-2">Total Harga (Rp)</th>
                              <th className="py-3 px-2">Aksi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {produk.length > 0 ? (
                              produk.map((down, index) => (
                                <tr key={index}>
                                  <td className="py-3 px-2 text-center border">
                                    {down.barcode}
                                  </td>
                                  <td className="py-3 px-2 text-center border">
                                    {down.nama}
                                  </td>
                                  <td className="py-3 px-2 text-center border">
                                    {down.harga}
                                  </td>
                                  <td className="py-3 px-2 text-center border">
                                    {down.disc}
                                  </td>
                                  <td className="py-3 px-2 text-center border">
                                    {down.hargaDiskon}
                                  </td>
                                  <td className="py-3 px-2 text-center border">
                                    {down.jumlah}
                                  </td>
                                  <td className="py-3 px-2 text-center border">
                                    {down.totalHarga}
                                  </td>
                                  <td className="py-2 px-3 text-center border">
                                    <div className="flex justify-center items-center gap-2">
                                      <IconButton
                                        id={down.barcode}
                                        size="md"
                                        color="light-blue"
                                        onClick={() =>
                                          edit(
                                            down.barcode,
                                            down.nama,
                                            down.harga,
                                            down.disc,
                                            down.hargaDiskon,
                                            down.jumlah,
                                            down.totalHarga
                                          )
                                        }
                                      >
                                        <PencilIcon className="w-6 h-6 white" />
                                      </IconButton>
                                      <IconButton
                                        id={down.barcode}
                                        size="md"
                                        color="red"
                                        type="button"
                                        onClick={() => remove(down.barcode)}
                                      >
                                        <TrashIcon className="w-6 h-6 white" />
                                      </IconButton>
                                    </div>
                                  </td>{" "}
                                </tr>
                              ))
                            ) : (
                              <>
                                <tr>
                                  <td colSpan={8} className="text-center py-3">
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
                            onChange={(e) => setketerangan(e.target.value)}
                          />
                        </div>
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
                              setmarkettingId(event.target.value);
                            }}
                            placeholder="Pilih Salesman"
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
                        <div className="bg-white shadow rounded px-3 py-2">
                          <Typography variant="paragraph">
                            Anda Hemat
                          </Typography>
                          <Typography variant="h6" id="ttl_bayar_hemat">
                            Rp 0,00
                          </Typography>
                        </div>
                        <div className="bg-white shadow rounded px-3 py-2">
                          <Typography
                            variant="paragraph"
                            className="capitalize"
                          >
                            total Belanja Tanpa diskon
                          </Typography>
                          <Typography variant="h6" id="total2">
                            Rp 0,00
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 shadow-lg px-4 py-6 ">
                      <Select
                        variant="static"
                        label="Cash / Kredit"
                        color="blue"
                        className="w-full"
                        id="cashKredit"
                        onChange={(selectedOption) =>
                          setcashCredit(selectedOption)
                        }
                      >
                        <Option value="Cash">Cash</Option>
                        <Option value="Kredit">Kredit</Option>
                      </Select>
                      <div className="flex flex-col gap-y-6 my-6">
                        <Input
                          color="blue"
                          variant="static"
                          label="Pembayaran"
                          type="number"
                          placeholder="Pembayaran"
                          id="pembayaran"
                          onChange={(e) => setpembayaran(e.target.value)}
                          onKeyUp={getDiskon}
                          defaultValue={0}
                        />
                        <Input
                          color="blue"
                          variant="static"
                          label="Potongan"
                          type="number"
                          placeholder="Potongan"
                          id="potongan"
                          defaultValue={0}
                          onChange={(e) => setpotongan(e.target.value)}
                          onKeyUp={getPotongan}
                        />
                      </div>
                      <div className="flex flex-col gap-y-4">
                        <div className="bg-white shadow rounded px-3 py-2">
                          <Typography variant="paragraph">
                            Total Belanja
                          </Typography>
                          <Typography variant="h6" id="total">
                            Rp 0,00
                          </Typography>
                        </div>
                        <div className="bg-white shadow rounded px-3 py-2">
                          <Typography variant="paragraph" id="title">
                            Kembalian / Kekurangan{" "}
                          </Typography>
                          <Typography variant="h6" id="kembalian">
                            Rp 0,00
                          </Typography>
                        </div>
                      </div>
                      <div className="bg-white shadow rounded px-3 py-2 mt-5">
                        <p className="text-base my-2">
                          <b>Nota :</b> <span></span>
                        </p>
                        <hr />
                        <h1
                          className="text-3xl my-3 font-medium"
                          id="ttl_bayar"
                        >
                          Rp 0,00
                        </h1>
                      </div>
                      <Button
                        variant="gradient"
                        color="blue"
                        className="mt-5"
                        type="submit"
                        id="bayar"
                        onClick={() => add()}
                      >
                        <span>Lanjut</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
      {/* MODAL EDIT BARANG   */}
      <Dialog open={open3} handler={handleOpen3} size="lg">
        <DialogBody className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          <Input
            label="Harga Barang"
            variant="static"
            color="blue"
            size="lg"
            type="number"
            placeholder="Masukkan Harga Barang"
            value={editHargaBarang}
            onChange={(e) => seteditHargaBarang(e.target.value)}
            icon={<CurrencyDollarIcon />}
          />
          <Input
            label="Jumlah Barang"
            variant="static"
            color="blue"
            size="lg"
            placeholder="Masukkan Jumlah Barang"
            type="number"
            value={editJumlah}
            onChange={(e) => seteditJumlah(e.target.value)}
            icon={<PlusIcon />}
          />
          <Input
            label="Diskon"
            variant="static"
            color="blue"
            size="lg"
            type="number"
            placeholder="Masukkan Diskon"
            value={editDiskon}
            onChange={(e) => seteditDiskon(e.target.value)}
            icon={<ReceiptPercentIcon />}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="gray"
            onClick={handleOpen3}
            className="mr-1"
          >
            <span>Kembali</span>
          </Button>
          <Button
            variant="gradient"
            color="blue"
            id="btn-simpan-brng"
            onClick={handleButtonClick}
          >
            <span>Simpan</span>
          </Button>
        </DialogFooter>
      </Dialog>
      {/* END MODAL EDIT BARANG   */}
    </section>
  );
}

export default DetailService;
