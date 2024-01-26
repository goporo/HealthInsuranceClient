import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import UiButton from 'components/common/ui/UiButton/UiButton'
import { ROUTES } from 'routes/RouterConfig'
import UiImage from 'components/common/ui/UiImage/UiImage'
import api from 'config/axios'

const Payment = () => {
  const navigate = useNavigate()
  const [payURL, setPayURL] = useState("");

  useEffect(() => {
    // Get the query parameters from the current URL
    const queryParams = new URLSearchParams(window.location.search);

    const queryString = queryParams.toString();
    setPayURL(`${process.env.REACT_APP_SERVICE_URI}/payment/return?${queryString}`);

  }, []);

  const handleConfirmPayment = async () => {
    console.log(payURL);

    try {
      const result = await api.get(payURL);
      console.log(result.data);
      if (result.status === 200) {
        navigate(ROUTES.Home)
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="flex flex-col gap-12 items-center justify-center h-screen bg-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Thanh toán thành công!</h1>
        <p>Cảm ơn bạn đã tin tưởng sử dụng sản phẩm bảo hiểm sức khỏe của chúng tôi. Sự tin dùng của bạn đối với dịch vụ của chúng tôi được đánh giá cao.

          <br />
          Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, đừng ngần ngại liên hệ với đội ngũ hỗ trợ của chúng tôi.
        </p>
        <UiImage
          width={400}
          height={300}
          src='/assets/images/payment_success.jpg' />

      </div>
      <UiButton
        icon={faArrowLeft}
        className="h-[46px] -mt-8 gap-2 rounded-full w-[260px] bg-primary text-white"
        onClick={handleConfirmPayment}
      >
        Trở về trang chủ
      </UiButton>
    </div>
  )
}

export default Payment