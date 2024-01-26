import UiImage from 'components/common/ui/UiImage/UiImage'
import UiSpinning from 'components/common/ui/UiSpinning/UiSpinning'
import NoItemFound from 'pages/404/NoItemFound'
import BlogCard from 'pages/blog/BlogCard'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductsRequest } from 'requests/product.request'

const reasonItems = [
  {
    logo: 'https://www.prudential.com.vn/export/sites/prudential-vn/vi/.thu-vien/hinh-anh/san-pham-bao-hiem-nhan-tho/minh-hoa/minh-hoa-tai-nan-tu-vong-01-366x206.jpg',
    title: 'Hỗ trợ tài chính trước biến cố',
    desc: 'Hỗ trợ tài chính cho gia đình nếu người trụ cột không may gặp rủi ro.',
  },
  {
    logo: 'https://www.prudential.com.vn/export/sites/prudential-vn/vi/.thu-vien/hinh-anh/san-pham-bao-hiem-nhan-tho/minh-hoa/minh-hoa-chi-tra-nhan-tien-hoan-phi-01-366x206.jpg',
    title: 'Vững tâm hoàn thành mọi mục tiêu',
    desc: 'Được chia sẻ rủi ro, giảm bớt áp lực tài chính khi biến cố xảy ra.',
  },
  {
    logo: 'https://www.prudential.com.vn/export/sites/prudential-vn/vi/.thu-vien/hinh-anh/san-pham-bao-hiem-nhan-tho/minh-hoa/minh-hoa-hoc-van-01-366x206.jpg',
    title: 'Chăm sóc sức khỏe cho cả gia đình',
    desc: 'Hỗ trợ chi phí y tế giúp khách hàng an tâm điều trị.',
  },
]

const ProductList = () => {
  const [response, setResponse] = useState([])
  const [fetchLoading, setFetchLoading] = useState(false)
  const [fetchError, setFetchError] = useState(false)

  const { productId } = useParams()

  useEffect(() => {
    const handleFetchProjectDetail = async () => {
      if (fetchLoading) return
      setFetchLoading(true)
      try {
        const fetchResult = await getProductsRequest({
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


  const tempDescription = 'Lựa chọn bảo hiểm sức khỏe PRU-AN VUI, người tham gia được hỗ trợ chi phí điều trị, thuốc men, nằm viện hoặc phẫu thuật, đặc biệt là hệ thống bảo lãnh viện phí tại các bệnh viện/phòng'


  return (
    <>

      <div className='flex flex-col pb-[100px] pt-[50px] w-[1300px] px-[17px]'>
        <div className='flex flex-row justify-end'>
          <div className='max-w-[483px] mr-16'>
            <h1 className='text-[48px]'>
              Kế hoạch bảo vệ <br />
              và chăm sóc <br /> sức khỏe
            </h1>
            <p className='text-[18px] mt-4'>Vững tâm tận hưởng cuộc sống với các kế hoạch bảo vệ tài chính toàn diện trước những rủi ro tai nạn, bệnh <br /> hiểm nghèo.</p>
          </div>
          <UiImage
            width={666}
            height={500}
            src='https://www.prudential.com.vn/export/sites/prudential-vn/vi/.thu-vien/hinh-anh/san-pham-bao-hiem-nhan-tho/ke-hoach-bao-ve/ke-hoach-bao-ve-hero-666x500.jpg' />
        </div>

        <div className='w-[1200px]  ml-[54px]'>
          <h1 className='text-[48px] w-[600px]'>
            Vì sao chọn
            <br />
            <span className=' font-light'>
              Kế hoạch bảo vệ và chăm sóc sức khỏe?
            </span>
          </h1>

          <div className='grid grid-cols-3 mt-8'>
            {reasonItems.map((item, index) => (
              <div key={index} className='relative w-[366px] h-[392px] overflow-hidden  bg-white shadow-lg rounded-lg'>
                <div className='w-[366px] h-[206px]'>
                  <UiImage src={item.logo} alt="logo" width={366} height={206} />

                </div>
                <div className='px-5 pt-5 pb-[52px] '>
                  <h1 className='text-[24px]'>{item.title}</h1>
                  <p className='font-light mt-3 overflow-hidden line-clamp-8 max-h-[192px]'>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h1 className='text-[48px] w-[600px] mt-24'>
            Các sản phẩm
            <br />
            <span className=' font-light'>
              Dành cho bạn và gia đình
            </span>
          </h1>


          {!fetchLoading ? (
            (fetchError || response.length === 0) ?
              <NoItemFound />
              :
              <div className='grid grid-cols-3 w-fit gap-x-9 gap-y-16 pb-32 mt-12'>
                {
                  response.map((data, index) => (
                    <BlogCard key={index} title={data.productName} subTitle={data.snippet} img={data.avatar}
                      desc={data.productDescription === null ? tempDescription : data.productDescription} path={`${data.productID}`} />
                  ))
                }
              </div>)
            :
            (
              <div className='h-[calc(100vh-162px)] flex justify-center items-center'>
                <UiSpinning />
              </div>
            )
          }


        </div>
      </div>

    </>
  )
}


export default ProductList