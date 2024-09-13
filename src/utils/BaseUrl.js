// Local
const url = "http://localhost:2000/api";

// Deploy
// const url = "http://41.216.186.59:2000/api";
// const url = "https://api-dinarpos.excellentsistem.com/api";

// DATA USER
export const API_USER = `${url}/user`;
export const API_SALESMAN = `${url}/salesman`;
export const API_CUSTOMER = `${url}/customer`;
export const API_CUSTOMER_CP = `${url}/customer/cp`;
export const API_SUPLIER = `${url}/supplier`;
export const API_PENGGUNA = `${url}/pengguna`;
export const API_UBAH_PASSWORD = `${url}/ubah_password`;

// DATA BARANG
export const API_BARANG = `${url}/barang`;
export const API_STOK_MASUK = `${url}/stok_masuk`;
export const API_STOK_KELUAR = `${url}/stok_keluar`;

// RETURN
export const API_RETURN_DINARPOS = `${url}/return/dinarpos`;
export const API_RETURN_EXCELCOM = `${url}/return/excelcom`;

// TRANSAKSI
export const API_TRANSAKSI = `${url}/transaksi`;
export const API_TRANSAKSI_BELI_EXCELCOM = `${url}/transaksi/pembelian/excelcom`;
export const API_TRANSAKSI_BELI_DINARPOS = `${url}/transaksi/pembelian/dinarpos`;
export const API_TRANSAKSI_JUAL_EXCELCOM = `${url}/transaksi/penjualan/excelcom`;
export const API_TRANSAKSI_JUAL_DINARPOS = `${url}/transaksi/penjualan/dinarpos`;
export const GET_TRANSAKSI_BELI = `${url}/transaksi/pembelian`;
export const GET_TRANSAKSI_JUAL = `${url}/transaksi/penjualan`;
export const GET_BARANG_TRANSAKSI_BELI_EXCELCOM = `${url}/transaksi/barang/pembelian/excelcom`;
export const GET_BARANG_TRANSAKSI_BELI_DINARPOS = `${url}/transaksi/barang/pembelian/dinarpos`;
export const GET_BARANG_TRANSAKSI_JUAL_EXCELCOM = `${url}/transaksi/barang/penjualan/excelcom`;
export const GET_BARANG_TRANSAKSI_JUAL_DINARPOS = `${url}/transaksi/barang/penjualan/dinarpos`;

// LAPORAN
export const LAPORAN_BARANG = `${url}/laporan/barang`;
export const LAPORAN_CUSTOMER = `${url}/laporan/customer`;
export const LAPORAN_SALESMAN = `${url}/laporan/salesman`;
export const LAPORAN_SUPLIER = `${url}/laporan/suplier`;
export const LAPORAN_TRANSAKSI_BELI = `${url}/laporan/transaksi_beli`;

// NOTIFIKASI EXCELCOM
export const NOTIFIKASI_7_EXCELCOM = `${url}/notifikasi/7_hari/excelcom`;
export const NOTIFIKASI_30_EXCELCOM = `${url}/notifikasi/30_hari/excelcom`;
export const NOTIFIKASI_90_EXCELCOM = `${url}/notifikasi/90_hari/excelcom`;
export const NOTIFIKASI_120_EXCELCOM = `${url}/notifikasi/120_hari/excelcom`;
export const NOTIFIKASI_365_EXCELCOM = `${url}/notifikasi/365_hari/excelcom`;

// NOTIFIKASI DINARPOS
export const NOTIFIKASI_7_DINARPOS = `${url}/notifikasi/7_hari/dinarpos`;
export const NOTIFIKASI_30_DINARPOS = `${url}/notifikasi/30_hari/dinarpos`;
export const NOTIFIKASI_90_DINARPOS = `${url}/notifikasi/90_hari/dinarpos`;
export const NOTIFIKASI_120_DINARPOS = `${url}/notifikasi/120_hari/dinarpos`;
export const NOTIFIKASI_365_DINARPOS = `${url}/notifikasi/365_hari/dinarpos`;

// GET NOTIFIKASI KONFIRMASI EXCELCOM
export const NOTIFIKASI_KONFIRMASI_7_EXCELCOM = `${url}/notifikasi/konfirmasi/7_hari/excelcom`;
export const NOTIFIKASI_KONFIRMASI_30_EXCELCOM = `${url}/notifikasi/konfirmasi/30_hari/excelcom`;
export const NOTIFIKASI_KONFIRMASI_90_EXCELCOM = `${url}/notifikasi/konfirmasi/90_hari/excelcom`;
export const NOTIFIKASI_KONFIRMASI_120_EXCELCOM = `${url}/notifikasi/konfirmasi/120_hari/excelcom`;
export const NOTIFIKASI_KONFIRMASI_365_EXCELCOM = `${url}/notifikasi/konfirmasi/365_hari/excelcom`;

// GET NOTIFIKASI KONFIRMASI DINARPOS
export const NOTIFIKASI_KONFIRMASI_7_DINARPOS = `${url}/notifikasi/konfirmasi/7_hari/dinarpos`;
export const NOTIFIKASI_KONFIRMASI_30_DINARPOS = `${url}/notifikasi/konfirmasi/30_hari/dinarpos`;
export const NOTIFIKASI_KONFIRMASI_90_DINARPOS = `${url}/notifikasi/konfirmasi/90_hari/dinarpos`;
export const NOTIFIKASI_KONFIRMASI_120_DINARPOS = `${url}/notifikasi/konfirmasi/120_hari/dinarpos`;
export const NOTIFIKASI_KONFIRMASI_365_DINARPOS = `${url}/notifikasi/konfirmasi/365_hari/dinarpos`;

// KONFIRMASI NOTIFIKASI
export const KONFIRMASI_7 = `${url}/notifikasi/konfirmasi/7_hari`;
export const KONFIRMASI_30 = `${url}/notifikasi/konfirmasi/30_hari`;
export const KONFIRMASI_90 = `${url}/notifikasi/konfirmasi/90_hari`;
export const KONFIRMASI_120 = `${url}/notifikasi/konfirmasi/120_hari`;
export const KONFIRMASI_365 = `${url}/notifikasi/konfirmasi/365_hari`;

// TRANSAKSI INDENT
export const API_TRANSAKSI_INDENT_EXCELCOM = `${url}/transaksi_indent/excelcom`;
export const API_TRANSAKSI_INDENT_DINARPOS = `${url}/transaksi_indent/dinarpos`;
export const API_TRANSAKSI_INDENT = `${url}/transaksi_indent`;
export const API_BARANG_TRANSAKSI_INDENT = `${url}/transaksi_indent/barang`;

// ACCOUNTING
export const API_HUTANG = `${url}/hutang`;
export const API_PIUTANG = `${url}/piutang`;

// TEKNISI
export const API_TEKNISI = `${url}/teknisi`;

// SERVICE
export const API_SERVICE = `${url}/service`;

// GARANSI
export const API_GARANSI = `${url}/garansi`;

// BON BARANG
export const API_BON_BARANG = `${url}/bon_barang`;

// SERVICE RETUR
export const API_SERVICE_RETUR = `${url}/return/service`;

// POINT
export const API_POIN_SALESMAN_TANGGAL_EXCELCOM = `${url}/poin/salesman/tanggal/excelcom`;

// EDIT DATA
export const API_EDIT_DATA = `${url}/edit_data`;

// POIN
export const API_POIN = `${url}/poin`;

export const API_SERVICE_TAKEN = `${url}/service/taken`;

// KAS HARIAN
export const API_KAS_HARIAN = `${url}/kas_harian`;

// EXPORT LAPORAN SERVICE
export const API_LAPORAN_SERVICE_EXPORT = `${url}/laporan_service`;

// LAPORAN MARKETING
export const API_LAPORAN_MARKETING = `${url}/laporan/laporan-marketing`;
export const API_PERSEDIAN_EXPORT = `${url}/persediaan`;

// ITC
export const API_ITC = `${url}/itc`;

// ITC NAMA
export const API_ITC_NAMA = `${url}/itc/nama`;

// DATA DEAL PO
export const API_DEAL_PO = `${url}/deal/po`;

// DATA KUNJUNGAN
export const API_KUNJUNGAN = `${url}/kunjungan`;

// DATA KUNJUNGAN EXPORT KUNJUNGAN
export const API_KUNJUNGAN_EXPORT_KUNJUNGAN = `${url}/kunjungan/export/kunjungan`;

// DATA KUNJUNGAN DATE BETWEEN
export const API_KUNJUNGAN_DATE_BETWEEN = `${url}/kunjungan/date/between`;

// DATA KUNJUNGAN DATE BETWEEN SALESMEN
export const API_KUNJUNGAN_DATE_BETWEEN_SALESMAN = `${url}/kunjungan/date/between/salesman`;

// DATA KUNJUNGAN DATE BETWEEN SALESMEN
export const API_PLANNING = `${url}/planning`;

// ALAMAT
export const API_PROV = `${url}/prov`;
export const API_KABKOT = `${url}/kab_kot`;
