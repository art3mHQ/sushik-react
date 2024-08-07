const fetchOrders = async () => {
  const res = await fetch(
    "https://dev.sushik.km.ua/wp-json/wc/v3/latest-products",
  );
  return res.json();
};

export default fetchOrders;
