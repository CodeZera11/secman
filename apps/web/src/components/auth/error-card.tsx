import CardWrapper from '@/components/common/card-wrapper'
import { PageRoutes } from '@/constants/page-routes'
import { BsExclamationTriangle } from 'react-icons/bs'

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel='Error'
      subHeaderLabel='Oops! Something went wrong'
      backButtonHref={PageRoutes.AUTH.LOGIN}
      backButtonLabel="Back to login"
    >
      <div className='w-full flex items-center gap-x-2 justify-center'>
        <BsExclamationTriangle className='text-destructive' />
      </div>
    </CardWrapper>
  )
}

export default ErrorCard