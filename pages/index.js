import Wrapper from "./../src/layouts/wrapper";
import Header from "./../src/layouts/header/header-01";
import Footer from "./../src/layouts/footer/footer-01";
import HeroArea from "./../src/containers/hero/layout-16";
import NewestItmesArea from "./../src/containers/product/layout-04";
import { normalizedData } from "./../src/utils/methods";

// Data
import homepageData from "./../src/data/homepages/home-16.json";
import productData from "./../src/data/products.json";

export async function getStaticProps() {
  return {
    props: { className: "template-color-1 nft-body-connect" },
  };
}

const Home = () => {
  const content = normalizedData(homepageData?.content || []);

  const newestData = productData
    .sort(
      (a, b) =>
        Number(new Date(b.published_at)) - Number(new Date(a.published_at))
    )
    .slice(0, 5);

  return (
    <Wrapper>
      <Header />
      <main id="main-content">
        <HeroArea data={content["hero-section"]} />

        <NewestItmesArea
          data={{
            ...content["newest-section"],
            products: newestData,
          }}
        />
      </main>
      <Footer data={content["brand-section"]} space={3} />
    </Wrapper>
  );
};

export default Home;
