import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import brand from "../assets/brand.png";

function Sidebar() {
  const [open, setOpen] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <section>
        <IconButton
          className="md:hidden block"
          variant="text"
          size="lg"
          onClick={openDrawer}
        >
          {isDrawerOpen ? (
            <XMarkIcon className="h-8 w-8 stroke-2" />
          ) : (
            <Bars3Icon className="h-8 w-8 stroke-2" />
          )}
        </IconButton>
        <Drawer open={isDrawerOpen} onClose={closeDrawer}>
          <Card
            color="transparent"
            shadow={false}
            className="h-screen w-full p-2"
          >
            <div className="mb-2 flex items-center gap-4 p-2">
              <img src={brand} alt="brand" className="h-8 w-12" />
              <Typography variant="h5" color="blue-gray">
                EXCELLENT
              </Typography>
            </div>
            <List>
              <a href="">
                <ListItem className="px-3 py-2 text-base rounded uppercase">
                  dashboard
                </ListItem>
              </a>
              <Accordion
                open={open === 1}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-3 w-3 transition-transform ${
                      open === 1 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <ListItem className="p-0 rounded" selected={open === 1}>
                  <AccordionHeader
                    onClick={() => handleOpen(1)}
                    className="border-b-0 px-3 py-2 "
                  >
                    <Typography
                      color="blue-gray"
                      className="font-popins uppercase mr-auto text-base font-normal"
                    >
                      TRANSAKSI PENJUALAN
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-2">
                  <List className="p-0">
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        EXCELCOM
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        DINARPOS
                      </ListItem>
                    </a>
                  </List>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={open === 2}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-3 w-3 transition-transform ${
                      open === 2 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <ListItem className="p-0 rounded" selected={open === 2}>
                  <AccordionHeader
                    onClick={() => handleOpen(2)}
                    className="border-b-0 px-3 py-2 "
                  >
                    <Typography
                      color="blue-gray"
                      className="font-popins uppercase mr-auto text-base font-normal"
                    >
                      TRANSAKSI pembelian
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-2">
                  <List className="p-0">
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        EXCELCOM
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        DINARPOS
                      </ListItem>
                    </a>
                  </List>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={open === 3}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-3 w-3 transition-transform ${
                      open === 3 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <ListItem className="p-0 rounded" selected={open === 3}>
                  <AccordionHeader
                    onClick={() => handleOpen(3)}
                    className="border-b-0 px-3 py-2 "
                  >
                    <Typography
                      color="blue-gray"
                      className="font-popins uppercase mr-auto text-base font-normal"
                    >
                      data user
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-2">
                  <List className="p-0">
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        data customer
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        data customer cp
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        data suplier
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        data salesman
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        data pengguna
                      </ListItem>
                    </a>
                  </List>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={open === 4}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-3 w-3 transition-transform ${
                      open === 4 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <ListItem className="p-0 rounded" selected={open === 4}>
                  <AccordionHeader
                    onClick={() => handleOpen(4)}
                    className="border-b-0 px-3 py-2 "
                  >
                    <Typography
                      color="blue-gray"
                      className="font-popins uppercase mr-auto text-base font-normal"
                    >
                      data barang
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-2">
                  <List className="p-0">
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        data barang
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        stok masuk
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        stok opname
                      </ListItem>
                    </a>
                  </List>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={open === 5}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-3 w-3 transition-transform ${
                      open === 5 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <ListItem className="p-0 rounded" selected={open === 5}>
                  <AccordionHeader
                    onClick={() => handleOpen(5)}
                    className="border-b-0 px-3 py-2 "
                  >
                    <Typography
                      color="blue-gray"
                      className="font-popins uppercase mr-auto text-base font-normal"
                    >
                      return excelcom
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-2">
                  <List className="p-0">
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        penjualan return
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        penjualan barang return
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        pembelian return
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        pembelian barang return
                      </ListItem>
                    </a>
                  </List>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={open === 6}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-3 w-3 transition-transform ${
                      open === 6 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <ListItem className="p-0 rounded" selected={open === 6}>
                  <AccordionHeader
                    onClick={() => handleOpen(6)}
                    className="border-b-0 px-3 py-2 "
                  >
                    <Typography
                      color="blue-gray"
                      className="font-popins uppercase mr-auto text-base font-normal"
                    >
                      return dinarpos
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-2">
                  <List className="p-0">
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        penjualan return
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        penjualan barang return
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        pembelian return
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        pembelian barang return
                      </ListItem>
                    </a>
                  </List>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={open === 7}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-3 w-3 transition-transform ${
                      open === 7 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <ListItem className="p-0 rounded" selected={open === 7}>
                  <AccordionHeader
                    onClick={() => handleOpen(7)}
                    className="border-b-0 px-3 py-2 "
                  >
                    <Typography
                      color="blue-gray"
                      className="font-popins uppercase mr-auto text-base font-normal"
                    >
                      laporan excelcom
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-2">
                  <List className="p-0">
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        laporan salesman
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        laporan barang
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        laporan suplier
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        laporan customer
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        laporan transaksi beli
                      </ListItem>
                    </a>
                  </List>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={open === 8}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-3 w-3 transition-transform ${
                      open === 8 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <ListItem className="p-0 rounded" selected={open === 8}>
                  <AccordionHeader
                    onClick={() => handleOpen(8)}
                    className="border-b-0 px-3 py-2 "
                  >
                    <Typography
                      color="blue-gray"
                      className="font-popins uppercase mr-auto text-base font-normal"
                    >
                      laporan dinarpos
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-2">
                  <List className="p-0">
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        laporan salesman
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        laporan barang
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        laporan suplier
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        laporan customer
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        laporan transaksi beli
                      </ListItem>
                    </a>
                  </List>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={open === 9}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-3 w-3 transition-transform ${
                      open === 9 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <ListItem className="p-0 rounded" selected={open === 9}>
                  <AccordionHeader
                    onClick={() => handleOpen(9)}
                    className="border-b-0 px-3 py-2 "
                  >
                    <Typography
                      color="blue-gray"
                      className="font-popins uppercase mr-auto text-base font-normal"
                    >
                      notifikasi excelcom
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-2">
                  <List className="p-0">
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        laporan salesman
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        notifikasi 7
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        notifikasi 30
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        notifikasi 90
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        notifikasi 120
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        notifikasi 365
                      </ListItem>
                    </a>
                  </List>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={open === 10}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-3 w-3 transition-transform ${
                      open === 10 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <ListItem className="p-0 rounded" selected={open === 10}>
                  <AccordionHeader
                    onClick={() => handleOpen(10)}
                    className="border-b-0 px-3 py-2 "
                  >
                    <Typography
                      color="blue-gray"
                      className="font-popins uppercase mr-auto text-base font-normal"
                    >
                      notifikasi dinarpos
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-2">
                  <List className="p-0">
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        laporan salesman
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        notifikasi 7
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        notifikasi 30
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        notifikasi 90
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        notifikasi 120
                      </ListItem>
                    </a>
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        notifikasi 365
                      </ListItem>
                    </a>
                  </List>
                </AccordionBody>
              </Accordion>
            </List>
            <div className="fixed bottom-0 bg-white w-[18rem] left-0 uppercase py-2 px-6">
              <a href="">lOG OUT</a>
            </div>
          </Card>
        </Drawer>
        {/* SIDEBAR */}
        <Card className="relative md:block hidden h-screen w-full max-w-[20rem] p-2 shadow-2xl rounded-none overflow-y-auto sidebar">
          <div className="mb-2 flex items-center gap-4 p-2">
            <img src={brand} alt="brand" className="h-8 w-12" />
            <Typography variant="h5" color="blue-gray">
              EXCELLENT
            </Typography>
          </div>
          <List>
            <a href="">
              <ListItem className="px-3 py-2 text-base rounded uppercase">
                dashboard
              </ListItem>
            </a>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-3 w-3 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0 rounded" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 px-3 py-2 "
                >
                  <Typography
                    color="blue-gray"
                    className="font-popins uppercase mr-auto text-base font-normal"
                  >
                    TRANSAKSI PENJUALAN
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-2">
                <List className="p-0">
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      EXCELCOM
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      DINARPOS
                    </ListItem>
                  </a>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-3 w-3 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0 rounded" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 px-3 py-2 "
                >
                  <Typography
                    color="blue-gray"
                    className="font-popins uppercase mr-auto text-base font-normal"
                  >
                    TRANSAKSI pembelian
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-2">
                <List className="p-0">
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      EXCELCOM
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      DINARPOS
                    </ListItem>
                  </a>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 3}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-3 w-3 transition-transform ${
                    open === 3 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0 rounded" selected={open === 3}>
                <AccordionHeader
                  onClick={() => handleOpen(3)}
                  className="border-b-0 px-3 py-2 "
                >
                  <Typography
                    color="blue-gray"
                    className="font-popins uppercase mr-auto text-base font-normal"
                  >
                    data user
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-2">
                <List className="p-0">
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      data customer
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      data customer cp
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      data suplier
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      data salesman
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      data pengguna
                    </ListItem>
                  </a>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 4}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-3 w-3 transition-transform ${
                    open === 4 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0 rounded" selected={open === 4}>
                <AccordionHeader
                  onClick={() => handleOpen(4)}
                  className="border-b-0 px-3 py-2 "
                >
                  <Typography
                    color="blue-gray"
                    className="font-popins uppercase mr-auto text-base font-normal"
                  >
                    data barang
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-2">
                <List className="p-0">
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      data barang
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      stok masuk
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      stok opname
                    </ListItem>
                  </a>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 5}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-3 w-3 transition-transform ${
                    open === 5 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0 rounded" selected={open === 5}>
                <AccordionHeader
                  onClick={() => handleOpen(5)}
                  className="border-b-0 px-3 py-2 "
                >
                  <Typography
                    color="blue-gray"
                    className="font-popins uppercase mr-auto text-base font-normal"
                  >
                    return excelcom
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-2">
                <List className="p-0">
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      penjualan return
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      penjualan barang return
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      pembelian return
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      pembelian barang return
                    </ListItem>
                  </a>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 6}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-3 w-3 transition-transform ${
                    open === 6 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0 rounded" selected={open === 6}>
                <AccordionHeader
                  onClick={() => handleOpen(6)}
                  className="border-b-0 px-3 py-2 "
                >
                  <Typography
                    color="blue-gray"
                    className="font-popins uppercase mr-auto text-base font-normal"
                  >
                    return dinarpos
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-2">
                <List className="p-0">
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      penjualan return
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      penjualan barang return
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      pembelian return
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      pembelian barang return
                    </ListItem>
                  </a>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 7}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-3 w-3 transition-transform ${
                    open === 7 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0 rounded" selected={open === 7}>
                <AccordionHeader
                  onClick={() => handleOpen(7)}
                  className="border-b-0 px-3 py-2 "
                >
                  <Typography
                    color="blue-gray"
                    className="font-popins uppercase mr-auto text-base font-normal"
                  >
                    laporan excelcom
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-2">
                <List className="p-0">
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      laporan salesman
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      laporan barang
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      laporan suplier
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      laporan customer
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      laporan transaksi beli
                    </ListItem>
                  </a>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 8}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-3 w-3 transition-transform ${
                    open === 8 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0 rounded" selected={open === 8}>
                <AccordionHeader
                  onClick={() => handleOpen(8)}
                  className="border-b-0 px-3 py-2 "
                >
                  <Typography
                    color="blue-gray"
                    className="font-popins uppercase mr-auto text-base font-normal"
                  >
                    laporan dinarpos
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-2">
                <List className="p-0">
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      laporan salesman
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      laporan barang
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      laporan suplier
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      laporan customer
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      laporan transaksi beli
                    </ListItem>
                  </a>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 9}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-3 w-3 transition-transform ${
                    open === 9 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0 rounded" selected={open === 9}>
                <AccordionHeader
                  onClick={() => handleOpen(9)}
                  className="border-b-0 px-3 py-2 "
                >
                  <Typography
                    color="blue-gray"
                    className="font-popins uppercase mr-auto text-base font-normal"
                  >
                    notifikasi excelcom
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-2">
                <List className="p-0">
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      laporan salesman
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      notifikasi 7
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      notifikasi 30
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      notifikasi 90
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      notifikasi 120
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      notifikasi 365
                    </ListItem>
                  </a>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 10}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-3 w-3 transition-transform ${
                    open === 10 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0 rounded" selected={open === 10}>
                <AccordionHeader
                  onClick={() => handleOpen(10)}
                  className="border-b-0 px-3 py-2 "
                >
                  <Typography
                    color="blue-gray"
                    className="font-popins uppercase mr-auto text-base font-normal"
                  >
                    notifikasi dinarpos
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-2">
                <List className="p-0">
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      laporan salesman
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      notifikasi 7
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      notifikasi 30
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      notifikasi 90
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      notifikasi 120
                    </ListItem>
                  </a>
                  <a href="">
                    <ListItem className="uppercase rounded px-3 py-2">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
                      </ListItemPrefix>
                      notifikasi 365
                    </ListItem>
                  </a>
                </List>
              </AccordionBody>
            </Accordion>
          </List>
          <div className="fixed bottom-0 bg-white w-[19rem] left-0 uppercase py-2 px-6">
            <a href="">lOG OUT</a>
          </div>
        </Card>
      </section>
    </>
  );
}

export default Sidebar;
