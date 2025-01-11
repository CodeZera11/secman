import CardWrapper from '@/components/common/card-wrapper'
import { PageRoutes } from '@/constants/page-routes'
import ForgotPasswordForm from '@/forms/auth/forgot-password-form'

const ForgotPasswordPage = () => {
  return (
    <CardWrapper
      headerLabel="Forgot Password"
      subHeaderLabel="Enter your email to reset your password"
      backButtonLabel="Back to login"
      backButtonHref={PageRoutes.AUTH.LOGIN}
    >
      <ForgotPasswordForm />
    </CardWrapper >
  )
}

export default ForgotPasswordPage