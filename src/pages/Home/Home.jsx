import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/RouterConfig';
import axios from '../../config/axios';
import UiButton from 'components/common/ui/UiButton/UiButton';
import UiModal from 'components/common/ui/UiModal/UiModal';
import { getProductsRequest } from 'requests/product.request';
import ProductItem from 'components/section/product/ProductItem';

const Home = () => {
  const [response, setResponse] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleFetchProjects = async () => {
      if (fetchLoading) return;
      setFetchLoading(true);
      try {
        const fetchResult = await getProductsRequest();
        const data = fetchResult?.data;
        setResponse(data);
      } catch (error) {
        console.log(error);
      }
      setFetchLoading(false);
    };
    handleFetchProjects();
  }, []);




  const handleCloseModal = () => {
    setIsModalVisible(false);
  }


  return (
    <div className=''>
      <UiModal visible={isModalVisible} onConfirm={handleCloseModal} onclose={handleCloseModal} onCancel={handleCloseModal} headerTitle="Modal Title">Test modal</UiModal>
      <UiButton className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => { setIsModalVisible(!isModalVisible) }}
      >
        show modal
      </UiButton>
      <div className='p-12'>
        <div className="flex flex-col gap-6">
          <ProductItem response={response} fetchState={false} />
        </div>
      </div>
    </div>
  );
};

export default Home;
