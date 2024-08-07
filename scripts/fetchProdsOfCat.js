const fetchProdsOfCat = async (cat) => {
  const res = await fetch(
    `https://dev.sushik.km.ua/wp-json/wc/store/v1/products?category=${cat}`,
  );

  if (!res.ok) {
    throw new Error(`prods of category ${cat} fetching not ok...`);
  }

  console.log("hi from fetchProdsOfCat cat is:", cat);

  return res.json();
};

export default fetchProdsOfCat;
