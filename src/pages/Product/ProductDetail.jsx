import ButtonZoomShadow from 'components/animation/ButtonZoomShadow'
import UiImage from 'components/common/ui/UiImage/UiImage'
import UiLi from 'components/common/ui/UiLi/UiLi'
import UiSpinning from 'components/common/ui/UiSpinning/UiSpinning'
import NotFound from 'pages/404/NotFound'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductDetailRequest } from 'requests/product.request'
import { ROUTES } from 'routes/RouterConfig'
import { LOCAL_STORAGE } from 'utils/storageConstants'


const cardItems = [
  {
    img: '/assets/images/banner/minh-hoa-benh-vien-dieu-tri-01-366x206.jpg',
    title: 'Chi trả lên đến 250% số tiền bảo hiểm cho 99 bệnh lý nghiêm trọng khác nhau'
  },
  {
    img: '/assets/images/banner/minh-hoa-tai-nan-tu-vong-01-366x206.jpg',
    title: 'Quyền lợi đặc biệt cho 03 nhóm bệnh lý nghiêm trọng phổ biến'
  },
  {
    img: '/assets/images/banner/minh-hoa-chi-tra-nhan-tien-hoan-phi-03-366x206.jpg',
    title: 'Cân đối và chủ động xây dựng kế hoạch tài chính cho nhiều nhu cầu'
  },

]

const ProductDetail = () => {
  const [response, setResponse] = useState([])
  const [fetchLoading, setFetchLoading] = useState(false)
  const [fetchError, setFetchError] = useState(false)

  const navigate = useNavigate();

  const { productId } = useParams()

  useEffect(() => {
    const handleFetchProjectDetail = async () => {
      if (fetchLoading) return
      setFetchLoading(true)
      try {
        const fetchResult = await getProductDetailRequest({
          // id: productId,
          id: 1,
        })
        const data = fetchResult?.data
        setResponse(data)
        console.log(data);

      } catch (error) {
        console.log(error)
        setFetchError(true)
      } finally {
        setFetchLoading(false)
      }
    }

    handleFetchProjectDetail()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])



  // temp return in case product not found
  if (fetchError) return <NotFound />


  return (
    <div className='w-[1366px] '>


      {!fetchLoading ? (
        <div className="m-8 p-12 overflow-hidden">
          <div className='flex flex-row gap-8'>
            <div className='flex flex-col w-[450px] px-5'>
              <div className="relative">
                <div className='text-[20px] font-bold'>Sản phẩm bảo hiểm nhân thọ mới nhất</div>
                <div className='w-full h-[2px] bg-[#68737a] opacity-30 absolute -bottom-1'></div>
              </div>
              <div className='text-[18px] mt-12'>Sản phẩm bảo hiểm
              </div>
              <h1 className='text-[36px]'>{response?.productName}</h1>
              <p className='mt-6'>Chọn chuẩn chất riêng</p>
            </div>

            <UiImage width={766} height={432} src={'/assets/images/banner/sp-pru-bao-ve-toi-uu-hero-766x432.jpg'} />
          </div>

          <div>
            <h1 className='text-[48px]'>Vì sao chọn?</h1>
            <div className="grid grid-cols-3 mt-8 justify-items-center">
              {cardItems.map((item, index) => (
                <div key={index} className='relative w-[366px] h-[408px] overflow-hidden  bg-white shadow-lg rounded-lg'>
                  <div className='w-[366px] h-[206px]'>
                    <UiImage src={item.img} alt="logo" width={366} height={206} />
                  </div>
                  <div className='p-[30px] pb-[52px] '>
                    <h1 className='text-[24px] overflow-hidden line-clamp-4 max-h-[192px]'>{item.title}</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='flex justify-center my-32'>
            <UiImage src={'/assets/images/banner/sp-pru-bao-ve-toi-uu-video-966x543.jpg'} alt="logo" width={966} height={544} />
          </div>

          <div className='w-[1000px] px-4 m-auto mt-16'>
            <p className='text-[18px]'>Với những người trẻ, chất riêng là tính độc bản, là cá tính riêng biệt, không phải một công thức cố định hay hình mẫu được sắp đặt sẵn. Thông qua từng món đồ bạn dùng, mỗi thứ phụ kiện bạn mang hay thói quen, sở thích hàng ngày bạn của bạn đều thể hiện chất riêng của chính mình. Và việc lựa chọn phương án bảo vệ bản thân cũng không phải là điều ngoại lệ.
              <br /><br />
              Hãy để Prudential đồng hành cùng bạn trên hành trình khẳng định chất riêng với sản phẩm bảo hiểm trực tuyến PRU-NĂNG ĐỘNG, nơi bạn có thể lựa chọn nhiều quyền lợi bảo vệ theo đúng nhu cầu và chất riêng của bản thân.
              <br /><br />
              Chọn PRU-NĂNG ĐỘNG ngay hôm nay để được bảo vệ toàn diện, nhanh chóng và chuẩn chất riêng của bạn.</p>
          </div>

          <div>
            <h1 className='text-[48px] mt-20'>Chi tiết sản phẩm</h1>
            <div className="bg-white shadow-sm m-8 p-12 rounded-lg">
              <h1>Quyền lợi của sản phẩm</h1>
              <div className='mt-16 flex flex-col gap-4'>
                {
                  response?.rights?.map((item, index) => {
                    return (
                      <UiLi className='text-black-primary' key={index}>
                        {item.title}
                      </UiLi>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className="flex justify-center flex-row mt-12">
            <ButtonZoomShadow
              onClick={() => {
                if (!localStorage.getItem(LOCAL_STORAGE.ACCOUNT_ID)) navigate(ROUTES.Login)
                else
                  navigate(`${ROUTES.BaoHiemDangKy}/${productId}`)
              }}
              className='text-[18px] h-[52px]'
            >
              Đăng ký bảo hiểm ngay!
            </ButtonZoomShadow>
          </div>
        </div>
      ) : (
        <div className='h-[500px] flex flex-col justify-center'>
          <UiSpinning />
        </div>
      )}
    </div>
  )
}

export default ProductDetail




