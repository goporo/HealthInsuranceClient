import React, { useState, useEffect } from 'react'
import { getProductsRequest } from 'requests/product.request'
import WipeImage from 'components/animation/WipeImage'
import UiSpinning from 'components/common/ui/UiSpinning/UiSpinning'
import UiImage from 'components/common/ui/UiImage/UiImage'

const Home = () => {
  const [response, setResponse] = useState([])
  const [fetchLoading, setFetchLoading] = useState(false)

  useEffect(() => {
    const handleFetchProjects = async () => {

      if (fetchLoading) return



      setFetchLoading(true)
      try {
        const fetchResult = await getProductsRequest()
        const data = fetchResult?.data
        setResponse(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setFetchLoading(false)
      }
    }

    handleFetchProjects()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="px-12 -mt-12">
      <div className="flex flex-col gap-6">
        {/* <ProductItem response={response} fetchLoading={fetchLoading} /> */}
        <WipeImage>
          <UiImage
            src="/assets/images/banner/khi-can-minh-co-nhau.jpg"
            alt="banner"
            height={560}
            width={1366}
          />
        </WipeImage>

        <UiImage
          src="/assets/images/banner/khi-can-minh-co-nhau.jpg"
          alt="banner"
          height={560}
          width={1366}
        />
      </div>
    </div>
  )
}

export default Home
