import ButtonZoomShadow from 'components/animation/ButtonZoomShadow'
import UiButton from 'components/common/ui/UiButton/UiButton'
import UiImage from 'components/common/ui/UiImage/UiImage'
import UiLi from 'components/common/ui/UiLi/UiLi'
import UiModal from 'components/common/ui/UiModal/UiModal'
import UiSpinning from 'components/common/ui/UiSpinning/UiSpinning'
import NotFound from 'pages/404/NotFound'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductDetailRequest } from 'requests/product.request'
import { ROUTES } from 'routes/RouterConfig'

const ProductDetail = () => {
  const [response, setResponse] = useState([])
  const [fetchLoading, setFetchLoading] = useState(false)
  const [fetchError, setFetchError] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const navigate = useNavigate();

  const { productId } = useParams()

  useEffect(() => {
    const handleFetchProjectDetail = async () => {
      if (fetchLoading) return
      setFetchLoading(true)
      try {
        const fetchResult = await getProductDetailRequest({
          id: productId,
        })
        const data = fetchResult?.data
        setResponse(data)
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

  const handleCloseModal = () => {
    setIsModalVisible(false)
  }

  // temp return in case product not found
  if (fetchError) return <NotFound />


  return (
    <div className='w-[1366px] '>
      <UiModal
        visible={isModalVisible}
        onConfirm={handleCloseModal}
        onclose={handleCloseModal}
        onCancel={handleCloseModal}
        headerTitle="Modal Title"
      >
        <h1>
          Nhập thông tin đăng ký bảo hiểm
        </h1>
        <div className='mt-5'>
          <form className="max-w-md p-6 bg-white rounded-md ">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

          </form>
        </div>
      </UiModal>

      {!fetchLoading ? (
        <div className="m-8 p-12 overflow-hidden">
          <div className='flex flex-row gap-8'>
            <div className='flex flex-col min-w-[450px]'>
              <div className="relative w-[391px]">
                <div className='text-[20px] font-bold'>Sản phẩm bảo hiểm nhân thọ mới nhất</div>
                <div className='w-full h-[2px] bg-[#68737a] opacity-30 absolute -bottom-1'></div>
              </div>
              <div className='text-[18px] mt-12'>Sản phẩm bảo hiểm
              </div>
              <h1 className='text-[24px]'>{response?.productName}</h1>
              <p className='mt-6'>Chọn chuẩn chất riêng</p>
            </div>

            <UiImage width={766} height={432} src={'https://www.prudential.com.vn/export/sites/prudential-vn/vi/.thu-vien/hinh-anh/san-pham-bao-hiem-nhan-tho/ke-hoach-bao-ve/pru-nang-dong-766x432.png'} />
          </div>

          <div className='w-[1000px] px-4 m-auto mt-16'>
            <p className='text-[18px]'>Với những người trẻ, chất riêng là tính độc bản, là cá tính riêng biệt, không phải một công thức cố định hay hình mẫu được sắp đặt sẵn. Thông qua từng món đồ bạn dùng, mỗi thứ phụ kiện bạn mang hay thói quen, sở thích hàng ngày bạn của bạn đều thể hiện chất riêng của chính mình. Và việc lựa chọn phương án bảo vệ bản thân cũng không phải là điều ngoại lệ.
              <br /><br />
              Hãy để Prudential đồng hành cùng bạn trên hành trình khẳng định chất riêng với sản phẩm bảo hiểm trực tuyến PRU-NĂNG ĐỘNG, nơi bạn có thể lựa chọn nhiều quyền lợi bảo vệ theo đúng nhu cầu và chất riêng của bản thân.
              <br /><br />
              Chọn PRU-NĂNG ĐỘNG ngay hôm nay để được bảo vệ toàn diện, nhanh chóng và chuẩn chất riêng của bạn.</p>
          </div>

          <div>
            <h1 className='text-[48px] mt-16'>Chi tiết sản phẩm</h1>
            <div className="bg-white shadow-sm m-8 p-12 rounded-lg">
              <h1>Quyền lợi của sản phẩm</h1>
              <div className='mt-8 flex flex-col gap-4'>
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

          <div className="flex justify-center flex-row">
            <ButtonZoomShadow
              onClick={() => {
                navigate(`/bao-hiem/${productId}/register`)
              }}
              className='text-[18px] h-[52px]'
            >
              Đăng ký bảo hiểm ngay!
            </ButtonZoomShadow>
          </div>
        </div>
      ) : (
        <UiSpinning />
      )}
    </div>
  )
}

export default ProductDetail
