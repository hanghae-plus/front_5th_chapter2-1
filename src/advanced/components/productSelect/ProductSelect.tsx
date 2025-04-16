import { DOM_IDS, STYLES } from "@/basic/consts";

export const ProductSelect: React.FC = () => {
  return (
    <select
      id={DOM_IDS.PRODUCT.SELECT}
      className={STYLES.FORM.SELECT}
    />
  );
};