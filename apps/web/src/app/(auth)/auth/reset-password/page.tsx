import CardWrapper from '@/components/common/card-wrapper'
import { PageRoutes } from '@/constants/page-routes'
import ResetPasswordForm from '@/forms/auth/reset-password-form'

const ForgotPasswordPage = () => {
  return (
    <CardWrapper
      headerLabel="Reset Password"
      subHeaderLabel="Enter new password"
      backButtonLabel="Back to login"
      backButtonHref={PageRoutes.AUTH.LOGIN}
    >
      <ResetPasswordForm />
    </CardWrapper >
  )
}

export default ForgotPasswordPage