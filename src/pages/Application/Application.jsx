import GroupRadioInput from 'components/common/input/GroupRadioInput'
import TextInput from 'components/common/input/TextInput'
import UiButton from 'components/common/ui/UiButton/UiButton'
import UiImage from 'components/common/ui/UiImage/UiImage'
import UiModal from 'components/common/ui/UiModal/UiModal'
import UiSpinning from 'components/common/ui/UiSpinning/UiSpinning'
import NoItemFound from 'pages/404/NoItemFound'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { getAllApplication } from 'requests/application.request'
import { contractClaimRequest } from 'requests/contract.request'
import { ROUTES } from 'routes/RouterConfig'
import { twMerge } from 'tailwind-merge'
import { LOCAL_STORAGE } from 'utils/storageConstants'

const tempForm =
{
  "receiveMethod": "Trực Tiếp",
  "beneficiaryName": "PHAM MINH TAI",
  "beneficiaryPhone": "0123456789",
  "beneficiaryCityZenID": "1111111111",
  "claimRights": [
    {
      "rightID": 9,
      "description": "Tôi bị té ở A vào bệnh viện ở C nên tốn 20000000000",
      "claimAmount": 2000000000
    },
    {
      "rightID": 10,
      "description": "Tôi bị té ở A vào bệnh viện ở C nên tốn 20000000000",
      "claimAmount": 2000000000
    },
    {
      "rightID": 11,
      "description": "Tôi bị té ở A vào bệnh viện ở C nên tốn 20000000000",
      "claimAmount": 2000000000
    }
  ]
}

const Application = () => {

  const [response, setResponse] = useState([])
  const [fetchLoading, setFetchLoading] = useState(false)
  const [fetchError, setFetchError] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [dateSortOrder, setDateSortOrder] = useState('asc');
  const [statusSortOrder, setStatusSortOrder] = useState('asc');
  const [onLoadingSubmit, setOnLoadingSubmit] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [selectContractID, setSelectContractID] = useState(0);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
  } = useForm()

  const accountID = localStorage.getItem(LOCAL_STORAGE.ACCOUNT_ID);

  useEffect(() => {
    const handleFetchApplication = async () => {
      if (fetchLoading) return
      setFetchLoading(true)
      try {
        if (!localStorage.getItem(LOCAL_STORAGE.ACCOUNT_ID)) navigate(ROUTES.Login)

        const fetchResult = await getAllApplication({ accountID: accountID })
        const data = fetchResult?.data
        console.log(data);
        setResponse(data)
      } catch (error) {
        console.log(error)
        setFetchError(true)
      } finally {
        setFetchLoading(false)
      }
    }

    handleFetchApplication()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleApplicationClick = (status, contractID) => {
    setSelectContractID(contractID);
    switch (status) {
      case 'Chờ Duyệt':
        break;
      case 'Thành Công':
        setIsModalVisible(true);
        break;
      default:
        break;
    }
  }

  const handleCloseModal = () => {
    setIsModalVisible(false)
  }



  const handleSortDate = () => {
    const newSortOrder = dateSortOrder === 'asc' ? 'desc' : 'asc';
    const newData = response
      .slice()
      .sort((a, b) => (newSortOrder === 'asc' ? new Date(a.updateDate) - new Date(b.updateDate) : new Date(b.updateDate) - new Date(a.updateDate)));

    setResponse(newData);
    setDateSortOrder(newSortOrder);
  }

  const handleSortStatus = () => {
    const newSortOrder = statusSortOrder === 'asc' ? 'desc' : 'asc';
    const newData = response
      .slice()
      .sort((a, b) => (newSortOrder === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)));

    setResponse(newData);
    setStatusSortOrder(newSortOrder);
  }

  const onSubmit = async (data) => {
    try {
      if (onLoadingSubmit) return
      setOnLoadingSubmit(true)

      const fetchResult = await contractClaimRequest(
        selectContractID, data
      )
      const result = fetchResult?.data;
      if (result) setIsModalVisible(true);
      console.log(result);

    } catch (error) {
      console.error('Login failed', error)
      if (error.data) {
        // Update the state with the error message from the backend
        setErrorMessage(error.data || 'Login failed')
      } else {
        setErrorMessage('Invalid Username or Password!')
      }

    } finally {
      setOnLoadingSubmit(false)
    }
  }



  return (

    <>
      <UiModal
        visible={isModalVisible}
        onConfirm={handleCloseModal}
        onclose={handleCloseModal}
        onCancel={handleCloseModal}
        headerTitle="Phiếu yêu cầu"
        modalWidth='720'
      >
        <div className='flex flex-col items-center'>
          <h1>
            Nhập thông tin đăng ký phúc lợi
          </h1>
          <div className='mt-5 w-full flex flex-col items-center'>
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

                </div>
              </div>
              {
                onLoadingSubmit ?
                  <UiSpinning></UiSpinning>
                  :
                  <UiButton type="submit" className='bg-primary text-[14px] text-white rounded-full py-3 px-12 w-[150px] hover:bg-red-700'>Gửi yêu cầu</UiButton>
              }

            </form>
          </div>
        </div>
      </UiModal>

      <div className='mt-10 mb-14 w-[1000px]'>
        {/* Header */}
        <div className='flex flex-col'>
          <h1 className='text-[32px] text-[#3d3d3d]'>Hợp Đồng Của Bạn</h1>
          <div className="flex flex-row mt-6 gap-3">
            <UiButton
              onClick={handleSortDate}
              className='bg-slate-400 text-white rounded-xl shadow-sm py-2 min-w-[100px]'>Sort Date</UiButton>
            <UiButton
              onClick={handleSortStatus}
              className='bg-slate-400 text-white rounded-xl shadow-sm py-2 min-w-[100px]'>Sort Status</UiButton>

          </div>
        </div>

        {/* Content */}
        <div className='flex flex-col mt-4'>
          {!fetchLoading ? (
            (fetchError || response.length === 0) ?
              <NoItemFound />
              :
              <div className='flex flex-col'>
                {
                  response.map((data, index) => (
                    <ItemCard key={index} productName={data.product.productName} status={data.status}
                      contractID={data.contractID}
                      date={data.updateDate} handleApplicationClick={handleApplicationClick}
                    />
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

const ItemCard = ({ date, productName, status, handleApplicationClick, contractID }) => {

  const dateObject = new Date(date);

  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
  const year = dateObject.getFullYear() % 100;
  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes} `;


  return (

    <div className='bg-white rounded-lg shadow-sm mt-3 h-[100px] flex flex-row items-center p-4 justify-between'>
      <UiImage src='/assets/icons/contract_icon.png' alt='contract' width={70} height={70} />
      <div className="flex flex-col items-start flex-1 ml-4 gap-2">
        <h3>{productName}</h3>
        <p>
          {formattedDate}
        </p>
      </div>
      <div className="flex flex-col">
        <UiButton
          className={twMerge(
            `rounded-lg text-white px-4 py-2 w-[130px]`,
            status === 'Từ Chối' ? 'bg-primary' :
              (
                status === 'Chờ Duyệt' ?
                  'bg-orange-500'
                  : 'bg-green-500'
              )
          )
          }
          onClick={() => handleApplicationClick(status, contractID)}>{status}</UiButton>
      </div>

    </div>
  )
}

export default Application