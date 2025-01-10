import { BiCheckCircle } from "react-icons/bi";

interface FormSuccessProps {
  message?: string
}

const FormSuccess: React.FC<FormSuccessProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <BiCheckCircle />
      {message}
    </div>
  )
}

export default FormSuccess