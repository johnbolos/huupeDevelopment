import {useEffect} from 'react';

const VariantCard = (product) => {
  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <div>
      <p>{JSON.stringify(product)}</p>
    </div>
  );
};

export default VariantCard;
