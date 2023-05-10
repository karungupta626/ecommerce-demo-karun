import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchProductById } from '@/reducers/detailpageslice';

interface Product {
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
}

interface DetailPageProps {
  id: number;
}

const DetailPage = ({ id }: DetailPageProps) => {
  
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductById());
  }, [dispatch, id]);

  const { product, status, error } = useSelector((state: RootState) => state.detailPage);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div>
      {product && (
        <div>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Rating: {product.rating}</p>
          <p>Category: {product.category}</p>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
