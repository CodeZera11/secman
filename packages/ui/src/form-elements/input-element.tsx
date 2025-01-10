
import { useFormContext } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form'
import { Input } from '../components/ui/input'
import { cn } from '../lib/utils'

interface InputElementProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  description?: string
}

const InputElement: React.FC<InputElementProps> = ({ name, label, placeholder, description, ...props }) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} placeholder={placeholder} className={cn('', props.className)} type={props.type} disabled={props.disabled} />
          </FormControl>
          {description && (
            <FormDescription>
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InputElement