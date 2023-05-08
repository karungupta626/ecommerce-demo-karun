import Card from '@/components/Cards/Card';
import { fetchProductById } from '@/reducers/detailpageslice';
import { AppDispatch, RootState } from '@/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch: AppDispatch = useDispatch();
  const { product, status, error } = useSelector((state: RootState) => state.detailPage);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [id, dispatch]);

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      {status === 'succeeded' && product && (
        <div>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <Card product={product} key={product.id} /> 
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
