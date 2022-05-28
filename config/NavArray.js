const arr = [
  {
    display: "OVERVIEW",
    href: "/admin/overview",
  },
  {
    display: "ADMIN",
    href: "/admin/admin_page",
  },
  {
    display: "CLIENTI",
    href: "/admin/clienti",
  },
  {
    display: "PRODOTTI",
    href: "/admin/prodotti",
    subList: [
      {
        display: "Aggiungi Prodotto",
        href: "/agguino",
      },
      {
        href: "/categoria",
        display: "Lista Prodotti",
      },
      {
        display: "Categoria",
        href: "/product_list",
      },
    ],
  },
  {
    display: "ORDINI",
    href: "/admin/ordini",
  },
  {
    display: "BRAND",
    href: "/admin/brand",
  },
];

export default arr;
