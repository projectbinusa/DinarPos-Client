import React, { useEffect, useState } from "react";
import logo from "../../../assets/logo_black.png";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_SERVICE } from "../../../utils/BaseUrl";

function PrintService() {
  const [datas, setdatas] = useState(null);
  const param = useParams();

  useEffect(() => {
    axios
      .get(`${API_SERVICE}/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const response = res.data.data;
        setdatas(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formatRupiah = (value) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(value);
  };

  return (
    <div>
      <table
        width="794"
        height="492"
        style={{
          fontFamily: "Consolas",
          borderCollapse: "collapse",
        }}
        border="0"
      >
        <tbody>
          <tr>
            <td height="50" align="center">
              <img src={logo} style={{ height: "2.5rem" }} />
            </td>
            <td
              height="50"
              colSpan="2"
              align="center"
              valign="top"
              style={{ fontSize: "14px" }}
            >
              JL. BULUSTALAN I NO. 27 SEMARANG TELP.(024)3511176,
              HP.081230020203
              <br />
              Jl. ISMOYO NO.27 SIDOMUKTI, SALATIGA TELP.(0298)328707,
              HP.081138010102
              <br />
              Tracking Page :
              <a href="http://tracking.dinartechshare-e.com">
                http://tracking.dinartechshare-e.com
              </a>
            </td>
          </tr>

          <tr>
            <td colSpan="3" valign="top">
              <table
                width="100%"
                border="0"
                style={{ outline: "solid thin" }}
                height="370"
              >
                <tbody>
                  <tr>
                    <td
                      colSpan="4"
                      style={{ borderBottom: "solid thin", fontSize: "13px" }}
                    >
                      DATA CUSTOMER
                    </td>
                    <td
                      width="35%"
                      rowSpan="4"
                      style={{
                        borderLeft: "solid 1px",
                        borderBottom: "solid 1px",
                        fontSize: "14px",
                      }}
                      valign="top"
                    >
                      <div align="center">
                        <font size="3px">TANDA TERIMA</font>
                      </div>
                      <br />
                      Tanggal : {datas?.created_date}
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <table
                        border="0"
                        align="center"
                        width="90%"
                        style={{ fontSize: "13px" }}
                      >
                        <tbody>
                          <tr>
                            <td align="center">
                              ({datas?.customer?.nama_customer})
                              <br /> Konsumen
                            </td>
                            <td align="center">
                              ({datas?.penerima})
                              <br /> Penerima
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr style={{ fontSize: "14px" }}>
                    {/* <td>&nbsp;</td> */}
                    <td width="13%">
                      Nama
                      <br />
                      Alamat
                      <br />
                      Telepon
                      <br />
                      Keterangan
                    </td>
                    <td width="2%">
                      :<br />
                      :<br />
                      :<br />:
                    </td>
                    <td width="48%">
                      {datas?.customer?.nama_customer}
                      <br />
                      {datas?.customer?.alamat}
                      <br />
                      {datas?.customer?.telp}
                      <br />
                      {datas?.ket}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="4"
                      style={{
                        borderBottom: "solid thin",
                        borderTop: "solid thin",
                        fontSize: "13px",
                      }}
                    >
                      DATA BARANG
                    </td>
                  </tr>
                  <tr style={{ fontSize: "14px" }}>
                    {/* <td height="75">&nbsp;</td> */}
                    <td>
                      Produk
                      <br />
                      Merk
                      <br />
                      Type
                      <br />
                      No.Seri
                    </td>
                    <td>
                      :<br />
                      :<br />
                      :<br />:
                    </td>
                    <td>
                      {datas?.produk}
                      <br />
                      {datas?.merk}
                      <br />
                      {datas?.type}
                      <br />
                      {datas?.sn}
                    </td>
                  </tr>
                  <tr style={{ fontSize: "15px" }} valign="top">
                    {/* <td height="53">&nbsp;</td> */}
                    <td>
                      Perlengkapan
                      <br />
                      Keluhan
                      <br />
                      Estimasi
                      <br />
                      Biaya Max
                    </td>
                    <td>
                      :<br />
                      :<br />:<br />:
                    </td>
                    <td colSpan="2">
                      {datas?.perlengkapan}
                      <br />
                      {datas?.keluhan}
                      <br />
                      {formatRupiah(datas?.estimasi)}
                      <br />
                      {formatRupiah(datas?.estimasi)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="5"
                      align="center"
                      style={{
                        fontSize: "12px",
                        borderTop: "solid thin",
                        borderBottom: "solid thin",
                      }}
                    >
                      PERHATIAN
                    </td>
                  </tr>
                  <tr style={{ fontSize: "14px" }}>
                    <td width={"2%"}></td>
                    <td colSpan="4">
                      1. Tanda Terima ini harus dibawa pada saat pengambilan
                      barang.
                      <br />
                      2. Pembatalan perbaikan akan dikenakan biaya 50%.
                      <br />
                      3. Garansi service 1 (satu) minggu untuk kerusakan yang
                      sama (sparepart non garansi).
                      <br />
                      4. Barang yang tidak diambil dalam waktu 30 (tiga puluh)
                      hari pemberitahuan tidak menjadi tanggung jawab kami.
                      <br />
                      5. Khusus PC, Notebook dan Data Storage kami tidak
                      bertanggung jawab terhadap data didalamnya.
                      <br />
                      6. Pengambilan Servis : Senin - Sabtu Jam 09.00 - 16.00.
                      <br />
                      7. Biaya Max adalah biaya yang disetujui tanpa konfirmasi
                      ulang.
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PrintService;
