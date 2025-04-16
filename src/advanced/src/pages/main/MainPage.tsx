import BasicLayout from "#advanced/components/layouts/basic/BasicLayout";

const MainPage: React.FC = () => {
  return (
    <BasicLayout>
      <article>
        <section>장바구니 제목</section>
        <section>상품 선택</section>
        <section>장바구니 가격(총액/가격)</section>
        <section>장바구니 내용</section>
        <section>도움말</section>
      </article>
    </BasicLayout>
  );
};

export default MainPage;
