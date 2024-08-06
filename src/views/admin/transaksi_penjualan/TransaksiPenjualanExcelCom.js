import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Dialog,
  Option,
  Select,
  Typography,
  Input,
  Card,
  IconButton,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import ReactSelect from "react-select";
import {
  API_BARANG,
  API_CUSTOMER,
  API_SALESMAN,
  API_TRANSAKSI_JUAL_EXCELCOM,
} from "../../../utils/BaseUrl";
import axios from "axios";
import ModalTambahCustomer from "../modal/ModalTambahCustomer";
import ModalTambahCustomerCp from "../modal/ModalTambahCustomerCp";
import {
  CurrencyDollarIcon,
  PencilIcon,
  PlusIcon,
  ReceiptPercentIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import $ from "jquery";

function TransaksiPenjualanExcelCom() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => setOpen2(!open2);
  const handleOpen3 = () => setOpen3(!open3);

  const [barang, setbarang] = useState([]);

  // TRANSAKSI JUAL EXCEL
  const [markettingId, setmarkettingId] = useState(0);
  const [customerId, setcustomerId] = useState(0);
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

  const [produk, setproduk] = useState([]);
  const [addProduk, setaddProduk] = useState([]);

  const [selectedBarang, setSelectedBarang] = useState(null);

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

  // FORMAT RUPIAH
  const formatRupiah = (value) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(value);
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

  // CEK BARANG YANG SUDAH DITAMBAHKAN
  const cekBarangDuplikat = (barcode) => {
    if (parseInt($("button#" + barcode).length) === 0) {
      return true;
    } else {
      return false;
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

  // CEK TRANSAKSI
  const checkEmptyTransaksi = () => {
    var pembayaran = $("#pembayaran").val();
    var id_suplier = $("#id_suplier").val();
    var sisa = $("#kembalian").html();
    if (pembayaran <= 0 || pembayaran === "" || id_suplier === "") {
      $("#bayar").attr("disabled", "disabled");
    } else if (sisa < 0) {
      $("#bayar").attr("disabled", "disabled");
    } else if (produk.length < 0) {
      $("#bayar").attr("disabled", "disabled");
    } else {
      $("#bayar").removeAttr("disabled");
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
      $("#title").html("Kekurangan");
      var kekurangan = parseInt(total - pembayaran);
      $("#kembalian").html(formatRupiah(kekurangan));
      $("#bayar").removeAttr("disabled");
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

    console.log(cashCredit);

    if (cashKredit === "Cash" && pembayaran < total) {
      $("#bayar").attr("disabled", "disabled");
    } else if (pembayaran < total) {
      $("#bayar").removeAttr("disabled");
      $("#title").html("Kekurangan");
      $("#kembalian").html(formatRupiah(kekurangan - potongan));
    } else {
      $("#bayar").removeAttr("disabled");
      $("#title").html("Kembalian");
      $("#kembalian").html(formatRupiah(kembalian + potongan));
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
      idCustomer: customerId,
      idSalesman: markettingId,
      kekurangan: kekurangan,
      keterangan: keterangan,
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
      .post(`${API_TRANSAKSI_JUAL_EXCELCOM}`, request, {
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
                "/cetak_struk_transaksi_penjualan_excelcom/" +
                  res.data.data.idTransaksi
              );
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } else {
              window.location.reload();
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
          text: "Transaksi Penjualan Excelcom Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(err);
      });
  };

  useEffect(() => {
    updateTotalHarga(produk);
  }, [produk]);

  // ALL CUSTOMER
  const [values, setvalues] = useState("");
  const [options, setoptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handle = async () => {
    if (values.trim() !== "") {
      const response = await fetch(
        `${API_CUSTOMER}/pagination?limit=10&page=${currentPage}&search=${values}&sort=1`,
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
  // END ALL CUSTOMER

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

  function setPembayaranCash(values) {
    if (values === "Cash Uang" || values === "Cash Bank") {
      var total = convertToAngka($("#total").html());
      console.log(total);
      $("#pembayaran").val(total);
    } else {
      $("#pembayaran").val(0);
    }
  }

  return (
    <section className="lg:flex font-poppins bg-gray-50 ">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            TRANSAKSI Penjualan Excelcom
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
            <a href="/transaksi_penjualan_excelcom">
              <span>Penjualan Excelcom</span>
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
                list="customer-list"
                id="customer"
                name="customer"
                onChange={(event) => {
                  handleChange(event);
                  setcustomerId(event.target.value);
                }}
                placeholder="Pilih Customer"
              />
              <datalist id="customer-list">
                {options.length > 0 && (
                  <>
                    {options.map((option) => (
                      <option value={option.id} key={option.id}>{option.nama_customer}</option>
                    ))}
                  </>
                )}
              </datalist>

              <div className="flex gap-2">
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
              </div>
            </div>
            <div className="mt-5 flex gap-5">
              {/* MODAL TAMBAH CUSTOMER */}
              <Button className="font-popins font-medium" onClick={handleOpen} variant="gradient" color="blue">
                Tambah customer
              </Button>
              {/* END MODAL TAMBAH CUSTOMER */}

              {/* MODAL TAMBAH CUSTOMER CP */}
              <Button className="font-popins font-medium" onClick={handleOpen2} variant="gradient" color="blue">
                Tambah customer CP
              </Button>
              {/* END MODAL TAMBAH CUSTOMER CP */}
            </div>
          </div>
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
                        label: down.barcodeBarang + " / " + down.namaBarang,
                      };
                    })}
                    placeholder="Pilih Barang"
                    styles={customStyles}
                    isDisabled={!customerId}
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
                className="mt-5 font-popins font-medium"
                id="tambah"
                onClick={checkStok}
              >
                <span>Tambah Barang</span>
              </Button>
              <Card className="overflow-auto my-5">
                <table id="example_data" className="rounded table-auto w-full">
                  <thead className="border-b-2 ">
                    <tr>
                      <th className="py-3 px-2">Barcode</th>
                      <th className="py-3 px-2">Nama</th>
                      <th className="py-3 px-2">Harga (Rp)</th>
                      <th className="py-3 px-2">Disc (%)</th>
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
                          </td>
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
                          <option value={option.id} key={option.id}>
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
                  <Typography variant="paragraph" className="font-poppins font-medium">Anda Hemat</Typography>
                  <Typography variant="h6" id="ttl_bayar_hemat" className="font-poppins font-medium">
                    Rp 0,00
                  </Typography>
                </div>
                <div className="bg-white shadow rounded px-3 py-2">
                  <Typography variant="paragraph" className="capitalize font-poppins font-medium">
                    total Belanja Tanpa diskon
                  </Typography>
                  <Typography variant="h6" id="total2" className="font-poppins font-medium">
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
                id="cash_kredit"
                onChange={(selectedOption) => {
                  setcashCredit(selectedOption);
                  setPembayaranCash(selectedOption);
                }}
              >
                <Option value="">Pilih</Option>
                <Option value="Cash Uang">Cash Uang</Option>
                <Option value="Cash Bank">Cash Bank</Option>
                <Option value="Kredit">Kredit</Option>
              </Select>
              <div className="flex flex-col gap-y-6 my-6">
                <Input
                  color="blue"
                  variant="static"
                  label="Pembayaran"
                  type="number"
                  placeholder="0"
                  id="pembayaran"
                  onChange={(e) => setpembayaran(e.target.value)}
                  onKeyUp={getDiskon}
                />
                <Input
                  color="blue"
                  variant="static"
                  label="Potongan"
                  type="number"
                  placeholder="0"
                  id="potongan"
                  value={potongan}
                  onChange={(e) => setpotongan(e.target.value)}
                  onKeyUp={getPotongan}
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <div className="bg-white shadow rounded px-3 py-2">
                  <Typography variant="paragraph" className="font-poppins font-medium">Total Belanja</Typography>
                  <Typography variant="h6" id="total" className="font-poppins font-medium">
                    Rp 0,00
                  </Typography>
                </div>
                <div className="bg-white shadow rounded px-3 py-2">
                  <Typography variant="paragraph" id="title" className="font-poppins font-medium">
                    Kembalian / Kekurangan
                  </Typography>
                  <Typography variant="h6" id="kembalian" className="font-poppins font-medium">
                    Rp 0,00
                  </Typography>
                </div>
              </div>
              <div className="bg-white shadow rounded px-3 py-2 mt-5">
                <p className="text-base my-2">
                  <b>Nota :</b> <span></span>
                </p>
                <hr />
                <h1 className="text-3xl my-3 font-medium" id="ttl_bayar">
                  Rp 0,00
                </h1>
              </div>
              <Button
                variant="gradient"
                color="blue"
                className="mt-5 font-popins font-medium"
                type="submit"
                id="bayar"
                onClick={() => add()}
              >
                <span>Lanjut</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL TAMBAH CUSTOMER */}
      <Dialog open={open} handler={handleOpen} size="lg">
        <ModalTambahCustomer handleOpen={handleOpen} />
      </Dialog>
      {/* END MODAL TAMBAH CUSTOMER */}

      {/* MODAL TAMBAH CUSTOMER CP */}
      <Dialog open={open2} handler={handleOpen2} size="lg">
        <ModalTambahCustomerCp handleOpen={handleOpen2} />
      </Dialog>
      {/* END MODAL TAMBAH CUSTOMER CP */}

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
            className="mr-1 font-popins font-medium"
          >
            <span>Kembali</span>
          </Button>
          <Button
            variant="gradient"
            color="blue"
            id="btn-simpan-brng"
            className="font-popins font-medium"
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

export default TransaksiPenjualanExcelCom;
