import ButtonZoomShadow from 'components/animation/ButtonZoomShadow'
import GroupRadioInput from 'components/common/input/GroupRadioInput'
import TextInput from 'components/common/input/TextInput'
import SVGStep1 from 'components/common/svg/SVGStep1'
import SVGStep2 from 'components/common/svg/SVGStep2'
import SVGStep3 from 'components/common/svg/SVGStep3'
import SVGStep4 from 'components/common/svg/SVGStep4'
import UiButton from 'components/common/ui/UiButton/UiButton'
import UiImage from 'components/common/ui/UiImage/UiImage'
import UiModal from 'components/common/ui/UiModal/UiModal'
import UiSpinning from 'components/common/ui/UiSpinning/UiSpinning'
import api from 'config/axios'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'
import { Routes, useNavigate, useParams } from 'react-router-dom'
import { getPaymentRequest } from 'requests/payment.request'
import { getProductPrice, purchaseProduct } from 'requests/product.request'
import { ROUTES } from 'routes/RouterConfig'
import formatMoneyToVND from 'utils/moneyFormatter'
import { LOCAL_STORAGE } from 'utils/storageConstants'

const sampleData = {
  "accountID": localStorage.getItem(LOCAL_STORAGE.ACCOUNT_ID),
  "paymentPeriod": "Mỗi Tháng",
  "customerInfo": {
    "citizenldenficication": "string",
    "name": "string",
    "placeOfBirth": "string",
    "dateOfBirth": "2002-01-08T14:13:01.103Z",
    "income": 0,
    "gender": "string",
    "job": "string",
    "jobDescription": "string",
    "nationality": "string",
    "contactPersonal": {
      "address": "string",
      "email": "string",
      "phone": "string",
      "cellPhone": "string"
    },
    "contactCompany": {
      "address": "string",
      "email": "string",
      "phone": "string",
      "cellPhone": "string"
    }
  },
  "healthDeclaration": {
    "height": 0,
    "weight": 0
  },
  "productID": 0
}

const ProductRegister = () => {
  const [onLoadingSubmit, setOnLoadingSubmit] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [productPrice, SetProductPrice] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [paymentLink, setPaymentLink] = useState(ROUTES.Home)
  const [contractId, setContractId] = useState(2);
  const [transactionId, setTransactionId] = useState(2);


  const { productId } = useParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm()

  useFormPersist('form-product-register', { watch, setValue });

  const onSubmit = async (data) => {
    try {
      if (onLoadingSubmit) return
      setOnLoadingSubmit(true)

      if (!productPrice) {
        const fetchResult = await getProductPrice(
          productId,
          sampleData
        )
        const price = fetchResult?.data
        console.log(formatMoneyToVND(price));
        SetProductPrice(price);
      }
      else {
        const fetchResult = await purchaseProduct(
          productId,
          sampleData
        )
        const result = fetchResult?.data;
        if (result) setIsModalVisible(true);
        console.log(result);

        setContractId(result?.aaa);
        setTransactionId(result?.bbb);
        setPaymentLink(result?.data)
      }

    } catch (error) {
      console.error(error)

    } finally {
      setOnLoadingSubmit(false)
    }
  }




  const GoToPayment = async () => {

    const response = await getPaymentRequest(contractId, transactionId)
    const url = response?.data
    setPaymentLink(url)

    window.location.href = url;
  }
  const handleCloseModal = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <UiModal
        visible={isModalVisible}
        onConfirm={handleCloseModal}
        onclose={handleCloseModal}
        onCancel={handleCloseModal}
        cancelClassName='hidden'
        confirmClassName='hidden'
        headerClassName='!hidden'
        footerClassName='!p-3'
      >
        <div className="flex items-center flex-col pb-0 mb-4 gap-y-6">
          <h1>
            Cảm ơn bạn đã tin dùng Protector!
          </h1>
          <UiImage src='/assets/icons/shopping_bag_success.png' alt='social medias' className='h-32' />
          <p className='text-center'>Hẹn gặp lại bạn ở các sản phẩm bảo hiểm khác, nếu có bất cứ thắc mắc gì hãy liên hệ chúng tôi để được giải đáp trực tuyến!</p>

          <div className='mt-5'>
            <UiButton
              type="button" onClick={GoToPayment}
              className='bg-primary text-[14px] text-white rounded-full py-3 px-12 w-[180px] hover:bg-red-700 cursor-pointer'>Thanh toán ngay</UiButton>
          </div>
        </div>
      </UiModal>
      <div>
        <h3 className='mt-5'>Kích hoạt E-Voucher</h3>
        <div className="bg-white w-[1230px] rounded-lg shadow-sm py-6 my-5 px-32">
          <div className="h-[86px] flex flex-row gap-x-0">
            <div className='w-full flex flex-col items-center'>
              <div className='w-[50px] h-[50px] rounded-full bg-[#F6F7FA] flex justify-center items-center'><SVGStep1 fill="#F6F7FA" /></div>
              <p className='text-[#8390a8] text-[14px] text-center mt-4 font-semibold'>Nhập mã E-Voucher</p>
            </div>
            <div className='w-full flex flex-col items-center'>
              <div className='w-[50px] h-[50px] rounded-full bg-[#FEEDEE] flex justify-center items-center'><SVGStep2 fill="#FEEDEE" /></div>
              <p className='text-primary text-[14px] text-center mt-4 font-semibold'>Điền HSYCBH</p>
            </div>
            <div className='w-full flex flex-col items-center'>
              <div className='w-[50px] h-[50px] rounded-full bg-[#F6F7FA] flex justify-center items-center'><SVGStep3 fill="#F6F7FA" /></div>
              <p className='text-[#8390a8] text-[14px] text-center mt-4 font-semibold'>Xem lại thông tin</p>
            </div>
            <div className='w-full flex flex-col items-center'>
              <div className='w-[50px] h-[50px] rounded-full bg-[#F6F7FA] flex justify-center items-center'><SVGStep4 fill="#F6F7FA" /></div>
              <p className='text-[#8390a8] text-[14px] text-center mt-4 font-semibold'>Hình thức thanh toán</p>
            </div>
          </div>
          <div className='flex flex-row gap-x-[54px] -translate-y-16 px-[148px]'>
            <div className="w-[194px] border-t-2 border-dashed border-slate-300 h-0"></div>
            <div className="w-[194px] border-t-2 border-dashed border-slate-300 h-0"></div>
            <div className="w-[194px] border-t-2 border-dashed border-slate-300 h-0"></div>
          </div>

        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="bg-white w-[1230px] rounded-lg shadow-sm py-6">
            <div className="m-auto w-[725px]">
              <p className='text-[15px]'>Bên Mua Bảo Hiểm (đồng thời là Người được bảo hiểm)</p>
              <p className='text-[15px] text-[#f2a916]'>Lưu ý: Sản phẩm này chỉ dành cho Khách hàng có Quốc tịch Việt Nam và đang sinh sống tại Việt Nam.</p>
              <h3 className='mt-8'>Thông tin cá nhân</h3>
              <div className='flex flex-row justify-center gap-x-8'>
                <TextInput
                  required
                  defaultValue={''}
                  placeholder={'Vui lòng nhập Số CMND/CCCD'}
                  label={'Số CMND/CCCD'}
                  {...register('r1')}
                />
                <TextInput
                  required
                  defaultValue={''}
                  placeholder={'Vui lòng nhập họ tên'}
                  label={'Họ tên'}
                  {...register('r2')}
                />

              </div>
              <div className='flex flex-row justify-center gap-x-8'>
                <TextInput
                  required
                  defaultValue={''}
                  placeholder={'Vui lòng nhập số điện thoại'}
                  label={'Số điện thoại'}
                  {...register('r3')}
                />
                <TextInput
                  required
                  defaultValue={''}
                  placeholder={'Nhập email'}
                  label={'Email '}
                  {...register('r4')}
                />

              </div>
              <h3 className='mt-8'>Địa chỉ</h3>
              <div className='flex flex-row justify-center gap-x-8'>
                <TextInput
                  required
                  defaultValue={''}
                  placeholder={'Vui lòng nhập địa chỉ'}
                  label={'Hộ khẩu thường trú'}
                  {...register('r5')}
                />
                <TextInput
                  required
                  defaultValue={''}
                  placeholder={'Nhập Thành Phố'}
                  label={'Thành Phố/Tỉnh'}
                  {...register('r6')}
                />
              </div>
              <h3 className='mt-8'>Địa chỉ tại nước ngoài (nếu có)</h3>
              <div>
                <TextInput
                  defaultValue={''}
                  placeholder={'Vui lòng nhập địa chỉ'}
                  label={'Địa chỉ'}
                  {...register('r7')}
                />
              </div>
              <Controller
                defaultValue={``}
                name="feedback.0.values.0"
                render={({ field }) => (
                  <GroupRadioInput
                    label="Quý khách có đang tham gia sản phẩm này với Prudential không?"
                    wrapperClassName=""
                    groupInputClassName="flex flex-row gap-x-12"
                    options={[
                      {
                        label: 'Không',
                        value: 'no',
                      },
                      {
                        label: 'Có',
                        value: 'yes',
                      },
                    ]}
                    {...field}
                  />
                )}
                control={control}
              />
              <h3 className='mt-12 mb-8'>Thông tin người thụ hưởng quyền lợi bảo hiểm</h3>
              <p className='text-[#58647a] text-[14px] text-justify leading-7 mb-3'>Ghi chú: Người thụ hưởng là bên được bên mua bảo hiểm chỉ định nhận quyền lợi bảo hiểm theo quy tắc, điều khoản sản phẩm. Việc chỉ định người thụ hưởng là không bắt buộc khi làm hồ sơ yêu cầu bảo hiểm, bạn có thể chỉ định/thay đổi người thụ hưởng bất cứ lúc nào trong suốt thời hạn hiệu lực hợp đồng.</p>
              <Controller
                defaultValue={``}
                name="feedback.0.values.1"
                render={({ field }) => (
                  <GroupRadioInput
                    label=""
                    wrapperClassName=""
                    groupInputClassName="flex flex-row gap-x-12"
                    options={[
                      {
                        label: 'Là Tôi',
                        value: 'no',
                      },
                      {
                        label: 'Là Người Khác',
                        value: 'yes',
                      },
                    ]}
                    {...field}
                  />
                )}
                control={control}
              />

              {
                productPrice && <>
                  <h3 className='mt-8'>Giá bảo hiểm ước tính</h3>
                  <p className=''>{formatMoneyToVND(productPrice)}</p>
                </>
              }

            </div>
          </div>

          {onLoadingSubmit ? (
            <UiSpinning></UiSpinning>
          ) :
            (
              <div className="flex justify-end my-8">
                <UiButton
                  onClick={() => navigate(-1)}
                  type="button" className='mr-4 bg-[#FEEDEE] text-[14px] text-primary rounded-full py-3 px-12 w-[150px] hover:bg-red-100'>Quay lại</UiButton>

                {productPrice ?
                  <UiButton type="submit" className='bg-primary text-[14px] text-white rounded-full py-3 px-12 w-[150px] hover:bg-red-700'>Mua ngay</UiButton>
                  :
                  <UiButton type="submit" className='bg-primary text-[14px] text-white rounded-full py-3 px-12 w-[150px] hover:bg-red-700'>Tiếp tục</UiButton>}
              </div>
            )}

        </form>
      </div>
    </>
  )
}

export default ProductRegister