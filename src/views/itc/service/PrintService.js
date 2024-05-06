import React from "react";

function PrintService() {
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
              <img src="#" style={{ height: "2.5rem" }} />
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
              Tracking Page : http://tracking.dinartechshare-e.com
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
                      Tanggal :<br />
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
                              (Aisyah)
                              <br /> Konsumen
                            </td>
                            <td align="center">
                              (Dinda)
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
                      Aisyah
                      <br />
                      Semarang
                      <br />
                      098890129012901
                      <br />-
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
                      Laptop
                      <br />
                      ASUS
                      <br />
                      Z10
                      <br />
                      Z10A
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
                    <td colspan="2">
                      Unit
                      <br />
                      mati
                      <br />
                      120000
                      <br />
                      500000{" "}
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
                    <td width={"2%"}>
                      1.
                      <br />
                      2.
                      <br />
                      3.
                      <br />
                      4.
                      <br />
                      5.
                      <br />
                      6.
                      <br />
                      7.
                    </td>
                    <td colSpan="4">
                      Tanda Terima ini harus dibawa pada saat pengambilan
                      barang.
                      <br />
                      Pembatalan perbaikan akan dikenakan biaya 50%.
                      <br />
                      Garansi service 1 (satu) minggu untuk kerusakan yang sama
                      (sparepart non garansi).
                      <br />
                      Barang yang tidak diambil dalam waktu 30 (tiga puluh) hari
                      pemberitahuan tidak menjadi tanggung jawab kami.
                      <br />
                      Khusus PC, Notebook dan Data Storage kami tidak
                      bertanggung jawab terhadap data didalamnya.
                      <br />
                      Pengambilan Servis : Senin - Sabtu Jam 09.00 - 16.00.
                      <br />
                      Biaya Max adalah biaya yang disetujui tanpa konfirmasi
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
