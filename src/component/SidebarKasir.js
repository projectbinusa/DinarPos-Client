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
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SidebarKasir() {
  const [open, setOpen] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const history = useHistory();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const logout = () => {
    history.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    localStorage.clear();
  };

  return (
    <>
      {" "}
      <div>
        <div className="w-full bg-white drop-shadow-lg flex gap-3 p-2 lg:hidden fixed z-10">
          <IconButton variant="text" size="lg" onClick={openDrawer}>
            {isDrawerOpen ? (
              <XMarkIcon className="h-8 w-8 stroke-2" />
            ) : (
              <Bars3Icon className="h-8 w-8 stroke-2" />
            )}
          </IconButton>
          <div className="flex items-center gap-1">
            <img src={brand} alt="brand" className="h-8 w-12" />
            <Typography variant="h5" color="blue-gray">
              EXCELLENT
            </Typography>
          </div>
        </div>
        <Drawer
          open={isDrawerOpen}
          onClose={closeDrawer}
          overlay={true}
          overlayRef={(ref) => {
            if (ref) {
              document.body.style.overflow = isDrawerOpen ? "hidden" : "auto";
            }
          }}
        >
          <Card
            color="white"
            shadow={false}
            className="h-screen w-full p-2 bg-blend-overlay"
          >
            <div className="mb-2 flex items-center gap-4 p-2">
              <img src={brand} alt="brand" className="h-8 w-12" />
              <Typography variant="h5" color="blue-gray">
                EXCELLENT
              </Typography>
            </div>
            <List className="mb-5">
              <a href="/dashboard">
                <ListItem className="px-3 py-2 text-sm rounded uppercase">
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
                      className="font-poppins uppercase mr-auto text-sm font-normal"
                    >
                      TRANSAKSI PENJUALAN
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-2">
                  <List className="p-0">
                    <a href="/transaksi_penjualan_excelcom">
                      <ListItem className="uppercase rounded px-3 py-2 text-sm">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        EXCELCOM
                      </ListItem>
                    </a>
                    <a href="/transaksi_penjualan_dinarpos">
                      <ListItem className="uppercase rounded px-3 py-2 text-sm">
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
                      className="font-poppins uppercase mr-auto text-sm font-normal"
                    >
                      data user
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-2">
                  <List className="p-0">
                    <a href="/data_customer">
                      <ListItem className="uppercase rounded px-3 py-2 text-sm">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        data customer
                      </ListItem>
                    </a>
                    <a href="/data_customer_cp">
                      <ListItem className="uppercase rounded px-3 py-2 text-sm">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        data customer cp
                      </ListItem>
                    </a>
                  </List>
                </AccordionBody>
              </Accordion>
              <a href="/data_barang">
                <ListItem className="px-3 py-2 text-sm rounded uppercase">
                  data barang
                </ListItem>
              </a>
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
                      className="font-poppins uppercase mr-auto text-sm font-normal"
                    >
                      data laporan
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-2">
                  <List className="p-0">
                    <a href="/penjualan_return_excelcom">
                      <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        laporan transaksi excelcom
                      </ListItem>
                    </a>
                    <a href="/penjualan_barang_return_excelcom">
                      <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        laporan transaksi dinarpos
                      </ListItem>
                    </a>
                    <a href="/pembelian_return_excelcom">
                      <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </ListItemPrefix>
                        pembelian return
                      </ListItem>
                    </a>
                    <a href="/pembelian_barang_return_excelcom">
                      <ListItem className="uppercase rounded px-3 py-2 text-sm ">
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
                      className="font-poppins uppercase mr-auto text-sm font-normal"
                    >
                      notifikasi excelcom
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-2">
                  <List className="p-0">
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2 text-sm ">
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
                      <ListItem className="uppercase rounded px-3 py-2 text-sm ">
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
                      <ListItem className="uppercase rounded px-3 py-2 text-sm ">
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
                      <ListItem className="uppercase rounded px-3 py-2 text-sm ">
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
                      <ListItem className="uppercase rounded px-3 py-2 text-sm ">
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
                      <ListItem className="uppercase rounded px-3 py-2 text-sm ">
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
                      className="font-poppins uppercase mr-auto text-sm font-normal"
                    >
                      notifikasi dinarpos
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-2">
                  <List className="p-0">
                    <a href="">
                      <ListItem className="uppercase rounded px-3 py-2 text-sm ">
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
                      <ListItem className="uppercase rounded px-3 py-2 text-sm ">
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
                      <ListItem className="uppercase rounded px-3 py-2 text-sm ">
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
                      <ListItem className="uppercase rounded px-3 py-2 text-sm ">
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
                      <ListItem className="uppercase rounded px-3 py-2 text-sm ">
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
                      <ListItem className="uppercase rounded px-3 py-2 text-sm ">
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
            <div className="fixed bottom-0 bg-white w-[17rem] left-0 py-2 px-6">
              <button onClick={logout} className="uppercase text-sm">
                Logout
              </button>
            </div>{" "}
          </Card>
        </Drawer>
      </div>
    </>
  );
}

export default SidebarKasir;
