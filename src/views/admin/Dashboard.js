import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../component/SidebarAdmin";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import {
  API_BARANG,
  GET_TRANSAKSI_BELI,
  GET_TRANSAKSI_JUAL,
} from "../../utils/BaseUrl";
import axios from "axios";

function Dashboard() {
  const currentYear = new Date().getFullYear();

  const [jual, setjual] = useState([]);
  const [beli, setbeli] = useState([]);
  const [produk, setproduk] = useState([]);

  // REKAP TRANSAKSI PENJUALAN BULANAN EXCELCOM
  const [penjualanExcelcomJan, setpenjualanExcelcomJan] = useState(0);
  const [penjualanExcelcomFeb, setpenjualanExcelcomFeb] = useState(0);
  const [penjualanExcelcomMar, setpenjualanExcelcomMar] = useState(0);
  const [penjualanExcelcomApr, setpenjualanExcelcomApr] = useState(0);
  const [penjualanExcelcomMei, setpenjualanExcelcomMei] = useState(0);
  const [penjualanExcelcomJun, setpenjualanExcelcomJun] = useState(0);
  const [penjualanExcelcomJul, setpenjualanExcelcomJul] = useState(0);
  const [penjualanExcelcomAgu, setpenjualanExcelcomAgu] = useState(0);
  const [penjualanExcelcomSep, setpenjualanExcelcomSep] = useState(0);
  const [penjualanExcelcomOkto, setpenjualanExcelcomOkto] = useState(0);
  const [penjualanExcelcomNov, setpenjualanExcelcomNov] = useState(0);
  const [penjualanExcelcomDes, setpenjualanExcelcomDes] = useState(0);

  // REKAP TRANSAKSI PENJUALAN BULANAN DINARPOS
  const [penjualanDinarposJan, setpenjualanDinarposJan] = useState(0);
  const [penjualanDinarposFeb, setpenjualanDinarposFeb] = useState(0);
  const [penjualanDinarposMar, setpenjualanDinarposMar] = useState(0);
  const [penjualanDinarposApr, setpenjualanDinarposApr] = useState(0);
  const [penjualanDinarposMei, setpenjualanDinarposMei] = useState(0);
  const [penjualanDinarposJun, setpenjualanDinarposJun] = useState(0);
  const [penjualanDinarposJul, setpenjualanDinarposJul] = useState(0);
  const [penjualanDinarposAgu, setpenjualanDinarposAgu] = useState(0);
  const [penjualanDinarposSep, setpenjualanDinarposSep] = useState(0);
  const [penjualanDinarposOkto, setpenjualanDinarposOkto] = useState(0);
  const [penjualanDinarposNov, setpenjualanDinarposNov] = useState(0);
  const [penjualanDinarposDes, setpenjualanDinarposDes] = useState(0);

  // GET ALL TRANSAKSI JUAL EXCELCOM BULANAN
  const getAllTransaksiJualBulananExcelcom = async () => {
    try {
      // JANUARI
      const jan = await axios.get(
        `${GET_TRANSAKSI_JUAL}/excelcom/bulan?bulan=01&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const januari = jan.data.data;
      setpenjualanExcelcomJan(januari.length);

      // FEBRUARI
      const feb = await axios.get(
        `${GET_TRANSAKSI_JUAL}/excelcom/bulan?bulan=02&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const februari = feb.data.data;
      setpenjualanExcelcomFeb(februari.length);

      // MARET
      const mar = await axios.get(
        `${GET_TRANSAKSI_JUAL}/excelcom/bulan?bulan=03&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const maret = mar.data.data;
      setpenjualanExcelcomMar(maret.length);

      // APRIL
      const apr = await axios.get(
        `${GET_TRANSAKSI_JUAL}/excelcom/bulan?bulan=04&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const april = apr.data.data;
      setpenjualanExcelcomApr(april.length);

      // MEI
      const may = await axios.get(
        `${GET_TRANSAKSI_JUAL}/excelcom/bulan?bulan=05&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const mei = may.data.data;
      setpenjualanExcelcomMei(mei.length);

      // JUNI
      const jun = await axios.get(
        `${GET_TRANSAKSI_JUAL}/excelcom/bulan?bulan=06&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const juni = jun.data.data;
      setpenjualanExcelcomJun(juni.length);

      // JULI
      const jul = await axios.get(
        `${GET_TRANSAKSI_JUAL}/excelcom/bulan?bulan=07&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const juli = jul.data.data;
      setpenjualanExcelcomJul(juli.length);

      // AGUSTUS
      const agus = await axios.get(
        `${GET_TRANSAKSI_JUAL}/excelcom/bulan?bulan=08&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const agustus = agus.data.data;
      setpenjualanExcelcomAgu(agustus.length);

      // SEPTEMBER
      const sep = await axios.get(
        `${GET_TRANSAKSI_JUAL}/excelcom/bulan?bulan=09&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const september = sep.data.data;
      setpenjualanExcelcomSep(september.length);

      // OKTOBER
      const okto = await axios.get(
        `${GET_TRANSAKSI_JUAL}/excelcom/bulan?bulan=10&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const oktober = okto.data.data;
      setpenjualanExcelcomOkto(oktober.length);

      // NOVEMBER
      const nov = await axios.get(
        `${GET_TRANSAKSI_JUAL}/excelcom/bulan?bulan=11&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const november = nov.data.data;
      setpenjualanExcelcomNov(november.length);

      // DESEMBER
      const des = await axios.get(
        `${GET_TRANSAKSI_JUAL}/excelcom/bulan?bulan=12&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const desember = des.data.data;
      setpenjualanExcelcomDes(desember.length);
    } catch (error) {
      console.log("get all", error);
    }
  };

  // GET ALL TRANSAKSI JUAL DINARPOS BULANAN
  const getAllTransaksiJualBulananDinarpos = async () => {
    try {
      // JANUARI
      const jan = await axios.get(
        `${GET_TRANSAKSI_JUAL}/dinarpos/bulan?bulan=01&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const januari = jan.data.data;
      setpenjualanDinarposJan(januari.length);

      // FEBRUARI
      const feb = await axios.get(
        `${GET_TRANSAKSI_JUAL}/dinarpos/bulan?bulan=02&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const februari = feb.data.data;
      setpenjualanDinarposFeb(februari.length);

      // MARET
      const mar = await axios.get(
        `${GET_TRANSAKSI_JUAL}/dinarpos/bulan?bulan=03&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const maret = mar.data.data;
      setpenjualanDinarposMar(maret.length);

      // APRIL
      const apr = await axios.get(
        `${GET_TRANSAKSI_JUAL}/dinarpos/bulan?bulan=04&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const april = apr.data.data;
      setpenjualanDinarposApr(april.length);

      // MEI
      const may = await axios.get(
        `${GET_TRANSAKSI_JUAL}/dinarpos/bulan?bulan=05&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const mei = may.data.data;
      setpenjualanDinarposMei(mei.length);

      // JUNI
      const jun = await axios.get(
        `${GET_TRANSAKSI_JUAL}/dinarpos/bulan?bulan=06&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const juni = jun.data.data;
      setpenjualanDinarposJun(juni.length);

      // JULI
      const jul = await axios.get(
        `${GET_TRANSAKSI_JUAL}/dinarpos/bulan?bulan=07&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const juli = jul.data.data;
      setpenjualanDinarposJul(juli.length);

      // AGUSTUS
      const agus = await axios.get(
        `${GET_TRANSAKSI_JUAL}/dinarpos/bulan?bulan=08&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const agustus = agus.data.data;
      setpenjualanDinarposAgu(agustus.length);

      // SEPTEMBER
      const sep = await axios.get(
        `${GET_TRANSAKSI_JUAL}/dinarpos/bulan?bulan=09&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const september = sep.data.data;
      setpenjualanDinarposSep(september.length);

      // OKTOBER
      const okto = await axios.get(
        `${GET_TRANSAKSI_JUAL}/dinarpos/bulan?bulan=10&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const oktober = okto.data.data;
      setpenjualanDinarposOkto(oktober.length);

      // NOVEMBER
      const nov = await axios.get(
        `${GET_TRANSAKSI_JUAL}/dinarpos/bulan?bulan=11&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const november = nov.data.data;
      setpenjualanDinarposNov(november.length);

      // DESEMBER
      const des = await axios.get(
        `${GET_TRANSAKSI_JUAL}/dinarpos/bulan?bulan=12&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const desember = des.data.data;
      setpenjualanDinarposDes(desember.length);
    } catch (error) {
      console.log("get all", error);
    }
  };

  // REKAP TRANSAKSI PEMBELIAN BULANAN DINARPOS
  const [pembelianDinarposJan, setpembelianDinarposJan] = useState(0);
  const [pembelianDinarposFeb, setpembelianDinarposFeb] = useState(0);
  const [pembelianDinarposMar, setpembelianDinarposMar] = useState(0);
  const [pembelianDinarposApr, setpembelianDinarposApr] = useState(0);
  const [pembelianDinarposMei, setpembelianDinarposMei] = useState(0);
  const [pembelianDinarposJun, setpembelianDinarposJun] = useState(0);
  const [pembelianDinarposJul, setpembelianDinarposJul] = useState(0);
  const [pembelianDinarposAgu, setpembelianDinarposAgu] = useState(0);
  const [pembelianDinarposSep, setpembelianDinarposSep] = useState(0);
  const [pembelianDinarposOkto, setpembelianDinarposOkto] = useState(0);
  const [pembelianDinarposNov, setpembelianDinarposNov] = useState(0);
  const [pembelianDinarposDes, setpembelianDinarposDes] = useState(0);

  // REKAP TRANSAKSI PEMBELIAN BULANAN EXCELCOM
  const [pembelianExcelcomJan, setpembelianExcelcomJan] = useState(0);
  const [pembelianExcelcomFeb, setpembelianExcelcomFeb] = useState(0);
  const [pembelianExcelcomMar, setpembelianExcelcomMar] = useState(0);
  const [pembelianExcelcomApr, setpembelianExcelcomApr] = useState(0);
  const [pembelianExcelcomMei, setpembelianExcelcomMei] = useState(0);
  const [pembelianExcelcomJun, setpembelianExcelcomJun] = useState(0);
  const [pembelianExcelcomJul, setpembelianExcelcomJul] = useState(0);
  const [pembelianExcelcomAgu, setpembelianExcelcomAgu] = useState(0);
  const [pembelianExcelcomSep, setpembelianExcelcomSep] = useState(0);
  const [pembelianExcelcomOkto, setpembelianExcelcomOkto] = useState(0);
  const [pembelianExcelcomNov, setpembelianExcelcomNov] = useState(0);
  const [pembelianExcelcomDes, setpembelianExcelcomDes] = useState(0);

  // GET ALL TRANSAKSI BELI DINARPOS BULANAN
  const getAllTransaksiBeliBulananDinarpos = async () => {
    try {
      // JANUARI
      const jan = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=01&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const januari = jan.data.data;
      setpembelianDinarposJan(januari.length);

      // FEBRUARI
      const feb = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=02&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const februari = feb.data.data;
      setpembelianDinarposFeb(februari.length);

      // MARET
      const mar = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=03&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const maret = mar.data.data;
      setpembelianDinarposMar(maret.length);

      // APRIL
      const apr = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=04&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const april = apr.data.data;
      setpembelianDinarposApr(april.length);

      // MEI
      const may = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=05&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const mei = may.data.data;
      setpembelianDinarposMei(mei.length);

      // JUNI
      const jun = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=06&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const juni = jun.data.data;
      setpembelianDinarposJun(juni.length);

      // JULI
      const jul = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=07&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const juli = jul.data.data;
      setpembelianDinarposJul(juli.length);

      // AGUSTUS
      const agus = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=08&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const agustus = agus.data.data;
      setpembelianDinarposAgu(agustus.length);

      // SEPTEMBER
      const sep = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=09&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const september = sep.data.data;
      setpembelianDinarposSep(september.length);

      // OKTOBER
      const okto = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=10&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const oktober = okto.data.data;
      setpembelianDinarposOkto(oktober.length);

      // NOVEMBER
      const nov = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=11&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const november = nov.data.data;
      setpembelianDinarposNov(november.length);

      // DESEMBER
      const des = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=12&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const desember = des.data.data;
      setpembelianDinarposDes(desember.length);
    } catch (error) {
      console.log("get all", error);
    }
  };

  // GET ALL TRANSAKSI BELI EXCELCOM BULANAN
  const getAllTransaksiBeliBulananExcelcom = async () => {
    try {
      // JANUARI
      const jan = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=01&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const januari = jan.data.data;
      setpembelianExcelcomJan(januari.length);

      // FEBRUARI
      const feb = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=02&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const februari = feb.data.data;
      setpembelianExcelcomFeb(februari.length);

      // MARET
      const mar = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=03&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const maret = mar.data.data;
      setpembelianExcelcomMar(maret.length);

      // APRIL
      const apr = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=04&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const april = apr.data.data;
      setpembelianExcelcomApr(april.length);

      // MEI
      const may = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=05&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const mei = may.data.data;
      setpembelianExcelcomMei(mei.length);

      // JUNI
      const jun = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=06&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const juni = jun.data.data;
      setpembelianExcelcomJun(juni.length);

      // JULI
      const jul = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=07&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const juli = jul.data.data;
      setpembelianExcelcomJul(juli.length);

      // AGUSTUS
      const agus = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=08&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const agustus = agus.data.data;
      setpembelianExcelcomAgu(agustus.length);

      // SEPTEMBER
      const sep = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=09&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const september = sep.data.data;
      setpembelianExcelcomSep(september.length);

      // OKTOBER
      const okto = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=10&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const oktober = okto.data.data;
      setpembelianExcelcomOkto(oktober.length);

      // NOVEMBER
      const nov = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=11&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const november = nov.data.data;
      setpembelianExcelcomNov(november.length);

      // DESEMBER
      const des = await axios.get(
        `${GET_TRANSAKSI_BELI}/dinarpos/bulan?bulan=12&tahun=` + currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const desember = des.data.data;
      setpembelianExcelcomDes(desember.length);
    } catch (error) {
      console.log("get all", error);
    }
  };

  // GET ALL BARANG
  const getAllBarang = async () => {
    try {
      const response = await axios.get(`${API_BARANG}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setproduk(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  // GET ALL TRANSAKSI JUAL
  const getAllTransaksiJual = async () => {
    try {
      const response = await axios.get(`${GET_TRANSAKSI_JUAL}/all`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setjual(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  // // GET ALL TRANSAKSI BELI
  const getAllTransaksiBeli = async () => {
    try {
      const response = await axios.get(`${GET_TRANSAKSI_BELI}/all`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setbeli(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllBarang();
    getAllTransaksiJual();
    getAllTransaksiBeli();
    getAllTransaksiJualBulananExcelcom();
    getAllTransaksiJualBulananDinarpos();
    getAllTransaksiBeliBulananExcelcom();
    getAllTransaksiBeliBulananDinarpos();
  }, []);

  const chartConfigJual = {
    type: "area",
    height: 260,
    series: [
      {
        name: "Excelcom",
        data: [
          penjualanExcelcomJan,
          penjualanExcelcomFeb,
          penjualanExcelcomMar,
          penjualanExcelcomApr,
          penjualanExcelcomMei,
          penjualanExcelcomJun,
          penjualanExcelcomJul,
          penjualanExcelcomAgu,
          penjualanExcelcomSep,
          penjualanExcelcomOkto,
          penjualanExcelcomNov,
          penjualanExcelcomDes,
        ],
      },
      {
        name: "Dinarpos",
        data: [
          penjualanDinarposJan,
          penjualanDinarposFeb,
          penjualanDinarposMar,
          penjualanDinarposApr,
          penjualanDinarposMei,
          penjualanDinarposJun,
          penjualanDinarposJul,
          penjualanDinarposAgu,
          penjualanDinarposSep,
          penjualanDinarposOkto,
          penjualanDinarposNov,
          penjualanDinarposDes,
        ],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#2196f3", "#4caf50"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  const chartConfigBeli = {
    type: "area",
    height: 260,
    series: [
      {
        name: "Excelcom",
        data: [
          pembelianExcelcomJan,
          pembelianExcelcomFeb,
          pembelianExcelcomMar,
          pembelianExcelcomApr,
          pembelianExcelcomMei,
          pembelianExcelcomJun,
          pembelianExcelcomJul,
          pembelianExcelcomAgu,
          pembelianExcelcomSep,
          pembelianExcelcomOkto,
          pembelianExcelcomNov,
          pembelianExcelcomDes,
        ],
      },
      {
        name: "Dinarpos",
        data: [
          pembelianDinarposJan,
          pembelianDinarposFeb,
          pembelianDinarposMar,
          pembelianDinarposApr,
          pembelianDinarposMei,
          pembelianDinarposJun,
          pembelianDinarposJul,
          pembelianDinarposAgu,
          pembelianDinarposSep,
          pembelianDinarposOkto,
          pembelianDinarposNov,
          pembelianDinarposDes,
        ],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#2196f3", "#4caf50"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[20rem] pt-20 lg:pt-5 w-full">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 lg:mr-8 mx-5 lg:mx-0">
          <Card className="p-4">
            <ShoppingCartIcon
              className="h-12 w-12 bg-blue-100 p-2 rounded-full mb-3"
              color="blue"
            />
            <Typography variant="h3" color="blue-gray">
              {jual.length}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Total Transaksi Penjualan
            </Typography>
          </Card>
          <Card className="p-4">
            <ShoppingCartIcon
              className="h-12 w-12 bg-blue-100 p-2 rounded-full mb-3"
              color="blue"
            />
            <Typography variant="h3" color="blue-gray">
              {beli.length}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Total Transaksi Pembelian{" "}
            </Typography>
          </Card>
          <Card className="p-4">
            <ShoppingBagIcon
              className="h-12 w-12 bg-blue-100 p-2 rounded-full mb-3"
              color="blue"
            />
            <Typography variant="h3" color="blue-gray">
              {produk.length}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Total Produk
            </Typography>
          </Card>
        </div>
        <br />
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 lg:mr-8 mx-5 lg:mx-0">
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none lg:flex-row lg:items-center"
            >
              <div>
                <Typography variant="h6" color="blue-gray">
                  Grafik Penjualan {currentYear}
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0">
              <Chart {...chartConfigJual} />
            </CardBody>
          </Card>
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none lg:flex-row lg:items-center"
            >
              <div>
                <Typography variant="h6" color="blue-gray">
                  Grafik Pembelian {currentYear}
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0">
              <Chart {...chartConfigBeli} />
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
